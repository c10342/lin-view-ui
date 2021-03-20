import locale from './locale/index.js';

import 'src/fonts/iconfont.css';

// const testComps = require.context(
//   '../packages',
//   true,
//   /^\.(\/\w+)\/index\.js$/
// );

// const reg = /^\.\/(\w+)\/index\.js$/;

// const componentObjs = {};
// testComps.keys().forEach((key) => {
//   const componentEntity = testComps(key).default;
//   const result = reg.exec(key)[1];
//   componentObjs[result] = componentEntity;
// });

import Alert from 'packages/Alert/index.js';
import Backtop from 'packages/Backtop/index.js';
import Badge from 'packages/Badge/index.js';
import Button from 'packages/Button/index.js';
import Cascader from 'packages/Cascader/index.js';
import Checkbox from 'packages/Checkbox/index.js';
import CheckboxGroup from 'packages/CheckboxGroup/index.js';
import ChoiceGroup from 'packages/ChoiceGroup/index.js';
import ChoiceItem from 'packages/ChoiceItem/index.js';
import ChoiceOption from 'packages/ChoiceOption/index.js';
import Col from 'packages/Col/index.js';
import CollapseGroup from 'packages/CollapseGroup/index.js';
import CollapseItem from 'packages/CollapseItem/index.js';
import DateAxis from 'packages/DateAxis/index.js';
import DatePicker from 'packages/DatePicker/index.js';
import Dialog from 'packages/Dialog/index.js';
import Dropdown from 'packages/Dropdown/index.js';
import DropdownGroup from 'packages/DropdownGroup/index.js';
import DropdownItem from 'packages/DropdownItem/index.js';
import Form from 'packages/Form/index.js';
import FormItem from 'packages/FormItem/index.js';
import HoverEffect from 'packages/HoverEffect/index.js';
import Image from 'packages/Image/index.js';
import Input from 'packages/Input/index.js';
import InputNumber from 'packages/InputNumber/index.js';
import LimitTextarea from 'packages/LimitTextarea/index.js';
import Link from 'packages/Link/index.js';
import LiveComment from 'packages/LiveComment/index.js';
import Loading from 'packages/Loading/index.js';
import LoadingBar from 'packages/LoadingBar/index.js';
import Magnifier from 'packages/Magnifier/index.js';
import Message from 'packages/Message/index.js';
import MessageBox from 'packages/MessageBox/index.js';
import MetaInfo from 'packages/MetaInfo/index.js';
import PageHeader from 'packages/PageHeader/index.js';
import Pagination from 'packages/Pagination/index.js';
import Progress from 'packages/Progress/index.js';
import Radio from 'packages/Radio/index.js';
import RadioGroup from 'packages/RadioGroup/index.js';
import Row from 'packages/Row/index.js';
import ScrollBar from 'packages/ScrollBar/index.js';
import ScrollView from 'packages/ScrollView/index.js';
import SelectorGroup from 'packages/SelectorGroup/index.js';
import SelectorItem from 'packages/SelectorItem/index.js';
import ShowMore from 'packages/ShowMore/index.js';
import Skeleton from 'packages/Skeleton/index.js';
import Spinner from 'packages/Spinner/index.js';
import Switch from 'packages/Switch/index.js';
import TabGroup from 'packages/TabGroup/index.js';
import TabItem from 'packages/TabItem/index.js';
import Table from 'packages/Table/index.js';
import TableColumn from 'packages/TableColumn/index.js';
import Tag from 'packages/Tag/index.js';
import Tooltip from 'packages/Tooltip/index.js';
import Upload from 'packages/Upload/index.js';
import VideoCard from 'packages/VideoCard/index.js';
import VideoPlayer from 'packages/VideoPlayer/index.js';

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
  components.forEach(comp => {
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
  version: '1.1.0',
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
