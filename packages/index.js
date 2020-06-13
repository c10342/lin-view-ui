// import "packages/assets/fonts/font.scss";
// 基础组件
import Button from "./Button";
import Dialog from "./Dialog";
import Input from "./Input";
import Switch from "./Switch";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";
import Checkbox from "./Checkbox";
import CheckboxGroup from "./CheckboxGroup";

// 视频组件
import VideoCard from "./VideoCard";

// 视图组件
import ShowMore from "./ShowMore";
import LimitTextarea from "./LimitTextarea";

export default {
  install(Vue) {
    [
      Button,
      Dialog,
      Input,
      Switch,
      Radio,
      RadioGroup,
      Checkbox,
      CheckboxGroup,
    ].forEach((comp) => {
      Vue.use(comp);
    });
    [VideoCard].forEach((comp) => {
      Vue.use(comp);
    });
    [ShowMore, LimitTextarea].forEach((comp) => {
      Vue.use(comp);
    });
    // Vue.use(Button);
    // Vue.use(VideoCard);
  },
};
