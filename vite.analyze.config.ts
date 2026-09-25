import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, mergeConfig } from "vitest/config";
import base from "./vite.config";

export default mergeConfig(
  base,
  defineConfig({
    plugins: [
      visualizer({
        filename: "stats.html",
        template: "treemap",
        title: "React Admin Dashboard — bundle analysis",
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  })
);
