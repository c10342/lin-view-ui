import ConfigProvider from "@packages/config-provider";
import Button from "@packages/button";
import Alert from "@packages/alert";
import Icon from "@packages/icon";
import Col from "@packages/col";
import Row from "@packages/row";
import SelectorGroup from "@packages/selector-group";
import SelectorItem from "@packages/selector-item";
import CollapseGroup from "@packages/collapse-group";
import CollapseItem from "@packages/collapse-item";
import CollapseTransition from "@packages/collapse-transition";
import Link from "@packages/link";
import Badge from "@packages/badge";
import ShowMore from "@packages/show-more";
import LimitTextarea from "@packages/limit-textarea";
import ScrollView from "@packages/scroll-view";
import Image from "@packages/image";
import Progress from "@packages/progress";
import MetaInfo from "@packages/meta-info";
import Tag from "@packages/tag";
import { App } from "vue";

const components = [
  Button,
  Alert,
  ConfigProvider,
  Icon,
  Col,
  Row,
  SelectorGroup,
  SelectorItem,
  CollapseGroup,
  CollapseItem,
  CollapseTransition,
  Link,
  Badge,
  ShowMore,
  LimitTextarea,
  ScrollView,
  Image,
  Progress,
  MetaInfo,
  Tag
];

const install = (app: App) => {
  components.forEach((component) => {
    app.use(component as any);
  });
};

export default {
  install,
  Button,
  Alert
};
