import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { TechOrbit } from '../TechOrbit';

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <Container>
        <SectionHeading
          eyebrow="Stack"
          title="Technology & capabilities."
          description={
            <>
              The tools and systems I work with daily.
              <br />
              Click the button to reveal the orbit.
            </>
          }
          className="mb-6"
        />

        <TechOrbit />
      </Container>
    </section>
  );
}