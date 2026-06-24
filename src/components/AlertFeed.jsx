import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALERTS, SEV_LABEL, T } from '../data/content.js';

const sevStyle = {
  crit: { dot: 'bg-crit', text: 'text-crit', ring: 'border-crit/40' },
  warn: { dot: 'bg-warn', text: 'text-warn', ring: 'border-warn/40' },
  info: { dot: 'bg-info', text: 'text-info', ring: 'border-info/40' },
};

// Detalle "cómo se detectó" por alerta (no toca content.js)
const DETAIL = {
  'A-1147': { es: 'Picos de fallos de login desde una misma IP en auth.log → regla propia + umbral.', en: 'Login-failure spikes from one IP in auth.log → custom rule + threshold.', repo: 'https://github.com/papgar92/Detector-Fuerza-bruta-SSH' },
  'A-1148': { es: 'Conexiones secuenciales a múltiples puertos detectadas por Zeek (conn.log).', en: 'Sequential connections to many ports flagged by Zeek (conn.log).', repo: 'https://github.com/papgar92/soc-monitoring-lab' },
  'A-1149': { es: 'Acceso a rutas sensibles vigilado por reglas FIM de Wazuh.', en: 'Access to sensitive paths watched by Wazuh FIM rules.', repo: 'https://github.com/papgar92/soc-monitoring-lab' },
  'A-1150': { es: 'Tráfico segmentado y filtrado en el perímetro (pfSense + Snort).', en: 'Segmented, filtered traffic at the perimeter (pfSense + Snort).', repo: 'https://github.com/papgar92/TFG-ASIR' },
};

// Alerta-pista (vive aquí, no en content.js)
const CLUE = {
  id: 'A-1151', mitre: 'C2?', sev: 'warn',
  es: { title: 'Cadena cifrada interceptada (egress)', src: 'anomalía · sin clasificar', status: 'Revisar' },
  en: { title: 'Encrypted string intercepted (egress)', src: 'anomaly · unclassified', status: 'Review' },
};

function nowStamp(offsetSec) {
  const d = new Date(Date.now() - offsetSec * 1000);
  return d.toLocaleTimeString('es-ES', { hour12: false });
}

export default function AlertFeed({ lang, onInvestigate }) {
  const list = [...ALERTS, CLUE];
  const [count, setCount] = useState(0);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    if (count >= list.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), 520);
    return () => clearTimeout(t);
  }, [count, list.length]);

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
          {list.slice(0, count).map((a, i) => {
            const s = sevStyle[a.sev];
            const L = a[lang];
            const isClue = a.id === 'A-1151';
            const isOpen = openId === a.id;
            const det = DETAIL[a.id];
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28 }}
                className={`rounded-lg border ${s.ring} ${isClue ? 'ring-1 ring-warn/30' : ''} bg-panel-2/60`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : a.id)}
                  className="w-full flex items-start gap-3 px-3 py-2.5 text-left"
                >
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="mono text-[10px] text-ink-mute">{nowStamp((list.length - i) * 37)}</span>
                      <span className={`mono text-[10px] font-bold ${s.text}`}>{SEV_LABEL[a.sev] ? SEV_LABEL[a.sev][lang] : (lang === 'es' ? 'MEDIO' : 'MEDIUM')}</span>
                      {a.mitre && a.mitre !== 'DEF' && (
                        <span className="mono text-[10px] text-ink-dim border border-line rounded px-1">{a.mitre}</span>
                      )}
                    </div>
                    <div className="text-[13px] text-ink mt-0.5 leading-snug">{L.title}</div>
                    <div className="mono text-[11px] text-ink-dim mt-0.5 truncate">{L.src}</div>
                  </div>
                  <span className="mono text-[10px] text-ink-mute shrink-0 mt-1">{isOpen ? '▴' : '▾'}</span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }} className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 pt-1 border-t border-line/60 mx-3">
                        {isClue ? (
                          <div>
                            <div className="mono text-[11px] text-ink-dim mt-2">{lang === 'es' ? 'payload (egress):' : 'payload (egress):'}</div>
                            <div className="mono text-[13px] text-warn break-all mt-1">YmFua2Fp</div>
                            <div className="mono text-[10.5px] text-ink-mute mt-1">{lang === 'es' ? '// patrón base64 · sin clasificar' : '// base64 pattern · unclassified'}</div>
                            <button
                              onClick={() => onInvestigate && onInvestigate('analizar A-1151')}
                              className="mt-3 mono text-[12px] text-ok border border-ok/40 rounded px-3 py-1.5 hover:bg-ok/10 transition-colors"
                            >
                              {lang === 'es' ? '→ Investigar en consola' : '→ Investigate in console'}
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="text-[12.5px] text-ink-dim mt-2 leading-relaxed">{det ? det[lang] : ''}</div>
                            {det && det.repo && (
                              <a href={det.repo} target="_blank" rel="noopener noreferrer"
                                 className="inline-block mt-2 mono text-[11px] text-info hover:underline">
                                ↗ {det.repo.replace('https://github.com/papgar92/', 'repo: ')}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mono text-[10px] text-ink-mute mt-3 text-center">
        {lang === 'es' ? '↑ toca una alerta para ver el detalle' : '↑ tap an alert to expand'}
      </div>
    </div>
  );
}
