import { CreateElement, VNode } from "vue";
import {
  LinViewUIComponent,
  LinViewUIDateMixin,
  DateMixinDateType
} from "./component";

export type DatePickerValue = Date | string | number;

export declare class LinDatePicker extends LinViewUIComponent
  implements LinViewUIDateMixin {
  // 日期块是否为圆角
  radius: boolean;
  // 日期块宽度
  cellWidth: number;
  // 日期块高度
  cellHeight: number;
  // 头部标签的高度
  labelHeight: number;
  // 绑定值
  value: DatePickerValue;
  // 输入框占位符
  placeholder: string;
  // 自定义渲染日期块，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个是日期对象。可以使用 jsx
  renderInfo: (h: CreateElement, date: Date) => VNode;
  // 格式化 value/v-model 绑定值
  format: string;
  // 自定义输入框的显示内容
  showFormat: (date: Date) => string;
  // 自定义输入框的显示内容
  showAlways: boolean;
  // 是否显示输入框
  showInput: boolean;
  // 是否禁用
  disabled: boolean;
  // 禁用小于等于该日期的日期
  disabledBeforeDate: DateMixinDateType;
  // 禁用大于等于该日期的日期
  disabledAfterDate: DateMixinDateType;
  // 禁用指定范围内的日期
  disabledRangeDate: Array<DateMixinDateType>;
  // 禁用指定日期
  disabledDate: Array<DateMixinDateType>;
  // 点击上一年按钮触发
  $emit(eventName: "prevYear", data: Date): this;
  // 点击上一个月按钮触发
  $emit(eventName: "prevMonth", data: Date): this;
  // 点击下一个月按钮触发
  $emit(eventName: "nextMonth", data: Date): this;
  // 点击下一年按钮触发
  $emit(eventName: "nextYear", data: Date): this;
  // 配合v-model指令使用
  $emit(eventName: "input", data: DatePickerValue): this;
  // 选中日期时触发
  $emit(eventName: "select", data: DatePickerValue): this;
  // 日期选择器显示时触发
  $emit(eventName: "focus"): this;
  // 日期选择器隐藏时触发
  $emit(eventName: "blur"): this;
}
