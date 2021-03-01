import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinFormItem extends LinViewUIComponent {
  // 标签文本
  label: string;
  // 表单域model字段
  prop: string;
  // 表单域标签宽度
  labelWidth: string;
  //  自定义表单内容
  $slots: {
    "": VNode[];
    default: VNode[];
  };
}
