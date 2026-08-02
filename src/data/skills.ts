export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Shadcn UI', 'HTML5 / CSS3'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'WebSockets', 'Puppeteer', 'n8n Automation', 'Auth Systems'],
  },
  {
    title: 'Databases & Caching',
    items: ['PostgreSQL', 'Prisma ORM', 'Supabase', 'Redis', 'SQLite', 'Vector / RAG Ready'],
  },
  {
    title: 'AI & Machine Learning',
    items: ['LLM Integration', 'Gemini', 'NVIDIA NIM', 'AI Agents', 'Tool Calling', 'Prompt Engineering', 'RAG'],
  },
  {
    title: 'Infrastructure & Delivery',
    items: ['Docker', 'Linux', 'Nginx / Caddy', 'Cloudflare Workers', 'Cloudflare Tunnels', 'CDN & Caching', 'Reverse Proxy'],
  },
  {
    title: 'Security',
    items: ['CTF & Bug Bounty', 'OSINT', 'API Reverse Engineering', 'Vulnerability Research', 'Web Security'],
  },
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'C', 'C++17', 'Bash'],
  },
  {
    title: 'Tools & Workflow',
    items: ['Git', 'Playwright', 'npm / pnpm', 'Vite', 'Google Colab (GPU)', 'Figma'],
  },
];
