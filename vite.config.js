import react from "@vitejs/plugin-react";
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
const isCodeSandbox =
  "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;


export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [react()],
    root: "src/",
    publicDir: "../public/",
    base: "./",
    server: {
      host: true,
      open: !isCodeSandbox, // Open if it's not a CodeSandbox
    },
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      sourcemap: true,
      minify: "esbuild",
      cssMinify: true,
    },
  }
  // Rest of your Vite configuration
});
// export default {
//   plugins: [react()],
//   root: "src/",
//   publicDir: "../public/",
//   base: "./",
//   server: {
//     host: true,
//     open: !isCodeSandbox, // Open if it's not a CodeSandbox
//   },
//   build: {
//     outDir: "../dist",
//     emptyOutDir: true,
//     sourcemap: true,
//     minify: "esbuild",
//     cssMinify: true,
//   },
// };
