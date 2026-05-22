import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LibraryLayout } from './components/LibraryLayout';
import { PlainLayout } from './components/PlainLayout';
import { UpdateBanner } from './components/UpdateBanner';
import { SearchOverlay } from './components/SearchOverlay';
import { AITutorPanel } from './components/AITutorPanel';
import { AccessGate } from './components/AccessGate';
import { RevocationGate } from './components/RevocationGate';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { ArticlePage } from './pages/ArticlePage';
import { CoursePage } from './pages/CoursePage';
import { LessonPage } from './pages/LessonPage';
import { CertificatePage } from './pages/CertificatePage';
import { ToolsPage } from './pages/ToolsPage';
import { ToolPage } from './pages/ToolPage';
import { DesignDataPage } from './pages/DesignDataPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { useSettingsStore } from './store/useSettingsStore';
import { initAnalytics, trackPage } from './lib/analytics';

export default function App() {
  const theme = useSettingsStore((s) => s.theme);
  const fontSize = useSettingsStore((s) => s.fontSize);
  const readingMode = useSettingsStore((s) => s.readingMode);

  // Reflect the chosen theme on <html> for Tailwind's `dark:` variants.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Accessibility preferences applied as data attributes on <html>.
  useEffect(() => {
    document.documentElement.dataset.fontSize = fontSize;
    document.documentElement.dataset.readingMode = readingMode;
  }, [fontSize, readingMode]);

  // Anonymous usage analytics — dormant unless configured in config.ts.
  const location = useLocation();
  useEffect(() => {
    initAnalytics();
  }, []);
  useEffect(() => {
    trackPage(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return (
    <RevocationGate>
      <AccessGate>
        <Routes>
        <Route element={<LibraryLayout />}>
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Route>
        <Route element={<PlainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/course/:lessonId" element={<LessonPage />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/:id" element={<ToolPage />} />
          <Route path="/design-data" element={<DesignDataPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

        {/* Global overlays */}
        <UpdateBanner />
        <SearchOverlay />
        <AITutorPanel />
      </AccessGate>
    </RevocationGate>
  );
}
