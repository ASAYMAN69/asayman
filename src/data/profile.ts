export interface ProfileStat {
  value: string;
  label: string;
}

export const profile = {
  name: 'AS Ayman',
  firstName: 'AS',
  role: 'AI Automation Entrepreneur · Full-Stack Engineer',
  location: 'Dhaka, Bangladesh',
  email: 'asayman669@gmail.com',
  tagline:
    "I design and build AI-driven systems that automate how businesses operate — from chatbots and conversational CRMs to document engines and real-time infrastructure.",
  bio: [
    "I'm an AI automation entrepreneur and full-stack engineer currently studying at Adamjee Cantonment College. I run Solven.app, an AI automation agency that builds custom systems for businesses — workflow automation, AI chatbots, lead-generation pipelines, and process optimization for 10+ clients across real estate, car rental, and consultancy.",
    "My engineering focus runs deep through the stack: backend architecture, database and caching design, infrastructure, and delivery-layer engineering like CDNs and reverse proxies. I build systems from scratch, and I care about production-grade reliability — Invoiza alone has processed 2,000+ requests for over 100 users.",
    "Beyond building, I compete. 15+ awards in national chess, a national-level debate medal, CTF and security research, and a winner's spot at the Ibn-e-Al-Haytham Science Festival. I also teach — leading seminars on networking, Git, and system design for my peers.",
  ],
  stats: [
    { value: '10+', label: 'Agency clients' },
    { value: '2,000+', label: 'Invoices processed' },
    { value: '100+', label: 'API endpoints built' },
    { value: '15+', label: 'Chess awards' },
  ] satisfies ProfileStat[],
  company: {
    name: 'Solven.app',
    role: 'Managing Director',
    url: 'https://solven.app',
  },
  education: {
    school: 'Adamjee Cantonment College',
    detail: 'Student · Joined September 2025',
  },
  availability: 'Open to freelance & collaboration',
} as const;
