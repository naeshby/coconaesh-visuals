import { Button, ButtonLink } from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import ImageFrame from "../../components/ui/ImageFrame";
import Section from "../../components/ui/Section";
import { usePageTitle } from "../../lib/usePageTitle";

/** DEVELOPMENT ONLY. A reference sheet for checking the design system by eye. */
export default function DevDesignPage() {
  usePageTitle("Design system");

  return (
    <>
      <Section className="pb-0!">
        <Container>
          <Eyebrow>Development only</Eyebrow>
          <h1 className="type-display mt-6 text-brand-wine">Design system</h1>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="type-headline text-brand-wine">Colour</h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {[
              ["Blush", "bg-brand-blush"],
              ["Pink", "bg-brand-pink"],
              ["Rose", "bg-brand-rose"],
              ["Plum", "bg-brand-plum"],
              ["Wine", "bg-brand-wine"],
              ["Cream", "bg-cream border border-charcoal/20"],
              ["Charcoal", "bg-charcoal"],
            ].map(([name, swatch]) => (
              <li key={name}>
                <div className={`h-20 ${swatch}`} />
                <p className="mt-2 text-sm text-muted">{name}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xl text-sm text-muted">
            Pink and rose are for large display type and decoration only. They do
            not reach contrast for small text on cream.
          </p>
        </Container>
      </Section>

      <Section tone="blush">
        <Container>
          <h2 className="type-headline text-brand-wine">Typography</h2>
          <div className="mt-10 space-y-8">
            <p className="type-display text-brand-wine">Display headline</p>
            <p className="type-headline text-brand-wine">
              Section headline with an <span className="italic">italic</span>{" "}
              accent
            </p>
            <p className="type-lead max-w-xl">
              Lead paragraph. Inter at a comfortable reading size, used for
              introductions beneath a headline.
            </p>
            <p className="max-w-xl leading-relaxed">
              Body text. Photography should stay the dominant element, so
              typography and space do the quiet work of setting the tone.
            </p>
            <Eyebrow>Eyebrow label</Eyebrow>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="type-headline text-brand-wine">Actions</h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
            <ButtonLink to="/booking">Primary</ButtonLink>
            <ButtonLink to="/booking" variant="secondary">
              Secondary
            </ButtonLink>
            <ButtonLink to="/booking" variant="text">
              Text link
            </ButtonLink>
            <Button disabled>Disabled</Button>
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <h2 className="type-headline">On a dark section</h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
            <ButtonLink to="/booking" tone="dark">
              Primary
            </ButtonLink>
            <ButtonLink to="/booking" tone="dark" variant="secondary">
              Secondary
            </ButtonLink>
            <ButtonLink to="/booking" tone="dark" variant="text">
              Text link
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="type-headline text-brand-wine">Image frames</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ImageFrame alt="Portrait placeholder" aspect="portrait" caption="Portrait 4:5" />
            <ImageFrame alt="Landscape placeholder" aspect="landscape" caption="Landscape 3:2" />
            <ImageFrame alt="Square placeholder" aspect="square" caption="Square" />
            <ImageFrame alt="Wide placeholder" aspect="wide" caption="Wide 16:9" />
          </div>
        </Container>
      </Section>
    </>
  );
}