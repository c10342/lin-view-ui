import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinCheckbox extends LinViewUIComponent {
  // 绑定值
  value: boolean;
  // 原生属性name
  name: string;
  //   lin-checkbox 的 value，只能结合 lin-checkbox-group 使用
  label: string | number;
  // 是否禁用
  disabled: boolean;
  // 结合v-model使用
  $emit(eventName: "input", data: boolean): this;
  // 插槽
  $slots: {
    "": VNode[];
    default: VNode[];
  };
}
