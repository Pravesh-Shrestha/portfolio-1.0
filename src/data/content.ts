/**
 * All portfolio content, typed and decoupled from presentation.
 *
 * Every record carries a `focus` tag. The perspective switch (tech ⇄
 * marketing) uses those tags to reorder the sections and swap in the
 * alternative description — that's what makes the toggle feel real
 * rather than cosmetic.
 */

export type Focus = 'tech' | 'growth';

/* ------------------------------------------------------------------
   ABOUT
   ------------------------------------------------------------------ */
export interface Stat {
  value: string;
  target?: number;
  label: string;
  tone?: 'yellow' | 'pink' | 'mint' | 'lav';
}

export const aboutBio = {
  tech: [
    'Final-year Computing student at <strong>Coventry University / Softwarica</strong>, currently designing at <strong>PRESS1 Technologies</strong> while serving as <strong>COO at HIREO</strong>. I sit right on the seam between how a product <em>looks</em> and how it is <em>built</em>.',
    'My work spans a gamified LMS evaluated by 470 students, a Zero-Trust e-commerce build hardened with OWASP practices, and international product roadmaps for DigiSchool Australia.',
  ],
  marketing: [
    'I treat every product as a growth problem first. As <strong>Marketing Officer at PRESS1 Technologies</strong> and <strong>COO at HIREO</strong>, I run campaigns, brand systems and funnels that turn attention into adoption.',
    'That means positioning, content systems, event programmes and analytics — grounded in user research rather than guesswork. At Hult Prize Nepal I lifted registrations <strong>40% year over year</strong>.',
  ],
  chipsTech: ['Design Thinking', 'Agile / Scrum', 'Systems Architecture', 'UX Research'],
  chipsMarketing: ['Positioning', 'Campaign Systems', 'Funnel Analytics', 'Brand Strategy'],
};

export const aboutStats: Stat[] = [
  { value: '7', target: 7, label: 'Products designed & shipped', tone: 'yellow' },
  { value: '3', target: 3, label: 'Years across design & dev', tone: 'pink' },
  { value: '84.5', label: 'SUS score (Grade A) — Nexus UX', tone: 'mint' },
  { value: '40%', label: 'YoY registration lift — Hult Prize', tone: 'lav' },
];

export const heroStats: Stat[] = [
  { value: '7', target: 7, label: 'Projects' },
  { value: '3', target: 3, label: 'Years' },
  { value: '5', target: 5, label: 'Certs' },
];

export const heroChipsTech = ['Figma', 'React', 'NodeJS', 'Kotlin', 'PostgreSQL', 'Docker'];
export const heroChipsMarketing = ['Positioning', 'Funnels', 'Analytics', 'Content', 'Brand', 'Research'];

/* ------------------------------------------------------------------
   PERSPECTIVE COPY — headings that swap with the theme
   ------------------------------------------------------------------ */
export const perspectiveCopy = {
  tech: {
    aboutHeading: 'A dev who <span class="text-accent">designs</span>,<br />a designer who <span class="text-accent text-accent--mint">builds</span>.',
    projectsHeading: "Things I've <span class=\"text-accent\">built</span>",
    skillsHeading: 'What I <span class="text-accent">build with</span>',
    contactHeading: "Let's build<br />something <span class=\"text-accent\">great</span>.",
    stackLabel: 'core stack',
    availability: 'Available for hire',
  },
  marketing: {
    aboutHeading: 'A marketer who <span class="text-accent">designs</span>,<br />a designer who <span class="text-accent text-accent--mint">sells</span>.',
    projectsHeading: "Things I've <span class=\"text-accent\">shipped</span>",
    skillsHeading: 'What I <span class="text-accent">grow with</span>',
    contactHeading: "Let's grow<br />something <span class=\"text-accent\">great</span>.",
    stackLabel: 'growth stack',
    availability: 'Taking new projects',
  },
};

/* ------------------------------------------------------------------
   EXPERIENCE
   ------------------------------------------------------------------ */
export interface ExperienceItem {
  id: string;
  time: string;
  role: string;
  company: string;
  location: string;
  desc: string;
  descAlt: string;
  tags: string[];
  accent?: boolean;
  focus: Focus[];
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: 'exp-hireo-coo',
    time: 'September 2026 — Present',
    role: 'Chief Operating Officer',
    company: 'HIREO',
    location: 'Kathmandu, Nepal',
    desc: 'Leading operational strategy, overseeing hiring pipelines, and driving company scaling initiatives.',
    descAlt: 'Scaling the operating system of the company — hiring funnel, delivery cadence and the metrics leadership steers by.',
    tags: ['Operations', 'Leadership', 'Strategy'],
    accent: true,
    focus: ['growth'],
    highlights: [
      'Set operational strategy and OKRs across design, delivery and hiring.',
      'Rebuilt the hiring pipeline end-to-end, cutting time-to-hire.',
      'Own cross-team delivery cadence and reporting to leadership.',
    ],
  },
  {
    id: 'exp-press1',
    time: 'April 2026 — Present',
    role: 'UI Designer & Marketing Officer',
    company: 'PRESS1 Technologies',
    location: 'Denver, CO · Remote',
    desc: 'Designing high-fidelity prototypes and data-driven marketing strategies to scale brand awareness and user acquisition.',
    descAlt: 'Owning the growth story as well as the pixels — campaigns, landing pages and funnel experiments that turn design into pipeline.',
    tags: ['Figma', 'React', 'Canva', 'Digital Growth'],
    focus: ['growth'],
    highlights: [
      'Own end-to-end UI design: research, wireframes, high-fidelity prototypes and handoff.',
      'Build and maintain the marketing site in React alongside the design system.',
      'Run acquisition experiments and report on funnel performance.',
    ],
  },
  {
    id: 'exp-digischool',
    time: 'September 2025 — April 2026',
    role: 'Project Lead & Facilitator',
    company: 'DigiSchool Global',
    location: 'Kathmandu · Remote',
    desc: 'Directed product roadmaps for DigiSchool Australia — frontend development, scrum management and team coordination.',
    descAlt: 'Taking an education product into a new market — localisation, positioning and a roadmap built from customer conversations.',
    tags: ['React', 'NodeJS', 'Agile', 'Project Management'],
    focus: ['tech'],
    highlights: [
      'Owned the roadmap for the Australia market across two release cycles.',
      'Ran scrum ceremonies and coordinated a distributed dev team.',
      'Shipped frontend features in React and NodeJS.',
    ],
  },
  {
    id: 'exp-hult',
    time: 'March 2025 — March 2026',
    role: 'Marketing Coordinator',
    company: 'Hult Prize Nepal',
    location: 'Kathmandu',
    desc: 'Boosted registrations 40% year over year through targeted campaigns and kept the visual brand consistent across programmes.',
    descAlt: 'Turned brand consistency into measurable growth — a 40% year-over-year rise in registrations across the national programme.',
    tags: ['Brand Strategy', 'Canva', 'Event Organizing'],
    focus: ['growth'],
    highlights: [
      'Designed and ran multi-channel campaigns for the national round.',
      'Grew registrations by 40% year over year.',
      'Produced all event branding and on-site collateral.',
    ],
  },
  {
    id: 'exp-hireo-hm',
    time: 'June 2024 — September 2026',
    role: 'Hiring Manager',
    company: 'HIREO',
    location: 'Nepal',
    desc: 'Talent sourcing, candidate screening, assessment coordination and onboarding workflows.',
    descAlt: 'Built the top of the funnel — sourcing, screening and structured assessments so the team hires on signal, not gut feel.',
    tags: ['Recruitment', 'Operations', 'Team Leadership'],
    focus: ['growth'],
    highlights: [
      'Sourced and screened candidates across technical and design roles.',
      'Built assessment rubrics and structured interview loops.',
      'Owned onboarding workflows for new joiners.',
    ],
  },
  {
    id: 'exp-ambassador',
    time: 'December 2022 — Present',
    role: 'IT Student Ambassador',
    company: 'Coventry University / Tech & Trendy',
    location: 'Kathmandu',
    desc: 'Facilitating AR/VR workshops, mentoring junior computing students and representing the university at tech events.',
    descAlt: 'Community-led growth — workshops, mentorship and representing the university where future students actually are.',
    tags: ['AR/VR', 'Mentorship', 'Public Speaking'],
    focus: ['tech'],
    highlights: [
      'Delivered AR/VR workshops for incoming computing cohorts.',
      'Mentored junior students on coursework and portfolios.',
      'Represented the university at national tech events.',
    ],
  },
];

/* ------------------------------------------------------------------
   SKILLS
   ------------------------------------------------------------------ */
export interface SkillItem { name: string; percent: number; }
export interface SkillCategory {
  icon: string;
  label: string;
  tone: 'yellow' | 'mint' | 'pink' | 'blue';
  focus: Focus;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    icon: 'fa-laptop-code',
    label: 'Frontend & Mobile',
    tone: 'yellow',
    focus: 'tech',
    skills: [
      { name: 'JavaScript & ES6+', percent: 90 },
      { name: 'React & Redux', percent: 85 },
      { name: 'Kotlin / Android SDK', percent: 80 },
      { name: 'Flutter / Dart', percent: 75 },
    ],
  },
  {
    icon: 'fa-palette',
    label: 'Design & Strategy',
    tone: 'pink',
    focus: 'growth',
    skills: [
      { name: 'Figma & Prototyping', percent: 90 },
      { name: 'Brand & Visual Systems', percent: 88 },
      { name: 'UX Research & Testing', percent: 85 },
      { name: 'Digital Growth Strategy', percent: 82 },
    ],
  },
  {
    icon: 'fa-server',
    label: 'Backend & Data',
    tone: 'mint',
    focus: 'tech',
    skills: [
      { name: 'NodeJS & Express', percent: 80 },
      { name: 'SQL (MySQL, PostgreSQL)', percent: 85 },
      { name: 'Python & Pandas', percent: 75 },
      { name: 'Docker & DevOps', percent: 70 },
    ],
  },
  {
    icon: 'fa-bullhorn',
    label: 'Growth & Analytics',
    tone: 'blue',
    focus: 'growth',
    skills: [
      { name: 'Campaign & Funnel Design', percent: 85 },
      { name: 'Content & Copy Systems', percent: 80 },
      { name: 'Analytics & Reporting', percent: 78 },
      { name: 'Community & Events', percent: 80 },
    ],
  },
];

/* ------------------------------------------------------------------
   PROJECTS
   ------------------------------------------------------------------ */
export interface ProjectLink { label: string; href: string; icon: string; }
export interface Project {
  id: string;
  num: string;
  category: string;
  title: string;
  desc: string;
  descAlt: string;
  tags: string[];
  cats: string[];
  badge?: { text: string; type: 'security' | 'ai' | 'ux' | 'live' | 'plain' };
  links: ProjectLink[];
  highlights: string[];
  focus: Focus[];
}

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'security', label: 'Security' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'ux', label: 'UX' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'web', label: 'Web' },
];

const GH = 'https://github.com/Pravesh-Shrestha';

export const projects: Project[] = [
  {
    id: 'proj-pawstore',
    num: '01',
    category: 'Security · Full-Stack',
    title: 'PawStore',
    desc: 'A secure multi-tier e-commerce app for pet accessories. Built on a Zero Trust model with FIDO2/WebAuthn passkeys, Argon2id hashing, RBAC and a full DevSecOps pipeline.',
    descAlt: 'A trust-first storefront for a niche Nepali market — hardened checkout, transparent pricing and a launch push that turned browsers into repeat buyers.',
    tags: ['React', 'NodeJS', 'Docker', 'OWASP', 'WebAuthn'],
    cats: ['security', 'web'],
    badge: { text: '🔐 5 vulnerabilities found & patched', type: 'security' },
    links: [{ label: 'Code', href: GH, icon: 'fa-brands fa-github' }],
    focus: ['tech'],
    highlights: [
      'Zero Trust architecture with role-based access control.',
      'Passwordless auth via FIDO2 / WebAuthn passkeys.',
      'Argon2id password hashing and hardened session handling.',
      'OWASP penetration test — 5 vulnerabilities found and patched.',
      'Automated DevSecOps pipeline on GitHub Actions.',
    ],
  },
  {
    id: 'proj-academia',
    num: '02',
    category: 'AI · EdTech · Dissertation',
    title: 'Academia LMS',
    desc: 'Final-year dissertation: a gamified three-tier LMS that fights student disengagement using behavioural economics, with an ML disengagement predictor and ethical XP caps.',
    descAlt: 'A retention play disguised as a learning product — behavioural nudges, streak psychology and XP caps that keep students coming back without burning them out.',
    tags: ['React', 'NodeJS', 'Python ML', 'Gemini AI', 'PostgreSQL'],
    cats: ['ai', 'web'],
    badge: { text: '🤖 470 students evaluated', type: 'ai' },
    links: [{ label: 'Code', href: GH, icon: 'fa-brands fa-github' }],
    focus: ['tech'],
    highlights: [
      'Gamified learning loops grounded in behavioural economics.',
      'Gemini-powered study companion for learners.',
      'Machine-learning predictor to flag disengagement early.',
      'Ethical XP caps to avoid compulsive usage patterns.',
      'Evaluated with 470 students across cohorts.',
    ],
  },
  {
    id: 'proj-nexus',
    num: '03',
    category: 'UX Design · Mobile',
    title: 'Nexus',
    desc: 'A mobile social app for gamers: unified player profiles, location-based squadmate discovery, community groups, event management and real-time chat.',
    descAlt: 'A community growth engine for gamers — sharp positioning, a frictionless onboarding flow and a usability programme that scored 84.5 on the SUS scale.',
    tags: ['Flutter', 'Firebase', 'Figma', 'UX Research'],
    cats: ['ux', 'mobile'],
    badge: { text: '✨ SUS score 84.5 / 100 (Grade A)', type: 'ux' },
    links: [{ label: 'Code', href: GH, icon: 'fa-brands fa-github' }],
    focus: ['growth'],
    highlights: [
      'End-to-end UX process: research, flows, wireframes, prototypes.',
      'Usability tested with the System Usability Scale — 84.5/100 (Grade A).',
      'Location-based squadmate matching.',
      'Real-time chat and community event management.',
    ],
  },
  {
    id: 'proj-peerpicks',
    num: '04',
    category: 'Social · Web & Mobile',
    title: 'PeerPicks',
    desc: 'A community-driven review ecosystem for local establishments — a web curation platform plus a companion Android app with location-aware discovery and verified recommendations.',
    descAlt: 'A local-discovery platform built around social proof: verified reviews, a city-by-city rollout and a creator seeding plan that gave it early momentum.',
    tags: ['JavaScript', 'Kotlin', 'Android', 'Firebase'],
    cats: ['mobile', 'web'],
    badge: { text: '🟢 Live · Mar 2026', type: 'live' },
    links: [
      { label: 'Web', href: `${GH}/WEB-PeerPicks`, icon: 'fa-solid fa-globe' },
      { label: 'App', href: `${GH}/Peerpicks-App`, icon: 'fa-brands fa-android' },
    ],
    focus: ['growth'],
    highlights: [
      'Centralises verified reviews for restaurants, retail and services.',
      'Structured, category-based discovery replacing unstructured feeds.',
      'Location-aware recommendations on both web and Android.',
      'Companion app with device-level personalisation.',
    ],
  },
  {
    id: 'proj-karya',
    num: '05',
    category: 'Marketplace · Android',
    title: 'KaryaConnect Nepal',
    desc: 'A freelance marketplace connecting clients with skilled IT professionals across Nepal — real-time chat, safe payments, public profiles and project tracking.',
    descAlt: 'Solving marketplace cold-start for Nepali IT freelancers — a supply-first acquisition plan and trust signals at every step of the journey.',
    tags: ['Kotlin', 'Android Studio', 'Firebase', 'Material Design'],
    cats: ['mobile'],
    links: [{ label: 'Code', href: `${GH}/KARYA-CONNECT-NEPAL`, icon: 'fa-brands fa-github' }],
    focus: ['tech'],
    highlights: [
      'Bridges clients and IT freelancers in one marketplace.',
      'Real-time messaging and project state tracking.',
      'Client and freelancer profile systems with portfolio uploads.',
      'Built in Kotlin with Material Design components.',
    ],
  },
  {
    id: 'proj-bagaicha',
    num: '06',
    category: 'POS System · Web',
    title: 'Bagaicha POS',
    desc: 'A custom point-of-sale system for a flower shop — order tracking, invoice generation, inventory management and sales reporting for local florists.',
    descAlt: 'An operations product for a family business: fewer manual steps, faster billing and reporting the owner actually reads.',
    tags: ['React', 'NodeJS', 'MySQL', 'Express'],
    cats: ['web'],
    links: [{ label: 'Code', href: GH, icon: 'fa-brands fa-github' }],
    focus: ['tech'],
    highlights: [
      'Streamlines daily order tracking for local florists.',
      'Automated invoice generation.',
      'Inventory management with low-stock visibility.',
      'Sales reporting dashboards for owners.',
    ],
  },
  {
    id: 'proj-hajiri',
    num: '07',
    category: 'SaaS · Education',
    title: 'Hajiri',
    desc: 'An automated attendance platform for academic institutions that tracks check-in and check-out, calculates monthly percentages and exports printable reports.',
    descAlt: 'An institutional SaaS play — cutting admin overhead and turning attendance data into something faculty can actually act on.',
    tags: ['React', 'NodeJS', 'Express', 'PostgreSQL'],
    cats: ['web'],
    links: [{ label: 'Code', href: GH, icon: 'fa-brands fa-github' }],
    focus: ['tech'],
    highlights: [
      'Automated check-in / check-out tracking.',
      'Monthly attendance percentage calculation per student.',
      'Printable, exportable institutional reports.',
      'Role-separated views for staff and students.',
    ],
  },
];

/* ------------------------------------------------------------------
   CERTIFICATIONS
   ------------------------------------------------------------------ */
export interface Cert {
  icon: string;
  title: string;
  issuer: string;
  date: string;
  desc: string;
  tags: string[];
}

export const certs: Cert[] = [
  {
    icon: 'fa-cloud-arrow-up',
    title: 'DevOps Training',
    issuer: 'Broadway Infosys',
    date: 'April 2026',
    desc: '22-hour intensive covering containerisation, CI/CD pipelines and cloud deployments.',
    tags: ['Docker', 'CI/CD', 'AWS'],
  },
  {
    icon: 'fa-user-shield',
    title: 'COFPS',
    issuer: 'Hack & Fix',
    date: 'May 2026',
    desc: 'Certified Online Fraud Prevention Specialist — web security, encryption and transaction auditing.',
    tags: ['Web Security', 'Encryption', 'Fraud'],
  },
  {
    icon: 'fa-brain',
    title: 'Prompt Engineering & AI',
    issuer: 'DataCamp',
    date: 'December 2025',
    desc: 'Large language models, system prompting, AI ethics and practical application.',
    tags: ['LLMs', 'AI Ethics', 'Prompting'],
  },
  {
    icon: 'fa-chart-line',
    title: 'Python & Pandas',
    issuer: 'DataCamp',
    date: 'March — April 2026',
    desc: 'Intermediate Python with pandas DataFrames — data analysis, statistical modelling and manipulation.',
    tags: ['Python', 'Pandas', 'Data Analysis'],
  },
  {
    icon: 'fa-medal',
    title: 'Quizizz Game Changer',
    issuer: 'Wayground / Quizizz',
    date: 'January 2026',
    desc: 'Gamified learning models and interaction design for educational platforms.',
    tags: ['Gamification', 'EdTech', 'UX'],
  },
];

/* ------------------------------------------------------------------
   INTERACTIVE CONSOLE
   ------------------------------------------------------------------ */
export const consoleCommands: Record<string, string> = {
  help: `<span class="console__k">Available commands</span><br>
    &nbsp;&nbsp;<strong>neofetch</strong> — system bio<br>
    &nbsp;&nbsp;<strong>skills</strong> — capability stack<br>
    &nbsp;&nbsp;<strong>projects</strong> — project list<br>
    &nbsp;&nbsp;<strong>contact</strong> — contact nodes<br>
    &nbsp;&nbsp;<strong>theme</strong> — flip tech ⇄ mktg<br>
    &nbsp;&nbsp;<strong>game</strong> — play bug.squash<br>
    &nbsp;&nbsp;<strong>music</strong> — background soundtrack<br>
    &nbsp;&nbsp;<strong>fx</strong> — particle field<br>
    &nbsp;&nbsp;<strong>clear</strong> — wipe the screen`,

  neofetch: `<strong>PROBS</strong> · Pravesh Kumar Shrestha<br>
    ------------------------------<br>
    <span class="console__k">OS</span>: Coventry / Softwarica Computing<br>
    <span class="console__k">SHELL</span>: GSAP + PERN stack<br>
    <span class="console__k">ROLES</span>: COO @ HIREO | UI Designer @ PRESS1<br>
    <span class="console__k">MOTTO</span>: bridging aesthetics with clean code.`,

  skills: `<span class="console__k">Core stack</span><br>
    &nbsp;&nbsp;[frontend] React 85% · Kotlin 80% · Flutter 75%<br>
    &nbsp;&nbsp;[backend]&nbsp; NodeJS 80% · SQL 85% · Docker 70%<br>
    &nbsp;&nbsp;[design]&nbsp;&nbsp; Figma 90% · Brand 88% · UX 85%<br>
    &nbsp;&nbsp;[growth]&nbsp;&nbsp; Funnels 85% · Analytics 78% · Events 80%`,

  projects: `<span class="console__k">Featured projects</span><br>
    &nbsp;&nbsp;01. <strong>PawStore</strong> — OWASP-secured PERN e-commerce<br>
    &nbsp;&nbsp;02. <strong>Academia LMS</strong> — Gemini AI + ML gamified LMS<br>
    &nbsp;&nbsp;03. <strong>Nexus</strong> — Flutter gamer social app (SUS 84.5)<br>
    &nbsp;&nbsp;04. <strong>PeerPicks</strong> — cross-platform review ecosystem<br>
    &nbsp;&nbsp;05. <strong>KaryaConnect</strong> — Kotlin freelance marketplace`,

  contact: `<span class="console__k">Contact nodes</span><br>
    &nbsp;&nbsp;✉ <a href="mailto:sthapravesh12@gmail.com">sthapravesh12@gmail.com</a><br>
    &nbsp;&nbsp;☎ +977 9767224529<br>
    &nbsp;&nbsp;⌖ Kathmandu, Nepal<br>
    &nbsp;&nbsp;<em>tip: type <strong>help</strong> to see everything this shell can do</em>`,

  theme: `Flipping the perspective switch — watch the accents, the
    ordering of projects, skills and experience, and the copy change.
    Your choice is remembered on this device.`,

  game: `Opening <strong>bug.squash</strong> — bugs scurry across the board and
    you have 30 seconds to flatten them. Chain hits without missing to
    build a multiplier. Press <strong>esc</strong> to leave.`,

  music: `Toggling the background music — a playlist streamed through a
    real YouTube player that is parked out of view, so you only ever hear
    it. One button, both views. Press it again to stop.`,

  fx: `Toggling the particle field. It only exists in the dark tech view;
    move your cursor and the field pushes away from it.`,
};
