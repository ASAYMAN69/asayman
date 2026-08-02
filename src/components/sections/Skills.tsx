import { motion } from 'framer-motion';

import { skillGroups } from '../../data/skills';
import { Chip } from '../ui/Chip';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const chipList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const chipItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading
          eyebrow="Stack"
          title="Technology & capabilities."
          description="The tools and systems I work with daily — across frontend, backend, infrastructure, and AI."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={(index % 4) * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="group flex h-full flex-col rounded-xl border border-white/[0.08] bg-ink-900/60 p-5 transition-colors duration-200 hover:border-white/[0.16]"
              >
                <h3 className="mb-4 flex items-center justify-between font-mono text-[11px] font-medium tracking-[0.2em] text-accent-400 uppercase">
                  {group.title}
                  <span
                    aria-hidden="true"
                    className="-mr-1 text-sm text-accent-300 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    →
                  </span>
                </h3>
                <motion.ul
                  className="flex flex-wrap content-start gap-2"
                  variants={chipList}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {group.items.map((item) => (
                    <motion.li key={item} variants={chipItem}>
                      <Chip>{item}</Chip>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}