import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CONTACT, SKILLS, PRACTICE, CERTS, T } from './data/content.js';
import Theater from './components/Theater.jsx';
import AlertFeed from './components/AlertFeed.jsx';
import Projects from './components/Projects.jsx';
import Console from './components/Console.jsx';
import ActionBar from './components/ActionBar.jsx';
import Typewriter from './components/Typewriter.jsx';

// Frases que la "consola" teclea sola (edítalas a tu gusto)
const PHRASES = {
  es: [
    '¿buscas talento para tu SOC?',
    '¿hablamos?',
    'disponible · Madrid',
    'defiendo pensando como quien ataca',
    'el esfuerzo le gana al talento que no se esfuerza',
  ],
  en: [
    'looking for SOC talent?',
    'shall we talk?',
    'available · Madrid',
    'I defend by thinking like the attacker',
    'hard work beats talent that doesn\u2019t try',
  ],
};

const MONTHS = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

function Eyebrow({ children }) {
  return (
    <div className="mono text-[11px] uppercase tracking-[0.2em] text-ink-mute mb-3 flex items-center gap-2">
      <span className="h-px w-6 bg-line" />
      {children}
    </div>
  );
}

const certStyle = {
  done: { label: '✓', cls: 'text-ok border-ok/30' },
  q3: { label: 'Q3', cls: 'text-warn border-warn/30' },
  q4: { label: 'Q4', cls: 'text-warn border-warn/30' },
  progress: { label: '●', cls: 'text-info border-info/30' },
};

// Contenido extra revelado al desbloquear Red Team (no toca content.js)
const REDTEAM = {
  es: {
    eyebrow: '// red team · desbloqueado',
    title: 'El lado ofensivo',
    text: 'Me formo resolviendo máquinas en Hack The Box (explotación, enumeración, pivoting). No para atacar, sino para anticipar: cuando conoces las técnicas del adversario, defiendes con ventaja. Eso es pensar en purple.',
    items: [
      ['Reconocimiento & enum.', 'nmap · gobuster · análisis de superficie'],
      ['Explotación', 'web · servicios · credenciales débiles'],
      ['Post-explotación', 'pivoting · escalada de privilegios'],
      ['Mentalidad', 'mapeo a MITRE ATT&CK para luego detectar'],
    ],
    note: 'Defiendo mejor porque entiendo cómo se rompe.',
  },
  en: {
    eyebrow: '// red team · unlocked',
    title: 'The offensive side',
    text: 'I train by solving Hack The Box machines (exploitation, enumeration, pivoting). Not to attack, but to anticipate: knowing the adversary\u2019s techniques means defending with an edge. That\u2019s thinking in purple.',
    items: [
      ['Recon & enum', 'nmap · gobuster · surface analysis'],
      ['Exploitation', 'web · services · weak credentials'],
      ['Post-exploitation', 'pivoting · privilege escalation'],
      ['Mindset', 'map to MITRE ATT&CK, then detect'],
    ],
    note: 'I defend better because I understand how it breaks.',
  },
};

export default function App() {
  const isQR = (() => {
    try { return new URLSearchParams(window.location.search).get('src') === 'qr'; } catch (e) { return false; }
  })();
  const [booting, setBooting] = useState(() => {
    if (isQR) return true; // por QR: la intro se reproduce SIEMPRE
    try { return !localStorage.getItem('ppg_intro_seen'); } catch (e) { return true; }
  });
  const [lang, setLang] = useState('es');
  const [bankai, setBankai] = useState(false);
  const [redTeam, setRedTeam] = useState(false);
  const consoleApi = useRef({ open: () => {}, run: () => {} });

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  function finishIntro() {
    if (!isQR) { try { localStorage.setItem('ppg_intro_seen', '1'); } catch (e) {} }
    setBooting(false);
  }

  function unlockRedTeam(opts) {
    if (redTeam) return;
    setRedTeam(true);
    setBankai(true);
    setTimeout(() => setBankai(false), 1100);
    if (!opts || opts.scroll !== false) {
      setTimeout(() => {
        document.getElementById('redteam-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 700);
    }
  }

  // Si tras 30s nadie ha escrito "bankai", se revela solo el modo Red Team.
  useEffect(() => {
    if (booting || redTeam) return;
    const t = setTimeout(() => unlockRedTeam({ scroll: false }), 30000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booting, redTeam]);

  function investigate(cmd) {
    consoleApi.current.open();
    consoleApi.current.run(cmd);
  }

  const tr = T[lang];
  const rt = REDTEAM[lang];

  return (
    <div className={`scanlines relative min-h-screen ${redTeam ? 'redteam' : ''}`}>
      <div className="bg-grid" />
      <div className="bg-glow" style={{ top: '-120px', left: '-80px', width: 360, height: 360, background: 'var(--glow-1)' }} />
      <div className="bg-glow" style={{ top: '20%', right: '-100px', width: 320, height: 320, background: 'var(--glow-2)' }} />

      {bankai && <div className="bankai-flash" />}

      <AnimatePresence>
        {booting && <Theater lang={lang} setLang={setLang} onDone={finishIntro} variant={isQR ? 'qr' : 'link'} />}
      </AnimatePresence>

      {!booting && (
        <motion.main
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto max-w-3xl px-4 pb-28 pt-6 sm:px-6"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="mono text-[11px] text-ink-mute flex items-center gap-2">
              <span className="pulse-dot" />
              <span className="hidden sm:inline">{redTeam ? (lang === 'es' ? 'modo red team · activo' : 'red team mode · active') : tr.statusReady}</span>
              <span className="sm:hidden">{redTeam ? 'red team' : 'SOC · online'}</span>
            </div>
            <div className="mono text-xs flex items-center gap-1 border border-line rounded-lg p-0.5">
              {['es', 'en'].map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${lang === l ? 'bg-line text-ink' : 'text-ink-mute hover:text-ink-dim'}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Hero */}
          <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="flex items-start gap-4 mb-5">
              <div className="shrink-0 card flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
                <div className="text-center">
                  <div className="display text-xl sm:text-2xl font-bold text-ok leading-none">PPG</div>
                  <div className="mono text-[8px] text-ink-mute mt-1">{redTeam ? '_red' : '_soc'}</div>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="mono text-[12px] text-ink-dim mb-1">
                  <span className="text-konoha">{redTeam ? 'root' : 'hokage'}</span><span className="text-ink-mute">@{redTeam ? 'redteam' : 'soc'}</span><span className="text-ink-mute">:~$</span>
                </div>
                <h1 className="display text-2xl sm:text-3xl font-bold text-ink leading-tight">{CONTACT.name}</h1>
                <div className="mt-1.5 text-info text-sm sm:text-base font-medium">{tr.role}</div>
                <div className="mono text-[11px] text-ink-mute mt-1.5">{CONTACT.location}</div>
                <div className="mono text-[12px] mt-2.5">
                  <span className="text-konoha">{redTeam ? 'root' : 'hokage'}</span>
                  <span className="text-ink-mute">@{redTeam ? 'redteam' : 'soc'}:~$ </span>
                  <span className="text-ok"><Typewriter phrases={PHRASES[lang]} /></span>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Alert feed */}
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="mb-10">
            <AlertFeed lang={lang} onInvestigate={investigate} />
          </motion.section>

          {/* Hook */}
          <motion.section {...fadeUp} className="mb-12">
            <Eyebrow>{tr.hookLabel}</Eyebrow>
            <p className="display text-lg sm:text-2xl leading-relaxed text-ink font-medium">{tr.hook}</p>
          </motion.section>

          {/* Proyectos */}
          <motion.section {...fadeUp} className="mb-12">
            <Eyebrow>{tr.sectionProjects}</Eyebrow>
            <p className="mono text-[11px] text-ink-mute mb-4 -mt-1">{tr.sectionProjectsSub}</p>
            <Projects lang={lang} />
          </motion.section>

          {/* Red Team (revelado) */}
          <AnimatePresence>
            {redTeam && (
              <motion.section
                id="redteam-section"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <Eyebrow>{rt.eyebrow}</Eyebrow>
                <div className="card p-5 sm:p-6 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-crit to-konoha" />
                  <h3 className="display text-lg font-bold text-ink mb-2">⚔ {rt.title}</h3>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-ink-dim mb-4">{rt.text}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {rt.items.map(([h, d], i) => (
                      <div key={i} className="border border-line rounded-lg px-3 py-2.5">
                        <div className="mono text-[12px] text-ok">{h}</div>
                        <div className="mono text-[11px] text-ink-dim mt-0.5">{d}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mono text-[12px] text-konoha mt-4">{rt.note}</div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Meta forense */}
          <motion.section {...fadeUp} className="mb-12">
            <div className="card p-5 sm:p-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-info to-ok" />
              <Eyebrow>{tr.sectionGoal}</Eyebrow>
              <p className="text-sm sm:text-base leading-relaxed text-ink-dim">{tr.goalText}</p>
            </div>
          </motion.section>

          {/* Experiencia */}
          <motion.section {...fadeUp} className="mb-12">
            <Eyebrow>{tr.sectionExp}</Eyebrow>
            <div className="space-y-3">
              {tr.expItems.map((e, i) => (
                <div key={i} className="card p-4 sm:p-5">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="text-ink font-semibold text-[14px] sm:text-[15px]">{e.role}</h3>
                    <span className="mono text-[11px] text-ink-mute shrink-0">{e.period}</span>
                  </div>
                  <div className="mono text-[12px] text-konoha mt-0.5">{e.org}</div>
                  <p className="text-[13px] text-ink-dim mt-2 leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Stack */}
          <motion.section {...fadeUp} className="mb-12">
            <Eyebrow>{tr.sectionSkills}</Eyebrow>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SKILLS.map((s, i) => (
                <div key={i} className="card p-4">
                  <div className="mono text-[11px] uppercase tracking-wider text-ink-dim mb-2.5">{s[lang]}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span key={it} className="mono text-[11px] text-ink border border-line rounded px-2 py-0.5">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Práctica activa */}
          <motion.section {...fadeUp} className="mb-12">
            <Eyebrow>{tr.sectionPractice}</Eyebrow>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRACTICE.map((p, i) => (
                <a key={i} href={CONTACT[p.urlKey]} target="_blank" rel="noopener noreferrer"
                   className="card p-4 hover:border-info/40 transition-colors group">
                  <div className="flex items-center justify-between">
                    <span className="display text-[15px] font-semibold text-ink">{p.platform}</span>
                    <span className="text-ink-mute group-hover:text-info transition-colors">↗</span>
                  </div>
                  <div className="text-[12.5px] text-info mt-1">{p[lang].label}</div>
                  <div className="mono text-[11px] text-ink-dim mt-1">{p[lang].note}</div>
                  {p.labs && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.labs.map((lab) => (
                        <span key={lab} className="mono text-[10px] text-ink-dim border border-line rounded px-1.5 py-0.5">{lab}</span>
                      ))}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </motion.section>

          {/* Certs */}
          <motion.section {...fadeUp} className="mb-10">
            <Eyebrow>{tr.sectionCerts}</Eyebrow>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CERTS.map((c, i) => {
                const st = certStyle[c.state];
                return (
                  <div key={i} className="flex items-center gap-3 card px-3.5 py-2.5">
                    <span className={`mono text-[11px] font-bold shrink-0 h-6 w-6 grid place-items-center rounded border ${st.cls}`}>{st.label}</span>
                    <span className="text-[13px] text-ink-dim">{c.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Quote */}
          <div className="mono text-[11px] text-ink-mute/70 text-center mb-6 leading-relaxed px-4">
            {lang === 'es'
              ? '// "Quien rompe las reglas es escoria, pero quien abandona a un compañero es peor que escoria." — Kakashi'
              : '// "Those who break the rules are scum, but those who abandon their friends are worse." — Kakashi'}
          </div>

          {/* Fecha de actualización automática + repetir intro */}
          <div className="text-center flex flex-col items-center gap-3">
            <span className="mono text-[11px] text-ink-mute border border-line rounded-full px-3 py-1.5 flex items-center gap-2">
              <span className="pulse-dot" style={{ width: 6, height: 6 }} />
              {lang === 'es' ? 'actualizado' : 'updated'} · {MONTHS[lang][new Date().getMonth()]} {new Date().getFullYear()}
            </span>
            <button onClick={() => setBooting(true)}
              className="mono text-[10px] text-ink-mute hover:text-info transition-colors uppercase tracking-wider">
              ↺ {lang === 'es' ? 'repetir intro' : 'replay intro'}
            </button>
          </div>
        </motion.main>
      )}

      {!booting && <Console lang={lang} redTeam={redTeam} onUnlock={unlockRedTeam} apiRef={consoleApi} />}
      {!booting && <ActionBar lang={lang} />}
    </div>
  );
}
