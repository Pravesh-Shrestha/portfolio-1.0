/**
 * Site-wide identity, navigation and contact details.
 * Single source of truth for anything that appears in more than one place.
 */

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export const site = {
  /** The public brand / handle used everywhere in the UI. */
  brand: 'PROBS',
  name: 'Pravesh Kumar Shrestha',
  first: 'Pravesh',
  handle: 'probs',
  initials: 'PK',
  tagline: 'design · build · grow',
  title: 'PROBS — Pravesh Kumar Shrestha · UI Designer, Full-Stack Developer & COO',
  description:
    'PROBS — the portfolio of Pravesh Kumar Shrestha, a UI designer, full-stack developer and COO building digital products at the intersection of design, engineering and growth.',
  location: 'Kathmandu, Nepal',
  timezone: 'Asia/Kathmandu',
  availability: 'Available for hire',
  email: 'sthapravesh12@gmail.com',
  phone: '+977 9767224529',
  resumeUrl: '/resume/Pravesh_Kumar_Shrestha.pdf',
  ogImage: '/images/probs-color.jpg',

  /**
   * The marketing side's soundtrack. Played through the YouTube IFrame
   * player, always shuffled — see `initMusic()` in `src/scripts/main.js`.
   * Swap `id` for any public playlist id.
   */
  musicPlaylist: {
    id: 'PLWV_NGsz4mKg',
    url: 'https://www.youtube.com/playlist?list=PLWV_NGsz4mKg',
    label: 'lofi.fm',
  },
} as const;

/** Role strings for the hero typewriter, per perspective. */
export const rolesByTheme: Record<'tech' | 'marketing', string[]> = {
  tech: [
    'UI / UX Designer',
    'Full-Stack Developer',
    'Kotlin Android Dev',
    'Security-Minded Builder',
    'COO @ HIREO',
  ],
  marketing: [
    'Growth Strategist',
    'Brand & Campaign Lead',
    'Product Marketer',
    'UI / UX Designer',
    'COO @ HIREO',
  ],
};

/** Default (tech) roles, also used for the server-rendered first paint. */
export const roles: string[] = rolesByTheme.tech;

/** Words that scroll through the marquee strip. */
export const marqueeWords: string[] = [
  'UI Design',
  'Full-Stack Dev',
  'GSAP Animations',
  'Kotlin Android',
  'React & NodeJS',
  'PostgreSQL',
  'Docker & DevOps',
  'Figma Prototyping',
  'Growth Strategy',
  'UX Research',
  'Security Engineering',
];

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certs', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
];

export const socials: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pravesh-kumar-shrestha-96a357247/',
    icon: 'fa-brands fa-linkedin-in',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Pravesh-Shrestha',
    icon: 'fa-brands fa-github',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/probs.img/',
    icon: 'fa-brands fa-instagram',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/prabesh.shresthaa',
    icon: 'fa-brands fa-facebook-f',
  },
];
