import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export interface MagnifierStyle {
  width: number | string;
  height: number | string;
}

export declare class LinMagnifier extends LinViewUIComponent {
  // 小图片路径地址
  smallPic: string;
  // 大图片路径地址
  bigPic: string;
  // 小图片样式（必须设置宽高，否则宽高为 0）
  smallStyle: MagnifierStyle;
  // 大图片样式（必须设置宽高，否则宽高为 0）
  bigStyle: MagnifierStyle;
  // 鼠标移动的遮罩层背景色
  maskColor: String;

  //   大图片显示的时候触发
  $emit(eventName: "show"): this;
  //   大图片隐藏的时候触发
  $emit(eventName: "hide"): this;
  //   鼠标移动的时候触发
  $emit(eventName: "move", event: Event): this;

  $slots: {
    // 小图片 的内容
    small: VNode[];
    // 鼠标移动跟随的内容
    move: VNode[];
    // 大图片 的内容
    big: VNode[];
  };
}
