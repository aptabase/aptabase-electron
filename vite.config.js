const path = require("path");
const { defineConfig } = require("vite");
const dts = require("vite-plugin-dts");

module.exports = defineConfig({
  build: {
    lib: {
      formats: ["cjs", "es"],
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        main: path.resolve(__dirname, "src/main.ts"),
        preload: path.resolve(__dirname, "src/preload.ts"),
      },
      name: "@aptabase/electron",
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ["electron"],
    },
  },
  plugins: [dts()],
});
