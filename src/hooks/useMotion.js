import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function useMotion(root) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: false, prevent: node => node.closest?.('.navbar.is-open') });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = time => { if (!document.hidden) lenis.raf(time * 1000); };
      gsap.ticker.add(tick);
      gsap.utils.toArray('.section-heading', root.current).forEach(heading => {
        const text = heading.querySelector('.heading-text');
        const eyebrow = heading.querySelector('.eyebrow');
        const reveal = gsap.timeline({ scrollTrigger: { trigger: heading, start: 'top 91%', once: true } });
        if (text) reveal.from(text, { yPercent: 105, duration: 1.05, ease: 'power3.out' });
        if (eyebrow) reveal.from(eyebrow, { x: -12, opacity: 0, duration: 0.65, ease: 'power2.out' }, 0.05);
      });
      gsap.utils.toArray('.book-reveal', root.current).forEach(book => {
        gsap.fromTo(book,
          { y: 54, rotateY: -18, rotateZ: -2, opacity: 0, transformPerspective: 1200, transformOrigin: '50% 50%' },
          { y: 0, rotateY: 0, rotateZ: 0, opacity: 1, duration: 1.35, ease: 'power3.out', scrollTrigger: { trigger: book, start: 'top 84%', once: true } },
        );
      });
      gsap.utils.toArray('.serif-lead, .contact-intro', root.current).forEach(text => {
        gsap.from(text, { clipPath: 'inset(0 100% 0 0)', duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: text, start: 'top 92%', once: true } });
      });
      gsap.utils.toArray('[data-reveal]:not(.section-heading):not(.serif-lead)', root.current).forEach(element => {
        gsap.from(element, { y: 25, opacity: 0, duration: 0.85, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
      });
      gsap.utils.toArray('.timeline', root.current).forEach(element => gsap.fromTo(element, { '--progress': '0%' }, { '--progress': '100%', ease: 'none', scrollTrigger: { trigger: element, start: 'top 75%', end: 'bottom 65%', scrub: 0.5 } }));
      const visibility = () => { if (document.hidden) { lenis.stop(); } else { lenis.start(); ScrollTrigger.refresh(); } };
      document.addEventListener('visibilitychange', visibility);
      return () => { document.removeEventListener('visibilitychange', visibility); gsap.ticker.remove(tick); lenis.destroy(); };
    });
    return () => media.revert();
  }, [root]);
}
