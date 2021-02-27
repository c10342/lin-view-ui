import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export type BadgeType = "primary" | "success" | "warning" | "danger" | "info";

export declare class LinBadge extends LinViewUIComponent {
  // 显示的值
  value: string | number;
  // 最大值，超过最大值会显示 '{max}+'
  max: number;
  // 是否显示小圆点
  isDot: boolean;
  // 类型
  type: BadgeType;
  // 插槽
  $slots: {
    "": VNode[];
    default: VNode[];
  };
}
