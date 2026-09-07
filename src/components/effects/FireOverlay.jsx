import { useEffect, useRef } from 'react';
import { portfolio } from '../../data/portfolio';

// Deform only warm flame pixels sampled from the supplied image. Cover geometry is
// shared with the centered hero image, so fire stays registered after resizing.
export default function FireOverlay({ ready }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!ready || !portfolio.fire.enabled) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const stage = canvas.parentElement;
    const hero = stage.closest('.hero');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 650px)');
    const source = new Image();
    let frame = 0, last = 0, visible = true, disposed = false;
    let width = 0, height = 0, scale = 1, offsetX = 0, offsetY = 0;
    let patches = [];

    const resize = () => {
      width = stage.clientWidth; height = stage.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, compact.matches ? 1 : 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (source.naturalWidth) {
        scale = Math.max(width / source.naturalWidth, height / source.naturalHeight);
        offsetX = (width - source.naturalWidth * scale) / 2;
        offsetY = (height - source.naturalHeight * scale) / 2;
      }
    };
    const draw = ms => {
      frame = 0;
      if (disposed || document.hidden || !visible || reduced.matches) return;
      frame = requestAnimationFrame(draw);
      if (ms - last < (compact.matches ? 50 : 1000 / 24)) return;
      last = ms;
      ctx.clearRect(0, 0, width, height);
      const time = ms / 1000;
      patches.forEach((patch, index) => {
        const x = offsetX + patch.x * scale, y = offsetY + patch.y * scale;
        const w = patch.w * scale, h = patch.h * scale;
        if (x + w < 0 || x > width || y > height || y + h < 0) return;
        const t = time * (1 + index * 0.17) + index * 3.4;
        const flicker = 0.53 + 0.13 * Math.sin(t * 11.3) + 0.09 * Math.sin(t * 23.7) + 0.05 * Math.cos(t * 37.1);
        ctx.globalCompositeOperation = 'screen';
        if (!compact.matches) {
          ctx.save();
          ctx.filter = 'blur(12px)'; ctx.globalAlpha = flicker * 0.23;
          ctx.drawImage(patch.image, x - w * 0.22, y - h * 0.12, w * 1.44, h * 1.24);
          ctx.restore();
        }
        ctx.globalAlpha = flicker;
        const step = compact.matches ? 5 : 3;
        for (let row = 0; row < patch.h; row += step) {
          const strip = Math.min(step, patch.h - row);
          const tip = 1 - row / patch.h;
          const sway = (Math.sin(t * 5.1 + row * 0.12) + Math.sin(t * 8.7 + row * 0.055)) * tip * 2.4 * scale;
          const lift = (1 + Math.sin(t * 6.3 + row * 0.06)) * tip * 2.5 * scale;
          ctx.drawImage(patch.image, 0, row, patch.w, strip, x + sway, y + row * scale - lift, w, strip * scale + 0.5);
        }
        const count = compact.matches ? 2 : 5;
        for (let i = 0; i < count; i++) {
          const life = (t * (0.19 + i * 0.017) + i * 0.213) % 1;
          ctx.globalAlpha = Math.sin(life * Math.PI) * 0.65;
          ctx.fillStyle = i % 2 ? '#ffd39a' : '#ed7c35';
          ctx.beginPath();
          ctx.arc(x + w * (0.4 + i * 0.05) + Math.sin(t + i) * w * 0.12, y + h * 0.5 - life * h * 1.25, Math.max(0.7, scale), 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    };
    const synchronize = () => {
      cancelAnimationFrame(frame); frame = 0;
      const paused = document.hidden || !visible || reduced.matches;
      hero.classList.toggle('hero-paused', paused);
      if (paused) ctx.clearRect(0, 0, width, height);
      else if (patches.length) frame = requestAnimationFrame(draw);
    };
    source.onload = () => {
      if (disposed) return;
      patches = portfolio.fire.zones.map(zone => {
        const w = Math.round(source.naturalWidth * zone.width / 100);
        const h = Math.round(source.naturalHeight * zone.height / 100);
        const x = Math.round(source.naturalWidth * zone.x / 100 - w / 2);
        const y = Math.round(source.naturalHeight * zone.y / 100 - h / 2);
        const image = document.createElement('canvas'); image.width = w; image.height = h;
        const context = image.getContext('2d'); context.drawImage(source, -x, -y);
        const pixels = context.getImageData(0, 0, w, h);
        for (let py = 0; py < h; py++) for (let px = 0; px < w; px++) {
          const p = (py * w + px) * 4;
          const [r, g, b] = pixels.data.subarray(p, p + 3);
          const edge = Math.min(1, px / 8, (w - 1 - px) / 8, py / 8, (h - 1 - py) / 8);
          const warmth = Math.min(1, Math.max(0, (r - b - 28) / 75));
          const luminance = Math.min(1, Math.max(0, (r + g - 290) / 130));
          pixels.data[p + 3] *= edge * warmth * luminance;
        }
        context.putImageData(pixels, 0, 0);
        return { image, x, y, w, h };
      });
      resize(); synchronize();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; synchronize(); });
    observer.observe(hero);
    const dimensions = new ResizeObserver(resize); dimensions.observe(stage);
    document.addEventListener('visibilitychange', synchronize);
    reduced.addEventListener('change', synchronize);
    compact.addEventListener('change', resize);
    source.src = portfolio.hero.src;
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); dimensions.disconnect();
      document.removeEventListener('visibilitychange', synchronize);
      reduced.removeEventListener('change', synchronize); compact.removeEventListener('change', resize);
      source.onload = null; hero.classList.remove('hero-paused');
    };
  }, [ready]);
  if (!ready || !portfolio.fire.enabled) return null;
  return <canvas ref={canvasRef} className="living-fire" aria-hidden="true" />;
}
