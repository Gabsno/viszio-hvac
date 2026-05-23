import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
  StickyNote,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Printer,
  Volume2,
  Square,
} from 'lucide-react';
import { ARTICLES, getArticle, extractToc, toPlainText } from '../lib/content';
import { trackEvent } from '../lib/analytics';
import { DifficultyBadge, TierBadge, RegionBadge } from '../components/Badges';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TableOfContents } from '../components/TableOfContents';
import { RelatedArticles } from '../components/RelatedArticles';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { TierGate } from '../components/TierGate';
import { useProgressStore } from '../store/useProgressStore';
import { useUIStore } from '../store/useUIStore';

export function ArticlePage() {
  const { id = '' } = useParams();
  const article = getArticle(id);

  const isBookmarked = useProgressStore((s) => s.bookmarks.includes(id));
  const isRead = useProgressStore((s) => s.readArticles.includes(id));
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);
  const markRead = useProgressStore((s) => s.markRead);
  const unmarkRead = useProgressStore((s) => s.unmarkRead);
  const recordActivity = useProgressStore((s) => s.recordActivity);
  const savedNote = useProgressStore((s) => s.notes[id] ?? '');
  const setNote = useProgressStore((s) => s.setNote);
  const openTutor = useUIStore((s) => s.openTutor);

  const [showNotes, setShowNotes] = useState(false);
  const [noteDraft, setNoteDraft] = useState(savedNote);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setNoteDraft(savedNote);
    setShowNotes(false);
    setSpeaking(false);
    window.speechSynthesis?.cancel();
    if (article) recordActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Stop any read-aloud when leaving the article.
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  // Speech is queued in small chunks so Chrome does not silently cut off
  // long utterances and so iOS Safari handles each piece cleanly.
  const speechQueue = useRef<string[]>([]);

  function speakNextChunk() {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const next = speechQueue.current.shift();
    if (!next) {
      setSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(next);
    utter.rate = 1;
    utter.onend = () => speakNextChunk();
    utter.onerror = () => {
      speechQueue.current = [];
      setSpeaking(false);
    };
    synth.speak(utter);
  }

  function toggleSpeak() {
    const synth = window.speechSynthesis;
    if (!synth) {
      alert(
        'Your browser does not support text-to-speech. Try Chrome, Edge or Safari.',
      );
      return;
    }
    if (!article) return;
    if (speaking) {
      synth.cancel();
      speechQueue.current = [];
      setSpeaking(false);
      return;
    }
    const text = `${article.title}. ${toPlainText(article.body)}`;
    // Split into sentence-based chunks <= ~200 chars to dodge browser bugs.
    const sentences = text.split(/(?<=[.!?])\s+/);
    const chunks: string[] = [];
    let cur = '';
    for (const s of sentences) {
      if ((cur + ' ' + s).length > 200 && cur) {
        chunks.push(cur.trim());
        cur = s;
      } else {
        cur = cur ? cur + ' ' + s : s;
      }
    }
    if (cur.trim()) chunks.push(cur.trim());
    speechQueue.current = chunks;
    setSpeaking(true);
    trackEvent('read-aloud');
    // iOS sometimes leaves the engine paused — nudge it.
    try {
      synth.resume();
    } catch {
      /* ignore */
    }
    speakNextChunk();
  }

  // Debounced note persistence.
  useEffect(() => {
    const t = setTimeout(() => {
      if (noteDraft !== savedNote) setNote(id, noteDraft);
    }, 500);
    return () => clearTimeout(t);
  }, [noteDraft, savedNote, id, setNote]);

  const toc = useMemo(
    () => (article ? extractToc(article.body) : []),
    [article],
  );

  const siblings = useMemo(() => {
    if (!article) return [];
    return ARTICLES.filter(
      (a) => a.pillar === article.pillar && a.topic === article.topic,
    ).sort((a, b) => a.order - b.order);
  }, [article]);

  if (!article) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Article not found
        </h1>
        <p className="mt-2 text-slate-500">
          The article “{id}” doesn’t exist or hasn’t been published yet.
        </p>
        <Link
          to="/library"
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
        >
          <ArrowLeft size={15} /> Back to the library
        </Link>
      </div>
    );
  }

  const idx = siblings.findIndex((a) => a.id === article.id);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx < siblings.length - 1 ? siblings[idx + 1] : null;

  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-4 py-6 sm:px-6">
      <article className="min-w-0 flex-1">
        <Breadcrumbs article={article} />

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {article.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <DifficultyBadge value={article.difficulty} />
          <TierBadge value={article.tier} />
          <RegionBadge value={article.region} />
          <span className="flex items-center gap-1">
            <Clock size={13} /> {article.estimated_minutes} min read
          </span>
          {article.last_updated && (
            <span className="text-xs">Updated {article.last_updated}</span>
          )}
        </div>

        {/* Action bar */}
        <div className="no-print mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => {
              if (!isBookmarked) trackEvent('bookmark-added');
              toggleBookmark(article.id);
            }}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
              isBookmarked
                ? 'border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300'
                : 'border-slate-300 text-slate-600 hover:border-teal-400 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            {isBookmarked ? (
              <BookmarkCheck size={15} />
            ) : (
              <Bookmark size={15} />
            )}
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>

          <button
            onClick={() => {
              if (isRead) {
                unmarkRead(article.id);
              } else {
                markRead(article.id);
                trackEvent('article-marked-read');
              }
            }}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
              isRead
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                : 'border-slate-300 text-slate-600 hover:border-emerald-400 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            {isRead ? <CheckCircle2 size={15} /> : <Check size={15} />}
            {isRead ? 'Read' : 'Mark as read'}
          </button>

          <button
            onClick={() => openTutor(article)}
            className="flex items-center gap-1.5 rounded-lg bg-teal-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-teal-800"
          >
            <Sparkles size={15} /> Ask the Tutor
          </button>

          <button
            onClick={() => setShowNotes((s) => !s)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
              showNotes || savedNote
                ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                : 'border-slate-300 text-slate-600 hover:border-amber-400 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            <StickyNote size={15} /> Notes
          </button>

          <button
            onClick={toggleSpeak}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
              speaking
                ? 'border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300'
                : 'border-slate-300 text-slate-600 hover:border-teal-400 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            {speaking ? <Square size={15} /> : <Volume2 size={15} />}
            {speaking ? 'Stop' : 'Listen'}
          </button>

          <button
            onClick={() => {
              trackEvent('pdf-export');
              window.print();
            }}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-teal-400 dark:border-slate-700 dark:text-slate-300"
          >
            <Printer size={15} /> Save PDF
          </button>
        </div>

        {showNotes && (
          <div className="no-print mt-3">
            <textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              rows={4}
              placeholder="Your private notes on this article (saved on this device)…"
              className="w-full rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 dark:border-amber-900 dark:bg-amber-950/30"
            />
          </div>
        )}

        {/* Mobile TOC */}
        {toc.length >= 2 && (
          <details className="no-print mt-5 rounded-lg border border-slate-200 p-3 xl:hidden dark:border-slate-800">
            <summary className="cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-300">
              On this page
            </summary>
            <div className="mt-2">
              <TableOfContents entries={toc} />
            </div>
          </details>
        )}

        <hr className="my-6 border-slate-200 dark:border-slate-800" />

        <TierGate requires={article.tier}>
          <MarkdownRenderer markdown={article.body} />
        </TierGate>

        {article.standards_referenced.length > 0 && (
          <div className="mt-8 rounded-lg bg-slate-100 px-4 py-3 dark:bg-slate-800/60">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Standards referenced
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {article.standards_referenced.map((s) => (
                <span
                  key={s}
                  className="rounded bg-white px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="no-print">
          <RelatedArticles ids={article.related} />
        </div>

        {/* Prev / next within topic */}
        {(prev || next) && (
          <div className="no-print mt-6 grid gap-2 sm:grid-cols-2">
            {prev ? (
              <Link
                to={`/article/${prev.id}`}
                className="flex items-center gap-2 rounded-lg border border-slate-200 p-3 text-sm hover:border-teal-400 dark:border-slate-800"
              >
                <ChevronLeft size={16} className="shrink-0 text-slate-400" />
                <span>
                  <span className="block text-[11px] uppercase text-slate-400">
                    Previous
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {prev.title}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={`/article/${next.id}`}
                className="flex items-center justify-end gap-2 rounded-lg border border-slate-200 p-3 text-right text-sm hover:border-teal-400 dark:border-slate-800"
              >
                <span>
                  <span className="block text-[11px] uppercase text-slate-400">
                    Next
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {next.title}
                  </span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-slate-400" />
              </Link>
            )}
          </div>
        )}
      </article>

      {/* Desktop right-rail TOC */}
      <aside className="hidden w-56 shrink-0 xl:block">
        <div className="sticky top-20">
          <TableOfContents entries={toc} />
        </div>
      </aside>
    </div>
  );
}
