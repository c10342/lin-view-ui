import { isPlainObject } from "@packages/utils";
import { App, createApp } from "vue";
import LoadingBar from "./index.vue";

interface RootData {
  easing?: string;
  isError?: boolean;
  showSpinner?: boolean;
  totalProgress?: number;
  percentNum?: number;
  speed?: number;
}

class LoadingBarConstructor {
  private app: App | null = null;
  private vm: any | null = null;
  private timer: number | null = null;
  private removeTimer: number | null = null;
  private rootContainer: HTMLElement | null = null;
  private options: RootData = {};

  private init(options: RootData = {}) {
    this.destroy();
    this.app = createApp(LoadingBar);
    this.rootContainer = document.createElement("div");
    // 这个是为了获取组件实例，方便后面对组件变量动态操作
    this.vm = this.app.mount(this.rootContainer);
    const config: any = {
      ...this.options,
      ...options
    };
    for (const key in config) {
      if (Object.prototype.hasOwnProperty.call(config, key)) {
        this.vm[key] = config[key];
      }
    }
    document.body.appendChild(this.rootContainer);
    return this;
  }

  private destroy() {
    this.app?.unmount();
    this.rootContainer?.remove();
    this.app = null;
    this.vm = null;
    this.rootContainer = null;
  }
  // 设置全局配置信息
  config(options: RootData) {
    if (isPlainObject(options)) {
      this.options = options;
    }
    return this;
  }

  private destroyTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private destroyRemoveTimer() {
    if (this.removeTimer) {
      clearTimeout(this.removeTimer);
      this.removeTimer = null;
    }
  }

  // 显示加载进度条
  start(options: RootData) {
    this.init(options);
    this.timer = window.setInterval(() => {
      // 小于90的时候才进行前进
      if (this.vm.totalProgress < 90) {
        this.vm.totalProgress +=
          (this.vm.percentNum || Math.random()) * this.vm.speed;
      }
    }, 100);
    return this;
  }
  // 关闭加载进度条
  end() {
    if (!this.timer) {
      this.init();
    }
    // 先把总进度设置为100，让他走完
    this.vm.totalProgress = 100;
    this.destroyRemoveTimer();
    this.removeTimer = window.setTimeout(() => {
      this.destroyTimer();
      this.destroy();
    }, 200);
    return this;
  }

  // 显示错误进度条
  error() {
    this.end();
    this.vm.totalProgress = 100;
    this.vm.isError = true;
    return this;
  }
}

const LLoadingBar = () => new LoadingBarConstructor();

export default LLoadingBar();
