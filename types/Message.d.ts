import Vue from "vue";
import { LinViewUIComponent } from "./component";

export type MessageType = "success" | "warning" | "info" | "error";

export interface LinMessageOptions {
  // 类型主题
  type?: MessageType;
  //   是否显示关闭按钮
  showClose?: boolean;
  //   消息文字
  message: string;
  //   自定义图标的类名，会覆盖 type
  iconClass?: string;
  //   是否将 message 属性作为 HTML 片段处理
  dangerouslyUseHTMLString?: boolean;
  //   自定义类名
  customClass?: string;
  //   文字是否居中
  center?: boolean;
  //   关闭时的回调函数
  onClose?: () => void;
  //   Message 距离窗口顶部的偏移量
  offset?: number;
  //   显示时间, 毫秒。设为 0 则不会自动关闭
  duration?: number;
}

export declare class LinMessageComponent extends LinViewUIComponent {
  // 类型主题
  type: string;
  // 是否显示关闭按钮
  showClose: boolean;
  // 消息文字
  message: string;
  // 自定义图标的类名，会覆盖 type
  iconClass: string;
  // 是否将 message 属性作为 HTML 片段处理
  dangerouslyUseHTMLString: boolean;
  // 自定义类名
  customClass: string;
  // 文字是否居中
  center: boolean;
  // 关闭时的回调函数
  onClose: () => void;
  // Message 距离窗口顶部的偏移量
  offset: number;

  //   点击关闭按钮
  $emit(eventName: "close"): this;
  //   关闭动画结束后触发
  $emit(eventName: "closed"): this;
}

export declare class LinMessageManage {
  close: () => void;
}

// Omit排除类型中的某个属性
export interface LinMessageService {
  (options: LinMessageOptions): LinMessageManage;
  //   成功类型，type=success
  success(options: Omit<LinMessageOptions, "type"> | string): LinMessageManage;
  //   消息类型，type=info
  info(options: Omit<LinMessageOptions, "type"> | string): LinMessageManage;
  //   错误类型，type=warning
  error(options: Omit<LinMessageOptions, "type"> | string): LinMessageManage;
  //   警告类型，type=warning
  warning(options: Omit<LinMessageOptions, "type"> | string): LinMessageManage;
  //   关闭所有message组件
  closeAll(): void;
}

export interface LinMessage {
  install(vue: typeof Vue): void;
}

declare module "vue/types/vue" {
  interface Vue {
    $message: LinMessageService;
  }
}
