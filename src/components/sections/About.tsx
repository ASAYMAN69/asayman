import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, GraduationCap, MapPin } from 'lucide-react';
import { profile } from '../../data/profile';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const facts = [
  { icon: Building2, label: 'Company', value: profile.company.name, sub: `${profile.company.role} · ${profile.company.url.replace('https://', '')}`, href: profile.company.url },
  { icon: GraduationCap, label: 'Education', value: profile.education.school, sub: profile.education.detail },
  { icon: MapPin, label: 'Location', value: profile.location, sub: 'Working across timezones' },
];

const parsedStats = profile.stats.map((stat) => {
  const match = stat.value.match(/^([\d,]+)(.*)$/);
  return {
    label: stat.label,
    value: match ? Number(match[1].replace(/,/g, '')) : 0,
    suffix: match ? match[2] : '',
  };
});

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="Building systems that run businesses."
          description="A short look at who I am, what I build, and the track record behind it."
        />

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Bio */}
          <div className="space-y-5">
            {profile.bio.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.06}>
                <p className="leading-relaxed text-zinc-400">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {/* Quick facts */}
          <Reveal delay={0.1}>
            <dl className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
              {facts.map((fact) => (
                <motion.div
                  key={fact.label}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className="flex items-start gap-4 border-b border-white/[0.06] px-6 py-5 last:border-b-0"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-accent-300 ring-1 ring-white/10">
                    <fact.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">{fact.label}</dt>
                    {fact.href ? (
                      <dd>
                        <a
                          href={fact.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-zinc-100 transition-colors hover:text-accent-300"
                        >
                          {fact.value}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </dd>
                    ) : (
                      <dd className="mt-1 text-sm font-medium text-zinc-100">{fact.value}</dd>
                    )}
                    <dd className="mt-0.5 text-xs text-zinc-500">{fact.sub}</dd>
                  </div>
                </motion.div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Stats strip */}
        <Reveal delay={0.08} className="mt-16">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] sm:grid-cols-4">
            {parsedStats.map((stat) => (
              <div key={stat.label} className="bg-ink-950 px-6 py-7">
                <dd className="font-mono text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-2 text-xs text-zinc-500">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
