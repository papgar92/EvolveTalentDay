import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, SKILLS, CONTACT, T } from '../data/content.js';

// Consola opcional. Comandos navegables también con botones.
export default function Console({ lang, onClose, onBankai }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const banner =
    lang === 'es'
      ? "Consola SOC · escribe 'help' para ver comandos. (psst: hay un comando oculto 🥷)"
      : "SOC console · type 'help' for commands. (psst: there's a hidden one 🥷)";

  useEffect(() => {
    setHistory([{ type: 'sys', text: banner }]);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [lang]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const out = [{ type: 'cmd', text: cmd }];

    if (cmd === 'help') {
      out.push({
        type: 'out',
        text:
          'whoami · ls projects/ · cat experience.log · skills --list · contact · clear · help',
      });
    } else if (cmd === 'whoami') {
      out.push({ type: 'out', text: T[lang].role + ' — ' + CONTACT.location });
    } else if (cmd === 'ls projects/' || cmd === 'ls projects' || cmd === 'ls') {
      PROJECTS.forEach((p) => out.push({ type: 'out', text: `drwxr-xr-x  ${p.repo}` }));
    } else if (cmd === 'cat experience.log') {
      out.push({
        type: 'out',
        text:
          lang === 'es'
            ? '2017–2025 · Triaje técnico 24/7 (Movistar Prosegur Alarmas) · 2025– · Soporte IT (Cartronic / Prosegur Activa)'
            : '2017–2025 · 24/7 technical triage (Movistar Prosegur Alarmas) · 2025– · IT Support (Cartronic / Prosegur Activa)',
      });
    } else if (cmd === 'skills --list' || cmd === 'skills') {
      SKILLS.forEach((s) =>
        out.push({ type: 'out', text: `${s[lang]}: ${s.items.join(', ')}` })
      );
    } else if (cmd === 'contact') {
      out.push({ type: 'out', text: `${CONTACT.email} · ${CONTACT.phoneDisplay}` });
      out.push({ type: 'out', text: `${CONTACT.github} · ${CONTACT.linkedin}` });
    } else if (cmd === 'clear') {
      setHistory([]);
      return;
    } else if (cmd === 'bankai') {
      out.push({
        type: 'ok',
        text:
          lang === 'es'
            ? '⚡ Bankai liberado — capacidades de detección al máximo.'
            : '⚡ Bankai released — detection capabilities maxed out.',
      });
      onBankai?.();
    } else if (cmd === 'sudo rm -rf /' || cmd.startsWith('sudo')) {
      out.push({ type: 'warn', text: lang === 'es' ? 'Buen intento 😏' : 'Nice try 😏' });
    } else {
      out.push({
        type: 'err',
        text: (lang === 'es' ? 'comando no encontrado: ' : 'command not found: ') + cmd,
      });
    }
    setHistory((h) => [...h, ...out]);
  }

  function onSubmit(e) {
    e.preventDefault();
    run(input);
    setInput('');
  }

  const quick = ['whoami', 'ls projects/', 'skills --list', 'contact', 'help'];
  const colorOf = { cmd: 'text-ink', out: 'text-ink-dim', err: 'text-crit', ok: 'text-ok', warn: 'text-warn', sys: 'text-info' };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="mono text-xs text-ink-dim">hokage@soc:~$</span>
        <button onClick={onClose} className="mono text-[11px] text-ink-mute hover:text-crit uppercase tracking-wider">
          {T[lang].consoleClose} ✕
        </button>
      </div>

      <div className="h-56 overflow-y-auto px-4 py-3 mono text-[12.5px] leading-relaxed">
        {history.map((l, i) => (
          <div key={i} className={colorOf[l.type]}>
            {l.type === 'cmd' ? <span className="text-ok">{'> '}</span> : null}
            {l.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-line px-3 py-2">
        {quick.map((q) => (
          <button
            key={q}
            onClick={() => run(q)}
            className="mono text-[10.5px] text-ink-dim border border-line rounded px-2 py-1 hover:border-ok hover:text-ok transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-4 py-2.5">
        <span className="text-ok mono text-sm">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent mono text-sm text-ink outline-none placeholder:text-ink-mute"
          placeholder={lang === 'es' ? 'escribe un comando…' : 'type a command…'}
        />
      </form>
    </motion.div>
  );
}
