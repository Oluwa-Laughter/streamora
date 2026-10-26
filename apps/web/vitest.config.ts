import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const sdk = fileURLToPath(new URL("../../sdk/src/index.ts", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@streamora/sdk": sdk } },
  test: { environment: "jsdom", setupFiles: ["./src/test-setup.ts"], globals: true },
});
