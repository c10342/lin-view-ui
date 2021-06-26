import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinRadio extends LinViewUIComponent {
  // Radio 的 value
  label: string | number | boolean;
  // 绑定值
  value: any;
  // 原生属性 name
  name: string;
  // 是否禁用
  disabled: boolean;
  //   配合v-model指令使用
  $emit(eventName: "input", value: any): this;

  $slots: {
    // 自定义标签内容
    "": VNode[];
    default: VNode[];
  };
}
