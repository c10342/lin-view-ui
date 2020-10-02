import "src/fonts/iconfont.css";
// 基础组件
import Button from "packages/Button";
import Dialog from "packages/Dialog";
import Row from "packages/Row";
import Col from "packages/Col";
import SelectorItem from "packages/SelectorItem";
import SelectorGroup from "packages/SelectorGroup";
import CollapseGroup from "packages/CollapseGroup";
import CollapseItem from "packages/CollapseItem";
import DropdownGroup from 'packages/DropdownGroup'
import DropdownItem from 'packages/DropdownItem'
import Dropdown from 'packages/Dropdown'

// 表单组件
import Input from "packages/Input";
import Switch from "packages/Switch";
import Radio from "packages/Radio";
import RadioGroup from "packages/RadioGroup";
import Checkbox from "packages/Checkbox";
import CheckboxGroup from "packages/CheckboxGroup";
import Form from "packages/Form";
import FormItem from "packages/FormItem";
import DatePicker from "packages/DatePicker";
import InputNumber from "packages/InputNumber";
import Upload from "packages/Upload";
import Table from "packages/Table";
import TableColumn from "packages/TableColumn";
import ChoiceGroup from "packages/ChoiceGroup";
import ChoiceItem from "packages/ChoiceItem";
import ChoiceOption from "packages/ChoiceOption";

// 视频组件
import VideoCard from "packages/VideoCard";
import LiveComment from "packages/LiveComment";
import VideoPlayer from "packages/VideoPlayer";

// 视图组件
import ShowMore from "packages/ShowMore";
import LimitTextarea from "packages/LimitTextarea";
import ScrollView from "packages/ScrollView";
import Image from "packages/Image";
import Progress from "packages/Progress";
import MetaInfo from "packages/MetaInfo";
import Tag from "packages/Tag";
import Alert from "packages/Alert";
import Pagination from "packages/Pagination";
import PageHeader from 'packages/PageHeader'

// 交互组件
import LoadingBar from "packages/LoadingBar";
import Loading from "packages/Loading";
import ToolTip from "packages/Tooltip";

// 其他组件
import Magnifier from "packages/Magnifier";
import HoverEffect from "packages/HoverEffect";

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
    Alert,
    Upload,
    Table,
    TableColumn,
    Magnifier,
    HoverEffect,
    Pagination,
    VideoPlayer,
    CollapseGroup,
    CollapseItem,
    ChoiceGroup,
    ChoiceItem,
    ChoiceOption,
    DropdownItem,
    DropdownGroup,
    Dropdown,
    PageHeader
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
  Alert,
  Upload,
  Table,
  TableColumn,
  Magnifier,
  HoverEffect,
  Pagination,
  VideoPlayer,
  CollapseGroup,
  CollapseItem,
  ChoiceGroup,
  ChoiceItem,
  ChoiceOption,
  DropdownItem,
  DropdownGroup,
  Dropdown,
  PageHeader
};
