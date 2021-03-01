import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinInput extends LinViewUIComponent {
  // 输入框占位符
  placeholder: string;
  // 输入框类型
  type: string;
  // 原生属性name
  name: string;
  // 是否禁用文本框
  disabled: boolean;
  // 绑定值
  value: string;
  // 是否可清空
  clearable: boolean;
  // 是否显示切换密码图标，即密文切换成明文，明文切换成密文
  showPassword: boolean;
  // 最大长度
  maxlength: number;
  // 最小长度
  minlength: number;
  //   在点击由 clearable 属性生成的清空按钮时触发
  $emit(eventName: "clear"): this;
  //   配合v-model指令使用
  $emit(eventName: "input", data: string): this;
  //   失去焦点
  $emit(eventName: "blur", event: Event): this;
  //   获得焦点
  $emit(eventName: "focus", event: Event): this;

  $slots: {
    // 输入框尾部内容
    "": VNode[];
    default: VNode[];
  };
}
