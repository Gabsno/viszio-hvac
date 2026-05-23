import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Square,
  Star,
  Trophy,
  Volume2,
} from 'lucide-react';
import { findLesson, lessonOrder } from '../course/courseData';
import { trackEvent } from '../lib/analytics';
import { getArticles, toPlainText } from '../lib/content';
import { Quiz } from '../course/Quiz';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { useProgressStore } from '../store/useProgressStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useUIStore } from '../store/useUIStore';

type Phase = 'learn' | 'quiz' | 'result';

export function LessonPage() {
  const { lessonId = '' } = useParams();
  const navigate = useNavigate();
  const found = findLesson(lessonId);

  const completeLesson = useProgressStore((s) => s.completeLesson);
  const awardTrophy = useProgressStore((s) => s.awardTrophy);
  const markRead = useProgressStore((s) => s.markRead);
  const currentStreak = useProgressStore((s) => s.currentStreak);
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const openTutor = useUIStore((s) => s.openTutor);
  const speechVoice = useSettingsStore((s) => s.speechVoice);
  const speechRate = useSettingsStore((s) => s.speechRate);
  const speechPitch = useSettingsStore((s) => s.speechPitch);

  const [phase, setPhase] = useState<Phase>('learn');
  const [score, setScore] = useState(0);
  // Track per-article speech state. Only one article can be active at a time.
  type SpeechState = 'idle' | 'playing' | 'paused';
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speechState, setSpeechState] = useState<SpeechState>('idle');
  // Speech is queued in small chunks so Chrome does not silently cut off
  // long utterances and so iOS Safari handles each piece cleanly.
  const speechQueue = useRef<string[]>([]);

  function speakNextChunk() {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const next = speechQueue.current.shift();
    if (!next) {
      setSpeakingId(null);
      setSpeechState('idle');
      return;
    }
    const utter = new SpeechSynthesisUtterance(next);
    utter.rate = speechRate;
    utter.pitch = speechPitch;
    if (speechVoice) {
      const [name, lang] = speechVoice.split('|');
      const list = synth.getVoices();
      let v = list.find((x) => x.name === name && x.lang === lang);
      if (!v) v = list.find((x) => x.lang === lang);
      if (v) {
        utter.voice = v;
        utter.lang = v.lang;
      }
    }
    utter.onend = () => speakNextChunk();
    utter.onerror = () => {
      speechQueue.current = [];
      setSpeakingId(null);
      setSpeechState('idle');
    };
    synth.speak(utter);
  }

  function buildChunks(title: string, body: string): string[] {
    const text = `${title}. ${toPlainText(body)}`;
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
    return chunks;
  }

  async function startArticleFromBeginning(
    articleId: string,
    title: string,
    body: string,
  ) {
    const synth = window.speechSynthesis;
    if (!synth) {
      alert(
        'Your browser does not support text-to-speech. Try Chrome, Edge or Safari.',
      );
      return;
    }
    // Hard reset before queueing — cancel old utterance and wait for the
    // engine to actually clear (mobile Safari and some Android browsers
    // don't honour cancel() instantly).
    speechQueue.current = [];
    synth.cancel();
    for (let i = 0; i < 12 && synth.speaking; i++) {
      await new Promise((r) => setTimeout(r, 30));
    }
    speechQueue.current = buildChunks(title, body);
    setSpeakingId(articleId);
    setSpeechState('playing');
    trackEvent('lesson-read-aloud');
    try {
      synth.resume();
    } catch {
      /* ignore */
    }
    speakNextChunk();
  }

  function pauseSpeaking() {
    const synth = window.speechSynthesis;
    if (!synth) return;
    try {
      synth.pause();
    } catch {
      /* ignore */
    }
    setSpeechState('paused');
  }

  function resumeSpeaking() {
    const synth = window.speechSynthesis;
    if (!synth) return;
    try {
      synth.resume();
    } catch {
      /* ignore */
    }
    setSpeechState('playing');
  }

  function stopSpeaking() {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    speechQueue.current = [];
    setSpeakingId(null);
    setSpeechState('idle');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setPhase('learn');
    setScore(0);
    // Stop any in-progress narration when switching lessons.
    window.speechSynthesis?.cancel();
    speechQueue.current = [];
    setSpeakingId(null);
    setSpeechState('idle');
    if (findLesson(lessonId)) trackEvent(`lesson-started: ${lessonId}`);
  }, [lessonId]);

  // Stop any read-aloud when leaving the lesson.
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const articles = useMemo(
    () => (found ? getArticles(found.lesson.articleIds) : []),
    [found],
  );

  if (!found) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Lesson not found
        </h1>
        <Link
          to="/course"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
        >
          <ArrowLeft size={15} /> Back to course
        </Link>
      </div>
    );
  }

  const { module, lesson } = found;
  const order = lessonOrder();
  const pos = order.findIndex((o) => o.lessonId === lessonId);
  const nextLesson = pos >= 0 && pos < order.length - 1 ? order[pos + 1] : null;

  function handleComplete(scorePercent: number) {
    setScore(scorePercent);
    completeLesson(lesson.id, scorePercent, lesson.xp);
    trackEvent(`lesson-completed: ${lesson.id}`);
    trackEvent(`quiz-score: ${scorePercent}%`);
    for (const a of lesson.articleIds) markRead(a);

    // Trophy checks.
    awardTrophy('first-lesson');
    if (scorePercent === 100) awardTrophy('perfect-quiz');
    if (currentStreak >= 3) awardTrophy('streak-3');
    if (currentStreak >= 7) awardTrophy('streak-7');
    if (module.capstone) awardTrophy('capstone');
    const moduleDone = module.lessons.every(
      (l) => l.id === lesson.id || completedLessons.includes(l.id),
    );
    if (moduleDone) awardTrophy('module-master');

    setPhase('result');
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <Link
        to="/course"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700"
      >
        <ArrowLeft size={14} /> {module.title}
      </Link>

      <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {lesson.title}
      </h1>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
        <Star size={14} className="text-teal-600" /> {lesson.xp} XP ·{' '}
        {lesson.quiz.length} questions
      </p>

      {phase === 'learn' && (
        <div className="mt-5">
          {articles.map((a) => (
            <article
              key={a.id}
              className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="min-w-0 flex-1 text-lg font-bold text-slate-900 dark:text-white">
                  {a.title}
                </h2>
                {speakingId !== a.id && (
                  <button
                    onClick={() =>
                      startArticleFromBeginning(a.id, a.title, a.body)
                    }
                    className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-teal-400 dark:border-slate-700 dark:text-slate-300"
                  >
                    <Volume2 size={13} /> Listen
                  </button>
                )}
                {speakingId === a.id && speechState === 'playing' && (
                  <>
                    <button
                      onClick={pauseSpeaking}
                      className="flex shrink-0 items-center gap-1 rounded-lg border border-teal-500 bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-950/50 dark:text-teal-300"
                    >
                      <Pause size={13} /> Pause
                    </button>
                    <button
                      onClick={stopSpeaking}
                      className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-rose-400 dark:border-slate-700 dark:text-slate-300"
                    >
                      <Square size={13} /> Stop
                    </button>
                  </>
                )}
                {speakingId === a.id && speechState === 'paused' && (
                  <>
                    <button
                      onClick={resumeSpeaking}
                      className="flex shrink-0 items-center gap-1 rounded-lg border border-teal-500 bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-950/50 dark:text-teal-300"
                    >
                      <Play size={13} /> Resume
                    </button>
                    <button
                      onClick={() =>
                        startArticleFromBeginning(a.id, a.title, a.body)
                      }
                      className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-teal-400 dark:border-slate-700 dark:text-slate-300"
                    >
                      <RotateCcw size={13} /> Restart
                    </button>
                    <button
                      onClick={stopSpeaking}
                      className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-rose-400 dark:border-slate-700 dark:text-slate-300"
                    >
                      <Square size={13} /> Stop
                    </button>
                  </>
                )}
                <button
                  onClick={() => openTutor(a)}
                  className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-teal-400 dark:border-slate-700 dark:text-slate-300"
                >
                  <Sparkles size={13} /> Tutor
                </button>
              </div>
              <MarkdownRenderer markdown={a.body} />
            </article>
          ))}

          <button
            onClick={() => {
              window.speechSynthesis?.cancel();
              speechQueue.current = [];
              setSpeakingId(null);
              setSpeechState('idle');
              setPhase('quiz');
              window.scrollTo(0, 0);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white hover:bg-teal-800"
          >
            Start the quiz <ArrowRight size={16} />
          </button>
        </div>
      )}

      {phase === 'quiz' && (
        <div className="mt-5">
          <Quiz questions={lesson.quiz} onComplete={handleComplete} />
        </div>
      )}

      {phase === 'result' && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-7 text-center dark:border-slate-800 dark:bg-slate-900">
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
              score >= 60
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950'
                : 'bg-amber-100 text-amber-600 dark:bg-amber-950'
            }`}
          >
            {score === 100 ? <Trophy size={30} /> : <GraduationCap size={30} />}
          </div>
          <h2 className="mt-3 text-xl font-extrabold text-slate-900 dark:text-white">
            {score === 100
              ? 'Perfect score!'
              : score >= 60
                ? 'Lesson complete!'
                : 'Lesson done — review and retry for a better score.'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            You scored {score}% and earned {lesson.xp} XP.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
            <button
              onClick={() => {
                setPhase('quiz');
                window.scrollTo(0, 0);
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-teal-400 dark:border-slate-700 dark:text-slate-300"
            >
              Retry quiz
            </button>
            {nextLesson ? (
              <button
                onClick={() => navigate(`/course/${nextLesson.lessonId}`)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800"
              >
                Next lesson <ArrowRight size={15} />
              </button>
            ) : (
              <Link
                to="/course"
                className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800"
              >
                Back to course
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
