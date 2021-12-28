import { VNode } from "vue";
import { LinViewUIComponent ,DefaultType} from "./component";

export type ButtonType =
  DefaultType
  | "default"
  | "info";

export type ButtonSize = "default" | "medium" | "small";

export declare class LinButton extends LinViewUIComponent {
  //   类型
  type: ButtonType;
  //   是否为朴素按钮
  plain: boolean;
  //   是否为圆角按钮
  round: boolean;
  //   是否为圆形按钮
  circle: boolean;
  //   是否禁用
  disabled: boolean;
  //   按钮图标
  icon: string;
  //   尺寸
  size: ButtonSize;
  //   是否加载中状态
  loading: boolean;
  //   加载器颜色
  loadingColor: string;
  //   加载器大小
  loadingSize: string;

  // 点击按钮时触发
  $emit(eventName: "click"): this;

  $slots: {
    "": VNode[];
    default: VNode[];
  };
}
