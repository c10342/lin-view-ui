import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinRadioGroup extends LinViewUIComponent {
  // 绑定值
  value: any;
  // 是否禁用
  disabled: boolean;
  //   配合v-model指令使用
  $emit(eventName: "input", value: any): this;

  $slots: {
    // 一般是LinRadio组件
    "": VNode[];
    default: VNode[];
  };
}
