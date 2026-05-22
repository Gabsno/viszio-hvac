import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Capture the PWA install prompt as early as possible — it can fire before
// React mounts. The in-app Install button reads it from here.
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  (window as Window & { deferredInstallPrompt?: Event }).deferredInstallPrompt =
    e;
  window.dispatchEvent(new Event('pwa-installable'));
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </HashRouter>
  </React.StrictMode>,
);
