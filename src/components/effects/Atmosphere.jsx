import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

export default function Atmosphere() {
  const ref = useRef(null);
  useEffect(() => {
    const visibility = () => document.documentElement.classList.toggle('tab-hidden', document.hidden);
    document.addEventListener('visibilitychange', visibility);
    visibility();
    const observer = new IntersectionObserver(([entry]) => ref.current?.querySelector('.hero-atmosphere')?.classList.toggle('is-paused', !entry.isIntersecting));
    const hero = document.getElementById('realm');
    if (hero) observer.observe(hero);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); document.documentElement.classList.remove('tab-hidden'); };
  }, []);
  return <><div ref={ref} className="atmosphere" aria-hidden="true"><div className="film-grain" /><div className="hero-atmosphere"><div className="fog fog-one" /><div className="fog fog-two" />{Array.from({ length: 22 }, (_, i) => <i key={i} className="ember" style={{ '--left': `${(i * 47 + 13) % 100}%`, '--delay': `${-(i * 1.7)}s`, '--duration': `${9 + i % 7}s`, '--drift': `${i % 2 ? 65 : -55}px`, '--size': `${i % 4 === 0 ? 3 : 2}px` }} />)}</div></div>{createPortal(<div className="snowfall" aria-hidden="true">{Array.from({ length: 42 }, (_, i) => <i key={i} className="snowflake" style={{ '--snow-x': `${(i * 37 + 7) % 100}%`, '--snow-size': `${2 + i % 3}px`, '--snow-duration': `${12 + i % 11}s`, '--snow-delay': `${-(i * 2.3)}s`, '--snow-drift': `${(i % 2 ? -1 : 1) * (15 + i % 45)}px`, '--snow-opacity': 0.2 + (i % 4) * 0.1 }} />)}</div>, document.body)}</>;
}
