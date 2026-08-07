import { ArrowUpRight, Check, Github } from 'lucide-react';
import { featuredProjects, moreWork } from '../../data/projects';
import { Chip } from '../ui/Chip';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { SpotlightCard } from '../ui/SpotlightCard';

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          title="Selected work."
          description="Production systems and platforms I've designed and shipped — from AI SaaS products to real-time infrastructure."
        />

        {/* Featured projects */}
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.name} delay={(index % 2) * 0.08}>
              <SpotlightCard className="group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-ink-900/60 p-6 transition-colors duration-200 hover:border-white/[0.16] sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-accent-400 uppercase">
                    {project.tag}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${project.name} on GitHub`}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-zinc-100"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Open ${project.name} live site`}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-zinc-100"
                      >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold tracking-tight text-zinc-50">
                  {project.name}
                  <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 text-accent-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden="true" />
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{project.blurb}</p>

                <ul className="mt-4 space-y-2 pb-6">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-sm text-zinc-500">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-400" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
                  {project.stack.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* More work */}
        <Reveal className="mt-16">
          <h3 className="mb-6 font-mono text-[11px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
            More work
          </h3>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moreWork.map((item, index) => (
            <Reveal key={item.name} delay={(index % 4) * 0.05}>
              <SpotlightCard className="h-full rounded-xl border border-white/[0.08] bg-ink-900/40 p-5 transition-colors duration-200 hover:border-white/[0.16]">
                <h4 className="text-sm font-semibold text-zinc-100">
                  {item.github ? (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${item.name} on GitHub`}
                      className="inline-flex items-center gap-1 transition-colors hover:text-accent-300"
                    >
                      {item.name}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : (
                    item.name
                  )}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{item.description}</p>
                <p className="mt-3 font-mono text-[10px] tracking-wide text-zinc-600">{item.stack}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
