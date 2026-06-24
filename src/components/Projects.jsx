import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, T } from '../data/content.js';

export default function Projects({ lang }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % PROJECTS.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  const p = PROJECTS[idx];
  const L = p[lang];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="card overflow-hidden">
        {/* barra superior */}
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-crit/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-warn/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-ok/80" />
          </div>
          <span className="mono text-[11px] text-ink-dim">github.com/papgar92</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.a
            key={p.repo}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="block p-5 hover:bg-panel-2/40 transition-colors"
          >
            <div className="mono text-[11px] uppercase tracking-widest text-konoha mb-2">{L.tag}</div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-ok mono">$</span>
              <h3 className="display text-lg sm:text-xl font-semibold text-ink">{p.repo}</h3>
            </div>
            <p className="text-sm text-ink-dim leading-relaxed mb-4">{L.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="mono text-[11px] text-ink-dim border border-line rounded px-2 py-0.5">
                  {s}
                </span>
              ))}
            </div>
          </motion.a>
        </AnimatePresence>
      </div>

      {/* indicadores */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Proyecto ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? 'w-7 bg-ok' : 'w-1.5 bg-line hover:bg-ink-mute'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
