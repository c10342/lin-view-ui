import "packages/assets/fonts/font.scss";
import Button from "./Button";
import VideoCard from "./VideoCard";

export default {
  install(Vue) {
    Vue.use(Button);
    Vue.use(VideoCard);
  },
};
