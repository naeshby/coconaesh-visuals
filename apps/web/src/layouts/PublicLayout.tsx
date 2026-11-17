import { useEffect, useRef, type MouseEvent } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SiteFooter from "../components/layout/SiteFooter";
import SiteHeader from "../components/layout/SiteHeader";

/** Shared frame for every public page: skip link, header, content, footer. */
export default function PublicLayout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);

  // On navigation: return to the top and move focus to the page content so
  // keyboard and screen reader users start at the new page, not the old link.
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  function skipToContent(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    mainRef.current?.focus();
    mainRef.current?.scrollIntoView();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-brand-wine focus:px-4 focus:py-3 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="flex-1 focus:outline-none"
      >
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}