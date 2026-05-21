import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Send, Sparkles, KeyRound } from 'lucide-react';
import { useUIStore } from '../store/useUIStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { askTutor, type ChatMessage } from '../lib/ai';
import { MarkdownRenderer } from './MarkdownRenderer';

export function AITutorPanel() {
  const open = useUIStore((s) => s.tutorOpen);
  const article = useUIStore((s) => s.tutorArticle);
  const close = useUIStore((s) => s.closeTutor);

  const provider = useSettingsStore((s) => s.aiProvider);
  const activeKey = useSettingsStore((s) => s.activeKey());

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset the conversation whenever a different article opens the tutor.
  useEffect(() => {
    if (open) {
      setMessages([]);
      setError(null);
      setInput('');
    }
  }, [open, article?.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open) return null;

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setError(null);
    setLoading(true);
    try {
      const reply = await askTutor(provider, activeKey, next, article);
      setMessages([...next, { role: 'assistant', content: reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  const suggestions = article
    ? [
        'Explain this in simpler terms',
        'Give me a worked example',
        'How does this apply in Ghana?',
        'Quiz me on this article',
      ]
    : ['What should I learn first?', 'Explain psychrometrics simply'];

  return (
    <div className="fixed inset-0 z-[65] flex justify-end">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={close}
      />
      <aside className="animate-slide-up relative flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:animate-none">
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-white">
            <Sparkles size={16} />
          </span>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              AI Tutor
            </h2>
            <p className="truncate text-[11px] text-slate-400">
              {article ? article.title : 'General HVAC help'} ·{' '}
              {provider === 'gemini' ? 'Gemini' : 'Claude'}
            </p>
          </div>
          <button
            onClick={close}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close tutor"
          >
            <X size={18} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
          {!activeKey && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm dark:border-amber-800 dark:bg-amber-950/40">
              <p className="flex items-center gap-1.5 font-semibold text-amber-800 dark:text-amber-300">
                <KeyRound size={15} /> No API key set
              </p>
              <p className="mt-1 text-amber-700 dark:text-amber-400">
                Add a free Google Gemini key (or a Claude key) in{' '}
                <Link to="/settings" className="font-semibold underline">
                  Settings
                </Link>{' '}
                to chat with the tutor.
              </p>
            </div>
          )}

          {messages.length === 0 && activeKey && (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <p>
                Ask anything about{' '}
                {article ? `“${article.title}”` : 'HVAC engineering'}. Try:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-600 hover:border-teal-500 hover:text-teal-700 dark:border-slate-700 dark:text-slate-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === 'user' ? 'flex justify-end' : ''}
            >
              {m.role === 'user' ? (
                <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-teal-700 px-3.5 py-2 text-sm text-white">
                  {m.content}
                </div>
              ) : (
                <div className="max-w-full rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-2 text-sm dark:bg-slate-800">
                  <MarkdownRenderer markdown={m.content} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="h-2 w-2 animate-bounce rounded-full bg-teal-500 [animation-delay:-0.2s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-teal-500 [animation-delay:-0.1s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-teal-500" />
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600 dark:bg-rose-950/50 dark:text-rose-300">
              {error}
            </p>
          )}
        </div>

        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Ask the tutor…"
              disabled={!activeKey}
              className="max-h-32 flex-1 resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim() || !activeKey}
              className="rounded-lg bg-teal-700 p-2.5 text-white hover:bg-teal-800 disabled:opacity-40"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
