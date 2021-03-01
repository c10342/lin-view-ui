import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export type HoverEffectType =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type HoverEffectTheme =
  | "neon"
  | "border"
  | "fillet"
  | "frozen"
  | "shiny";

export declare class LinHoverEffect extends LinViewUIComponent {
  // 效果类型
  type: HoverEffectType;
  // 效果主题
  theme: HoverEffectTheme;
  // 文本
  text: string;

  $emit(eventName: "click"): this;

  $slots: {
    "": VNode[];
    default: VNode[];
  };
}
