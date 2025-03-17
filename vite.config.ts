import { defineConfig } from "vite";

export default defineConfig({
  root: "./", // Project root
  build: {
    outDir: "dist", // Output directory
    assetsDir: "assets", // Directory for assets in the build
  },
});
