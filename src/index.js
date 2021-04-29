import locale from './locale/index.js';

import 'src/fonts/iconfont.css';

import Alert from 'packages/alert/index.js';
import Backtop from 'packages/backtop/index.js';
import Badge from 'packages/badge/index.js';
import Button from 'packages/button/index.js';
import Cascader from 'packages/cascader/index.js';
import Checkbox from 'packages/checkbox/index.js';
import CheckboxGroup from 'packages/checkbox-group/index.js';
import ChoiceGroup from 'packages/choice-group/index.js';
import ChoiceItem from 'packages/choice-item/index.js';
import ChoiceOption from 'packages/choice-option/index.js';
import Col from 'packages/col/index.js';
import CollapseGroup from 'packages/collapse-group/index.js';
import CollapseItem from 'packages/collapse-item/index.js';
import DateAxis from 'packages/date-axis/index.js';
import DatePicker from 'packages/date-picker/index.js';
import Dialog from 'packages/dialog/index.js';
import Dropdown from 'packages/dropdown/index.js';
import DropdownGroup from 'packages/dropdown-group/index.js';
import DropdownItem from 'packages/dropdown-item/index.js';
import Form from 'packages/form/index.js';
import FormItem from 'packages/form-item/index.js';
import HoverEffect from 'packages/hover-effect/index.js';
import Image from 'packages/image/index.js';
import Input from 'packages/input/index.js';
import InputNumber from 'packages/input-number/index.js';
import LimitTextarea from 'packages/limit-textarea/index.js';
import Link from 'packages/link/index.js';
import LiveComment from 'packages/live-comment/index.js';
import Loading from 'packages/loading/index.js';
import LoadingBar from 'packages/loading-bar/index.js';
import Magnifier from 'packages/magnifier/index.js';
import Message from 'packages/message/index.js';
import MessageBox from 'packages/message-box/index.js';
import MetaInfo from 'packages/meta-info/index.js';
import MultiPlayer from 'packages/multi-player/index.js';
import PageHeader from 'packages/page-header/index.js';
import Pagination from 'packages/pagination/index.js';
import Progress from 'packages/progress/index.js';
import Radio from 'packages/radio/index.js';
import RadioGroup from 'packages/radio-group/index.js';
import Row from 'packages/row/index.js';
import ScrollBar from 'packages/scroll-bar/index.js';
import ScrollView from 'packages/scroll-view/index.js';
import SelectorGroup from 'packages/selector-group/index.js';
import SelectorItem from 'packages/selector-item/index.js';
import ShowMore from 'packages/show-more/index.js';
import Skeleton from 'packages/skeleton/index.js';
import Spinner from 'packages/spinner/index.js';
import Switch from 'packages/switch/index.js';
import TabGroup from 'packages/tab-group/index.js';
import TabItem from 'packages/tab-item/index.js';
import Table from 'packages/table/index.js';
import TableColumn from 'packages/table-column/index.js';
import Tag from 'packages/tag/index.js';
import Tooltip from 'packages/tooltip/index.js';
import Upload from 'packages/upload/index.js';
import VideoCard from 'packages/video-card/index.js';
import VideoPlayer from 'packages/video-player/index.js';

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
  Input,
  InputNumber,
  LimitTextarea,
  Link,
  LiveComment,
  Loading,
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
  Spinner,
  Switch,
  TabGroup,
  TabItem,
  Table,
  TableColumn,
  Tag,
  Tooltip,
  Upload,
  VideoCard,
  VideoPlayer
];

const install = (Vue, opts = {}) => {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  components.forEach((comp) => {
    Vue.use(comp);
  });
  // Object.keys(componentObjs).forEach((key) => {
  //   Vue.use(componentObjs[key]);
  // });
};

// 判断是否是直接引入文件,如果是，就不用调用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  locale: locale.use,
  i18n: locale.i18n,
  install,
  version: '1.1.1',
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
  Input,
  InputNumber,
  LimitTextarea,
  Link,
  LiveComment,
  Loading,
  LoadingBar,
  Magnifier,
  Message,
  MessageBox,
  MetaInfo,
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
  Spinner,
  Switch,
  TabGroup,
  TabItem,
  Table,
  TableColumn,
  Tag,
  Tooltip,
  Upload,
  VideoCard,
  VideoPlayer
};
