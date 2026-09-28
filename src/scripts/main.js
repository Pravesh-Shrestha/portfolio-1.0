/**
 * main.js — application entry point.
 *
 *   1. boot / loader         7. project filters
 *   2. hero intro            8. console
 *   3. scroll animation      9. detail modal
 *   4. counters / typing    10. perspective (tech ⇄ marketing)
 *   5. nav + chrome         11. arcade mini game
 *   6. projects rail        12. contact, copy, ambience
 *
 * Anything that can fail is wrapped so content is never left invisible.
 */

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { initCursor, initMagnetic, initTilt, initCertFlip } from './interactions.js';
import { consoleCommands, experience, projects, perspectiveCopy } from '../data/content';
import { navItems, site, socials } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
  );

const isTyping = () => {
  const el = document.activeElement;
  return Boolean(el) && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
};

const detailSources = { project: projects, exp: experience };

let heroIntro = null;
let syncRailBar = () => {};
let openArcade = () => {};
let fx = null;
let music = null;
let fxWanted = true;
let musicWanted = false;
let currentMode = 'tech';
let roleWords = [];
let typing = { word: 0, char: 0, deleting: false, timer: null };

/* ==================================================================
   BOOT
   ================================================================== */
function boot() {
  initCursor();
  initMagnetic();
  initCertFlip();
  initNav();
  initScrollChrome();
  initSectionRail();
  initProjectsRail();
  initFilters();
  initConsole();
  initModal();
  initPerspective();
  initContactForm();
  initCopyEmail();
  initArcade();
  initFx();
  initMusic();
  initModeTools();
  initSpotlight();
  initTilt('.project', {
    guard: () => $('#projects-rail')?.classList.contains('is-dragging') === true,
  });

  if (REDUCED) {
    $('#loader')?.classList.add('is-hidden');
    return; // content is never hidden in this mode
  }

  // GSAP is confirmed working, so it is safe to hide things for animation.
  document.documentElement.classList.add('js-anim');

  buildHeroIntro();
  initScrollAnimations();
  initParallax();
  initMarqueeSpeed();

  runLoader(() => {
    heroIntro?.play();
    gsap.delayedCall(0.4, animateCounters);
    gsap.delayedCall(0.6, resetTyping);
    gsap.delayedCall(0.9, initAmbient);
  });
}

/* ==================================================================
   1. LOADER
   ================================================================== */
function decodeText(el, final, duration = 0.7) {
  if (REDUCED || !el) {
    if (el) el.textContent = final;
    return;
  }
  const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+-/<>';
  const start = performance.now();

  const frame = (now) => {
    const progress = Math.min(1, (now - start) / (duration * 1000));
    const revealed = Math.floor(progress * final.length);
    let out = '';
    for (let i = 0; i < final.length; i += 1) {
      if (i < revealed || final[i] === ' ') out += final[i];
      else out += glyphs[(Math.random() * glyphs.length) | 0];
    }
    el.textContent = out;
    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = final;
  };

  requestAnimationFrame(frame);
}

function runLoader(onReveal) {
  const loader = $('#loader');
  const inner = $('#loader-inner');
  const word = $('#loader-word');
  const pctEl = $('#loader-pct');
  const statusEl = $('#loader-status');
  const flash = $('#loader-flash');
  const blocks = $$('.loader__block');

  if (word?.dataset.text) decodeText(word, word.dataset.text, 0.8);

  if (!loader) {
    onReveal();
    return;
  }

  const STEPS = [
    ['initialising gsap engine', 14],
    ['loading components', 34],
    ['assembling the portfolio', 56],
    ['rendering portfolio data', 76],
    ['polishing animations', 92],
    ['launch ready', 100],
  ];

  let index = 0;
  let finished = false;

  const paint = (percent) => {
    if (pctEl) pctEl.textContent = `${percent}%`;
    const lit = Math.round((percent / 100) * blocks.length);
    blocks.forEach((block, i) => {
      block.classList.toggle('is-on', i < lit);
      block.classList.toggle('is-tip', i === lit - 1);
    });
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    clearInterval(timer);
    document.removeEventListener('keydown', onKey);
    loader.removeEventListener('click', finish);
    paint(100);
    if (statusEl) statusEl.textContent = 'launch ready';

    const tl = gsap.timeline({
      onComplete: () => {
        loader.classList.add('is-hidden');
        onReveal();
      },
    });

    // CRT power-off: squeeze vertically, flash, fade to paper
    tl.to(inner, { duration: 0.26, scaleY: 0.03, scaleX: 0.72, opacity: 0.7, ease: 'power3.in' })
      .to(flash, { duration: 0.07, opacity: 0.85 }, '-=0.04')
      .to(loader, { duration: 0.34, opacity: 0, ease: 'power2.inOut' }, '+=0.03')
      .to(flash, { duration: 0.3, opacity: 0 }, '<');
  };

  const onKey = (event) => {
    if (event.key === 'Escape') finish();
  };

  const timer = setInterval(() => {
    if (index >= STEPS.length) {
      finish();
      return;
    }
    const [message, percent] = STEPS[index];
    index += 1;
    paint(percent);
    if (statusEl) statusEl.textContent = message;
  }, 300);

  document.addEventListener('keydown', onKey);
  loader.addEventListener('click', finish);
  paint(0);
}

/* ==================================================================
   2. HERO INTRO
   ================================================================== */
function buildHeroIntro() {
  const lines = $$('.hero__line-inner');
  gsap.set(lines, { yPercent: 118 });

  heroIntro = gsap.timeline({
    paused: true,
    defaults: { ease: 'expo.out', duration: 0.9 },
  });

  heroIntro
    .from('.nav__inner', { y: -90, opacity: 0, duration: 0.7, ease: 'power3.out' })
    .from('.hero__kicker', { y: 14, opacity: 0, duration: 0.5 }, '-=0.2')
    .to(lines, { yPercent: 0, duration: 1.15, stagger: 0.09, ease: 'expo.out' }, '-=0.35')
    .from('.hero__tags .sticker', { y: 18, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.75')
    .from('.hero__roles', { y: 18, opacity: 0, duration: 0.6 }, '-=0.55')
    .from('.hero__desc', { y: 18, opacity: 0, duration: 0.6 }, '-=0.5')
    .from('.hero__cta .btn', { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.45')
    .from('.hero__socials .hero__social', { y: 16, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.4')
    .from('.hero__scroll', { opacity: 0, duration: 0.5 }, '-=0.35')
    .from('.collage__photo', { x: -40, y: 30, opacity: 0, duration: 1 }, 0.2)
    .from('.collage__card', { x: 44, y: 24, opacity: 0, duration: 1 }, 0.32)
    .from('.collage__stats', { x: 40, y: 26, opacity: 0, duration: 1 }, 0.44)
    .from('.collage__note', { scale: 0.72, opacity: 0, duration: 0.8, ease: 'back.out(2)' }, 0.5)
    .from('.collage__badge', { scale: 0.4, opacity: 0, rotate: -40, duration: 0.9, ease: 'back.out(2)' }, 0.6)
    .from('.hero .doodle', { scale: 0, opacity: 0, duration: 0.7, ease: 'back.out(2.4)', stagger: 0.1 }, 0.7);
}

/* ==================================================================
   3. SCROLL-DRIVEN ANIMATION
   ================================================================== */
function initScrollAnimations() {
  $$('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1, x: 0, y: 0, rotate: 0, scale: 1,
      duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  $$('[data-reveal-group]').forEach((group) => {
    gsap.to(Array.from(group.children), {
      opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.07,
      scrollTrigger: { trigger: group, start: 'top 86%', once: true },
    });
  });

  // labels resolve out of noise as they scroll in
  $$('[data-scramble]').forEach((el) => {
    if (el.children.length) return; // never clobber nested panes
    const final = el.textContent.trim();
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => decodeText(el, final, 0.6),
    });
  });

  const rail = $('#tl-rail');
  const experienceSection = $('#experience');
  if (rail && experienceSection) {
    gsap.fromTo(
      rail,
      { scaleY: 0 },
      {
        scaleY: 1, transformOrigin: 'top center', ease: 'none',
        scrollTrigger: {
          trigger: experienceSection,
          start: 'top 65%',
          end: 'bottom 85%',
          scrub: 0.4,
        },
      }
    );
  }

  $$('.skill-item').forEach((item) => {
    const fill = $('.skill-item__fill', item);
    const percent = item.dataset.percent;
    if (!fill || !percent) return;
    gsap.to(fill, {
      width: `${percent}%`, duration: 1.3, ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 92%', once: true },
    });
  });

  const about = $('#about');
  if (about) {
    ScrollTrigger.create({ trigger: about, start: 'top 70%', once: true, onEnter: animateCounters });
  }
}

/* ==================================================================
   4. COUNTERS + TYPEWRITER
   ================================================================== */
function animateCounters() {
  $$('.counter').forEach((el) => {
    if (el.dataset.counted === '1') return;
    const target = Number.parseFloat(el.dataset.target ?? '');
    if (!Number.isFinite(target)) return;
    el.dataset.counted = '1';

    const box = { value: 0 };
    gsap.to(box, {
      value: target,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = String(Math.round(box.value));
      },
    });
  });
}

function resetTyping() {
  const el = $('#role-text');
  if (!el) return;
  try {
    const raw = currentMode === 'marketing' ? el.dataset.rolesMarketing : el.dataset.rolesTech;
    roleWords = JSON.parse(raw ?? '[]');
  } catch {
    roleWords = [];
  }
  if (!roleWords.length) return;

  typing = { word: 0, char: 0, deleting: false, timer: null };

  if (REDUCED) {
    el.textContent = roleWords[0];
    return;
  }

  clearTimeout(typing.timer);
  tickTyping();
}

function tickTyping() {
  const el = $('#role-text');
  if (!el || !roleWords.length) return;

  const word = roleWords[typing.word % roleWords.length];

  if (!typing.deleting) {
    typing.char += 1;
    el.textContent = word.slice(0, typing.char);
    if (typing.char >= word.length) {
      typing.deleting = true;
      typing.timer = setTimeout(tickTyping, 1700);
      return;
    }
    typing.timer = setTimeout(tickTyping, 55 + Math.random() * 45);
    return;
  }

  typing.char -= 1;
  el.textContent = word.slice(0, typing.char);
  if (typing.char <= 0) {
    typing.deleting = false;
    typing.word += 1;
    typing.timer = setTimeout(tickTyping, 300);
    return;
  }
  typing.timer = setTimeout(tickTyping, 26);
}

/* ==================================================================
   5. NAV, CHROME, CLOCK
   ================================================================== */
function initNav() {
  const nav = $('#nav');
  const toggle = $('#nav-toggle');
  const links = $('#nav-links');

  window.addEventListener(
    'scroll',
    () => {
      nav?.classList.toggle('is-scrolled', window.scrollY > 40);
      updateScrollSpy();
    },
    { passive: true }
  );

  toggle?.addEventListener('click', () => {
    const open = links?.classList.toggle('is-open');
    toggle.classList.toggle('is-open', Boolean(open));
    toggle.setAttribute('aria-expanded', String(Boolean(open)));
  });

  $$('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      links?.classList.remove('is-open');
      toggle?.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  updateScrollSpy();
}

function updateScrollSpy() {
  const sections = $$('section[id]');
  if (!sections.length) return;
  const marker = window.scrollY + window.innerHeight * 0.32;
  let current = sections[0].id;

  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section.id;
  });

  $$('.nav__link').forEach((link) => {
    link.classList.toggle('is-active', link.dataset.nav === current);
  });

  $$('.prail__dot').forEach((dot) => {
    const on = dot.dataset.target === current;
    dot.classList.toggle('is-active', on);
    dot.setAttribute('aria-current', on ? 'true' : 'false');
  });
}

function initScrollChrome() {
  const progress = $('#scroll-progress');
  const toTop = $('#to-top');

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;
    toTop?.classList.toggle('is-visible', window.scrollY > 700);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
  });
}

function initSectionRail() {
  const rail = $('#prail');
  if (!rail) return;
  rail.addEventListener('click', (event) => {
    const dot = event.target.closest('.prail__dot');
    if (!dot) return;
    document.getElementById(dot.dataset.target)?.scrollIntoView({
      behavior: REDUCED ? 'auto' : 'smooth',
      block: 'start',
    });
  });
}

/* ==================================================================
   6. PROJECTS RAIL
   ================================================================== */
function initProjectsRail() {
  const rail = $('#projects-rail');
  const bar = $('#projects-progress');
  if (!rail) return;

  let pending = false;
  let dragging = false;
  let justDragged = false;
  let startX = 0;
  let startScroll = 0;
  let travelled = 0;

  syncRailBar = () => {
    if (!bar) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const ratio = max > 0 ? rail.scrollLeft / max : 0;
    bar.style.width = `${14 + ratio * 86}%`;
  };

  rail.addEventListener('scroll', syncRailBar, { passive: true });
  window.addEventListener('resize', syncRailBar);
  syncRailBar();

  // Drag-to-scroll, desktop pointers only — touch gets native momentum from
  // `overflow-x: auto`, which feels better.
  // NOTE: avoid setPointerCapture here; capturing the pointer on the rail
  // retargets the following `click` to the rail and kills every button inside.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    rail.addEventListener('mousedown', (event) => {
      if (event.button !== 0) return;
      pending = true;
      dragging = false;
      travelled = 0;
      startX = event.clientX;
      startScroll = rail.scrollLeft;
    });

    window.addEventListener('mousemove', (event) => {
      if (!pending) return;
      const delta = event.clientX - startX;
      travelled = Math.max(travelled, Math.abs(delta));
      if (!dragging && travelled > 5) {
        dragging = true;
        rail.classList.add('is-dragging');
      }
      if (dragging) rail.scrollLeft = startScroll - delta;
    });

    const stopDrag = () => {
      pending = false;
      if (!dragging) return;
      dragging = false;
      rail.classList.remove('is-dragging');
      justDragged = true;
      window.setTimeout(() => {
        justDragged = false;
      }, 0);
    };

    window.addEventListener('mouseup', stopDrag);
  }

  rail.addEventListener(
    'click',
    (event) => {
      if (travelled > 5 || justDragged) {
        event.preventDefault();
        event.stopPropagation();
      }
      travelled = 0;
    },
    true
  );

  const step = () => Math.min(460, rail.clientWidth * 0.8);
  $('#proj-next')?.addEventListener('click', () =>
    rail.scrollBy({ left: step(), behavior: REDUCED ? 'auto' : 'smooth' })
  );
  $('#proj-prev')?.addEventListener('click', () =>
    rail.scrollBy({ left: -step(), behavior: REDUCED ? 'auto' : 'smooth' })
  );

  rail.addEventListener(
    'wheel',
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      rail.scrollLeft += event.deltaY;
      event.preventDefault();
    },
    { passive: false }
  );
}

/* ==================================================================
   7. PROJECT FILTERS
   ================================================================== */
function initFilters() {
  const box = $('#project-filters');
  const track = $('#projects-track');
  const rail = $('#projects-rail');
  const empty = $('#projects-empty');
  if (!box || !track) return;

  const cards = $$('.project', track);

  $$('[data-count-for]', box).forEach((counter) => {
    const id = counter.dataset.countFor;
    const count =
      id === 'all'
        ? cards.length
        : cards.filter((card) => (card.dataset.cats ?? '').split(' ').includes(id)).length;
    counter.textContent = String(count).padStart(2, '0');
  });

  const apply = (id, { initial = false } = {}) => {
    let shown = 0;

    cards.forEach((card) => {
      const match = id === 'all' || (card.dataset.cats ?? '').split(' ').includes(id);
      card.classList.toggle('is-hidden', !match);
      if (match) shown += 1;
    });

    $$('.filter', box).forEach((button) => {
      const on = button.dataset.filter === id;
      button.classList.toggle('is-active', on);
      button.setAttribute('aria-pressed', String(on));
    });

    if (empty) empty.hidden = shown > 0;
    if (rail) rail.scrollLeft = 0;
    syncRailBar();

    const visible = cards.filter((card) => !card.classList.contains('is-hidden'));
    if (!initial && !REDUCED && document.documentElement.classList.contains('js-anim')) {
      gsap.fromTo(
        visible,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out', overwrite: true }
      );
    }
  };

  box.addEventListener('click', (event) => {
    const button = event.target.closest('.filter');
    if (button) apply(button.dataset.filter);
  });

  apply('all', { initial: true });
}

/* ==================================================================
   8. INTERACTIVE CONSOLE
   ================================================================== */
function initConsole() {
  const screen = $('#console-screen');
  const input = $('#console-input');
  if (!screen || !input) return;

  const caret = screen.lastElementChild;
  const card = input.closest('.console');
  card?.addEventListener('click', (event) => {
    if (event.target === input) return;
    input.focus();
  });

  const print = (html, className = 'console__out') => {
    const node = document.createElement('div');
    node.className = className;
    node.innerHTML = html;
    caret?.before(node);
    screen.scrollTop = screen.scrollHeight;
  };

  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;

    const raw = input.value.trim();
    input.value = '';
    if (!raw) return;

    const command = raw.toLowerCase();

    if (command === 'clear') {
      Array.from(screen.children).forEach((node) => {
        if (node !== caret) node.remove();
      });
      return;
    }

    const echo = document.createElement('div');
    echo.className = 'console__line';
    echo.innerHTML = `<span class="console__prompt">~$</span><span class="console__cmd">${escapeHtml(raw)}</span>`;
    caret?.before(echo);

    if (command === 'theme') {
      applyPerspective(currentMode === 'tech' ? 'marketing' : 'tech');
      print(consoleCommands.theme);
      return;
    }

    if (command === 'music' || command === 'fx') {
      if (command === 'fx') {
        if (currentMode !== 'tech') applyPerspective('tech');
        fxWanted = !fxWanted;
      } else {
        musicWanted = !musicWanted;
      }
      syncModeTools();
      print(consoleCommands[command]);
      return;
    }

    if (command === 'game' || command === 'arcade' || command === 'play') {
      // the arcade lives on the marketing side
      if (currentMode !== 'marketing') applyPerspective('marketing');
      print(consoleCommands.game);
      window.setTimeout(openArcade, 420);
      return;
    }

    print(
      consoleCommands[command] ??
        `<span style="color:var(--red)">command not found: ${escapeHtml(command)}</span> — try <strong>help</strong>`
    );
  });
}

/* ==================================================================
   9. DETAIL MODAL
   ================================================================== */
function initModal() {
  const modal = $('#detail-modal');
  if (!modal) return;

  const titleEl = $('#modal-title');
  const subtitleEl = $('#modal-subtitle');
  const textEl = $('#modal-text');
  const tagsEl = $('#modal-tags');
  const kickerEl = $('#modal-kicker');
  const closeBtn = $('#modal-close');

  let lastFocused = null;

  const close = () => {
    gsap.to('.modal__box', {
      y: 18, opacity: 0, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        lastFocused?.focus?.();
      },
    });
  };

  const open = (payload) => {
    if (titleEl) titleEl.textContent = payload.title;
    if (subtitleEl) subtitleEl.textContent = payload.subtitle ?? '';
    if (kickerEl) kickerEl.textContent = payload.kicker ?? 'details';

    const highlights = payload.highlights ?? [];
    if (textEl) {
      textEl.innerHTML =
        `<p>${escapeHtml(payload.desc ?? '')}</p>` +
        (highlights.length
          ? `<ul>${highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
          : '');
    }
    if (tagsEl) {
      tagsEl.innerHTML = (payload.tags ?? [])
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
        .join('');
    }

    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    if (REDUCED) {
      gsap.set('.modal__box', { opacity: 1, y: 0 });
    } else {
      gsap.fromTo(
        '.modal__box',
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
    closeBtn?.focus();
  };

  $$('[data-detail]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const source = detailSources[trigger.dataset.detail];
      const record = source?.find((item) => item.id === trigger.dataset.id);
      if (!record) return;

      if (trigger.dataset.detail === 'project') {
        open({
          kicker: `${record.num} — ${record.category}`,
          title: record.title,
          subtitle: record.category,
          desc: currentMode === 'marketing' ? record.descAlt : record.desc,
          highlights: record.highlights,
          tags: record.tags,
        });
      } else {
        open({
          kicker: record.time,
          title: record.role,
          subtitle: `${record.company} · ${record.location}`,
          desc: currentMode === 'marketing' ? record.descAlt : record.desc,
          highlights: record.highlights,
          tags: record.tags,
        });
      }
    });
  });

  closeBtn?.addEventListener('click', close);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
}

/* ==================================================================
   10. PERSPECTIVE — the theme that actually drives content
   ================================================================== */
const focusOf = (el) => (el.dataset.focus ?? '').split(' ');

function rankForMode(el, mode) {
  return focusOf(el).includes(mode) ? 0 : 1;
}

function sortByFocus(items, mode) {
  return items
    .map((el, i) => ({ el, i }))
    .sort((a, b) => rankForMode(a.el, mode) - rankForMode(b.el, mode) || a.i - b.i)
    .map((entry) => entry.el);
}

function canAnimate() {
  return !REDUCED && document.documentElement.classList.contains('js-anim');
}

function reorder(container, itemSelector, mode, { animate = true } = {}) {
  const box = $(container);
  if (!box) return;
  const items = $$(itemSelector, box);
  if (items.length < 2) return;

  const sorted = sortByFocus(items, mode);
  if (!sorted.some((el, i) => el !== items[i])) return;

  sorted.forEach((el) => box.appendChild(el));

  if (animate && canAnimate()) {
    gsap.fromTo(
      sorted,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.045, ease: 'power2.out', overwrite: true }
    );
  }
}

function reorderTimeline(mode, { animate = true } = {}) {
  const box = $('#tl');
  if (!box) return;
  const items = $$('.tl__item', box);
  if (!items.length) return;

  const sorted = sortByFocus(items, mode);

  sorted.forEach((el, i) => {
    const right = i % 2 === 1;
    el.classList.toggle('tl__item--right', right);
    el.setAttribute('data-reveal', right ? 'right' : 'left');
    box.appendChild(el);
  });

  if (animate && canAnimate()) {
    gsap.fromTo(
      sorted,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', overwrite: true }
    );
  }
}

function applyPerspective(mode, { persist = true, initial = false } = {}) {
  const isMarketing = mode === 'marketing';
  const copy = isMarketing ? perspectiveCopy.marketing : perspectiveCopy.tech;
  currentMode = isMarketing ? 'marketing' : 'tech';

  // The class lives on <html> so token overrides reach every element,
  // including html-level styles such as the scrollbar colour.
  document.documentElement.classList.toggle('mode-marketing', isMarketing);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isMarketing ? '#FBF7EF' : '#0B0C10');

  const techBtn = $('#btn-tech');
  const mktgBtn = $('#btn-mktg');
  techBtn?.classList.toggle('is-active', !isMarketing);
  mktgBtn?.classList.toggle('is-active', isMarketing);
  techBtn?.setAttribute('aria-pressed', String(!isMarketing));
  mktgBtn?.setAttribute('aria-pressed', String(isMarketing));

  const modeLabel = $('#hero-mode-label');
  if (modeLabel) modeLabel.textContent = isMarketing ? 'mktg view' : 'tech view';

  const availability = $('#hero-availability');
  if (availability) availability.textContent = copy.availability;

  const collageRole = $('#collage-role');
  if (collageRole) {
    collageRole.textContent = isMarketing ? 'Growth & Brand Lead' : 'UI Designer & COO';
  }

  const caption = $('#pswitch-caption');
  if (caption) caption.textContent = isMarketing ? 'marketing view' : 'tech view';

  const status = $('#pswitch-status');
  if (status) status.textContent = `${isMarketing ? 'Marketing' : 'Tech'} perspective active`;

  // content order + emphasis.
  // NOTE: content records are tagged `tech` / `growth`, while the mode is
  // `tech` / `marketing` — map before ranking or nothing ever re-sorts.
  const focusKey = isMarketing ? 'growth' : 'tech';
  const animate = !initial;
  reorder('#skills-grid', '.skill-cat', focusKey, { animate });
  reorder('#projects-track', '.project', focusKey, { animate });
  reorderTimeline(focusKey, { animate });

  syncModeTools();
  resetTyping();

  if (persist) {
    try {
      localStorage.setItem('pravesh:perspective', currentMode);
    } catch {
      /* storage blocked — the switch simply won't persist */
    }
  }
}

function initPerspective() {
  $('#btn-tech')?.addEventListener('click', () => applyPerspective('tech'));
  $('#btn-mktg')?.addEventListener('click', () => applyPerspective('marketing'));

  let saved = 'tech';
  try {
    saved = localStorage.getItem('pravesh:perspective') ?? 'tech';
  } catch {
    saved = 'tech';
  }
  applyPerspective(saved, { persist: false, initial: true });
}

/* ==================================================================
   11. ARCADE — "BUG SQUASH"
   ================================================================== */
function initArcade() {
  const arcade = $('#arcade');
  const board = $('#arcade-board');
  if (!arcade || !board) return;

  const cells = $$('.arcade__cell', board);
  const overlay = $('#arcade-overlay');
  const startBtn = $('#arcade-start');
  const startRoll = startBtn?.querySelector('.btn__roll');
  const startRollText = startRoll?.querySelector('span');
  const headline = $('#arcade-headline');
  const blurb = $('#arcade-blurb');
  const result = $('#arcade-result');
  const scoreEl = $('#arcade-score');
  const comboEl = $('#arcade-combo');
  const timeEl = $('#arcade-time');
  const bestEl = $('#arcade-best');

  if (!cells.length) return;

  const DURATION = 30;
  const LIFE_START = 1150;
  const LIFE_MIN = 520;
  const MAX_COMBO = 9;

  const timers = new Set();
  let countdownId = null;
  const state = { playing: false, score: 0, combo: 1, best: 0, timeLeft: DURATION, hits: 0 };
  let finished = false;

  try {
    state.best = Number(localStorage.getItem('pravesh:bugsquash-best') ?? 0) || 0;
  } catch {
    state.best = 0;
  }

  const later = (fn, ms) => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
    return id;
  };

  const clearTimers = () => {
    timers.forEach(clearTimeout);
    timers.clear();
    if (countdownId) clearInterval(countdownId);
    countdownId = null;
  };

  const paintHud = () => {
    if (scoreEl) scoreEl.textContent = String(state.score);
    if (comboEl) comboEl.textContent = `×${state.combo}`;
    if (timeEl) timeEl.textContent = String(Math.max(0, state.timeLeft));
    if (bestEl) bestEl.textContent = String(state.best);
  };

  const clearBoard = () => cells.forEach((cell) => { cell.innerHTML = ''; });

  const breakCombo = () => {
    state.combo = 1;
    paintHud();
  };

  const squash = (bug) => {
    if (!state.playing || bug.classList.contains('is-squashed')) return;

    const gained = state.combo;
    state.score += gained;
    state.hits += 1;
    state.combo = Math.min(MAX_COMBO, state.combo + 1);
    paintHud();

    bug.classList.add('is-squashed');

    const splat = document.createElement('span');
    splat.className = 'arcade__splat';
    splat.textContent = `+${gained}`;
    bug.parentElement?.appendChild(splat);

    later(() => splat.remove(), 520);
    later(() => bug.remove(), 240);
  };

  const spawn = () => {
    if (!state.playing) return;

    const open = cells.filter((cell) => !cell.firstElementChild);
    if (open.length) {
      const cell = open[(Math.random() * open.length) | 0];
      const bug = document.createElement('button');
      bug.type = 'button';
      bug.className = 'arcade__bug';
      bug.setAttribute('aria-label', 'Squash the bug');
      bug.innerHTML = '<i class="fa-solid fa-bug" aria-hidden="true"></i>';
      bug.addEventListener('click', (event) => {
        event.stopPropagation();
        squash(bug);
      });
      cell.appendChild(bug);

      const pressure = 1 - state.timeLeft / DURATION;
      const life = LIFE_START - (LIFE_START - LIFE_MIN) * pressure;
      later(() => {
        if (bug.isConnected && !bug.classList.contains('is-squashed')) {
          bug.remove();
          breakCombo();
        }
      }, life);
    }

    later(spawn, 250 + Math.random() * 230);
  };

  const celebrate = () => {
    if (REDUCED) return;
    const glyphs = ['✦', '★', '●', '▲'];
    const colours = ['#FFD966', '#E4572E', '#2B7CD3', '#61C554'];

    for (let i = 0; i < 16; i += 1) {
      const bit = document.createElement('span');
      bit.textContent = glyphs[i % glyphs.length];
      bit.style.cssText = [
        'position:absolute', 'left:50%', 'top:45%', 'z-index:9',
        'pointer-events:none', `color:${colours[i % colours.length]}`,
        `font-size:${11 + (i % 3) * 6}px`,
      ].join(';');
      board.appendChild(bit);

      gsap.to(bit, {
        x: (Math.random() - 0.5) * 460,
        y: (Math.random() - 0.5) * 300,
        rotate: Math.random() * 400,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out',
        onComplete: () => bit.remove(),
      });
    }
  };

  const stop = () => {
    state.playing = false;
    clearTimers();
    clearBoard();

    const isBest = state.score > state.best;
    if (isBest) {
      state.best = state.score;
      try {
        localStorage.setItem('pravesh:bugsquash-best', String(state.best));
      } catch {
        /* ignore */
      }
      celebrate();
    }

    if (headline) headline.textContent = isBest ? 'NEW HIGH SCORE' : 'TIME UP';
    if (blurb) blurb.hidden = true;
    if (result) {
      result.hidden = false;
      result.innerHTML = `score <b>${state.score}</b> · bugs squashed ${state.hits} · best ${state.best}`;
    }
    if (startRollText) startRollText.textContent = 'Play again';
    if (startRoll) startRoll.dataset.label = 'Again';
    if (overlay) overlay.hidden = false;
    paintHud();
  };

  const start = () => {
    clearTimers();
    clearBoard();
    finished = false;

    state.playing = true;
    state.score = 0;
    state.combo = 1;
    state.timeLeft = DURATION;
    state.hits = 0;

    if (headline) headline.textContent = 'GO!';
    if (result) result.hidden = true;
    if (overlay) overlay.hidden = true;
    paintHud();

    countdownId = window.setInterval(() => {
      state.timeLeft -= 1;
      paintHud();
      if (state.timeLeft <= 0) stop();
    }, 1000);

    spawn();
  };

  openArcade = () => {
    arcade.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    finishResetOnce();
    paintHud();
    startBtn?.focus();
  };

  const finishResetOnce = () => {
    if (finished) return;
    finished = true;
    if (overlay) overlay.hidden = false;
  };

  const close = () => {
    if (state.playing) stop();
    arcade.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  $('#open-arcade')?.addEventListener('click', openArcade);
  $('#arcade-close')?.addEventListener('click', close);
  startBtn?.addEventListener('click', start);

  board.addEventListener('click', (event) => {
    if (!state.playing) return;
    if (event.target.closest('.arcade__bug')) return;
    breakCombo();
    board.classList.add('is-miss');
    later(() => board.classList.remove('is-miss'), 300);
  });

  arcade.addEventListener('click', (event) => {
    if (event.target === arcade) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && arcade.classList.contains('is-open')) {
      close();
      return;
    }

    if (
      event.key.toLowerCase() === 'g' &&
      !event.metaKey && !event.ctrlKey && !event.altKey &&
      !isTyping() &&
      !arcade.classList.contains('is-open') &&
      !$('#detail-modal')?.classList.contains('is-open')
    ) {
      openArcade();
    }
  });

  paintHud();
}

/* ==================================================================
   11b. TECH — interactive particle field
   The "something interesting" that only exists on the dark tech side.
   ================================================================== */
function initFx() {
  const canvas = $('#fx-field');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const COUNT = REDUCED ? 0 : 58;   // no particles when motion is reduced
  const LINK = 132;                 // px — max distance for a connecting line
  const REACH = 170;                // px — cursor influence radius

  const nodes = [];
  const pointer = { x: -9999, y: -9999 };

  let width = 0;
  let height = 0;
  let frameId = 0;
  let running = false;
  let colour = '#5AA9F5';

  const readColour = () => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--t-accent')
      .trim();
    if (value) colour = value;
  };

  const seed = () => {
    nodes.length = 0;
    for (let i = 0; i < COUNT; i += 1) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: 1 + Math.random() * 1.5,
      });
    }
  };

  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  };

  const draw = () => {
    frameId = 0;
    if (!running) return;

    ctx.clearRect(0, 0, width, height);

    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // the field leans away from the cursor
      const dx = node.x - pointer.x;
      const dy = node.y - pointer.y;
      const dist2 = dx * dx + dy * dy;
      if (dist2 < REACH * REACH && dist2 > 0.5) {
        const dist = Math.sqrt(dist2);
        const push = ((REACH - dist) / REACH) * 1.1;
        node.x += (dx / dist) * push;
        node.y += (dy / dist) * push;
      }
      node.x = Math.min(width, Math.max(0, node.x));
      node.y = Math.min(height, Math.max(0, node.y));
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = colour;

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist > LINK) continue;
        ctx.globalAlpha = (1 - dist / LINK) * 0.24;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = colour;
    for (const node of nodes) {
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    frameId = requestAnimationFrame(draw);
  };

  const start = () => {
    if (running || !nodes.length) return;
    running = true;
    if (!frameId) frameId = requestAnimationFrame(draw);
  };

  const stop = () => {
    running = false;
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    ctx.clearRect(0, 0, width, height);
  };

  window.addEventListener('resize', () => {
    const wasRunning = running;
    stop();
    resize();
    if (wasRunning) start();
  });

  window.addEventListener(
    'mousemove',
    (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    },
    { passive: true }
  );
  document.addEventListener('mouseleave', () => {
    pointer.x = -9999;
    pointer.y = -9999;
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (canvas.dataset.active === 'true') start();
  });

  readColour();
  resize();

  fx = {
    setActive(on) {
      canvas.dataset.active = String(on);
      readColour();
      if (on) start();
      else stop();
    },
  };
}

/* ==================================================================
   11c. THE SOUNDTRACK — audio only, driven by the nav's Music button
   The YouTube playlist from `site.musicPlaylist` streams from an embed
   parked off-screen, in playlist order, looping. Nothing shows on the
   page: the Music button's equaliser is the state indicator, and its
   tooltip carries the current track.
   If YouTube can't play — offline, blocked, autoplay refused — an
   in-browser Web Audio loop takes over, because silence is the one
   outcome this must never end on.
   ================================================================== */
function initMusic() {
  const btn = $('#toggle-music');
  const host = $('#music-frame');
  if (!btn || !host) {
    btn?.setAttribute('hidden', '');
    return;
  }

  const { id, label } = site.musicPlaylist;
  const synth = initSynth();

  let player = null;
  let ready = false;
  let useSynth = false;
  let wanted = false;
  let watchdog = 0;
  let apiPromise = null;

  const describe = (text) => {
    btn.title = text ? `${label} — ${text}` : `${label} — background music`;
  };
  describe('');

  /**
   * The embed is cross-origin, so it must be granted the autoplay permission
   * explicitly — without `allow="autoplay"` Chrome loads the playlist but
   * refuses to start it with sound. YT creates the iframe, so catch it as soon
   * as it lands in the host.
   */
  const grantAutoplay = () => {
    const frame = host.querySelector('iframe');
    if (frame) {
      frame.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
    }
  };
  grantAutoplay();
  new MutationObserver(grantAutoplay).observe(host, { childList: true, subtree: true });

  const loadApi = () => {
    if (apiPromise) return apiPromise;
    apiPromise = new Promise((resolve, reject) => {
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
        return;
      }
      const timer = window.setTimeout(() => reject(new Error('timeout')), 9000);
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        window.clearTimeout(timer);
        prev?.();
        resolve(window.YT);
      };
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => {
        window.clearTimeout(timer);
        reject(new Error('blocked'));
      };
      document.head.appendChild(script);
    });
    return apiPromise;
  };

  const buildPlayer = (YT) =>
    new Promise((resolve, reject) => {
      const timer = window.setTimeout(() => {
        if (!ready) reject(new Error('timeout'));
      }, 12000);

      new YT.Player(host, {
        width: '200',
        height: '200',
        playerVars: {
          listType: 'playlist',
          list: id,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            window.clearTimeout(timer);
            ready = true;
            resolve(event.target);
          },
          onError: () => {
            // a single dead track shouldn't kill the playlist — only a player
            // that never became ready is treated as a failure
            if (!ready) {
              window.clearTimeout(timer);
              reject(new Error('unplayable'));
            }
          },
          onStateChange: (event) => {
            btn.dataset.state = String(event.data);
            try {
              const data = event.target.getVideoData();
              if (data && data.title) describe(data.title);
            } catch {
              /* the title read is best-effort */
            }
          },
        },
      });
    });

  const startSynth = () => {
    useSynth = true;
    synth?.setActive(true);
    describe('built-in loop (YouTube unavailable)');
    showToast('♪ YouTube unavailable — playing the built-in loop');
  };

  /** a muted autoplay still counts as a refusal from the listener's side */
  const unmute = () => {
    if (!player) return;
    try {
      if (player.isMuted()) {
        player.unMute();
        player.setVolume(100);
      }
    } catch {
      /* the player isn't answering yet */
    }
  };

  /**
   * Watchdog: an autoplay refusal is silent, and so is buffering that never
   * turns into playback. So 5s in, retry once (unmuting first); 10s in, hand
   * over to the built-in loop. Silence is the one outcome this must never end
   * on.
   */
  const ensurePlaying = (attempt) => {
    window.clearTimeout(watchdog);
    watchdog = window.setTimeout(
      () => {
        if (!wanted || useSynth || !player) return;

        let state = -1;
        try {
          state = player.getPlayerState();
        } catch {
          /* not answering yet */
        }

        if (state === 1) {
          unmute();
          return;
        }

        if (attempt === 0) {
          unmute();
          try {
            player.playVideo();
          } catch {
            /* the next attempt handles it */
          }
          ensurePlaying(1);
        } else {
          startSynth();
        }
      },
      attempt === 0 ? 5000 : 5000
    );
  };

  music = {
    async setActive(on) {
      wanted = on;

      if (!on) {
        window.clearTimeout(watchdog);
        if (useSynth) {
          synth?.setActive(false);
        } else {
          try {
            player?.pauseVideo();
          } catch {
            /* the player may not exist yet */
          }
        }
        return;
      }

      if (useSynth) {
        synth?.setActive(true);
        return;
      }

      try {
        const YT = await loadApi();
        if (!player) player = await buildPlayer(YT);
        if (!wanted) return; // switched off while the API was loading

        player.setLoop(true); // the whole playlist, in order, on repeat
        player.playVideo();
        ensurePlaying(0);
      } catch {
        startSynth();
      }
    },
  };

  if (import.meta.env.DEV) window.__probsMusic = () => player;
}

/* ---- fallback loop: a small lo-fi pattern built with the Web Audio API ---- */
function initSynth() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;

  const TEMPO = 76;
  const BEAT = 60 / TEMPO;
  const STEP = BEAT / 2; // eighth notes

  // Am7 · Fmaj7 · Cmaj7 · G7
  const CHORDS = [
    [220.0, 261.63, 329.63, 392.0],
    [174.61, 220.0, 261.63, 349.23],
    [130.81, 196.0, 261.63, 329.63],
    [196.0, 246.94, 293.66, 349.23],
  ];
  const BASS = [110.0, 87.31, 65.41, 98.0];

  let ctx = null;
  let master = null;
  let pad = null;
  let schedulerId = null;
  let step = 0;
  let nextTime = 0;

  const build = () => {
    ctx = new AudioCtx();

    master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);

    pad = ctx.createBiquadFilter();
    pad.type = 'lowpass';
    pad.frequency.value = 1500;
    pad.Q.value = 0.6;
    pad.connect(master);
  };

  const voice = (freq, at, dur, type, level) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.linearRampToValueAtTime(level, at + 0.09);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    osc.connect(gain);
    gain.connect(pad);
    osc.start(at);
    osc.stop(at + dur + 0.05);
  };

  const kick = (at) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(120, at);
    osc.frequency.exponentialRampToValueAtTime(45, at + 0.12);
    gain.gain.setValueAtTime(0.2, at);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.22);
    osc.connect(gain);
    gain.connect(master);
    osc.start(at);
    osc.stop(at + 0.26);
  };

  const hat = (at) => {
    const length = 1024;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 7000;
    const gain = ctx.createGain();
    gain.gain.value = 0.03;
    src.connect(hp);
    hp.connect(gain);
    gain.connect(master);
    src.start(at);
  };

  const schedule = () => {
    if (!ctx) return;
    while (nextTime < ctx.currentTime + 0.25) {
      const bar = Math.floor(step / 8) % 4;

      if (step % 8 === 0) {
        CHORDS[bar].forEach((freq, i) =>
          voice(freq, nextTime, BEAT * 4.2, i % 2 ? 'sine' : 'triangle', 0.03)
        );
      }
      if (step % 4 === 0) kick(nextTime);
      if (step % 4 === 2) hat(nextTime);
      if (step % 8 === 0 || step % 8 === 6) {
        voice(BASS[bar], nextTime, BEAT * 1.4, 'sine', 0.06);
      }

      nextTime += STEP;
      step += 1;
    }
  };

  const start = async () => {
    try {
      if (!ctx) build();
      if (ctx.state === 'suspended') await ctx.resume();

      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.34, ctx.currentTime + 1.4);

      if (schedulerId) return;
      step = 0;
      nextTime = ctx.currentTime + 0.1;
      schedule();
      schedulerId = window.setInterval(schedule, 60);
    } catch {
      /* autoplay blocked — the button simply won't light up */
      musicWanted = false;
      syncModeTools();
    }
  };

  const stop = () => {
    if (!ctx || !schedulerId) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    window.clearInterval(schedulerId);
    schedulerId = null;
  };

  return {
    setActive(on) {
      if (on) start();
      else stop();
    },
  };
}

/* ==================================================================
   11d. MODE TOOLS — the extras belong to a side
   tech      → particle field
   marketing → mini game + music
   ================================================================== */
function syncModeTools() {
  const isMarketing = currentMode === 'marketing';

  $('#toggle-fx')?.setAttribute('aria-pressed', String(fxWanted && !isMarketing));
  $('#toggle-music')?.setAttribute('aria-pressed', String(musicWanted));

  // the particle field belongs to tech; the music follows you everywhere
  fx?.setActive(!isMarketing && fxWanted);
  music?.setActive(musicWanted);
}

function initModeTools() {
  $('#toggle-fx')?.addEventListener('click', () => {
    fxWanted = !fxWanted;
    syncModeTools();
  });

  $('#toggle-music')?.addEventListener('click', () => {
    musicWanted = !musicWanted;
    syncModeTools();
    // no panel, so the toast is the confirmation
    showToast(musicWanted ? '♪ music on' : '♪ music off');
  });

  syncModeTools();
}

/* ==================================================================
   12. CONTACT, COPY, AMBIENCE
   ================================================================== */
let toastEl = null;
function showToast(message) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  toastEl.classList.add('is-visible');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toastEl.classList.remove('is-visible'), 3600);
}

async function copyToClipboard(value, message) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'absolute';
    area.style.left = '-9999px';
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand('copy');
    } catch {
      /* nothing else we can do */
    }
    area.remove();
  }
  if (message) showToast(message);
}

function initCopyEmail() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;
    copyToClipboard(button.dataset.copy, '✱ email copied to clipboard');
    button.classList.add('is-done');
    window.setTimeout(() => button.classList.remove('is-done'), 1500);
  });
}

function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    // The Formspree endpoint in this component is a placeholder, so we show a
    // crafted confirmation instead of navigating to a dead page.
    // Swap in a real endpoint id and delete this handler to send for real.
    event.preventDefault();
    if (!form.reportValidity()) return;

    showToast("✱ message queued — I'll get back to you within 24h");
    form.reset();
  });
}

function initSpotlight() {
  $$('.spot').forEach((el) => {
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

function initParallax() {
  if (REDUCED) return;
  const hero = $('#home');
  const layers = $$('[data-parallax]');
  if (!hero || !layers.length) return;

  hero.addEventListener('mousemove', (event) => {
    const rect = hero.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;

    layers.forEach((el) => {
      const factor = Number.parseFloat(el.dataset.parallax) || 0.05;
      el.style.translate = `${(-nx * factor * 190).toFixed(1)}px ${(-ny * factor * 190).toFixed(1)}px`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    layers.forEach((el) => {
      el.style.translate = '';
    });
  });
}

function initAmbient() {
  if (REDUCED) return;

  $$('.doodle').forEach((el, i) => {
    gsap.to(el, {
      y: i % 2 === 0 ? -10 : -7,
      x: i % 2 === 0 ? 4 : -5,
      duration: 2.8 + i * 0.35,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  const badge = $('.collage__badge');
  if (badge) gsap.to(badge, { y: -8, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  const note = $('.collage__note');
  if (note) gsap.to(note, { rotate: -3.5, duration: 4.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
}

/* the marquee speeds up while you scroll, then eases back.
   NOTE: do *not* rewrite `animation-duration` on a running animation — the
   browser re-maps the elapsed time onto the new duration, so the strip jumps
   forward every frame (the "glitchy carousel" bug). WAAPI's playbackRate
   changes the speed while keeping the current position. */
function initMarqueeSpeed() {
  if (REDUCED) return;

  const strips = $$('[data-marquee]')
    .map((el) => {
      const track = $('.marquee__track', el);
      if (!track || typeof track.getAnimations !== 'function') return null;
      const [animation] = track.getAnimations();
      if (!animation || typeof animation.updatePlaybackRate !== 'function') return null;
      return animation;
    })
    .filter(Boolean);

  if (!strips.length) return;

  let lastY = window.scrollY;
  let velocity = 0;

  window.addEventListener(
    'scroll',
    () => {
      const now = window.scrollY;
      velocity = Math.min(1, Math.abs(now - lastY) / 48);
      lastY = now;
    },
    { passive: true }
  );

  let applied = 1;

  const loop = () => {
    velocity *= 0.94;
    const rate = 1 + velocity * 7;
    if (Math.abs(rate - applied) > 0.01) {
      strips.forEach((animation) => animation.updatePlaybackRate(rate));
      applied = rate;
    }
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
}

/* ==================================================================
   START
   ================================================================== */
function start() {
  try {
    boot();
  } catch (error) {
    // Never leave the page in a half-hidden state.
    console.error('[portfolio] init failed:', error);
    document.documentElement.classList.remove('js-anim');
    $('#loader')?.classList.add('is-hidden');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
