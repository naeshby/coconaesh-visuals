import { ButtonLink } from "../components/ui/Button";
import Container from "../components/ui/Container";
import Eyebrow from "../components/ui/Eyebrow";
import Section from "../components/ui/Section";
import { usePageTitle } from "../lib/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("Page not found");

  return (
    <Section>
      <Container>
        <Eyebrow>404</Eyebrow>
        <h1 className="type-display mt-6 text-brand-wine">
          This frame is <span className="text-brand-plum italic">empty.</span>
        </h1>
        <p className="type-lead mt-8 max-w-md text-muted">
          The page you are looking for does not exist.
        </p>
        <ButtonLink to="/" variant="text" className="mt-10">
          Back to the homepage
        </ButtonLink>
      </Container>
    </Section>
  );
}