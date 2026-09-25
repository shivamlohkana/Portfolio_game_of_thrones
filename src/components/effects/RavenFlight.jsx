import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ArchiveIcon from '../ui/ArchiveIcon';

export default function RavenFlight() {
  const [flight, setFlight] = useState(null);
  const sequence = useRef(0);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    const clear = () => { clearTimeout(timer); setFlight(null); };
    const launch = event => {
      const control = event.target.closest?.('[data-raven-trigger]');
      if (!control || reduced.matches || document.hidden) return;
      const rect = control.getBoundingClientRect();
      clearTimeout(timer);
      setFlight({ id: ++sequence.current, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      timer = setTimeout(() => setFlight(null), 2200);
    };
    const visibility = () => { if (document.hidden) clear(); };
    document.addEventListener('click', launch, true);
    document.addEventListener('visibilitychange', visibility);
    reduced.addEventListener('change', clear);
    return () => { clearTimeout(timer); document.removeEventListener('click', launch, true); document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', clear); };
  }, []);
  return createPortal(<div className="raven-flight-layer" aria-hidden="true">{flight && Array.from({ length: 6 }, (_, i) => <span key={`${flight.id}-${i}`} className="flying-raven" style={{ left: flight.x, top: flight.y, '--flight-x': `${(i % 2 ? -1 : 1) * (130 + i * 52)}px`, '--flight-y': `${-230 - i * 38}px`, '--flight-delay': `${i * 75}ms`, '--wing-speed': `${210 + i * 25}ms` }}><ArchiveIcon name="raven" size={38 + i * 3} /></span>)}</div>, document.body);
}
