import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

/**
 * Production builds must not contain the development-only pages
 * (src/pages/dev/*). The `import.meta.env.DEV` check in App.tsx hides the
 * routes, but a bundler may still emit the lazily imported files. This plugin
 * swaps their source for an empty stub at build time, so their code never
 * ships.
 */
function excludeDevPages(): Plugin {
  return {
    name: "coconaesh:exclude-dev-pages",
    apply: "build",
    enforce: "pre",
    load(id) {
      if (id.replaceAll("\\", "/").includes("/src/pages/dev/")) {
        return "export default function DevPageExcluded() { return null; }";
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), excludeDevPages()],
  // Read VITE_* variables from the single root .env (relative to apps/web).
  envDir: "../..",
  server: {
    host: "localhost",
    port: 5173,
    // The API only allows http://localhost:5173 through CORS.
    // Fail loudly if the port is taken instead of moving to another one.
    strictPort: true,
  },
});