import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    // 配置路径别名
    alias: {
      "@packages": path.resolve(__dirname, "../packages"),
    },
  },
  server:{
    port:3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "./index.html"),
      },
    },
  },
});
