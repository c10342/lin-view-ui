import locale from "@lin-view-ui/locale";
import Alert from "@lin-view-ui/alert";
import Backtop from "@lin-view-ui/backtop";
import Badge from "@lin-view-ui/badge";
import Button from "@lin-view-ui/button";
import Cascader from "@lin-view-ui/cascader";
import Checkbox from "@lin-view-ui/checkbox";
import CheckboxGroup from "@lin-view-ui/checkbox-group";
import ChoiceGroup from "@lin-view-ui/choice-group";
import ChoiceItem from "@lin-view-ui/choice-item";
import ChoiceOption from "@lin-view-ui/choice-option";
import Input from "@lin-view-ui/input";
import Loading from "@lin-view-ui/loading";
import PlayerFullscreen from "@lin-view-ui/player-fullscreen";
import PlayerProcess from "@lin-view-ui/player-process";
import PlayerVolume from "@lin-view-ui/player-volume";
import Spinner from "@lin-view-ui/spinner";
import VideoPlayer from "@lin-view-ui/video-player";
import Col from '@lin-view-ui/col';
import CollapseGroup from '@lin-view-ui/collapse-group';
import CollapseItem from '@lin-view-ui/collapse-item';
import DateAxis from '@lin-view-ui/date-axis';
import DatePicker from '@lin-view-ui/date-picker';
import Dialog from '@lin-view-ui/dialog';
import Dropdown from '@lin-view-ui/dropdown';
import DropdownGroup from '@lin-view-ui/dropdown-group';
import DropdownItem from '@lin-view-ui/dropdown-item';
import Form from '@lin-view-ui/form';
import FormItem from '@lin-view-ui/form-item';
import HoverEffect from '@lin-view-ui/hover-effect';
import Image from '@lin-view-ui/image';
import InputNumber from '@lin-view-ui/input-number';
import LimitTextarea from '@lin-view-ui/limit-textarea';
import LoadingBar from '@lin-view-ui/loading-bar';
import Magnifier from '@lin-view-ui/magnifier';
import Message from '@lin-view-ui/message';
import MessageBox from '@lin-view-ui/message-box';
import MetaInfo from '@lin-view-ui/meta-info';
import MultiPlayer from '@lin-view-ui/multi-player';
import PageHeader from '@lin-view-ui/page-header';
import Pagination from '@lin-view-ui/pagination';
import Progress from '@lin-view-ui/progress';
import Radio from '@lin-view-ui/radio';
import RadioGroup from '@lin-view-ui/radio-group';
import Row from '@lin-view-ui/row';
import ScrollBar from '@lin-view-ui/scroll-bar';
import ScrollView from '@lin-view-ui/scroll-view';
import SelectorGroup from '@lin-view-ui/selector-group';
import SelectorItem from '@lin-view-ui/selector-item';
import ShowMore from '@lin-view-ui/show-more';
import Skeleton from '@lin-view-ui/skeleton';
import Switch from '@lin-view-ui/switch';
import TabGroup from '@lin-view-ui/tab-group';
import TabItem from '@lin-view-ui/tab-item';
import Table from '@lin-view-ui/table';
import TableColumn from '@lin-view-ui/table-column';
import Tag from '@lin-view-ui/tag';
import Tooltip from '@lin-view-ui/tooltip';
import Upload from '@lin-view-ui/upload';
import VideoCard from '@lin-view-ui/video-card';
import Link from '@lin-view-ui/link';
import LiveComment from '@lin-view-ui/live-comment';

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

const install = (Vue, opts = {}) => {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  components.forEach((comp) => {
    Vue.use(comp);
  });
};

// 判断是否是直接引入文件,如果是，就不用调用 Vue.use()
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  locale: locale.use,
  i18n: locale.i18n,
  install,
  version: "1.1.1",
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
