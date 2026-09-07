import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function useMotion(root) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let visited = false;
      try { visited = sessionStorage.getItem('archive-entered') === 'yes'; sessionStorage.setItem('archive-entered', 'yes'); } catch { /* Storage may be unavailable in private browsers. */ }
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: false, prevent: node => node.closest?.('.navbar.is-open') });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = time => { if (!document.hidden) lenis.raf(time * 1000); };
      gsap.ticker.add(tick);
      const hero = gsap.timeline();
      hero.from('.hero-art', { opacity: 0, duration: visited ? 0.5 : 1.8, ease: 'power2.out' })
        .from('.hero-copy > *', { y: 18, opacity: 0, duration: visited ? 0.35 : 0.85, stagger: 0.13, ease: 'power2.out' }, visited ? 0 : 0.65);
      gsap.to('.hero-art', { yPercent: 9, ease: 'none', scrollTrigger: { trigger: '#realm', start: 'top top', end: 'bottom top', scrub: 0.6 } });
      gsap.utils.toArray('[data-reveal]', root.current).forEach(element => {
        gsap.from(element, { y: 25, opacity: 0, duration: 0.85, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
      });
      gsap.utils.toArray('.timeline', root.current).forEach(element => gsap.fromTo(element, { '--progress': '0%' }, { '--progress': '100%', ease: 'none', scrollTrigger: { trigger: element, start: 'top 75%', end: 'bottom 65%', scrub: 0.5 } }));
      const visibility = () => { if (document.hidden) { lenis.stop(); hero.pause(); } else { lenis.start(); hero.resume(); ScrollTrigger.refresh(); } };
      document.addEventListener('visibilitychange', visibility);
      return () => { document.removeEventListener('visibilitychange', visibility); gsap.ticker.remove(tick); lenis.destroy(); };
    });
    return () => media.revert();
  }, [root]);
}
