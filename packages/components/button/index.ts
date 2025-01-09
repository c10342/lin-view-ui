import { withInstall } from "@packages/utils";
import _Button from "./src/button.vue";

const Button = withInstall(_Button);

// 可以通过app.use使用，也可以通过单独import来使用
export default Button;

export * from "./src/button";

// 声明全局组件类型，方便全局使用时，vscode插件可以识别组件类型
declare module "vue" {
  export interface GlobalComponents {
    ZButton: typeof Button;
  }
}
