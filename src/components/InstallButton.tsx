import { useEffect, useState } from 'react';
import { Download, Share, X, Plus } from 'lucide-react';

// The browser's install-prompt event (not in the standard TS DOM lib).
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

type WinWithPrompt = Window & {
  deferredInstallPrompt?: BeforeInstallPromptEvent;
};

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

/**
 * In-app "Install" button. On Chrome/Edge/Android it triggers the native
 * install prompt; on iOS (which has no prompt) it shows Add-to-Home-Screen
 * instructions. Hidden once the app is installed or when not installable.
 */
export function InstallButton() {
  const [canPrompt, setCanPrompt] = useState(
    () => !!(window as WinWithPrompt).deferredInstallPrompt,
  );
  const [installed, setInstalled] = useState(isStandalone);
  const [showIosHelp, setShowIosHelp] = useState(false);

  useEffect(() => {
    const onInstallable = () => setCanPrompt(true);
    const onInstalled = () => {
      setInstalled(true);
      setCanPrompt(false);
      (window as WinWithPrompt).deferredInstallPrompt = undefined;
    };
    window.addEventListener('pwa-installable', onInstallable);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('pwa-installable', onInstallable);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed) return null;

  const ios = isIOS();
  // Show on installable browsers, or on iOS Safari (manual install path).
  if (!canPrompt && !ios) return null;

  async function handleClick() {
    if (ios) {
      setShowIosHelp(true);
      return;
    }
    const evt = (window as WinWithPrompt).deferredInstallPrompt;
    if (!evt) return;
    await evt.prompt();
    await evt.userChoice;
    (window as WinWithPrompt).deferredInstallPrompt = undefined;
    setCanPrompt(false);
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-1.5 rounded-lg bg-teal-700 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-teal-800"
        aria-label="Install the app"
      >
        <Download size={15} />
        <span className="hidden sm:inline">Install</span>
      </button>

      {showIosHelp && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-900/50 p-4 sm:items-center">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
                <Download size={18} />
              </span>
              <h2 className="flex-1 text-sm font-bold text-slate-900 dark:text-white">
                Install on iPhone or iPad
              </h2>
              <button
                onClick={() => setShowIosHelp(false)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <ol className="mt-3 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold dark:bg-slate-800">
                  1
                </span>
                Tap the <Share size={15} className="inline text-teal-600" />{' '}
                <b>Share</b> button in Safari&rsquo;s toolbar.
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold dark:bg-slate-800">
                  2
                </span>
                Scroll down and tap{' '}
                <Plus size={15} className="inline text-teal-600" />{' '}
                <b>Add to Home Screen</b>.
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold dark:bg-slate-800">
                  3
                </span>
                Tap <b>Add</b> — Viszio HVAC appears on your home screen.
              </li>
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
