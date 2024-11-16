import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: ["esm", "cjs"], // Output both ESM and CommonJS
  dts: true, // Generate .d.ts files
  external: ["get-video-id"], // Mark `get-video-id` as an external dependency
  sourcemap: true, // Include sourcemaps
  clean: true, // Clean the output directory before building
  target: "esnext", // Target modern environments
  splitting: false, // Disable code splitting
  platform: "node", // Ensure it's built for Node.js
});
