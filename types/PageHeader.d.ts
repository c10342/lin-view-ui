import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinPageHeader extends LinViewUIComponent {
  // 是否显示返回按钮
  back: boolean;
  // 返回按钮文字
  backTip: string;
  // 标题
  title: string;
  // 是否显示右侧按钮
  right: boolean;
  // 是否显示激活状态
  active: boolean;
  // 是否显示底部边框
  border: boolean;
  //   点击返回按钮的时候触发
  $emit(eventName: "back"): this;
  //   点击右侧按钮的时候触发
  $emit(eventName: "more"): this;

  $slots: {
    //   标题插槽
    "": VNode[];
    default: VNode[];
    //   返回按钮内容
    back: VNode[];
    // 右侧按钮内容
    right: VNode[];
  };
}
