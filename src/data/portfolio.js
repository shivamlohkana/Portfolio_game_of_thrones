// Replace bracketed content and null URLs with your real details. Unconfigured actions stay disabled.
export const portfolio = {
  name: 'Shivam Lohkana', initials: 'SL',
  headline: 'B.Tech Student | Tech Enthusiast',
  tagline: 'Forging ideas into systems that survive the real world.',
  bio: '[YOUR BIO] A curious builder at the intersection of thoughtful design and practical engineering. I enjoy taking complex problems apart, understanding what matters, and building something useful.',
  philosophy: 'Build with intention. Learn without limits. Leave things better than you found them.',
  role: 'B.Tech Student', education: '[YOUR UNIVERSITY] · Bachelor of Technology',
  interests: ['Software engineering', 'Artificial intelligence', 'Creative technology'],
  email: '[EMAIL]', github: null, linkedin: null, leetcode: null, codechef: null, resume: null,
  location: '[YOUR LOCATION]', availability: '[YOUR AVAILABILITY]',
  hero: { src: '/assets/hero/hero-throne.webp', position: 'center 42%', mobilePosition: '58% center' },
  portrait: '/assets/portraits/shivam.webp',
  // Percentages in the rendered hero viewport. Adjust to match visible fires in YOUR artwork.
  fire: { enabled: true, zones: [{ x: 18, y: 64, width: 12, height: 23 }, { x: 83, y: 65, width: 10, height: 21 }] },
  stats: [
    { value: '—', label: 'Problems solved', note: '[ADD COUNT]', profile: 'leetcode' },
    { value: '—', label: 'Projects built', note: '[ADD COUNT]', profile: 'github' },
    { value: '—', label: 'Hackathons', note: '[ADD COUNT]', profile: null },
    { value: '—', label: 'CodeChef rating', note: '[ADD RATING]', profile: 'codechef' },
  ],
};
