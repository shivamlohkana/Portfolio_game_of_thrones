# The Royal Archive — Shivam Lohkana

An original, responsive dark-fantasy portfolio built with React, Vite, Tailwind CSS, GSAP/ScrollTrigger, Lenis, and Lucide. No WebGL, generated artwork, external data APIs, or audio.

## Run

Requires Node.js 20.19+ or 22.12+ (Node 24 recommended).

```sh
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Replace your content

- `src/data/portfolio.js`: name, headline, biography, philosophy, education, interests, contact details, profile URLs, résumé URL, coding stats, hero positioning, fire zones.
- `src/data/projects.js`: project descriptions, categories, featured status, image paths, live demos and GitHub links. Set `placeholder: false` on real projects.
- `src/data/skills.js`: technical and creative skills from the resume.
- `src/data/achievements.js`: milestones and credential links.
- `src/data/experience.js`: education, internships, and community roles.
- `index.html`: search and social title/description. Add a canonical URL and `og:url` when you choose a permanent public domain. No social image is asserted before an actual asset exists.
- `public/favicon.svg`: lightweight original initials placeholder.
- `src/styles/global.css`: color tokens, layout, responsive breakpoints, and atmosphere. Tailwind utilities are available through the Vite plugin.

Content is populated from `Shivam_Lohkana_Resume.pdf`, supplied September 25, 2026. This replaces the previous resume: CGPA 7.55, Teen Bucks internship, revised schools, projects, certificates, and SIH 2026 qualification. The GitHub and LinkedIn URLs are extracted from that PDF. Public project evidence is recorded in `CONTENT_SOURCES.md`. Null project URLs remain absent rather than pointing at unrelated repositories. The contact form opens an email draft; it does not send through a backend.

## Assets (add your files here)

```
public/assets/
  hero/hero-throne.webp
  portraits/shivam.webp
  projects/meditrack.webp
  projects/chat-sync.webp
  projects/microservices.webp
  achievements/
  textures/
  resume.pdf                 # supplied resume; linked from the contact section
```

Missing images show intentional abstract archival placeholders. Every image uses a reserved aspect ratio; project and portrait images load lazily. The hero loads eagerly. Optimize the hero to WebP/AVIF (ideally under 500 KB) and match image paths in the data. Use your own original or licensed artwork.

The hero preserves the supplied artwork using centered `cover` positioning. Desktop copy sits to the left of the face; mobile copy moves below the face. The original PNG is unchanged. The WebP conversion reduces transfer size from 2.34 MB to about 235 KB.

`FireOverlay` samples the warm flame pixels in four configured source-image regions and animates small strips of those pixels, brightness variation, local sparks, and restrained light spill. A single canvas runs at 24 fps (20 fps on mobile); blur is disabled on mobile. Source-image percentages are converted using the same centered cover geometry as the hero, so animation follows the artwork after resizing. Keep the image centered or update the cover mapping in `FireOverlay.jsx` if changing positioning. Fire and camera movement pause offscreen and in hidden tabs. Reduced motion shows the unanimated artwork.

## Contact behavior

This is a static site. The validated contact form creates a `mailto:` draft; visitors review and send it in their email application. It never claims delivery. Until email is configured, it reports that the contact address is unavailable. No messages are stored or sent by a backend. To support delivery without an email application, connect your own server/form service and replace the submit handler in `src/components/sections/Contact.jsx`.

## Motion and accessibility

The opening sequence finishes within about 2.4 seconds, and sessionStorage shortens repeat visits. Content never waits for image downloads or a loader. Native anchor navigation, a skip link, keyboard focus indicators, labeled form fields, mobile menu Escape/focus containment, and reduced motion are included. A subtle desktop cursor accent complements the native cursor. Lenis is driven by the GSAP ticker with complete effect cleanup. Motion pauses when the tab is hidden, and the hero atmosphere pauses offscreen. Mobile limits embers and expensive filters.

## Validation and release

Build and lint are the baseline checks. A Lighthouse score is a target, not a measured guarantee; measure after adding real assets, fonts, URLs, and any form backend. Responsive styles cover mobile through wide desktop, but supplied artwork needs a final visual check at 390, 430, 768, 1024, 1440, and 1920 pixels. Fonts use Google Fonts with serif/sans-serif fallbacks; self-host them if your deployment requires no external requests.

Deploy `dist/` to a static host. Sites metadata is in `.openai/hosting.json`. The project remains runnable locally with the commands above.

## Scroll-controlled hero video

The supplied Animate_man_on_throne_1080p_20260925113146_1.mp4 clip is stored at `public/assets/hero/hero-scroll.mp4` and configured in `src/data/portfolio.js`. `ScrollVideo.jsx` maps scroll progress to the paused video currentTime: scroll down to advance, scroll up to reverse, stop to hold the frame. The hero pins for 1.5 viewport heights (at least 900 pixels) while the clip scrubs. It never calls play(), has no loop or autoplay, and is muted. The original still remains as the loading/error and reduced-motion fallback. Reduced-motion visitors do not load the video or get the pinned scroll sequence. Independent fire, camera, embers, fog, and scroll-cue animations are disabled for this video hero.

## Text animation

Section headings use GSAP masked upward reveals, with a short eyebrow entrance. Selected introductory text receives a gentle horizontal reveal. Effects run once on entry, retain readable semantic text, and are removed under prefers-reduced-motion. The scroll-controlled video behavior is unchanged.

## Background music

The owner-supplied MP3 is stored at `public/assets/audio/background-music.mp3`. BackgroundMusic attempts playback at volume 0.25 on arrival, with browser-blocked playback retried on a pointer interaction or Enter/Space. A fixed play/mute button remains available, and the mute preference persists locally. Music pauses in hidden tabs and resumes only when enabled. The track loops; actual device loudness still depends on visitor hardware and browser volume support.
