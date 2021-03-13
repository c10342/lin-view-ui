import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinScrollBar extends LinViewUIComponent {
  // 是否一直显示自定义滚动条
  hover: boolean;
  // 高度
  height: string;
  // 宽度
  width: string;
  // 最大高度
  maxHeight: string;
  // 最小高度
  minHeight: string;
  // 是否正在加载，显示加载动画
  loading: boolean;
  // 加载文案
  loadingText: string;
  // 加载器大小
  loadingSize: string;
  //   容器正在滚动时触发
  $emit(eventName: "scroll", event: Event): this;
  //   容器滚动到底部时触发
  $emit(eventName: "scrollToBottom", event: Event): this;

  $slots: {
    // 需要滚动的内容
    "": VNode[];
    default: VNode[];
    // 加载动画显示的内容
    loading: VNode[];
  };
}
