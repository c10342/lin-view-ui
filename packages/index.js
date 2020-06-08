// import "packages/assets/fonts/font.scss";
// 基础组件
import Button from "./Button";
import Dialog from "./Dialog";
import Input from "./Input";

// 视频组件
import VideoCard from "./VideoCard";

export default {
  install(Vue) {
    [Button, Dialog, Input].forEach((comp) => {
      Vue.use(comp);
    });
    [VideoCard].forEach((comp) => {
      Vue.use(comp);
    });
    // Vue.use(Button);
    // Vue.use(VideoCard);
  },
};
