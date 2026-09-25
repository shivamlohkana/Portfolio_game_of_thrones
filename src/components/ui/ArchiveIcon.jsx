const regions = {
  code: [36, 183, 95, 69], layout: [174, 184, 95, 69], server: [303, 183, 90, 69],
  database: [813, 183, 99, 69], brain: [687, 183, 84, 69], terminal: [1247, 183, 95, 69],
  network: [558, 183, 95, 69], compass: [968, 183, 89, 69],
  education: [36, 308, 95, 70], achievement: [293, 309, 90, 70],
  raven: [851, 13, 110, 149],
};

export default function ArchiveIcon({ name, size = 40, className = '' }) {
  const [x, y, w, h] = regions[name] || regions.code;
  const scale = size / Math.max(w, h);
  return <span aria-hidden="true" className={`archive-icon ${className}`} style={{ width: w * scale, height: h * scale, backgroundImage: 'url(/assets/branding/icon-atlas.png)', backgroundSize: `${1536 * scale}px ${1024 * scale}px`, backgroundPosition: `${-x * scale}px ${-y * scale}px` }} />;
}
