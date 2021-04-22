import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinBacktop extends LinViewUIComponent {
  // 显示位置，距离页面右边距离
  right: number;
  // 显示位置，距离页面底部距离
  bottom: number;
  // 滚动触发的对象
  target: string;
  // 滚动高度达到次参数才显示组件
  visibilityHeight: number;
  // 点击按钮时触发
  $emit(eventName: 'click', event: Event): this;
  // 滚动对象正在滚动时触发
  $emit(eventName: 'scroll', scrollTop: number): this;
  // 滚动对象滚动结束时触发
  $emit(eventName: 'end'): this;
  // 插槽
  $slots: {
    '':VNode[],
    'default':VNode[]
  }
}
