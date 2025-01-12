import { withInstall } from "@packages/utils";
import _Button from "./src/button.vue";

const Button = withInstall(_Button);

// 可以通过app.use使用，也可以通过单独import来使用
export default Button;

export * from "./src/button";
