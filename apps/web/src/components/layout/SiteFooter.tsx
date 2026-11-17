import { Link } from "react-router-dom";
import {
  bookingNav,
  instagram,
  legalNav,
  mainNav,
  siteName,
  siteTagline,
} from "../../config/site";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import Wordmark from "./Wordmark";

const linkClass = "hover:underline underline-offset-4";

export default function SiteFooter() {
  return (
    <footer className="surface-dark bg-brand-wine text-cream">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark tone="dark" className="text-3xl" />
          <p className="mt-4 max-w-xs text-cream/80">{siteTagline}</p>
        </div>

        <nav aria-label="Footer">
          <Eyebrow tone="dark">Explore</Eyebrow>
          <ul className="mt-5 space-y-3 text-sm">
            {[...mainNav, bookingNav].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <Eyebrow tone="dark">Elsewhere</Eyebrow>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Instagram {instagram.handle}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            {import.meta.env.DEV ? (
              <li>
                <Link to="/dev/status" className={linkClass}>
                  System status (development only)
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream/20">
        <Container className="flex flex-col gap-2 py-6 text-xs text-cream/80 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName}
          </p>
          <p>Development build</p>
        </Container>
      </div>
    </footer>
  );
}