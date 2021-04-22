import { LinViewUIComponent } from "./component";

export declare class LinSwitch extends LinViewUIComponent {
  // 绑定值
  value: boolean;
  //  打开时的背景色
  activeColor: string;
  // 关闭时的背景色
  inactiveColor: string;
  // 原生属性 name
  name: string;
  // 是否禁用
  disabled: boolean;
//   配合v-model指令使用
  $emit(eventName: "input", value: boolean): this;
}
