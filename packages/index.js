import "packages/assets/fonts/iconfont.css";
// 基础组件
import Button from "./Button";
import Dialog from "./Dialog";
import Row from "./Row";
import Col from "./Col";
import SelectorItem from "./SelectorItem";
import SelectorGroup from "./SelectorGroup";

// 表单组件
import Input from "./Input";
import Switch from "./Switch";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";
import Checkbox from "./Checkbox";
import CheckboxGroup from "./CheckboxGroup";
import Form from "./Form";
import FormItem from "./FormItem";
import DatePicker from "./DatePicker";
import InputNumber from "./InputNumber";

// 视频组件
import VideoCard from "./VideoCard";
import LiveComment from "./LiveComment";

// 视图组件
import ShowMore from "./ShowMore";
import LimitTextarea from "./LimitTextarea";
import ScrollView from "./ScrollView";
import Image from "./Image";
import Progress from "./Progress";
import MetaInfo from "./MetaInfo";
import Tag from "./Tag";

// 交互组件
import LoadingBar from "./LoadingBar";
import Loading from "./Loading";
import ToolTip from "./Tooltip";

const install = (Vue) => {
  [
    Button,
    Dialog,
    Row,
    Col,
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
    ScrollView,
    Image,
    Progress,
    Loading,
    MetaInfo,
    SelectorItem,
    SelectorGroup,
    ToolTip,
    DatePicker,
    LiveComment,
    InputNumber,
    Tag,
  ].forEach((comp) => {
    Vue.use(comp);
  });
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
  ScrollView,
  Image,
  Progress,
  Loading,
  MetaInfo,
  SelectorItem,
  SelectorGroup,
  ToolTip,
  DatePicker,
  LiveComment,
  InputNumber,
  Tag,
};
