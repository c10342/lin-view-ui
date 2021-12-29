import Alert from "@packages/alert";
import Backtop from '@packages/backtop'
import Badge from '@packages/badge'
import Button from '@packages/button'
import Spinner from '@packages/spinner'
import Input from '@packages/input'
import type { App } from "vue";

const components = [Alert,Backtop,Badge,Button,Spinner,Input];

const version = "2.0.0";

const install = (app: App) => {
  components.forEach((comp) => {
    app.use(comp);
  });
};

export default {
    install,
    version,
    Alert
};
