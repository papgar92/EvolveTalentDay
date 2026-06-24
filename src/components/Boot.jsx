import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BOOT_LINES, T } from '../data/content.js';

const colorFor = {
  ok: 'text-ok',
  info: 'text-info',
  warn: 'text-warn',
  dim: 'text-ink-dim',
};

export default function Boot({ lang, onDone }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= BOOT_LINES.length) {
      const t = setTimeout(onDone, 650);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 260 : 230);
    return () => clearTimeout(t);
  }, [shown, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-bg px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-lg mono text-[13px] sm:text-sm leading-relaxed">
        {BOOT_LINES.slice(0, shown).map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={colorFor[l.cls]}
          >
            {l.t}
          </motion.div>
        ))}
        <span className="cursor align-middle" />
        <button
          onClick={onDone}
          className="mt-8 block text-ink-mute hover:text-ink-dim text-xs tracking-widest uppercase transition-colors"
        >
          [ {T[lang].skip} ]
        </button>
      </div>
    </motion.div>
  );
}
