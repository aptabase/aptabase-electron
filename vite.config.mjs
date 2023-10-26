import replace from "@rollup/plugin-replace";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json" assert { type: "json" };

export default defineConfig({
  build: {
    lib: {
      formats: ["cjs", "es"],
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        main: path.resolve(__dirname, "src/main.ts"),
      },
      name: "@aptabase/electron",
      fileName: (format, entryName) => {
        const ext = format === "es" ? "mjs" : "cjs";
        return `${entryName}.${ext}`;
      },
    },
    rollupOptions: {
      external: ["electron", "os", "fs", "child_process", "crypto"],
    },
  },
  plugins: [
    dts(),
    replace({
      "env.PKG_VERSION": pkg.version,
    }),
  ],
});
