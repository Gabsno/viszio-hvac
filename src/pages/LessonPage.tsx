import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
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
import { buildSlidesForLesson } from '../course/buildSlides';
import { ChallengeView } from '../course/Challenge';
import { trackEvent } from '../lib/analytics';
import { getArticles, toPlainText } from '../lib/content';
import { Quiz } from '../course/Quiz';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { useProgressStore } from '../store/useProgressStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useUIStore } from '../store/useUIStore';

type Phase = 'learn' | 'challenges' | 'quiz' | 'result';

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
  // Slide-by-slide lesson player — currentSlide is the active index into
  // the lesson's slide deck (built from the lesson's articles).
  const [currentSlide, setCurrentSlide] = useState(0);
  // Interactive challenges shown between slides and quiz.
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [challengeStreak, setChallengeStreak] = useState(0);
  // Track per-slide speech state. Only one slide can be active at a time.
  type SpeechState = 'idle' | 'playing' | 'paused';
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speechState, setSpeechState] = useState<SpeechState>('idle');
  // Chunk-index playback model — see ArticlePage for the full rationale.
  // We avoid synth.pause/resume entirely because both are unreliable across
  // browsers. Pause cancels the active utterance and remembers the chunk
  // index; resume re-queues from there. Chrome auto-stops speech after
  // ~15s of activity, so a keep-alive nudges resume() while playing.
  const chunks = useRef<string[]>([]);
  const chunkIndex = useRef<number>(0);
  // See ArticlePage for the epoch-counter rationale.
  const epoch = useRef<number>(0);
  const keepAlive = useRef<number | null>(null);

  function clearKeepAlive() {
    if (keepAlive.current !== null) {
      window.clearInterval(keepAlive.current);
      keepAlive.current = null;
    }
  }

  function startKeepAlive() {
    clearKeepAlive();
    keepAlive.current = window.setInterval(() => {
      const synth = window.speechSynthesis;
      if (!synth) return;
      if (synth.speaking && !synth.paused) {
        try {
          synth.resume();
        } catch {
          /* ignore */
        }
      }
    }, 10000);
  }

  function speakChunkAt(index: number) {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (index >= chunks.current.length) {
      clearKeepAlive();
      setSpeakingId(null);
      setSpeechState('idle');
      chunkIndex.current = 0;
      return;
    }
    chunkIndex.current = index;
    const myEpoch = epoch.current;
    const utter = new SpeechSynthesisUtterance(chunks.current[index]);
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
    utter.onend = () => {
      if (myEpoch !== epoch.current) return; // superseded — ignore
      speakChunkAt(index + 1);
    };
    utter.onerror = () => {
      if (myEpoch !== epoch.current) return; // superseded — ignore
      clearKeepAlive();
      setSpeakingId(null);
      setSpeechState('idle');
    };
    synth.speak(utter);
  }

  function buildChunks(title: string, body: string): string[] {
    const text = `${title}. ${toPlainText(body)}`;
    const sentences = text.split(/(?<=[.!?])\s+/);
    const out: string[] = [];
    let cur = '';
    for (const s of sentences) {
      if ((cur + ' ' + s).length > 200 && cur) {
        out.push(cur.trim());
        cur = s;
      } else {
        cur = cur ? cur + ' ' + s : s;
      }
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }

  async function waitForCancel(maxMs = 400) {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const start = Date.now();
    while (synth.speaking && Date.now() - start < maxMs) {
      await new Promise((r) => setTimeout(r, 30));
    }
  }

  async function startSlideFromBeginning(
    slideKey: string,
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
    clearKeepAlive();
    epoch.current++;
    synth.cancel();
    await waitForCancel();
    chunks.current = buildChunks(title, body);
    chunkIndex.current = 0;
    setSpeakingId(slideKey);
    setSpeechState('playing');
    trackEvent('lesson-read-aloud');
    startKeepAlive();
    speakChunkAt(0);
  }

  function pauseSpeaking() {
    const synth = window.speechSynthesis;
    if (!synth) return;
    clearKeepAlive();
    epoch.current++;
    synth.cancel();
    setSpeechState('paused');
  }

  async function resumeSpeaking() {
    const synth = window.speechSynthesis;
    if (!synth) return;
    await waitForCancel();
    setSpeechState('playing');
    startKeepAlive();
    speakChunkAt(chunkIndex.current);
  }

  function stopSpeaking() {
    const synth = window.speechSynthesis;
    if (!synth) return;
    clearKeepAlive();
    epoch.current++;
    synth.cancel();
    chunks.current = [];
    chunkIndex.current = 0;
    setSpeakingId(null);
    setSpeechState('idle');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setPhase('learn');
    setScore(0);
    setCurrentSlide(0);
    setCurrentChallenge(0);
    setChallengeStreak(0);
    // Stop any in-progress narration when switching lessons.
    clearKeepAlive();
    epoch.current++;
    window.speechSynthesis?.cancel();
    chunks.current = [];
    chunkIndex.current = 0;
    setSpeakingId(null);
    setSpeechState('idle');
    if (findLesson(lessonId)) trackEvent(`lesson-started: ${lessonId}`);
  }, [lessonId]);

  // Stop any read-aloud when leaving the lesson.
  useEffect(
    () => () => {
      clearKeepAlive();
      window.speechSynthesis?.cancel();
    },
    [],
  );

  const articles = useMemo(
    () => (found ? getArticles(found.lesson.articleIds) : []),
    [found],
  );
  const slides = useMemo(() => buildSlidesForLesson(articles), [articles]);
  const slide = slides[currentSlide];
  const slideArticle = slide
    ? articles.find((a) => a.id === slide.articleId)
    : null;

  function goToSlide(target: number) {
    if (target < 0 || target >= slides.length) return;
    stopSpeaking();
    setCurrentSlide(target);
    window.scrollTo(0, 0);
  }

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

      {phase === 'learn' && slide && (
        <div className="mt-5">
          {/* Top progress dots — one segment per slide */}
          <div className="mb-3 flex gap-1">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${
                  i < currentSlide
                    ? 'bg-teal-600'
                    : i === currentSlide
                      ? 'bg-teal-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Slide caption */}
          <p className="mb-2 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            <span>
              Slide {currentSlide + 1} of {slides.length}
            </span>
            {slides.length > 1 && (
              <>
                <span aria-hidden>·</span>
                <span className="normal-case tracking-normal text-slate-500">
                  {slide.articleTitle}
                </span>
              </>
            )}
          </p>

          {/* Slide card */}
          <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <h2
                className={`min-w-0 flex-1 ${
                  slide.isIntro
                    ? 'text-2xl font-extrabold'
                    : 'text-lg font-bold'
                } text-slate-900 dark:text-white`}
              >
                {slide.title}
              </h2>
              {speakingId !== slide.key && (
                <button
                  onClick={() =>
                    startSlideFromBeginning(slide.key, slide.title, slide.body)
                  }
                  className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-teal-400 dark:border-slate-700 dark:text-slate-300"
                >
                  <Volume2 size={13} /> Listen
                </button>
              )}
              {speakingId === slide.key && speechState === 'playing' && (
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
              {speakingId === slide.key && speechState === 'paused' && (
                <>
                  <button
                    onClick={resumeSpeaking}
                    className="flex shrink-0 items-center gap-1 rounded-lg border border-teal-500 bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-950/50 dark:text-teal-300"
                  >
                    <Play size={13} /> Resume
                  </button>
                  <button
                    onClick={() =>
                      startSlideFromBeginning(slide.key, slide.title, slide.body)
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
              {slideArticle && (
                <button
                  onClick={() => openTutor(slideArticle)}
                  className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-teal-400 dark:border-slate-700 dark:text-slate-300"
                >
                  <Sparkles size={13} /> Tutor
                </button>
              )}
            </div>
            {slide.body ? (
              <MarkdownRenderer markdown={slide.body} />
            ) : (
              <p className="text-sm italic text-slate-500">
                Tap Next to begin.
              </p>
            )}
          </article>

          {/* Navigation row */}
          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={() => goToSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
              className="flex shrink-0 items-center gap-1 rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-600 transition hover:border-teal-400 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            {currentSlide < slides.length - 1 ? (
              <button
                onClick={() => goToSlide(currentSlide + 1)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white hover:bg-teal-800"
              >
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => {
                  stopSpeaking();
                  if (lesson.challenges && lesson.challenges.length > 0) {
                    setPhase('challenges');
                  } else {
                    setPhase('quiz');
                  }
                  window.scrollTo(0, 0);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white hover:bg-teal-800"
              >
                {lesson.challenges && lesson.challenges.length > 0
                  ? 'Try it out'
                  : 'Start the quiz'}{' '}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {phase === 'challenges' && lesson.challenges && (
        <div className="mt-5">
          {/* Top progress dots for challenges */}
          <div className="mb-3 flex gap-1">
            {lesson.challenges.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${
                  i < currentChallenge
                    ? 'bg-ghana-500'
                    : i === currentChallenge
                      ? 'bg-ghana-400'
                      : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Practice {currentChallenge + 1} of {lesson.challenges.length}
            {challengeStreak > 0
              ? ` · ${challengeStreak} correct streak`
              : ''}
          </p>

          <ChallengeView
            key={lesson.challenges[currentChallenge].id}
            challenge={lesson.challenges[currentChallenge]}
            onComplete={(correct) => {
              trackEvent(
                `challenge-${correct ? 'correct' : 'incorrect'}: ${lesson.challenges![currentChallenge].id}`,
              );
              setChallengeStreak((s) => (correct ? s + 1 : 0));
              if (currentChallenge < lesson.challenges!.length - 1) {
                setCurrentChallenge((c) => c + 1);
                window.scrollTo(0, 0);
              } else {
                setPhase('quiz');
                window.scrollTo(0, 0);
              }
            }}
          />

          {/* Skip option in case user is stuck */}
          <button
            onClick={() => {
              setPhase('quiz');
              window.scrollTo(0, 0);
            }}
            className="mt-3 w-full text-center text-xs font-medium text-slate-500 hover:text-teal-700"
          >
            Skip practice and go straight to the quiz
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
