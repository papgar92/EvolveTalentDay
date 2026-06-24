import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALERTS, SEV_LABEL, T } from '../data/content.js';

const sevStyle = {
  crit: { dot: 'bg-crit', text: 'text-crit', ring: 'border-crit/40' },
  warn: { dot: 'bg-warn', text: 'text-warn', ring: 'border-warn/40' },
  info: { dot: 'bg-info', text: 'text-info', ring: 'border-info/40' },
};

function nowStamp(offsetSec) {
  const d = new Date(Date.now() - offsetSec * 1000);
  return d.toLocaleTimeString('es-ES', { hour12: false });
}

export default function AlertFeed({ lang }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= ALERTS.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), 520);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="pulse-dot" />
          <span className="mono text-xs text-ink uppercase tracking-wider">{T[lang].feedTitle}</span>
        </div>
        <span className="mono text-[10px] text-ink-mute uppercase tracking-widest">{T[lang].feedSub}</span>
      </div>

      <div className="space-y-2.5">
        <AnimatePresence>
          {ALERTS.slice(0, count).map((a, i) => {
            const s = sevStyle[a.sev];
            const L = a[lang];
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28 }}
                className={`flex items-start gap-3 rounded-lg border ${s.ring} bg-panel-2/60 px-3 py-2.5`}
              >
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="mono text-[10px] text-ink-mute">{nowStamp((ALERTS.length - i) * 37)}</span>
                    <span className={`mono text-[10px] font-bold ${s.text}`}>{SEV_LABEL[a.sev][lang]}</span>
                    {a.mitre !== 'DEF' && (
                      <span className="mono text-[10px] text-ink-dim border border-line rounded px-1">{a.mitre}</span>
                    )}
                  </div>
                  <div className="text-[13px] text-ink mt-0.5 leading-snug">{L.title}</div>
                  <div className="mono text-[11px] text-ink-dim mt-0.5 truncate">{L.src}</div>
                </div>
                <span className="mono text-[10px] text-ok shrink-0 mt-1">{L.status}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
