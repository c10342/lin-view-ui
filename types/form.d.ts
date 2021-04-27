import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinForm extends LinViewUIComponent {
  // 表单数据对象
  model: Record<string, any>;
  // 标签宽度
  labelWidth: string;
  // 表单校验规则
  rules: Array<Record<string, any>>;
  //   任一表单项被校验后触发
  $emit(eventName: "validate", data: any): this;
  //   校验表单方法
  validate: (callback: (data: boolean) => void) => Promise<boolean>;
  //   清空错误信息
  clearValidate: () => void;

  $slots: {
    //   一般书form-item组件
    "": VNode[];
    default: VNode[];
  };
}
