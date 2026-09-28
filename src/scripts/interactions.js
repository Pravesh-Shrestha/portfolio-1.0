/**
 * interactions.js — pointer-driven behaviour.
 * Deliberately dependency-free: these effects are pure DOM/CSS so they keep
 * working even if the animation library fails to load.
 */

const FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ------------------------------------------------------------------
   Custom cursor — ink dot plus a lagging ring.
   ------------------------------------------------------------------ */
export function initCursor() {
  const dot = $('#cursor-dot');
  const ring = $('#cursor-ring');
  if (!FINE_POINTER || REDUCED || !dot || !ring) return;

  document.documentElement.classList.add('has-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  const INTERACTIVE = 'a, button, input, textarea, select, [data-cursor]';

  window.addEventListener(
    'mousemove',
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    },
    { passive: true }
  );

  document.addEventListener('mouseover', (event) => {
    if (event.target instanceof Element && event.target.closest(INTERACTIVE)) {
      ring.classList.add('is-hover');
    }
  });
  document.addEventListener('mouseout', (event) => {
    if (event.target instanceof Element && event.target.closest(INTERACTIVE)) {
      ring.classList.remove('is-hover');
    }
  });

  window.addEventListener('mousedown', () => ring.classList.add('is-down'));
  window.addEventListener('mouseup', () => ring.classList.remove('is-down'));

  // keep the ring out of the way when the pointer leaves the window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '';
    ring.style.opacity = '';
  });

  (function follow() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(follow);
  })();
}

/* ------------------------------------------------------------------
   Magnetic buttons — elements lean toward the pointer.
   Uses the standalone `translate` property so it never fights the
   transform GSAP or :hover rules are using.
   ------------------------------------------------------------------ */
export function initMagnetic(selector = '.btn, .hero__social, .projects__arrow, .contact__row') {
  if (!FINE_POINTER || REDUCED) return;

  $$(selector).forEach((el) => {
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const relX = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const relY = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      // follow instantly: drop `translate` from the transition list
      el.style.transitionProperty = 'transform, box-shadow, background-color, color, border-color';
      el.style.translate = `${relX * 7}px ${relY * 6}px`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transitionProperty = '';
      el.style.translate = '';
    });
  });
}

/* ------------------------------------------------------------------
   Subtle 3D tilt on cards.
   ------------------------------------------------------------------ */
export function initTilt(selector, { max = 6, guard } = {}) {
  if (!FINE_POINTER || REDUCED) return;

  $$(selector).forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      if (guard && guard()) return;
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        `perspective(900px) rotateY(${px * max * 2}deg) rotateX(${-py * max * 2}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ------------------------------------------------------------------
   Credential cards: tap/Enter to flip where hover isn't available.
   ------------------------------------------------------------------ */
export function initCertFlip(selector = '.cert') {
  if (FINE_POINTER) return; // hover already flips these on desktop

  $$(selector).forEach((cert) => {
    const toggle = () => cert.classList.toggle('is-flipped');
    cert.addEventListener('click', toggle);
    cert.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });
}
