import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { profile } from '../../data/profile';
import { socials } from '../../data/socials';
import { ButtonLink } from '../ui/ButtonLink';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { socialIcons } from '../ui/SocialLinks';
import { SpotlightCard } from '../ui/SpotlightCard';

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title="Let's build something."
          description="Whether it's an automation system, a product, or a collaboration — my inbox is open."
        />

        {/* Primary CTA */}
        <Reveal>
          <SpotlightCard className="rounded-2xl border border-white/10 bg-ink-900 px-6 py-12 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-accent-500/10 blur-[100px]"
            />
            <div className="relative">
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                Have a project in mind?
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
                I'm currently available for freelance and long-term collaborations. Typically responds within a day.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href={`mailto:${profile.email}`} size="lg">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {profile.email}
                </ButtonLink>
                <ButtonLink
                  href="https://wa.me/+8801812207007"
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="secondary"
                  size="lg"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </ButtonLink>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Direct channels */}
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((social, index) => {
            const Icon = socialIcons[social.id];
            return (
              <Reveal key={social.id} delay={(index % 3) * 0.06}>
                <li>
                  <a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="group flex items-center gap-4 rounded-xl border border-white/[0.08] bg-ink-900/60 p-5 transition-colors duration-200 hover:border-white/[0.16]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-400 ring-1 ring-white/10 transition-colors group-hover:text-accent-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-zinc-100">{social.label}</span>
                      <span className="block truncate text-xs text-zinc-500">{social.handle}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-600 transition-colors group-hover:text-accent-300" aria-hidden="true" />
                  </a>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
