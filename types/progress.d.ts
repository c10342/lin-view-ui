import { VNode } from "vue";
import { LinViewUIComponent,DefaultType } from "./component";

export type ProgressType = DefaultType;

export declare class LinProgress extends LinViewUIComponent {
  // 百分比（必填）
  percent: number;
  // 进度条底层颜色
  innerColor: string;
  // 进度条上层颜色
  outColor: string;
  // 进度条的高度，单位 px
  height: number;
  // 是否需要圆角
  radius: boolean;
  // 进度条外面的提示文字
  textOutside: string;
  // 进度条类型
  type: ProgressType;
  // 进度条里面的提示文字
  textInside: string;

  $slots: {
    // Progress 外面提示的内容
    "": VNode[];
    default: VNode[];
    //   Progress 里面提示的内容
    text: VNode[];
  };
}
