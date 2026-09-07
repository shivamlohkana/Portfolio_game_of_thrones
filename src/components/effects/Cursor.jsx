import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursor = useRef(null);
  useEffect(() => {
    const media = window.matchMedia('(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)');
    let cleanup = () => {};
    const update = () => {
      cleanup();
      if (!media.matches) return;
      let frame = 0;
      const move = event => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
          cursor.current.classList.add('visible');
          cursor.current.classList.toggle('interactive', Boolean(event.target.closest('a, button, input, textarea')));
        });
      };
      const leave = () => cursor.current?.classList.remove('visible');
      document.addEventListener('pointermove', move, { passive: true });
      document.addEventListener('pointerleave', leave);
      cleanup = () => { cancelAnimationFrame(frame); document.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); leave(); };
    };
    update(); media.addEventListener('change', update);
    return () => { cleanup(); media.removeEventListener('change', update); };
  }, []);
  return <div ref={cursor} className="custom-cursor" aria-hidden="true"><i /></div>;
}
