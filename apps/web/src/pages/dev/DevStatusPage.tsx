import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import Section from "../../components/ui/Section";
import StatusPanel from "../../features/health/StatusPanel";
import { usePageTitle } from "../../lib/usePageTitle";

/** DEVELOPMENT ONLY. Not included in production builds. */
export default function DevStatusPage() {
  usePageTitle("System status");

  return (
    <Section>
      <Container>
        <Eyebrow>Development only</Eyebrow>
        <h1 className="type-headline mt-6 mb-10 text-brand-wine">
          Frontend, API and database
        </h1>
        <StatusPanel />
      </Container>
    </Section>
  );
}