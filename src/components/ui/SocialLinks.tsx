import { Github, Instagram, Linkedin, Facebook, MessageCircle, Mail } from 'lucide-react';
import type { ComponentType } from 'react';
import { socials } from '../../data/socials';
import type { SocialId } from '../../data/socials';

const icons: Record<SocialId, ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  whatsapp: MessageCircle,
  email: Mail,
};

export { icons as socialIcons };

/** Icon-only row of social links. */
export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`} aria-label="Social links">
      {socials.map((social) => {
        const Icon = icons[social.id];
        const isProfile = social.id !== 'whatsapp' && social.id !== 'email';
        return (
          <li key={social.id}>
            <a
              href={social.href}
              target={social.href.startsWith('mailto') || social.href.startsWith('https://wa.me') ? undefined : '_blank'}
              rel={social.href.startsWith('http') ? `${isProfile ? 'me ' : ''}noreferrer noopener` : undefined}
              aria-label={`${social.label} — ${social.handle}`}
              title={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors duration-200 hover:border-accent-400/50 hover:text-accent-300"
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
