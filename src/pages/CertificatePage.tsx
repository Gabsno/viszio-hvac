import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Printer, ArrowLeft, Lock } from 'lucide-react';
import { useProgressStore } from '../store/useProgressStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { COURSE, totalLessons } from '../course/courseData';

export function CertificatePage() {
  const completed = useProgressStore((s) => s.completedLessons);
  const xp = useProgressStore((s) => s.xp);
  const userName = useSettingsStore((s) => s.userName);
  const setUserName = useSettingsStore((s) => s.setUserName);

  const total = totalLessons();
  const done = completed.length;
  const isComplete = done >= total && total > 0;
  const pct = total ? Math.round((done / total) * 100) : 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <Link
        to="/course"
        className="no-print inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700"
      >
        <ArrowLeft size={14} /> Back to course
      </Link>

      <h1 className="no-print mt-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Course Certificate
      </h1>

      {!isComplete && (
        <div className="no-print mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/40">
          <p className="flex items-center gap-1.5 font-semibold text-amber-800 dark:text-amber-300">
            <Lock size={15} /> Certificate locked
          </p>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
            Finish all {total} lessons to unlock your certificate. You have
            completed {done} ({pct}%).
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-amber-200 dark:bg-amber-900">
            <div
              className="h-full rounded-full bg-amber-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      {/* Name field */}
      <div className="no-print mt-4">
        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          Name on certificate
        </label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your full name"
          className="mt-1 w-full max-w-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>

      {/* The certificate */}
      <div className="certificate mt-5 rounded-2xl border-4 border-double border-teal-700 bg-white p-8 text-center dark:bg-white sm:p-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-teal-700">
          Viszio HVAC
        </p>
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
          Certificate of Completion
        </p>
        <div className="mx-auto my-5 h-px w-24 bg-teal-300" />
        <p className="text-sm text-slate-500">This certifies that</p>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
          {userName.trim() || 'Your Name'}
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">
          has successfully completed the Viszio HVAC Engineering Course —
          all {COURSE.length} modules and {total} lessons, covering
          psychrometrics, load calculations, equipment, ducting, piping,
          ventilation, controls and standards.
        </p>

        <div className="mt-6 flex items-center justify-center gap-8">
          <div>
            <p className="text-2xl font-extrabold text-teal-700">{xp}</p>
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              XP earned
            </p>
          </div>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-700 text-white">
            <Award size={26} />
          </span>
          <div>
            <p className="text-2xl font-extrabold text-teal-700">{pct}%</p>
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              Completed
            </p>
          </div>
        </div>

        <div className="mx-auto mt-6 h-px w-24 bg-teal-300" />
        <p className="mt-3 text-xs text-slate-500">Issued {today}</p>
        <p className="text-[10px] text-slate-400">Viszio HVAC</p>
      </div>

      {isComplete ? (
        <button
          onClick={() => window.print()}
          className="no-print mt-4 flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
        >
          <Printer size={16} /> Print or save as PDF
        </button>
      ) : (
        <p className="no-print mt-4 text-xs text-slate-400">
          The preview above shows what your certificate will look like. Finish
          the course to print it.
        </p>
      )}
    </div>
  );
}
