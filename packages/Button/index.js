import Button from "./src/button.js";
import "packages/assets/fonts/font.scss";

Button.install = (Vue) => Vue.component(Button.name, Button);

export default Button;
