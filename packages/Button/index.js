import Button from "./button.vue";
import "packages/assets/fonts/font.scss";

Button.install = (Vue) => Vue.component(Button.name, Button);

export default Button;
