import { LinViewUIComponent } from "./component";

export declare class LinLimitTextarea extends LinViewUIComponent {
  // 输入框占位符
  placeholder: string;
  // 行高
  rows: number;
  // 最大长度
  maxLen: number;
  // 超出字符是否裁剪
  isCut: boolean;
  // 绑定值
  value: string | number;
//   文本框发生改变，同时配合v-model指令使用
  $emit(eventName: "change", data: string): this;
}
