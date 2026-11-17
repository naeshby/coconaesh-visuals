import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

afterEach(cleanup);

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App routing", () => {
  it("renders the home page inside the public layout", () => {
    renderAt("/");
    expect(
      screen.getByRole("heading", { level: 1, name: /CocoNaesh Visuals/ }),
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "Skip to content" })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Footer" })).toBeTruthy();
  });

  it("renders a labelled placeholder for an unbuilt page", () => {
    renderAt("/about");
    expect(
      screen.getByRole("heading", { level: 1, name: "About" }),
    ).toBeTruthy();
    expect(screen.getByText("Development placeholder")).toBeTruthy();
  });

  it("renders the 404 page for unknown routes", () => {
    renderAt("/no-such-page");
    expect(
      screen.getByRole("heading", { level: 1, name: /This frame is empty/ }),
    ).toBeTruthy();
  });
});