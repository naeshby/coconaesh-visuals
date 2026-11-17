import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
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