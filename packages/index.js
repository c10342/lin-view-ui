// import "packages/assets/fonts/font.scss";
// 基础组件
import Button from "./Button";
import Dialog from "./Dialog";

// 表单组件
import Input from "./Input";
import Switch from "./Switch";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";
import Checkbox from "./Checkbox";
import CheckboxGroup from "./CheckboxGroup";
import Form from "./Form";
import FormItem from "./FormItem";

// 视频组件
import VideoCard from "./VideoCard";

// 视图组件
import ShowMore from "./ShowMore";
import LimitTextarea from "./LimitTextarea";

// 交互组件
import LoadingBar from "./LoadingBar";

const install = (Vue) => {
  [Button, Dialog].forEach((comp) => {
    Vue.use(comp);
  });
  [
    Input,
    Switch,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Form,
    FormItem,
  ].forEach((comp) => {
    Vue.use(comp);
  });
  [VideoCard].forEach((comp) => {
    Vue.use(comp);
  });
  [ShowMore, LimitTextarea].forEach((comp) => {
    Vue.use(comp);
  });
  // [LoadingBar].forEach((comp) => {
  //   Vue.use(comp);
  // });
  Vue.prototype.$loading = LoadingBar;
};

// 判断是否是直接引入文件,如果是，就不用调用 Vue.use()
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Button,
  Dialog,
  Input,
  Switch,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Form,
  FormItem,
  VideoCard,
  ShowMore,
  LimitTextarea,
  LoadingBar,
};
