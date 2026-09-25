import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolio } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideo() {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    const hero = video.closest('.hero');
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let trigger;
      let frame = 0;
      let target = 0;
      let disposed = false;
      const seek = () => {
        frame = 0;
        if (disposed || document.hidden || video.seeking || !Number.isFinite(video.duration)) return;
        if (Math.abs(video.currentTime - target) > 0.025) {
          try { video.currentTime = target; } catch { /* Keep the poster if the browser cannot seek yet. */ }
        }
      };
      const requestSeek = () => {
        if (!frame && !document.hidden) frame = requestAnimationFrame(seek);
      };
      const update = self => {
        target = self.progress * Math.max(0, video.duration - 0.05);
        requestSeek();
      };
      const metadata = () => {
        if (disposed || trigger || !Number.isFinite(video.duration) || video.duration <= 0) return;
        video.pause();
        trigger = ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: () => `+=${Math.max(innerHeight * 1.5, 900)}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onUpdate: update,
          onRefresh: update,
        });
        ScrollTrigger.refresh();
        update(trigger);
      };
      const show = () => { video.classList.add('is-ready'); requestSeek(); };
      const error = () => { video.classList.remove('is-ready'); trigger?.kill(); trigger = null; ScrollTrigger.refresh(); };
      const visibility = () => { video.pause(); if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else requestSeek(); };
      video.addEventListener('loadedmetadata', metadata);
      video.addEventListener('loadeddata', show);
      video.addEventListener('seeked', requestSeek);
      video.addEventListener('error', error);
      document.addEventListener('visibilitychange', visibility);
      video.src = portfolio.hero.video;
      video.load();
      return () => {
        disposed = true; cancelAnimationFrame(frame); trigger?.kill();
        video.removeEventListener('loadedmetadata', metadata);
        video.removeEventListener('loadeddata', show);
        video.removeEventListener('seeked', requestSeek);
        video.removeEventListener('error', error);
        document.removeEventListener('visibilitychange', visibility);
        video.pause(); video.classList.remove('is-ready'); video.removeAttribute('src'); video.load();
      };
    });
    return () => media.revert();
  }, []);
  return <video ref={ref} className="hero-scroll-video" muted playsInline preload="auto" poster={portfolio.hero.src} aria-hidden="true" tabIndex={-1} disablePictureInPicture />;
}
