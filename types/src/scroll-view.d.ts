import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinScrollView extends LinViewUIComponent {
  // 容器高度
  height: number;
  // 是否需要节流
  isThrottle: boolean;
  // 滚动执行间隔时长，isThrottle 为 true 才有效
  time: number;
  // 数据是否全部加载完毕，即是否不在触发 scrollToEnd 事件
  isEnd: boolean;
  // 是否显示正在加载动画
  showLoading: boolean;
  // 是否需要派发 scroll 滚动事件
  emitScrollEvent: boolean;
  // 显示的视图数据，用于刷新内容的高度
  data: Record<string, any> | Array<any>;
  // 正在加载的提示语
  loadingTip: string;
  // 数据加载完毕时候的提示语
  noMoreTip: string;
  //   容器滚动到底部时触发
  $emit(eventName: "scrollToEnd", event: Event): this;
  //   容器正在滚动时触发
  $emit(eventName: "scroll", event: Event): this;

  $slots: {
    // 需要进行滚动的内容
    "": VNode[];
    default: VNode[];
    // 上拉加载需要显示的内容
    loading: VNode[];
    // 数据加载完毕显示的内容
    "no-more": VNode[];
  };
}
