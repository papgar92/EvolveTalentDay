import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
//  Teatro del simulacro. DOS variantes según cómo llega el visitante:
//   - 'qr'   → quishing (escaneó un QR). Modo feria.
//   - 'link' → phishing por enlace (hizo clic). Modo portfolio.
//  100% teatro visual: no toca nada del dispositivo del visitante.
// ─────────────────────────────────────────────────────────────

const COMMON = {
  es: {
    boot: [
      { t: 'KONOHA-SOC-01 · conexión entrante', c: 'dim', d: 240 },
      { t: '[ OK ] Núcleo de detección cargado', c: 'ok', d: 200 },
      { t: '[ OK ] Sharingan engine · online', c: 'ok', d: 200 },
    ],
    contain: [
      { t: '[ SOC ] Analista en línea — interviniendo', c: 'info', d: 360 },
      { t: '[ ·· ] Aislando sesión…', c: 'info', d: 420 },
      { t: '[ ·· ] Bloqueando redirección…', c: 'info', d: 420 },
      { t: '[ OK ] Amenaza contenida', c: 'ok', d: 280 },
    ],
    threatLabel: 'NIVEL DE AMENAZA', containedLabel: 'CONTENIDO', neutralised: 'NEUTRALIZADO',
    sign: '— Pablo Pérez García · Aspirante a Analista SOC / Blue Team',
    cta: 'Ver quién soy ▸', eyebrow: '// fin del simulacro',
    closing: '«Solo hay dos tipos de compañías en el mundo: Aquellas que han sido atacadas y lo saben, y aquellas que han sido atacadas, y todavía no lo saben».',
  },
  en: {
    boot: [
      { t: 'KONOHA-SOC-01 · incoming connection', c: 'dim', d: 240 },
      { t: '[ OK ] Detection core loaded', c: 'ok', d: 200 },
      { t: '[ OK ] Sharingan engine · online', c: 'ok', d: 200 },
    ],
    contain: [
      { t: '[ SOC ] Analyst online — intervening', c: 'info', d: 360 },
      { t: '[ ·· ] Isolating session…', c: 'info', d: 420 },
      { t: '[ ·· ] Blocking redirect…', c: 'info', d: 420 },
      { t: '[ OK ] Threat contained', c: 'ok', d: 280 },
    ],
    threatLabel: 'THREAT LEVEL', containedLabel: 'CONTAINED', neutralised: 'NEUTRALISED',
    sign: '— Pablo Pérez García · Aspiring SOC / Blue Team Analyst',
    cta: 'See who I am ▸', eyebrow: '// end of simulation',
    closing: '“There are only two kinds of companies in the world: those that have been attacked and know it, and those that have been attacked but does not know it yet.” <span style="opacity:.6">— R. Mueller, FBI</span>'          ,
  },
};

const VARIANT = {
  qr: {
    es: {
      title: 'KONOHA-SOC-01 · enlace entrante',
      bootLast: { t: '[ ·· ] Resolviendo destino del QR…', c: 'info', d: 520 },
      threat: [
        { t: '[ ALERTA ] Código QR de origen no verificado', c: 'crit', d: 380 },
        { t: '  └─ escaneado hace 0s · confianza: 0%', c: 'dim', d: 260 },
        { t: '[ ·· ] Expandiendo URL…', c: 'info', d: 430 },
        { t: '[ ·· ] Comprobando reputación del dominio…', c: 'info', d: 470 },
        { t: '[ MATCH ] Patrón: Quishing (phishing por QR)', c: 'warn', d: 330 },
        { t: '  └─ MITRE ATT&CK · T1566 — Phishing', c: 'dim', d: 520 },
        { t: '[ !! ] Posible página de robo de credenciales', c: 'crit', d: 300 },
      ],
      body: [
        ['Tranquilo. Esto era un <b>simulacro</b>.', false],
        ['¿Y si esto hubiera sido un ataque real, solo por escanear un QR no confiable?', true],
        ['Acabas de escanear el QR de alguien que no conoces y abrir el enlace <b>sin verificarlo</b>.', false],
        ['Eso es <b>quishing</b> — phishing a través de un código QR. Si yo fuera un atacante, esto sería una web falsa y ya estarías entregando tus credenciales.', true],
      ],
      mitre: 'MITRE ATT&CK · T1566 — Phishing (Quishing)',
    },
    en: {
      title: 'KONOHA-SOC-01 · incoming link',
      bootLast: { t: '[ ·· ] Resolving QR destination…', c: 'info', d: 520 },
      threat: [
        { t: '[ ALERT ] Unverified QR code source', c: 'crit', d: 380 },
        { t: '  └─ scanned 0s ago · trust: 0%', c: 'dim', d: 260 },
        { t: '[ ·· ] Expanding URL…', c: 'info', d: 430 },
        { t: '[ ·· ] Checking domain reputation…', c: 'info', d: 470 },
        { t: '[ MATCH ] Pattern: Quishing (QR phishing)', c: 'warn', d: 330 },
        { t: '  └─ MITRE ATT&CK · T1566 — Phishing', c: 'dim', d: 520 },
        { t: '[ !! ] Possible credential-harvesting page', c: 'crit', d: 300 },
      ],
      body: [
        ['Relax. This was a <b>simulation</b>.', false],
        ['What if this had been a real attack — just for scanning an untrusted QR?', true],
        ['You just scanned a stranger\u2019s QR and opened the link <b>without verifying it</b>.', false],
        ['That is <b>quishing</b> — phishing through a QR code. If I were an attacker, this would be a fake site and you\u2019d already be handing over your credentials.', true],
      ],
      mitre: 'MITRE ATT&CK · T1566 — Phishing (Quishing)',
    },
  },
  link: {
    es: {
      title: 'KONOHA-SOC-01 · conexión entrante',
      bootLast: { t: '[ ·· ] Analizando enlace de origen…', c: 'info', d: 520 },
      threat: [
        { t: '[ ALERTA ] Clic en enlace de origen no verificado', c: 'crit', d: 380 },
        { t: '  └─ referrer: desconocido · confianza: 0%', c: 'dim', d: 260 },
        { t: '[ ·· ] Resolviendo dominio de destino…', c: 'info', d: 430 },
        { t: '[ ·· ] Comprobando reputación y certificado…', c: 'info', d: 470 },
        { t: '[ MATCH ] Patrón: enlace de phishing', c: 'warn', d: 330 },
        { t: '  └─ MITRE ATT&CK · T1566 — Phishing', c: 'dim', d: 520 },
        { t: '[ !! ] Posible redirección a página fraudulenta', c: 'crit', d: 300 },
      ],
      body: [
        ['¿Y si esto hubiera sido un ataque real, solo por escanear un QR no confiable?', false],
        ['Por suerte. Esto era un <b>simulacro</b>.', true],
        ['Acabas de abrir el enlace de alguien que no conoces <b>sin verificar a dónde llevaba</b>.', false],
        ['Eso es <b>phishing</b>: el vector nº1 del mundo real. Si yo fuera un atacante, esto sería una web falsa y ya estarías entregando tus credenciales.', true],
      ],
      mitre: 'MITRE ATT&CK · T1566 — Phishing (enlace malicioso)',
    },
    en: {
      title: 'KONOHA-SOC-01 · incoming connection',
      bootLast: { t: '[ ·· ] Analysing source link…', c: 'info', d: 520 },
      threat: [
        { t: '[ ALERT ] Click on unverified source link', c: 'crit', d: 380 },
        { t: '  └─ referrer: unknown · trust: 0%', c: 'dim', d: 260 },
        { t: '[ ·· ] Resolving destination domain…', c: 'info', d: 430 },
        { t: '[ ·· ] Checking reputation and certificate…', c: 'info', d: 470 },
        { t: '[ MATCH ] Pattern: phishing link', c: 'warn', d: 330 },
        { t: '  └─ MITRE ATT&CK · T1566 — Phishing', c: 'dim', d: 520 },
        { t: '[ !! ] Possible redirect to fraudulent page', c: 'crit', d: 300 },
      ],
      body: [
        ['What if this had been a real attack — just for clicking an untrusted link?', true],
        ['Relax. This was a <b>simulation</b>.', false],
        ['You just opened a stranger\u2019s link <b>without checking where it led</b>.', false],
        ['That is <b>phishing</b>: the world\u2019s #1 vector. If I were an attacker, this would be a fake site and you\u2019d already be handing over your credentials.', true],
      ],
      mitre: 'MITRE ATT&CK · T1566 — Phishing (malicious link)',
    },
  },
};

const colorClass = { ok: 'text-ok', info: 'text-info', warn: 'text-warn', crit: 'text-crit', dim: 'text-ink-dim', ink: 'text-ink' };

export default function Theater({ lang, setLang, onDone, variant = 'link' }) {
  const [lines, setLines] = useState([]);
  const [phase, setPhase] = useState('console');
  const [pct, setPct] = useState(null);
  const [contained, setContained] = useState(false);
  const [status, setStatus] = useState(null);

  const cancelled = useRef(false);
  const timers = useRef([]);
  const endRef = useRef(null);
  const langRef = useRef(lang);
  langRef.current = lang;

  const wait = (ms) => new Promise((r) => { timers.current.push(setTimeout(r, ms)); });

  // datos combinados (común + variante) para el idioma actual
  function data(l) {
    const c = COMMON[l], v = VARIANT[variant][l];
    return {
      title: v.title,
      boot: [...c.boot, v.bootLast],
      threat: v.threat,
      contain: c.contain,
      threatLabel: c.threatLabel, containedLabel: c.containedLabel, neutralised: c.neutralised,
      reveal: { eyebrow: c.eyebrow, body: v.body, mitre: v.mitre, closing: c.closing, sign: c.sign, cta: c.cta },
    };
  }

  useEffect(() => {
    cancelled.current = false;
    run();
    return () => { cancelled.current = true; timers.current.forEach(clearTimeout); timers.current = []; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [lines]);

  async function run() {
    const S = () => data(langRef.current);
    for (const l of S().boot) { if (cancelled.current) return; setLines((p) => [...p, l]); await wait(l.d); }
    await wait(220);
    for (const l of S().threat) { if (cancelled.current) return; setLines((p) => [...p, l]); await wait(l.d); }
    setPct(0);
    for (let p = 0; p <= 88; p += 4) { if (cancelled.current) return; setPct(p); await wait(45); }
    await wait(320);
    for (const l of S().contain) { if (cancelled.current) return; setLines((p) => [...p, l]); await wait(l.d); }
    setContained(true);
    for (let p = 88; p >= 0; p -= 8) { if (cancelled.current) return; setPct(Math.max(p, 0)); await wait(35); }
    setStatus(S().neutralised);
    await wait(1400);
    if (cancelled.current) return;
    setPhase('reveal');
    window.scrollTo(0, 0);
  }

  function skip() {
    cancelled.current = true;
    timers.current.forEach(clearTimeout);
    onDone();
  }

  const S = data(lang);

  return (
    <motion.div className="fixed inset-0 z-[80] bg-bg overflow-y-auto" exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
      <style>{`
        .th-meter{height:8px;border:1px solid #1e2a3a;border-radius:6px;overflow:hidden;background:#0d141e;margin-top:18px;}
        .th-meter > i{display:block;height:100%;background:#ff5d6c;transition:width .12s linear;}
        .th-meter.ok > i{background:#34e2a0;}
        .th-glitch{position:relative;display:inline-block;}
        .th-glitch::before,.th-glitch::after{content:attr(data-t);position:absolute;left:0;top:0;width:100%;}
        .th-glitch::before{color:#4cc4ff;transform:translate(2px,-1px);opacity:.7;clip-path:inset(0 0 55% 0);}
        .th-glitch::after{color:#ff7a3d;transform:translate(-2px,1px);opacity:.6;clip-path:inset(55% 0 0 0);}
      `}</style>

      <div className="fixed top-3.5 left-3.5 z-[85] flex items-center gap-1 border border-line rounded-lg p-0.5 mono text-[11px]">
        {['es', 'en'].map((l) => (
          <button key={l} onClick={() => setLang(l)}
            className={`px-2 py-1 rounded-md ${lang === l ? 'bg-line text-ink' : 'text-ink-mute'}`}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <button onClick={skip}
        className="fixed top-3.5 right-3.5 z-[85] mono text-[11px] tracking-widest uppercase text-ink-mute hover:text-ink-dim border border-line rounded-md px-2.5 py-1.5 transition-colors">
        {lang === 'es' ? 'saltar ▸' : 'skip ▸'}
      </button>

      {phase === 'console' && (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-crit" />
              <span className="h-2.5 w-2.5 rounded-full bg-warn" />
              <span className="h-2.5 w-2.5 rounded-full bg-ok" />
              <span className="mono text-xs text-ink-dim ml-1.5">{S.title}</span>
            </div>
            <div>
              {lines.map((l, i) => (
                <div key={i} className={`mono text-[13.5px] leading-relaxed whitespace-pre-wrap break-words ${colorClass[l.c]}`}>{l.t}</div>
              ))}
              <span className="cursor align-middle" />
              <div ref={endRef} />
            </div>
            {pct !== null && (
              <>
                <div className={`th-meter ${contained ? 'ok' : ''}`}><i style={{ width: pct + '%' }} /></div>
                <div className="flex justify-between mono text-[11px] text-ink-dim mt-1.5">
                  <span>{contained ? S.containedLabel : S.threatLabel}</span>
                  <span>{pct}%</span>
                </div>
              </>
            )}
            {status && (
              <div className="mono font-bold text-center mt-10" style={{ fontSize: 'clamp(22px,6vw,40px)' }}>
                <span className="th-glitch text-ok" data-t={status}>{status}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {phase === 'reveal' && (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="min-h-screen flex items-center justify-center px-7">
          <div className="max-w-2xl w-full">
            <div className="mono text-xs uppercase tracking-[0.2em] text-ok mb-4">{S.reveal.eyebrow}</div>
            {S.reveal.body.map((b, i) => (
              <p key={i} className={`leading-relaxed mb-3.5 ${b[1] ? 'text-ink-dim text-[15px]' : 'text-ink'}`}
                 style={{ fontSize: b[1] ? undefined : 'clamp(16px,2.6vw,21px)' }}
                 dangerouslySetInnerHTML={{ __html: b[0] }} />
            ))}
            <div className="mono text-[12.5px] text-warn border border-line rounded-md px-3 py-2 inline-block my-2">{S.reveal.mitre}</div>
            <p className="text-ink leading-relaxed mb-2" style={{ fontSize: 'clamp(16px,2.6vw,21px)' }}
               dangerouslySetInnerHTML={{ __html: S.reveal.closing }} />
            <div className="mono text-[13px] text-konoha mt-3">{S.reveal.sign}</div>
            <button onClick={onDone}
              className="mt-7 inline-flex items-center gap-2.5 bg-ok text-bg border-none rounded-lg px-5 py-3.5 mono font-bold text-[15px] hover:-translate-y-px transition-transform"
              style={{ boxShadow: '0 8px 24px rgba(52,226,160,0.18)' }}>
              {S.reveal.cta}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
