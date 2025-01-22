import { defineConfig, mergeConfig } from "vitest/config";
import buildConfig from "./build";

export default defineConfig((configEnv) => {
  return mergeConfig(
    // 复用打包时的配置
    buildConfig(configEnv),
    // 重写部分配置
    defineConfig({
      test: {
        environment: "jsdom",
        // 单元测试文件只需要包含packages目录下的即可
        include: ["packages/**/__tests__/*.{test,spec}.?(c|m)[jt]s?(x)"],
        // 测试覆盖率
        coverage: {
          // 覆盖率提供者
          provider: "v8",
          // 输出格式
          reporter: "html",
          // 测试率覆盖的文件
          include: ["packages/**/*.{vue,ts,tsx}"],
          // 测试覆盖率排出的文件
          exclude: ["packages/types/**", "packages/**/index.ts"]
        }
      }
    })
  );
});
