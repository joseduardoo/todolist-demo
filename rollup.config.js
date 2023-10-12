import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import analyzer from "rollup-plugin-analyzer";

export default {
  treeshake: true,
  input: ["./src/components/TodoList.ts"],
  output: {
    file: "dist/TodoList.js",
    format: "esm",
  },
  plugins: [
    resolve({
      moduleDirectories: ["node_modules"],
    }),
    terser({
      format: {
        comments: false,
      },
    }),
    typescript(),
    analyzer(),
  ],
};
