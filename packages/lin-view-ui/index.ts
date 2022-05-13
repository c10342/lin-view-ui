import ConfigProvider from "@packages/config-provider";
import Button from "@packages/button";
import Alert from "@packages/alert";
import Icon from "@packages/icon";
import Col from "@packages/col";
import Row from "@packages/row";
import SelectorGroup from "@packages/selector-group";
import SelectorItem from "@packages/selector-item";
import { App } from "vue";

const components = [
  Button,
  Alert,
  ConfigProvider,
  Icon,
  Col,
  Row,
  SelectorGroup,
  SelectorItem
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
