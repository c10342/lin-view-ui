import Vue, { PluginObject, VNodeDirective } from "vue";
import { LinViewUIComponent } from "./component";

// 服务的参数
export interface LoadingServiceOptions {
  // 目标对象，没有则默认为body
  target?: HTMLElement;
  // 是否全屏
  fullscreen?: boolean;
  // 是否锁定滚动条
  lock?: boolean;
  // 加载文案
  text?: string;
  // 文案颜色
  textColor?: string;
  // 背景色
  background?: string;
  // 图标颜色
  iconColor?: string;
  // 是否绑定到body中
  body?: boolean;
}

// 服务方式调用后返回来的实例对象
export declare class LinLoadingComponent extends LinViewUIComponent {
  // 加载文案
  text: string;
  // 是否全屏
  fullscreen: boolean;
  // 控制是否显示
  visible: boolean;
  // 背景
  background: string;
  // loading颜色
  iconColor: string;
  // 文本颜色
  textColor: string;
  // 过度动画结束后出发
  $emit(eventName: "after-leave"): this;
}

// 指令
export interface LinLoadingDirective extends VNodeDirective {
  name: "loading";
  // 绑定值
  value: boolean;
  // 修饰符
  modifiers: {
    body: boolean;
    fullscreen: boolean;
    lock: boolean;
  };
}

type service = {
  open: (options: LoadingServiceOptions) => LinLoadingComponent;
  close: () => void;
};

export interface LinLoading {
  install(vue: typeof Vue): void;
  // 指令
  directive: PluginObject<never>;
  // 服务
  service: service;
}

declare module "vue/types/vue" {
  interface Vue {
    $loading: service;
  }
}
