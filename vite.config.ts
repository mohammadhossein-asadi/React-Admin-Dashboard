import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react/") ||
            id.includes("node_modules/scheduler") ||
            id.includes("node_modules/react-router")
          ) {
            return "react-vendor";
          }
          if (id.includes("node_modules/@radix-ui") || id.includes("node_modules/@floating-ui")) {
            return "ui-vendor";
          }
          if (id.includes("node_modules/recharts") || id.includes("node_modules/d3")) {
            return "recharts";
          }
          if (id.includes("node_modules/@fullcalendar")) {
            return "fullcalendar";
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: false,
    pool: "vmThreads",
    testTimeout: 20000,
    hookTimeout: 20000,
    exclude: ["**/e2e/**", "**/node_modules/**"],
  },
});
