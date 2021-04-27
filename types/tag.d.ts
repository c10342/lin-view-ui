import { DefaultType, LinViewUIComponent } from "./component";

export type TagType = DefaultType | "info";

export type TagEffect = "dark" | "light" | "plain";

export declare class LinTag extends LinViewUIComponent {
  // 类型
  type: TagType;
  // 文本
  text: string;
  // 背景色
  color: string;
  // 是否可关闭
  closable: boolean;
  // 主题
  effect: TagEffect;
  //   点击 Tag 时触发的事件
  $emit(eventName: "click"): this;
  //   关闭 Tag 时触发的事件
  $emit(eventName: "close"): this;
}
