import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinVideoCard extends LinViewUIComponent {
  // 卡片相关数据
  data: Record<string, any>;
  // 卡片高度
  cardHeight: string;
  // 卡片宽度
  cardWidth: string;
  // 封面高度
  imageHeight: string;
  // 封面右下角提示
  coverTip: string;
  // 图片加载失败提示语
  errorTip: string;
  // 封面默认图片
  defaultImageUrl: string;
  // 封面图片
  imageUrl: string;
  //   点击卡片时触发
  $emit(eventName: "click", data: Record<string, any>): this;

  $slots: {
    // 自定义底部内容
    "": VNode[];
    default: VNode[];
    //   自定义顶部内容
    top: VNode[];
  };
}
