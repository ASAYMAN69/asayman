export interface Project {
  name: string;
  tag: string;
  blurb: string;
  highlights: string[];
  stack: string[];
  live?: string;
  github?: string;
}

export interface MoreWorkItem {
  name: string;
  description: string;
  stack: string;
  github?: string;
}

export const featuredProjects: Project[] = [
  {
    name: 'Bottist',
    tag: 'SaaS · AI',
    blurb: 'Turn any website into an AI-powered chatbot in minutes.',
    highlights: [
      'Automatically crawls and scrapes a site to build a custom AI knowledge base',
      'Lightweight embeddable JS widget for instant deployment on any site',
      'Full dashboard — conversation history, prompt editing, usage credits',
      'Cloudflare Turnstile auth and email verification onboarding',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'NVIDIA GLM-4.7', 'Serper API'],
  },
  {
    name: 'Retain CRM',
    tag: 'AI · Lead Gen',
    blurb: 'Conversational AI CRM that automates real-estate lead qualification.',
    highlights: [
      '"Masty" AI persona captures budget, location and property preferences naturally',
      'Multi-provider LLM orchestration — Gemini, NVIDIA NIM, MiniMax',
      'Autonomous tool calling — searches projects and persists leads to the DB',
      'RAG-ready Supabase backend with a React admin dashboard',
    ],
    stack: ['Node.js', 'Express', 'Supabase', 'React', 'Gemini', 'NVIDIA NIM', 'Vector DB'],
  },
  {
    name: 'BTW',
    tag: 'API · Automation',
    blurb: 'Browser automation as a simple HTTP request — built for AI agents.',
    highlights: [
      'Dual control: headless Playwright plus real Chrome via a dedicated extension',
      '100+ endpoints — navigation, interaction, screenshots, PDFs, network capture',
      'Isolated per-session contexts with own cookies and storage',
      'AI-agent-native, npm-ready, cross-platform (Windows / macOS / Linux)',
    ],
    stack: ['TypeScript', 'Playwright', 'Express', 'WebSockets', 'Chrome Extension'],
    github: 'https://github.com/ASAYMAN69/btw',
  },
  {
    name: 'Invoiza',
    tag: 'Product · Docs',
    blurb: 'Professional invoice generation used by 100+ businesses.',
    highlights: [
      '2,000+ invoices processed for 100+ users in production',
      'Pixel-perfect PDF rendering via Puppeteer with premium templates',
      'Descriptive JSON API for fast frontend integration',
      'Theme-adaptive UI with Open Graph optimization',
    ],
    stack: ['Node.js', 'Express', 'Puppeteer', 'HTML5/CSS3', 'Vanilla JS'],
    live: 'https://invoiza.solven.app',
    github: 'https://github.com/ASAYMAN69/invoiza',
  },
  {
    name: 'Newzzy',
    tag: 'Platform · AI',
    blurb: 'Media credibility platform that scores news and fights misinformation.',
    highlights: [
      'AI pipeline atomizes articles into discrete, verifiable claims',
      'Multidimensional credibility scorecards for articles and outlets',
      'High-speed RSS ingestion with custom scraping engines',
      'Verification workspace for journalists plus analytics dashboards',
    ],
    stack: ['Next.js', 'React', 'Express', 'PostgreSQL 18', 'Tailwind CSS'],
  },
  {
    name: 'Statesy',
    tag: 'Full-Stack · Real Estate',
    blurb: 'End-to-end real estate platform built as a distributed monorepo.',
    highlights: [
      'Redis-backed caching for near-instant property search',
      'JWT-secured transaction engine for buyer–seller flows',
      'Prisma-managed schema across users, properties, and portfolios',
      'SEO-optimized Next.js frontend with Tailwind',
    ],
    stack: ['Next.js', 'Express', 'TypeScript', 'Redis', 'PostgreSQL', 'Prisma'],
  },
];

export const moreWork: MoreWorkItem[] = [
  {
    name: 'ImageCurry',
    description: 'High-performance C++17 image server — automated WebP compression, UUID storage, ETag caching.',
    stack: 'C++17 · ImageMagick · Sockets',
    github: 'https://github.com/ASAYMAN69/imagecurry',
  },
  {
    name: 'JIP',
    description: 'Remote video rendering pipeline using Google Colab GPUs for local editors.',
    stack: 'TypeScript · FastAPI · FFmpeg · Cloudflare Tunnels',
  },
  {
    name: 'Sniffer',
    description: 'Real-time API traffic monitor with AI-driven security and performance analysis via Gemini.',
    stack: 'Node.js · Express · WebSockets · Gemini API',
    github: 'https://github.com/ASAYMAN69/sniffer',
  },
  {
    name: 'Consoul',
    description: 'Browser-based Unix terminal — persistent VFS, piping, nano & vim, 30+ built-in utilities.',
    stack: 'Vanilla JS · ES Modules · localStorage',
    github: 'https://github.com/ASAYMAN69/consoul',
  },
  {
    name: 'Poro',
    description: 'Educational portal — homework tracking, routines, and faculty directories via n8n orchestration.',
    stack: 'Vanilla JS · n8n · Modular CSS',
    github: 'https://github.com/ASAYMAN69/poro',
  },
  {
    name: 'RealEsts CRM',
    description: 'Internal real-estate dashboard — drag-and-drop pipeline, lead scoring, glassmorphism UI.',
    stack: 'Next.js 16 · React 19 · Tailwind',
  },
  {
    name: 'Enosis',
    description: 'Corporate real estate portal with live listings served through Cloudflare Workers.',
    stack: 'Vanilla JS · Cloudflare Workers · Edge Computing',
    github: 'https://github.com/ASAYMAN69/enosis',
  },
  {
    name: 'ACC Business Club',
    description: 'Official web platform for a 500+ member business club — resources, challenges, community.',
    stack: 'HTML5 · CSS3 · Vanilla JS · SEO structured data',
    github: 'https://github.com/ASAYMAN69/accbusinessclub',
  },
];
