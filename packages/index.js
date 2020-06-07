// import "packages/assets/fonts/font.scss";
import Button from "./Button";
import VideoCard from "./VideoCard";
import Dialog from "./Dialog";

export default {
  install(Vue) {
    [Button, VideoCard, Dialog].forEach((comp) => {
      Vue.use(comp);
    });
    // Vue.use(Button);
    // Vue.use(VideoCard);
  },
};
