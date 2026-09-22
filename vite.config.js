import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vercel serves dist/404.html (with a 404 status) for any path that isn't a
// real file or a rewrite in vercel.json. Copying the SPA shell there lets the
// app's catch-all route render the "Page not found" screen.
function spaNotFoundPage() {
  let outDir;
  return {
    name: "spa-not-found-page",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      copyFileSync(resolve(outDir, "index.html"), resolve(outDir, "404.html"));
    },
  };
}

export default defineConfig({
  plugins: [react(), spaNotFoundPage()],
  server: {
    port: 3000,
    open: true,
  },
});
