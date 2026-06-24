import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, SKILLS, CONTACT, T } from '../data/content.js';

// Consola flotante protagonista. Siempre accesible vía botón lanzador.
// Incluye reto: decode <b64> -> "bankai" -> desbloquea modo Red Team.
// El feed de alertas puede inyectar comandos vía apiRef.
export default function Console({ lang, redTeam, onUnlock, apiRef }) {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const banner = lang === 'es'
    ? "Consola SOC · 'help' para empezar. Algo en el feed de alertas espera ser descifrado…"
    : "SOC console · type 'help' to start. Something in the alert feed is waiting to be decoded…";

  useEffect(() => {
    setHistory([{ type: 'sys', text: banner }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history, open]);

  function push(items) { setHistory((h) => [...h, ...items]); }

  function exec(raw, echo) {
    const cmd = (raw || '').trim();
    const low = cmd.toLowerCase();
    const out = echo ? [{ type: 'cmd', text: cmd }] : [];
    if (!cmd) { if (out.length) push(out); return; }

    if (low === 'help') {
      out.push({ type: 'out', text: 'whoami · ls projects/ · cat experience.log · skills --list · contact · decode <txt> · hint · clear' });
    } else if (low === 'whoami') {
      out.push({ type: 'out', text: T[lang].role + ' — ' + CONTACT.location });
    } else if (low === 'ls' || low === 'ls projects/' || low === 'ls projects') {
      PROJECTS.forEach((p) => out.push({ type: 'out', text: 'drwxr-xr-x  ' + p.repo }));
    } else if (low === 'cat experience.log') {
      out.push({ type: 'out', text: lang === 'es'
        ? '2017–2025 · Triaje técnico 24/7 (Movistar Prosegur Alarmas) · 2025– · Soporte IT (Cartronic / Prosegur Activa)'
        : '2017–2025 · 24/7 technical triage (Movistar Prosegur Alarmas) · 2025– · IT Support (Cartronic / Prosegur Activa)' });
    } else if (low === 'skills --list' || low === 'skills') {
      SKILLS.forEach((s) => out.push({ type: 'out', text: s[lang] + ': ' + s.items.join(', ') }));
    } else if (low === 'contact') {
      out.push({ type: 'out', text: CONTACT.email + ' · ' + CONTACT.phoneDisplay });
      out.push({ type: 'out', text: CONTACT.github + ' · ' + CONTACT.linkedin });
    } else if (low === 'clear') {
      setHistory([]); return;
    } else if (low === 'hint') {
      out.push({ type: 'info', text: lang === 'es'
        ? 'En la cola de alertas hay una marcada como anómala. Ábrela, coge la cadena y úsala con: decode <cadena>'
        : 'One alert in the queue is flagged as anomalous. Open it, grab the string and use: decode <string>' });
    } else if (low.startsWith('analizar') || low.startsWith('analyze')) {
      out.push({ type: 'info', text: '[SOC] ' + (lang === 'es' ? 'inspeccionando tráfico saliente…' : 'inspecting egress traffic…') });
      out.push({ type: 'warn', text: (lang === 'es' ? 'cadena interceptada: ' : 'intercepted string: ') + 'YmFua2Fp' });
      out.push({ type: 'dim', text: lang === 'es' ? '// patrón base64 — prueba:  decode YmFua2Fp' : '// base64 pattern — try:  decode YmFua2Fp' });
    } else if (low.startsWith('decode ')) {
      var arg = cmd.slice(7).trim();
      try {
        var dec = atob(arg);
        out.push({ type: 'ok', text: '→ ' + dec });
        if (dec.toLowerCase() === 'bankai') {
          out.push({ type: 'dim', text: lang === 'es' ? '// un comando oculto… ¿te atreves a ejecutarlo?' : '// a hidden command… dare to run it?' });
        }
      } catch (e) {
        out.push({ type: 'err', text: lang === 'es' ? 'no es base64 válido' : 'not valid base64' });
      }
    } else if (low === 'bankai') {
      if (redTeam) {
        out.push({ type: 'ok', text: lang === 'es' ? 'ya estás en modo Red Team ⚔' : 'already in Red Team mode ⚔' });
      } else {
        out.push({ type: 'ok', text: '⚡ BANKAI' });
        out.push({ type: 'ok', text: lang === 'es' ? 'Sello liberado. Modo Red Team activo.' : 'Seal released. Red Team mode active.' });
        out.push({ type: 'dim', text: lang === 'es' ? '// ahora ves por qué pienso como atacante. (mira abajo)' : '// now you see why I think like an attacker. (look below)' });
        onUnlock && onUnlock();
      }
    } else if (low === './red-team' || low === 'red-team' || low === 'redteam') {
      if (redTeam) {
        out.push({ type: 'out', text: lang === 'es' ? 'Práctica ofensiva: HackTheBox (Tier 0-2) · explotación, pivoting, enum.' : 'Offensive practice: HackTheBox (Tier 0-2) · exploitation, pivoting, enum.' });
        out.push({ type: 'out', text: lang === 'es' ? 'Filosofía: entiendo el ataque para defender mejor (purple team).' : 'Philosophy: understand the attack to defend better (purple team).' });
      } else {
        out.push({ type: 'err', text: lang === 'es' ? 'acceso denegado · falta la clave. pista: escribe  hint' : 'access denied · key required. tip: type  hint' });
      }
    } else if (low.startsWith('sudo')) {
      out.push({ type: 'warn', text: lang === 'es' ? 'Buen intento 😏' : 'Nice try 😏' });
    } else {
      out.push({ type: 'err', text: (lang === 'es' ? 'comando no encontrado: ' : 'command not found: ') + cmd });
    }
    push(out);
  }

  // API imperativa para el feed: abrir y ejecutar
  apiRef.current = {
    open: () => setOpen(true),
    run: (cmd) => { setOpen(true); setTimeout(() => exec(cmd, true), 60); },
  };

  function onSubmit(e) { e.preventDefault(); exec(input, true); setInput(''); }

  const quick = ['whoami', 'ls projects/', 'skills --list', 'hint'];
  const colorOf = { cmd: 'text-ink', out: 'text-ink-dim', err: 'text-crit', ok: 'text-ok', warn: 'text-warn', info: 'text-info', dim: 'text-ink-mute', sys: 'text-info' };

  return (
    <>
      {/* lanzador flotante */}
      <button className="con-launch" onClick={() => setOpen(true)} aria-label="Abrir consola">
        <span className="ping" />
        {lang === 'es' ? '> consola' : '> console'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="relative w-full sm:max-w-xl card overflow-hidden rounded-b-none sm:rounded-xl"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="mono text-xs text-konoha">{redTeam ? 'root@redteam' : 'hokage@soc'}:~$</span>
                <button onClick={() => setOpen(false)} className="mono text-[11px] text-ink-mute hover:text-crit uppercase tracking-wider">
                  {lang === 'es' ? 'cerrar' : 'close'} ✕
                </button>
              </div>

              <div className="h-64 sm:h-72 overflow-y-auto px-4 py-3 mono text-[12.5px] leading-relaxed">
                {history.map((l, i) => (
                  <div key={i} className={colorOf[l.type]}>
                    {l.type === 'cmd' ? <span className="text-ok">{'> '}</span> : null}{l.text}
                  </div>
                ))}
                <div ref={endRef} />
              </div>

              <div className="flex flex-wrap gap-1.5 border-t border-line px-3 py-2">
                {quick.map((q) => (
                  <button key={q} onClick={() => exec(q, true)}
                    className="mono text-[10.5px] text-ink-dim border border-line rounded px-2 py-1 hover:border-ok hover:text-ok transition-colors">
                    {q}
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-4 py-2.5">
                <span className="text-ok mono text-sm">$</span>
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
                  spellCheck={false} autoComplete="off"
                  className="flex-1 bg-transparent mono text-sm text-ink outline-none placeholder:text-ink-mute"
                  placeholder={lang === 'es' ? 'escribe un comando…' : 'type a command…'} />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
