import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export type CollapseGroupValue = string | number | Array<string | number>;

export declare class LinCollapseGroup extends LinViewUIComponent {
  // 当前激活面板的name，accordion为true就是String,否则就是Array
  value: CollapseGroupValue;
  // 是否开启手风琴模式，开启后每次至多展开一个面板
  accordion: boolean;
  // 是否开启简洁模式
  simple: boolean;
  // 配合v-model使用
  $emit(eventName: "input", data: CollapseGroupValue): this;
  // 切换面板时触发，返回当前已展开的面板的 key
  $emit(eventName: "onChange", data: Array<string | number>): this;
  // 插槽
  $slots: {
    // CollapseItem组件列表
    "": VNode[];
    default: VNode[];
  };
}
