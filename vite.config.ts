import * as path from "path";

import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  base: "./",
  server: {
    port: 3000,
  },
  build: {
    outDir: "build",
    sourcemap: false,
    minify: "esbuild",
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
});
