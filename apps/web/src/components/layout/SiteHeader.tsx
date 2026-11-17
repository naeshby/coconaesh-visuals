import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { bookingNav, mainNav } from "../../config/site";
import { cn } from "../../lib/cn";
import { ButtonLink } from "../ui/Button";
import Wordmark from "./Wordmark";

function desktopLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    "border-b pb-1 text-sm tracking-wide transition-colors duration-200",
    isActive
      ? "border-brand-plum text-brand-plum"
      : "border-transparent text-charcoal hover:border-charcoal",
  );
}

function mobileLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    "block py-4 font-display text-4xl tracking-tight transition-colors duration-200",
    isActive ? "text-brand-plum italic" : "text-brand-wine hover:text-brand-plum",
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Close when the route changes (link click, back button, etc.).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: move focus into the menu and lock page scroll.
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Close if the viewport grows to the desktop layout while open.
  useEffect(() => {
    if (!open || typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [open]);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!open) return;

    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }

    if (event.key !== "Tab") return;

    // Keep keyboard focus inside the open menu (toggle button + menu links).
    const links = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [],
    );
    const items = toggleRef.current ? [toggleRef.current, ...links] : links;
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <header
      onKeyDown={handleKeyDown}
      className="sticky top-0 z-50 border-b border-charcoal/10 bg-cream"
    >
      <div className="container-page flex h-16 items-center justify-between lg:h-20">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-6">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={desktopLinkClass}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ButtonLink to={bookingNav.to} className="!py-2.5">
            {bookingNav.label}
          </ButtonLink>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => (open ? close(true) : setOpen(true))}
          className="-mr-2 inline-flex items-center gap-3 px-2 py-3 text-sm tracking-wide text-brand-wine uppercase lg:hidden"
        >
          Menu
          <span aria-hidden="true" className="relative block h-2.5 w-5">
            <span
              className={cn(
                "absolute left-0 block h-px w-5 bg-current transition-all duration-300",
                open ? "top-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px w-5 bg-current transition-all duration-300",
                open ? "top-1/2 -rotate-45" : "bottom-0",
              )}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          ref={menuRef}
          aria-label="Mobile"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-cream lg:hidden"
        >
          <div className="container-page flex min-h-full flex-col justify-between gap-10 py-8">
            <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={mobileLinkClass}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ButtonLink to={bookingNav.to} className="w-full">
              {bookingNav.label}
            </ButtonLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}