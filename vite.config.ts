/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "no-dep-cache",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.includes("/.vite/deps/")) {
            const orig = res.setHeader;
            res.setHeader = function (name, value) {
              if (typeof name === "string" && name.toLowerCase() === "cache-control") {
                return orig.call(this, name, "no-store, no-cache, must-revalidate, max-age=0");
              }
              return orig.call(this, name, value);
            };
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
