import { useEffect, useState } from 'react';

// Efecto máquina de escribir: teclea y borra frases en bucle.
export default function Typewriter({ phrases, typeSpeed = 55, deleteSpeed = 28, pause = 1700 }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[idx % phrases.length];
    let delay = deleting ? deleteSpeed : typeSpeed;
    if (!deleting && sub === current.length) delay = pause;
    if (deleting && sub === 0) delay = 350;

    const t = setTimeout(() => {
      if (!deleting) {
        if (sub < current.length) setSub(sub + 1);
        else setDeleting(true);
      } else {
        if (sub > 0) setSub(sub - 1);
        else { setDeleting(false); setIdx((i) => i + 1); }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [sub, deleting, idx, phrases, typeSpeed, deleteSpeed, pause]);

  const current = phrases[idx % phrases.length];
  return (
    <span>
      {current.slice(0, sub)}
      <span className="cursor" />
    </span>
  );
}
