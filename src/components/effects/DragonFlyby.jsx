import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './DragonFlyby.css';

const dragonImage = '/assets/hero/dragon-flyby.png';

export default function DragonFlyby() {
  const dragon = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    const element = dragon.current;
    const image = new Image();
    let animation;
    let disposed = false;
    let started = false;
    let ready = false;

    const finish = () => {
      element.classList.remove('is-flying');
      animation?.cancel();
    };
    const launch = () => {
      if (!ready || started || disposed || document.hidden || reduced.matches) return;
      started = true;

      const angle = Math.random() * Math.PI * 2;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      const distance = Math.min(innerWidth / Math.max(Math.abs(dx), 0.01), innerHeight / Math.max(Math.abs(dy), 0.01)) * 0.5 + 260;
      const centerX = innerWidth * (0.4 + Math.random() * 0.2);
      const centerY = innerHeight * (0.4 + Math.random() * 0.2);
      const heading = angle * 180 / Math.PI + 90;
      const bend = (Math.random() - 0.5) * 100;
      const position = (progress, bank = 0) => {
        const along = (progress * 2 - 1) * distance;
        const curve = Math.sin(progress * Math.PI) * bend;
        return `translate3d(${centerX + dx * along - dy * curve}px, ${centerY + dy * along + dx * curve}px, 0) translate(-50%, -50%) rotate(${heading + bank}deg)`;
      };
      element.classList.add('is-flying');
      animation = element.animate([
        { transform: position(0), opacity: 0, offset: 0 },
        { transform: position(0.15, -4), opacity: 1, offset: 0.15 },
        { transform: position(0.5, 5), opacity: 1, offset: 0.5 },
        { transform: position(0.8, -3), opacity: 1, offset: 0.8 },
        { transform: position(1), opacity: 0, offset: 1 },
      ], { duration: 3000, easing: 'linear' });
      animation.onfinish = finish;
    };
    const visibility = () => {
      if (document.hidden && started) finish();
      else launch();
    };
    const motionChange = () => { if (reduced.matches) finish(); };
    image.onload = () => { ready = true; launch(); };
    image.src = dragonImage;
    window.addEventListener('scroll', launch, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    reduced.addEventListener('change', motionChange);
    return () => {
      disposed = true;
      image.onload = null;
      finish();
      window.removeEventListener('scroll', launch);
      document.removeEventListener('visibilitychange', visibility);
      reduced.removeEventListener('change', motionChange);
    };
  }, []);

  return createPortal(<div className="dragon-flyby-layer" aria-hidden="true">
    <div className="dragon-flyby" ref={dragon}>
      <img className="dragon-wing dragon-wing-left" src={dragonImage} alt="" />
      <img className="dragon-wing dragon-wing-right" src={dragonImage} alt="" />
      <img className="dragon-body" src={dragonImage} alt="" />
    </div>
  </div>, document.body);
}
