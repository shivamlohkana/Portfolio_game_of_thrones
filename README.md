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

Content is populated from the supplied resume, last updated November 11, 2025. Work cards describe documented freelance work, training, and hackathon participation; the resume does not identify individual software projects or provide project URLs. LinkedIn uses the profile URL supplied separately by the owner. Coding profile counts and ratings are not claimed. The hero uses the supplied throne artwork, optimized to a 235 KB WebP. Portrait and work images still use styled fallbacks. Null profile/demo/résumé URLs render as inactive labels instead of broken links. The contact email is populated from the resume. Keep custom data URLs limited to trusted HTTPS, mailto, or local asset paths.

## Assets (add your files here)

```
public/assets/
  hero/hero-throne.webp
  portraits/shivam.webp
  projects/meta-ads.webp
  projects/hackathons.webp
  projects/cloud-training.webp
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
