import i18nLocale from "@src/locale";
import Alert from "@packages/alert";
import Backtop from "@packages/backtop";
import Badge from "@packages/badge";
import Button from "@packages/button";
import Cascader from "@packages/cascader";
import Checkbox from "@packages/checkbox";
import CheckboxGroup from "@packages/checkbox-group";
import ChoiceGroup from "@packages/choice-group";
import ChoiceItem from "@packages/choice-item";
import ChoiceOption from "@packages/choice-option";
import Input from "@packages/input";
import Loading from "@packages/loading";
import PlayerFullscreen from "@packages/player-fullscreen";
import PlayerProcess from "@packages/player-process";
import PlayerVolume from "@packages/player-volume";
import Spinner from "@packages/spinner";
import VideoPlayer from "@packages/video-player";
import Col from "@packages/col";
import CollapseGroup from "@packages/collapse-group";
import CollapseItem from "@packages/collapse-item";
import DateAxis from "@packages/date-axis";
import DatePicker from "@packages/date-picker";
import Dialog from "@packages/dialog";
import Dropdown from "@packages/dropdown";
import DropdownGroup from "@packages/dropdown-group";
import DropdownItem from "@packages/dropdown-item";
import Form from "@packages/form";
import FormItem from "@packages/form-item";
import HoverEffect from "@packages/hover-effect";
import Image from "@packages/image";
import InputNumber from "@packages/input-number";
import LimitTextarea from "@packages/limit-textarea";
import LoadingBar from "@packages/loading-bar";
import Magnifier from "@packages/magnifier";
import Message from "@packages/message";
import MessageBox from "@packages/message-box";
import MetaInfo from "@packages/meta-info";
import MultiPlayer from "@packages/multi-player";
import PageHeader from "@packages/page-header";
import Pagination from "@packages/pagination";
import Progress from "@packages/progress";
import Radio from "@packages/radio";
import RadioGroup from "@packages/radio-group";
import Row from "@packages/row";
import ScrollBar from "@packages/scroll-bar";
import ScrollView from "@packages/scroll-view";
import SelectorGroup from "@packages/selector-group";
import SelectorItem from "@packages/selector-item";
import ShowMore from "@packages/show-more";
import Skeleton from "@packages/skeleton";
import Switch from "@packages/switch";
import TabGroup from "@packages/tab-group";
import TabItem from "@packages/tab-item";
import Table from "@packages/table";
import TableColumn from "@packages/table-column";
import Tag from "@packages/tag";
import Tooltip from "@packages/tooltip";
import Upload from "@packages/upload";
import VideoCard from "@packages/video-card";
import Link from "@packages/link";
import LiveComment from "@packages/live-comment";

const components = [
  Alert,
  Backtop,
  Badge,
  Button,
  Cascader,
  Checkbox,
  CheckboxGroup,
  ChoiceGroup,
  ChoiceItem,
  ChoiceOption,
  Input,
  Loading,
  PlayerFullscreen,
  PlayerProcess,
  PlayerVolume,
  Spinner,
  VideoPlayer,
  Col,
  CollapseGroup,
  CollapseItem,
  DateAxis,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  Form,
  FormItem,
  HoverEffect,
  Image,
  InputNumber,
  LimitTextarea,
  LoadingBar,
  Magnifier,
  Message,
  MessageBox,
  MetaInfo,
  MultiPlayer,
  PageHeader,
  Pagination,
  Progress,
  Radio,
  RadioGroup,
  Row,
  ScrollBar,
  ScrollView,
  SelectorGroup,
  SelectorItem,
  ShowMore,
  Skeleton,
  Switch,
  TabGroup,
  TabItem,
  Table,
  TableColumn,
  Tag,
  Tooltip,
  Upload,
  VideoCard,
  Link,
  LiveComment
];

const locale = i18nLocale.use;
const i18n = i18nLocale.i18n;
const version = "1.3.2";

const install = (Vue, opts = {}) => {
  locale(opts.locale);
  i18n(opts.i18n);
  components.forEach(comp => {
    Vue.use(comp);
  });
};

// 判断是否是直接引入文件,如果是，就不用调用 Vue.use()
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  locale,
  i18n,
  install,
  version,
  Alert,
  Backtop,
  Badge,
  Button,
  Cascader,
  Checkbox,
  CheckboxGroup,
  ChoiceGroup,
  ChoiceItem,
  ChoiceOption,
  Input,
  Loading,
  PlayerFullscreen,
  PlayerProcess,
  PlayerVolume,
  Spinner,
  VideoPlayer,
  Col,
  CollapseGroup,
  CollapseItem,
  DateAxis,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  Form,
  FormItem,
  HoverEffect,
  Image,
  InputNumber,
  LimitTextarea,
  LoadingBar,
  Magnifier,
  Message,
  MessageBox,
  MetaInfo,
  MultiPlayer,
  PageHeader,
  Pagination,
  Progress,
  Radio,
  RadioGroup,
  Row,
  ScrollBar,
  ScrollView,
  SelectorGroup,
  SelectorItem,
  ShowMore,
  Skeleton,
  Switch,
  TabGroup,
  TabItem,
  Table,
  TableColumn,
  Tag,
  Tooltip,
  Upload,
  VideoCard,
  Link,
  LiveComment
};

// export {
//   locale,
//   i18n,
//   install,
//   version,
//   Alert,
//   Backtop,
//   Badge,
//   Button,
//   Cascader,
//   Checkbox,
//   CheckboxGroup,
//   ChoiceGroup,
//   ChoiceItem,
//   ChoiceOption,
//   Input,
//   Loading,
//   PlayerFullscreen,
//   PlayerProcess,
//   PlayerVolume,
//   Spinner,
//   VideoPlayer,
//   Col,
//   CollapseGroup,
//   CollapseItem,
//   DateAxis,
//   DatePicker,
//   Dialog,
//   Dropdown,
//   DropdownGroup,
//   DropdownItem,
//   Form,
//   FormItem,
//   HoverEffect,
//   Image,
//   InputNumber,
//   LimitTextarea,
//   LoadingBar,
//   Magnifier,
//   Message,
//   MessageBox,
//   MetaInfo,
//   MultiPlayer,
//   PageHeader,
//   Pagination,
//   Progress,
//   Radio,
//   RadioGroup,
//   Row,
//   ScrollBar,
//   ScrollView,
//   SelectorGroup,
//   SelectorItem,
//   ShowMore,
//   Skeleton,
//   Switch,
//   TabGroup,
//   TabItem,
//   Table,
//   TableColumn,
//   Tag,
//   Tooltip,
//   Upload,
//   VideoCard,
//   Link,
//   LiveComment
// };
