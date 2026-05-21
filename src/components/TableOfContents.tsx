import { useEffect, useState } from 'react';
import type { TocEntry } from '../types';

interface Props {
  entries: TocEntry[];
}

/** Right-rail table of contents with scroll-spy. */
export function TableOfContents({ entries }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (entries.length === 0) return;
    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );
    for (const e of entries) {
      const el = document.getElementById(e.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
        On this page
      </p>
      <ul className="space-y-1 border-l border-slate-200 dark:border-slate-800">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className={`-ml-px block border-l-2 py-0.5 transition ${
                e.level === 3 ? 'pl-6' : 'pl-3'
              } ${
                activeId === e.id
                  ? 'border-teal-500 font-semibold text-teal-700 dark:text-teal-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {e.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
