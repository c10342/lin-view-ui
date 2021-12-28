import Vue, { LinViewUIComponent } from "./component";

export interface LoadingBarConfig {
  // 加载器（转圈圈的那个东西），运动形式
  easing: string;
  // 显示加载器
  showSpinner: boolean;
  // 每次前进的百分比
  percentNum: number;
  // 加载速度
  speed: number;
}

export declare class LoadingBarComponent extends LinViewUIComponent {
  // 加载器（转圈圈的那个东西），运动形式
  easing: string;
  // 是否为错误类型
  isError: boolean;
  // 显示加载器
  showSpinner: boolean;
  // 加载的总进度
  totalProgress: number;
  // 每次前进的百分比
  percentNum: number;
  // 加载速度
  speed: number;
}

export declare class LoadingBarService extends LoadingBarComponent {
  start: () => void;
  end: () => void;
  error: () => void;
  config: (options: LoadingBarConfig) => void;
  init: () => LoadingBarService;
}

export interface LinLoadingBar {
  install: (vue: typeof Vue) => void;
}

declare module "vue/types/vue" {
  interface Vue {
    $loadingBar: LoadingBarService;
  }
}
