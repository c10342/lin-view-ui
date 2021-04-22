import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export type TabGroupType = "card" | "border-card" | "default";

export declare class LinTabGroup extends LinViewUIComponent {
  // 绑定值，选中选项卡的 name
  value: string;
  // 风格类型
  type: TabGroupType;
  //   点击tab的时候触发
  $emit(eventName: "tab-click", data: string | number): this;
  //   配合v-model指令使用
  $emit(eventName: "input", data: string | number): this;

  $slots: {
    //   一般是LinTabItem组件
    "": VNode[];
    default: VNode[];
  };
}
