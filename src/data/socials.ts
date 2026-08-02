export type SocialId = 'github' | 'linkedin' | 'instagram' | 'facebook' | 'whatsapp' | 'email';

export interface SocialLink {
  id: SocialId;
  label: string;
  handle: string;
  href: string;
}

export const socials: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'ASAYMAN69',
    href: 'https://github.com/ASAYMAN69',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/asayman',
    href: 'https://www.linkedin.com/in/asayman',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@asayman22',
    href: 'https://www.instagram.com/asayman22',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'asayman22',
    href: 'https://www.facebook.com/asayman22',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: '+880 1812 207007',
    href: 'https://wa.me/+8801812207007',
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'asayman669@gmail.com',
    href: 'mailto:asayman669@gmail.com',
  },
] as const;
