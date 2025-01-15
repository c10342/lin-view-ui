
import { withInstall } from "@packages/utils";
import _ConfigProvider from "./src/configProvider.vue";

const ConfigProvider = withInstall(_ConfigProvider);

// 可以通过app.use使用，也可以通过单独import来使用
export default ConfigProvider;

export * from "./src/configProvider";
