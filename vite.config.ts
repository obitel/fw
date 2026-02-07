import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "resources/js"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["resources/js/test/setup.ts"],
    include: ["resources/js/**/*.test.tsx"],
  },
  build: {
    outDir: "public/build",
    emptyOutDir: true,
  },
});
