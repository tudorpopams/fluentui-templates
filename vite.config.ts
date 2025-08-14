import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base path for GitHub Pages deployment
  // If deploying to https://<USERNAME>.github.io/<REPO>/, set base to '/<REPO>/'
  // If deploying to a custom domain or the root of a GitHub Pages site, set base to '/'
  base: process.env.NODE_ENV === "production" ? "/fluentui-templates/" : "/",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
