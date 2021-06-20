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
import Loading from "@lin-view-ui/input";
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
  FormItem
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
};
