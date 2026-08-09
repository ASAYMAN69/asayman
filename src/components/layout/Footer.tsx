import { profile } from '../../data/profile';
import { Container } from '../ui/Container';
import { SocialLinks } from '../ui/SocialLinks';
import heart from '../../assets/heart.png';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-ink-950">
      <Container className="flex flex-col items-center gap-6 py-12 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-zinc-100">{profile.name}</p>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-zinc-500 sm:justify-start">
            © {year} Built with
            <img
              src={heart}
              alt=""
              aria-hidden="true"
              className="inline-block h-3.5 w-3.5"
              loading="lazy"
              decoding="async"
            />
            by {profile.name}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-400">
            <li><a className="transition-colors hover:text-zinc-100" href="#about">About</a></li>
            <li><a className="transition-colors hover:text-zinc-100" href="#projects">Projects</a></li>
            <li><a className="transition-colors hover:text-zinc-100" href="#gallery">Gallery</a></li>
            <li><a className="transition-colors hover:text-zinc-100" href="#contact">Contact</a></li>
          </ul>
        </nav>

        <SocialLinks className="justify-center" />
      </Container>
    </footer>
  );
}
