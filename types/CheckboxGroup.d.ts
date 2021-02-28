import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinCheckboxGroup extends LinViewUIComponent {
  // 绑定值
  value: Array<string | number>;
  // 是否禁用
  disabled: boolean;

  // 结合v-model使用
  $emit(eventName: "input", data: Array<string | number>): this;

  $slots: {
    "": VNode[];
    default: VNode[];
  };
}
