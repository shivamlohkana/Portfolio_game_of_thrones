import { useEffect, useRef } from 'react';
import { portfolio } from '../../data/portfolio';

// Re-illuminate the actual fire pixels: never paint generic gradient flames over the artwork.
export default function FireOverlay({ ready }) {
  const root = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => root.current?.classList.toggle('is-paused', !entry.isIntersecting));
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, [ready]);
  if (!ready || !portfolio.fire.enabled) return null;
  return <div ref={root} className="fire-overlay" aria-hidden="true">
    {portfolio.fire.zones.map((zone, index) => <div key={index} className="fire-zone" style={{ '--fire-x': `${zone.x}%`, '--fire-y': `${zone.y}%`, '--fire-w': `${zone.width}%`, '--fire-h': `${zone.height}%`, '--flicker-speed': `${1.31 + index * 0.47}s`, '--fire-image': `url("${portfolio.hero.src}")` }}><div className="fire-source" /><div className="fire-bloom" /></div>)}
  </div>;
}

