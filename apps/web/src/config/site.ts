// Single source of truth for site-wide navigation and identity.
// Later, editable values (contact details, social links) will come from the
// admin dashboard. Until then, only facts from the specification live here.

export const siteName = "CocoNaesh Visuals";
export const siteTagline = "Photography from India.";

export interface NavItem {
  readonly label: string;
  readonly to: string;
}

/** Primary navigation (Booking is shown separately as a call to action). */
export const mainNav: readonly NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Services", to: "/services" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
];

export const bookingNav: NavItem = { label: "Booking", to: "/booking" };

export const legalNav: readonly NavItem[] = [
  { label: "Privacy policy", to: "/privacy" },
  { label: "Terms and conditions", to: "/terms" },
];

export const instagram = {
  handle: "@coconaesh.visuals",
  url: "https://www.instagram.com/coconaesh.visuals/",
} as const;