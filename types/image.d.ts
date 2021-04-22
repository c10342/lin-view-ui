import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export interface ImageErrorData {
  url: string;
  index?: number;
  event: Event;
}

export interface ImageSuccessData {
  url: string;
  index?: number;
  event: Event;
}

export interface ImageAllErrorData {
  url: Array<string>;
  event: Event;
}

export declare class LinImage extends LinViewUIComponent {
  // 图片地址
  imgUrl: string | Array<string>;
  // 确定图片如何适应容器框，同原生 object-fit
  fit: string;
  // 原生 referrerPolicy
  referrerPolicy: string;
  // 原生 alt
  alt: string;
  // 开启图片预览
  preview: boolean;
  // 图片预览显示动画，即 transition 组件 name 属性
  transitionName: string;
  // 点击遮罩层是否可以关闭图片预览
  clickMask: boolean;
  // 图片加载失败提示语
  errorMsg: string;
  //   图片加载失败时触发
  $emit(eventName: "error", data: ImageErrorData): this;
  //   当 imgUrl 为数组时并且所有图片加载失败时触发
  $emit(eventName: "AllError", data: ImageAllErrorData): this;
  //   图片加载成功是触发
  $emit(eventName: "success", data: ImageSuccessData): this;
  $slots: {
    // Image 图片加载失败显示的内容
    "": VNode[];
    default: VNode[];
  };
}
