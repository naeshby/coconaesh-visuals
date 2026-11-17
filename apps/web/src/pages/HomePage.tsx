import { siteTagline } from "../config/site";
import { ButtonLink } from "../components/ui/Button";
import Container from "../components/ui/Container";
import Eyebrow from "../components/ui/Eyebrow";
import ImageFrame from "../components/ui/ImageFrame";
import Section from "../components/ui/Section";
import { usePageTitle } from "../lib/usePageTitle";

/**
 * DEVELOPMENT PLACEHOLDER. The real homepage (hero photograph, collections,
 * services, Instagram feed, testimonials) is built in later Phase 1 batches.
 */
export default function HomePage() {
  usePageTitle();

  return (
    <Section className="pt-10 md:pt-16">
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div>
          <Eyebrow>Development placeholder</Eyebrow>
          <h1 className="type-display mt-6 text-brand-wine">
            CocoNaesh <span className="text-brand-plum italic">Visuals</span>
          </h1>
          <p className="type-lead mt-8 max-w-md text-muted">{siteTagline}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink to="/booking">Book a session</ButtonLink>
            <ButtonLink to="/portfolio" variant="text">
              View portfolio
            </ButtonLink>
          </div>
        </div>

        <ImageFrame
          alt="Hero photograph placeholder"
          aspect="portrait"
          caption="The hero photograph will be supplied by the owner."
          priority
        />
      </Container>
    </Section>
  );
}