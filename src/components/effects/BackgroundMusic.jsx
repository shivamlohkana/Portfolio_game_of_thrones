import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    let active = true;
    let interacted = false;
    let pending = false;
    audio.volume = 0.25;

    const start = () => {
      if (!active || manuallyPaused.current || document.hidden || audio.error || pending || !audio.paused) return;
      pending = true;
      audio.volume = 0.25;
      audio.play().then(() => {
        if (!active || manuallyPaused.current || document.hidden) audio.pause();
      }).catch(() => {
        // Some browsers require a click or keypress even after scrolling.
        // Keep listening so that the next permitted gesture starts playback.
      }).finally(() => { pending = false; });
    };
    const gesture = event => {
      if (event.target.closest?.('[data-music-control]')) return;
      if (event.type === 'keydown' && (event.repeat || event.ctrlKey || event.metaKey || event.altKey)) return;
      interacted = true;
      start();
    };
    const visibility = () => {
      if (document.hidden) audio.pause();
      else if (interacted) start();
    };
    const gestures = ['click', 'touchend', 'keydown', 'wheel', 'scroll'];
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    gestures.forEach(type => window.addEventListener(type, gesture, { passive: true }));
    document.addEventListener('visibilitychange', visibility);
    return () => {
      active = false;
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      gestures.forEach(type => window.removeEventListener(type, gesture));
      document.removeEventListener('visibilitychange', visibility);
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    manuallyPaused.current = !audio.paused;
    if (manuallyPaused.current) audio.pause();
    else {
      audio.volume = 0.25;
      audio.play().catch(() => setPlaying(false));
    }
  };

  return <>
    <audio ref={audioRef} src="/assets/audio/background-music.mp3" loop preload="none" />
    <button type="button" className="music-control" data-music-control onClick={toggle}
      aria-label={playing ? 'Turn sound off' : 'Turn sound on at 25 percent volume'} aria-pressed={playing}>
      {playing ? <Volume2 size={17} /> : <VolumeX size={17} />}
      <span>{playing ? 'Sound on' : 'Sound off'}</span>
    </button>
  </>;
}
