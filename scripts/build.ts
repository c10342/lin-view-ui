// https://blog.csdn.net/LuckyWinty/article/details/142871064

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import pkg from "../package.json";

const external = Object.keys({
  ...(pkg.devDependencies || {}),
  ...(pkg.peerDependencies || {}),
  ...(pkg.dependencies || {}),
});

export default defineConfig(() => {
  return {
    build: {
      // 打包输出的目录
      outDir: "dist",
      // 样式也分离到单独的文件中
      cssCodeSplit: true,
      rollupOptions: {
        // 忽略排除的第三方包，不参与打包
        external: external,
        // 输出的产物模块格式
        output: [
          // 全量引入组件
          // {
          //   format: "es",
          //   entryFileNames: "[name].js",
          //   exports: "named",
          //   name: "ZUI",
          //   dir: "./dist",
          // },
          {
            format: "es",
            entryFileNames: "[name].js",
            exports: "named",
            // 按照packages目录结构原样输出，实现组件按需加载的关键
            preserveModules: true,
            preserveModulesRoot: "packages",
            dir: "./dist/es",
          },
          {
            format: "cjs",
            entryFileNames: "[name].js",
            exports: "named",
            // 按照packages目录结构原样输出，实现组件按需加载的关键
            preserveModules: true,
            preserveModulesRoot: "packages",
            dir: "./dist/lib",
          },
        ],
      },
      lib: {
        entry: path.resolve(__dirname, "../packages/index.ts"),
        name: "ZUI",
        fileName: (format) => `${format}.js`,
        formats: ["es", "cjs"],
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      // 打包类型声明文件
      // dts({
      //   tsconfigPath: path.resolve(__dirname,'../tsconfig.build.json'),
      //   outDir: "dist/lib",
      // }),
      // dts({
      //   tsconfigPath: path.resolve(__dirname,'../tsconfig.build.json'),
      //   outDir: "dist/es",
      // }),
      dts({
        tsconfigPath: path.resolve(__dirname,'../tsconfig.build.json'),
        outDir: "dist/types",
      }),
    ],
    resolve: {
      alias: {
        "@packages": path.resolve(__dirname, "../packages"),
      },
    },
  };
});
