import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinCollapseItem extends LinViewUIComponent {
  // 当前面板的 name，与 CollapseGroup 的 value 对应，必填项
  name: string | number;
  // 隐藏箭头
  hideArrow: boolean;

  $slots: {
    "": VNode[];
    // 面板头内容
    default: VNode[];
    // 描述内容
    content: VNode[];
  };
}
