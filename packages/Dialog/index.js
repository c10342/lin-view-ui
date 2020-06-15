import Dialog from "./src/dialog.js";
import "packages/assets/fonts/font.scss";

Dialog.install = (Vue) => Vue.component(Dialog.name, Dialog);

export default Dialog;
