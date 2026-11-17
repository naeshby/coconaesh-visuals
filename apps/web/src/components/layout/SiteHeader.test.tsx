import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import SiteHeader from "./SiteHeader";

afterEach(cleanup);

function renderHeader() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <SiteHeader />
    </MemoryRouter>,
  );
  return screen.getByRole("button", { name: "Menu" });
}

describe("SiteHeader", () => {
  it("lists every approved page in the primary navigation", () => {
    renderHeader();
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const labels = within(nav)
      .getAllByRole("link")
      .map((link) => link.textContent);
    expect(labels).toEqual([
      "Home",
      "About",
      "Portfolio",
      "Services",
      "Testimonials",
      "Contact",
      "Booking",
    ]);
  });

  it("starts with the mobile menu closed", () => {
    const toggle = renderHeader();
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).toBeNull();
  });

  it("opens the mobile menu and moves focus to its first link", async () => {
    const user = userEvent.setup();
    const toggle = renderHeader();

    await user.click(toggle);

    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    const menu = screen.getByRole("navigation", { name: "Mobile" });
    expect(document.activeElement).toBe(
      within(menu).getByRole("link", { name: "Home" }),
    );
  });

  it("closes on Escape and returns focus to the menu button", async () => {
    const user = userEvent.setup();
    const toggle = renderHeader();

    await user.click(toggle);
    await user.keyboard("{Escape}");

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("navigation", { name: "Mobile" })).toBeNull();
    expect(document.activeElement).toBe(toggle);
  });

  it("closes after a link is chosen", async () => {
    const user = userEvent.setup();
    const toggle = renderHeader();

    await user.click(toggle);
    const menu = screen.getByRole("navigation", { name: "Mobile" });
    await user.click(within(menu).getByRole("link", { name: "About" }));

    expect(screen.queryByRole("navigation", { name: "Mobile" })).toBeNull();
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });
});