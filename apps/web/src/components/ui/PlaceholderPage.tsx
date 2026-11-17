import { usePageTitle } from "../../lib/usePageTitle";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import Section from "./Section";

interface PlaceholderPageProps {
  title: string;
  /** What this page will contain, taken from the specification. */
  planned: string;
}

/** DEVELOPMENT PLACEHOLDER. Replaced when the real page is built. */
export default function PlaceholderPage({
  title,
  planned,
}: PlaceholderPageProps) {
  usePageTitle(title);

  return (
    <Section>
      <Container>
        <Eyebrow>Development placeholder</Eyebrow>
        <h1 className="type-display mt-6 text-brand-wine">{title}</h1>
        <p className="type-lead mt-8 max-w-xl text-muted">
          Planned content: {planned}
        </p>
        <p className="mt-10 max-w-xl border-l-2 border-brand-plum pl-5 text-sm text-muted">
          This page has not been built yet. Nothing here is final content.
        </p>
      </Container>
    </Section>
  );
}