# PROBS — Pravesh Kumar Shrestha

A crafting-first personal portfolio built with **Astro** and **GSAP**.

**Brand:** `[PROBS.]` — **Design language:** crafty neo-brutalist "notebook scrapbook":
warm paper, ink-black borders, hard offset shadows, pastel sticker tags, macOS window
chrome, taped polaroids, and a retro CRT boot screen.

Sections: hero · about · experience · skills · projects · certifications · contact —
plus a mini game, an interactive console and a two-mode perspective theme.

---

## Stack

| Concern    | Choice                                                              |
| ---------- | ------------------------------------------------------------------- |
| Framework  | [Astro](https://astro.build) (fully static output)                  |
| Animation  | [GSAP](https://gsap.com) + ScrollTrigger (bundled locally)           |
| Icons      | Font Awesome Free (bundled locally)                                  |
| Styling    | Hand-rolled CSS design system — no framework, no utility classes     |
| Type       | Archivo Black · Space Grotesk · JetBrains Mono · Caveat · Silkscreen |

Everything is self-contained — no runtime CDN dependencies. Webfonts are the only
external request and are loaded from the document head with `preconnect`.

---

## Getting started

```bash
npm install      # install dependencies
npm run dev      # dev server on http://localhost:4321
npm run build    # static build to ./dist
npm run preview  # preview the production build
```

Requires Node **>= 22.12.0**.

---

## Architecture

```
.
├── public/
│   ├── favicon.svg
│   ├── robots.txt · sitemap.xml
│   ├── images/                 # the two portfolio photos
│   └── resume/                 # the PDF the nav links to
├── docs/design-references/     # the mood boards this design is based on
├── src/
│   ├── data/                   # ← ALL copy lives here, typed
│   │   ├── site.ts             # brand, nav, socials, roles, marquee words
│   │   └── content.ts          # about, experience, skills, projects, certs, console
│   ├── layouts/Layout.astro    # document shell, SEO + JSON-LD, global chrome
│   ├── components/
│   │   ├── Loader.astro        # retro CRT boot screen
│   │   ├── Cursor.astro        # ink dot + lagging ring
│   │   ├── Nav.astro           # window bar: brand, mode tools, links, résumé
│   │   ├── Hero.astro          # headline + taped collage
│   │   ├── Marquee.astro       # scrolling strip (speed reacts to scroll)
│   │   ├── About.astro         # bio, live console, stat stickers
│   │   ├── Experience.astro    # alternating timeline, reorders per perspective
│   │   ├── Skills.astro        # striped proficiency meters
│   │   ├── Projects.astro      # draggable rail + category filters
│   │   ├── Certs.astro         # flipping credential cards
│   │   ├── Contact.astro       # smiley, copy-email, paper form
│   │   ├── Footer.astro
│   │   ├── DetailModal.astro   # shared detail dialog
│   │   ├── PerspectiveSwitch.astro  # tech ⇄ marketing (see below)
│   │   ├── SectionRail.astro   # right-hand progress dots
│   │   └── Arcade.astro        # BUG SQUASH mini game
│   ├── pages/
│   │   ├── index.astro         # composes the page
│   │   └── 404.astro           # branded not-found page
│   ├── scripts/
│   │   ├── main.js             # entry: boot, loader, hero, scroll, game
│   │   └── interactions.js     # cursor, magnetic, tilt, cert flip (no deps)
│   └── styles/
│       ├── global.css          # entry point — imports the layers below
│       ├── tokens.css          # design tokens + theme layer + reset
│       ├── base.css            # page surface, type, craft primitives, keyframes
│       ├── components.css      # loader, cursor, nav, modal, switch, footer, chrome
│       └── sections.css        # per-section layout + responsive
└── _archive/                   # superseded resume exports (gitignored)
```

**Editing content:** you should almost never need to touch a component to change copy.
Add or edit entries in `src/data/*.ts` and the sections re-render.

**Editing the look:** change a value in `src/styles/tokens.css` and it cascades. Colours,
shadows, radii, fonts, easing and layout width are all defined there.

---

## The two themes (tech ⇄ marketing)

The switch in the bottom-right corner is the site's headline interaction. **Tech is the
dark theme, marketing is the light one**, and flipping it changes far more than colour:

| What changes              | How                                                                   |
| ------------------------- | --------------------------------------------------------------------- |
| **Whole palette**         | near-black paper + CRT blue (tech) ⇄ cream paper + coral (marketing)   |
| **Theme extras**          | tech gets a particle field; marketing gets the mini game               |
| **Photos**                | the hero polaroid shows the mono print on tech, the colour print on marketing |
| Hero roles + copy         | `data-roles-tech` / `data-roles-marketing`, `data-pane` blocks         |
| Hero/collage chips        | two chip groups toggled by `data-pane`                                 |
| About bio + chips         | marketing framing of the same person                                   |
| Section headings          | "Things I've built" ⇄ "Things I've shipped", etc.                      |
| Project order + copy      | each project has `focus: ['tech' \| 'growth']` and a `descAlt`          |
| Skill category order      | each category has a `focus`                                             |
| Experience order + copy   | each role has a `focus`; the zig-zag sides are re-derived              |
| Project modal text        | opens the description matching the active perspective                   |
| `<meta name="theme-color">` | follows the theme so mobile browser chrome matches                    |

The choice persists in `localStorage` under `pravesh:perspective`, and a tiny inline
script in the document head applies it **before first paint** so the wrong theme never
flashes. The class lives on `<html>`, so token overrides also reach html-level styles
such as the scrollbar colour.

To add a new record, just give it a `focus` array — everything else follows.

The hero polaroid carries two `<img>` tags — one tagged `data-pane="tech"` (the mono print) and one
`data-pane="marketing"` (the colour print). The same `data-pane` hide rules do the rest, so the
photograph swaps along with the rest of the theme.

### Theme extras

- **Tech (dark) — particle field.** An interactive constellation on a `<canvas>` behind
the content: nodes drift, link up when close, and push away from your cursor. Toggle it
with the **FX** button in the nav (or `fx` in the console). It never runs under
`prefers-reduced-motion`.
- **Tech (dark) — particle field.** An interactive constellation on a `<canvas>` behind
the content: nodes drift, link up when close, and push away from your cursor. Toggle it
with the **FX** button in the nav (or `fx` in the console). It never runs under
`prefers-reduced-motion`.
- **Marketing (light) — game.** The **BUG SQUASH** mini game — see below.
- **Both sides — music.** The **Music** button in the nav streams the playlist in
`site.musicPlaylist` and is the entire UI: the equaliser animates while it plays, and the
button's tooltip names the current track. Nothing is shown on the page — the real YouTube
player lives off-screen at 200×200 (its minimum streamable size) with the `autoplay`
permission delegated to the iframe, and a watchdog hands over to a Web-Audio loop if
autoplay is ever refused, so it can't end up silently dead.

Both extras are wired to the mode: switching themes starts and stops them for you.

---

## Interaction & motion

- **CRT boot loader** — segmented pixel bar, scanlines, a travelling hotspot, a decoding
  wordmark and a power-off collapse. Click or press <kbd>Esc</kbd> to skip.
- **Custom cursor** — ink dot with a lagging ring that swells over interactive elements.
- **Hero** — masked line-by-line title reveal, cursor-parallax collage layers, ambient
  floating doodles, a spinning stamp badge, and photos that switch with the theme.
- **Scroll** — reveal variants (up / tilt / pop / left / right), staggered groups,
  section labels that decode out of noise, a self-drawing timeline rail, filling skill
  meters, and a marquee whose speed reacts to scroll velocity.
- **Projects** — drag, wheel, arrows, a progress bar and six category filters.
- **BUG SQUASH** — a 30-second mini game that lives on the marketing side. Bugs scurry
  across a 6×4 board; chain hits for a multiplier, misses reset it. High score persists in
  `localStorage`. Open it from the nav **Play** button, the <kbd>G</kbd> key, or by typing
  `game` in the console (which switches to marketing first).
- **Particle field** — the tech side's interactive canvas, with an **FX** toggle in the nav.
- **Background music** — the YouTube playlist in `site.musicPlaylist`, streamed audio-only,
  toggled with the **Music** button (available in both views).
- **Interactive console** in About — `help`, `neofetch`, `skills`, `projects`, `contact`,
  `theme`, `game`, `music`, `fx`, `clear`.
- **Detail modal** for every project and role.
- **Copy email** with clipboard fallback and toast feedback.
- Plus magnetic buttons, 3D card tilt, cursor spotlights, sticker wobble and flipping
  certification cards.

### Accessibility & robustness

- `prefers-reduced-motion` disables the loader, reveals, parallax, ambience and game
  confetti — the portfolio still works, it simply stops moving.
- Content is only hidden for animation **after** JS proves it can animate it back, and a
  `try/catch` in the entry point strips that hidden state if init fails. Nothing can be
  left permanently invisible.
- Skip link, landmarks, focus-visible styles, `aria-pressed`/`aria-selected` on toggles,
  `role="status"` announcements for the theme switch, and explicit accessible names on
  every icon-only control.
- The game is keyboard reachable (bugs are real buttons).

---

## Things you should change before launch

| Item | Where |
| ---- | ----- |
| **Your domain** — used for canonical URLs, OG tags, `robots.txt` and `sitemap.xml` | `site` in `astro.config.mjs`, plus `public/robots.txt` and `public/sitemap.xml` |
| **Contact form endpoint** — currently a placeholder Formspree id | `action` in `src/components/Contact.astro`. The submit handler in `main.js` (`initContactForm`) intercepts the request and shows a toast instead of posting; delete that handler once a real endpoint is set. |
| Résumé PDF | Replace `public/resume/Pravesh_Kumar_Shrestha.pdf` (keep the name or update `resumeUrl` in `src/data/site.ts`) |
| Social links | `socials` in `src/data/site.ts` |
| Photos | `public/images/probs-color.jpg`, `public/images/probs-bw.jpg` — the hero polaroid swaps between them by theme (see below) |
| Colours / fonts / shadows | `src/styles/tokens.css` |
| Copy, projects, roles | `src/data/content.ts`, `src/data/site.ts` |

The OG image points at the portrait photo, which is a 4:5 crop — most platforms will
letterbox it. Swap in a 1200×630 image for a perfect social card.

`_archive/` holds older resume exports; nothing imports from it, so delete it whenever.

---

## Deploying

The build is fully static:

```bash
npm run build     # → dist/
```

### Netlify

`netlify.toml` is the source of truth, so the site builds correctly even if the
dashboard still holds stale settings from when the project lived in `astro-portfolio/`:

| Setting | Value |
| ------- | ----- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Base directory | *(empty — the project is at the repo root)* |
| Node | `22` (pinned in `netlify.toml` **and** `.nvmrc`) |

It also sets security headers and long-lived caching for the content-hashed
bundles in `/assets/`. `dist/404.html` is served automatically by Netlify, so no
redirect rule is needed.

### GitHub Actions

`.github/workflows/build.yml` runs `npm ci` + `npm run build` on every push and
pull request, writes the output size to the run summary and uploads `dist/` as a
downloadable artifact. Netlify deploys through its own Git integration, so the
workflow doesn't publish anything — it just proves the site builds.

> **GitHub Pages is not used.** Its legacy *Jekyll / dynamic* pipeline cannot
> build an Astro project, which is why the `pages-build-deployment` run fails on
> every push. If you want Pages as a second host: set **Settings → Pages →
> Source** to *GitHub Actions*, then add a `withastro/action` workflow **and**
> give the config a `base` (`/portfolio-1.0`) — asset paths are absolute, so a
> project-page subpath needs it. Otherwise, set the source to *None* to stop the
> failing runs.

---

## Design references

The aesthetic derives from the two boards in `docs/design-references/`: a retro CRT loading
poster and a light neo-brutalist notebook portfolio set. They are reference material only —
not shipped in the build.
