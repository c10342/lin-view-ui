import { LinViewUIComponent } from "./component";

export declare class LinInputNumber extends LinViewUIComponent {
  // 绑定值
  value: string | number;
  // 设置计数器允许的最小值
  min: number;
  // 设置计数器允许的最大值
  max: number;
  // 计数器步长
  step: number;
  // 是否禁用计数器
  disabled: false;
  // 输入框占位符
  placeholder: string;
  // 是否只能输入 step 的倍数
  stepStrictly: boolean;
  //   点击-号时触发
  $emit(eventName: "reduce", data: number): this;
  //   点击+号时触发
  $emit(eventName: "plus", data: number): this;
  //   配合v-model指令使用
  $emit(eventName: "input", data: number): this;
}
