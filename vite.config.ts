import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "MyLib",
      fileName: (format) => `index.${format}.js`,
    },
  },
  optimizeDeps: {
    include: ["@open-wc/testing"],
  },
});
