import { CONTACT, T } from '../data/content.js';
import { downloadVCard } from '../data/vcard.js';

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export default function ActionBar({ lang }) {
  const cv = lang === 'es' ? CONTACT.cvES : CONTACT.cvEN;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-3xl px-3 pb-3">
        <div className="card flex items-center gap-1.5 p-1.5 backdrop-blur-md"
             style={{ background: 'rgba(13,20,30,0.92)' }}>
          {/* Acción primaria: guardar contacto */}
          <button
            onClick={() => downloadVCard(T[lang].role)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-ok px-3 py-2.5 text-bg font-semibold text-[13px] mono transition-opacity hover:opacity-90"
          >
            <Icon d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0 0.01 M19 8v6 M22 11h-6" />
            <span className="whitespace-nowrap">{T[lang].save}</span>
          </button>

          {/* Agendar */}
          <a
            href={CONTACT.cal}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-line px-3 py-2.5 text-ink text-[13px] mono hover:border-info hover:text-info transition-colors"
          >
            <Icon d="M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            <span className="hidden sm:inline whitespace-nowrap">{T[lang].schedule}</span>
          </a>

          {/* Iconos */}
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer"
             aria-label="GitHub"
             className="flex items-center justify-center rounded-lg border border-line p-2.5 text-ink-dim hover:text-ink hover:border-ink-mute transition-colors">
            <Icon d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer"
             aria-label="LinkedIn"
             className="flex items-center justify-center rounded-lg border border-line p-2.5 text-ink-dim hover:text-ink hover:border-ink-mute transition-colors">
            <Icon d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          </a>
          <a href={cv} target="_blank" rel="noopener noreferrer"
             aria-label="CV"
             className="flex items-center justify-center rounded-lg border border-line p-2.5 text-ink-dim hover:text-ink hover:border-ink-mute transition-colors">
            <Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" />
          </a>
        </div>
      </div>
    </div>
  );
}
