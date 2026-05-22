import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Star,
  Trophy,
} from 'lucide-react';
import { findLesson, lessonOrder } from '../course/courseData';
import { trackEvent } from '../lib/analytics';
import { getArticles } from '../lib/content';
import { Quiz } from '../course/Quiz';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { useProgressStore } from '../store/useProgressStore';
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

  const [phase, setPhase] = useState<Phase>('learn');
  const [score, setScore] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPhase('learn');
    setScore(0);
    if (findLesson(lessonId)) trackEvent(`lesson-started: ${lessonId}`);
  }, [lessonId]);

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
              <div className="mb-2 flex items-center gap-2">
                <h2 className="flex-1 text-lg font-bold text-slate-900 dark:text-white">
                  {a.title}
                </h2>
                <button
                  onClick={() => openTutor(a)}
                  className="flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 hover:border-teal-400 dark:border-slate-700 dark:text-slate-300"
                >
                  <Sparkles size={13} /> Tutor
                </button>
              </div>
              <MarkdownRenderer markdown={a.body} />
            </article>
          ))}

          <button
            onClick={() => {
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
