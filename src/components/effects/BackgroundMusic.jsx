import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const wanted = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    let active = true;
    audio.volume = 0.25;
    try { wanted.current = localStorage.getItem('archive-music-muted') !== 'true'; } catch { /* Storage is optional. */ }
    const start = () => {
      if (!active || !wanted.current || document.hidden || audio.error) return;
      audio.volume = 0.25;
      audio.play().catch(() => { /* Audible autoplay may require a user gesture. */ });
    };
    const onPlay = () => {
      if (!wanted.current || document.hidden) { audio.pause(); return; }
      if (active) setPlaying(true);
    };
    const onPause = () => { if (active) setPlaying(false); };
    const onError = () => { if (active) { setFailed(true); setPlaying(false); } };
    const gesture = event => {
      if (event.target.closest?.('[data-music-control]')) return;
      if (event.type === 'keydown' && (event.repeat || event.ctrlKey || event.metaKey || event.altKey || !['Enter', ' '].includes(event.key))) return;
      if (audio.paused) start();
    };
    const visibility = () => { if (document.hidden) audio.pause(); else start(); };
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);
    document.addEventListener('pointerdown', gesture, { passive: true });
    document.addEventListener('keydown', gesture);
    document.addEventListener('visibilitychange', visibility);
    start();
    return () => {
      active = false;
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      document.removeEventListener('pointerdown', gesture);
      document.removeEventListener('keydown', gesture);
      document.removeEventListener('visibilitychange', visibility);
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    wanted.current = audio.paused;
    try { localStorage.setItem('archive-music-muted', String(!wanted.current)); } catch { /* Playback works without storage. */ }
    if (wanted.current) {
      audio.volume = 0.25;
      audio.play().catch(() => setPlaying(false));
    } else audio.pause();
  };

  return <>
    <audio ref={audioRef} src="/assets/audio/background-music.mp3" loop preload="none" />
    <button type="button" className="music-control" data-music-control onClick={toggle} disabled={failed} aria-label={failed ? 'Background music unavailable' : playing ? 'Mute background music' : 'Play background music at 25 percent volume'} aria-pressed={playing} title={playing ? 'Music playing at 25% volume' : 'Play background music'}>
      {playing ? <Volume2 size={17} /> : <VolumeX size={17} />}
      <span>{failed ? 'Music unavailable' : playing ? 'Music on' : 'Play music'}</span>
    </button>
  </>;
}
