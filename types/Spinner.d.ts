import { DefaultType, LinViewUIComponent } from "./component";

export type SpinnerType = DefaultType | "info";

export type SpinnerVertical = "col" | "row";

export type SpinnerProportion = "1" | "2" | "3" | 1 | 2 | 3;

export type SpinnerLineStyle =
  | "dotted"
  | "dashed"
  | "solid"
  | "double"
  | "groove"
  | "ridge"
  | "inset"
  | "outset";

export type SpinnerTimingFunction =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | string;

export declare class LinSpinner extends LinViewUIComponent {
  // 主题类型
  type: SpinnerType;
  // 文案对齐方向
  vertical: SpinnerVertical;
  // 弧度
  proportion: SpinnerProportion;
  // 显示器颜色
  loadingColor: string;
  // 显示器大小
  size: string;
  // 圆环宽度
  strokeWidth: string;
  // 线条样式
  lineStyle: SpinnerLineStyle;
  // css3 动画名称
  animationName: string;
  // 运动时长
  animationDuration: string;
  // 运动方式
  timingFunction: SpinnerTimingFunction;
  // 运动次数
  iterationCount: number | string;
  // 加载文案
  text: string;
  // 加载文案字体大小
  textSize: string;
  // 加载文案字体颜色
  textColor: string;
}
