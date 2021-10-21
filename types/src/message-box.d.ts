import Vue from "vue";
import { LinViewUIComponent,LinViewUIDragMixin } from "./component";

export type MessageBoxType = "success" | "info" | "warning" | "error";

interface CommonProps extends LinViewUIDragMixin {
  // MessageBox 标题
  title: string;
  // MessageBox 消息正文内容
  message: string;
  // 是否将 message 属性作为 HTML 片段处理
  dangerouslyUseHTMLString: boolean;
  // 消息类型，用于显示图标
  type: string;
  // 自定义图标的类名，会覆盖 type
  iconClass: string;
  // MessageBox 的自定义类名
  customClass: string;
  // MessageBox 是否显示右上角关闭按钮
  showClose: boolean;
  // MessageBox 关闭前的回调，会暂停实例的关闭
  beforeClose: (
    data: { by: string },
    instance: LinMessageBoxComponent,
    done: () => void
  ) => void;
  // 是否显示取消按钮
  showCancelButton: Boolean;
  // 是否显示确定按钮
  showConfirmButton: boolean;
  // 取消按钮的文本内容
  cancelButtonText: string;
  // 确定按钮的文本内容
  confirmButtonText: string;
  // 取消按钮的自定义类名
  cancelButtonClass: string;
  // 确定按钮的自定义类名
  confirmButtonClass: string;
  // 是否可通过点击遮罩关闭 MessageBox
  closeOnClickModal: boolean;
  // 是否可通过按下 ESC 键关闭 MessageBox
  closeOnPressEscape: boolean;
  // 是否在 hashchange 时关闭 MessageBox
  closeOnHashChange: boolean;
  // 是否显示输入框
  showInput: boolean;
  // 输入框的占位符
  inputPlaceholder: string;
  // 输入框的类型
  inputType: string;
  // 输入框的初始文本
  inputValue: string;
  // 输入框的校验表达式
  inputPattern: RegExp;
  // 输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage
  inputValidator: (data: any) => boolean | string;
  // 校验未通过时的提示文本
  inputErrorMessage: string;
  // 是否使用圆角按钮
  roundButton: boolean;
  // 是否显示确认按钮的 loading 状态
  confirmButtonLoading: boolean;
  // loading指示器大小
  loadingSize: string;
  // 是否可以对 MessageBox 进行拖拽
  // drag: boolean;
}

export declare class LinMessageBoxComponent extends LinViewUIComponent
  implements CommonProps {
  // MessageBox 标题
  title: string;
  // MessageBox 消息正文内容
  message: string;
  // 是否将 message 属性作为 HTML 片段处理
  dangerouslyUseHTMLString: boolean;
  // 消息类型，用于显示图标
  type: string;
  // 自定义图标的类名，会覆盖 type
  iconClass: string;
  // MessageBox 的自定义类名
  customClass: string;
  // MessageBox 是否显示右上角关闭按钮
  showClose: boolean;
  // MessageBox 关闭前的回调，会暂停实例的关闭
  beforeClose: (
    data: { by: string },
    instance: LinMessageBoxComponent,
    done: () => void
  ) => void;
  // 是否显示取消按钮
  showCancelButton: Boolean;
  // 是否显示确定按钮
  showConfirmButton: boolean;
  // 取消按钮的文本内容
  cancelButtonText: string;
  // 确定按钮的文本内容
  confirmButtonText: string;
  // 取消按钮的自定义类名
  cancelButtonClass: string;
  // 确定按钮的自定义类名
  confirmButtonClass: string;
  // 是否可通过点击遮罩关闭 MessageBox
  closeOnClickModal: boolean;
  // 是否可通过按下 ESC 键关闭 MessageBox
  closeOnPressEscape: boolean;
  // 是否在 hashchange 时关闭 MessageBox
  closeOnHashChange: boolean;
  // 是否显示输入框
  showInput: boolean;
  // 输入框的占位符
  inputPlaceholder: string;
  // 输入框的类型
  inputType: string;
  // 输入框的初始文本
  inputValue: string;
  // 输入框的校验表达式
  inputPattern: RegExp;
  // 输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage
  inputValidator: (data: any) => boolean | string;
  // 校验未通过时的提示文本
  inputErrorMessage: string;
  // 是否使用圆角按钮
  roundButton: boolean;
  // 是否显示确认按钮的 loading 状态
  confirmButtonLoading: boolean;
  // loading指示器大小
  loadingSize: string;
  // 是否可以对 MessageBox 进行拖拽
  drag: boolean;
  //   关闭组件时触发
  $emit(eventName: "close", data: { by: string; value: any }): this;
}

export interface LinMessageBoxOptions extends CommonProps {
  // 是否在 MessageBox 出现时将 body 滚动锁定
  lockScroll: boolean;
}

export interface LinMessageBoxService {
  (options: LinMessageBoxOptions): Promise<string>;
  // 弹框
  alert(
    options: Omit<
      LinMessageBoxOptions,
      "closeOnClickModal" | "closeOnPressEscape"
    >
  ): Promise<string>;
  // 确认弹框
  confirm(
    options: Omit<LinMessageBoxOptions, "showCancelButton">
  ): Promise<string>;
  // 输入弹框
  prompt(
    options: Omit<LinMessageBoxOptions, "showInput" | "showCancelButton">
  ): Promise<string>;
}


export interface LinMessageBox{
  install(vue: typeof Vue): void;
}

declare module "vue/types/vue" {
  interface Vue {
    $messageBox: LinMessageBoxService;
  }
}