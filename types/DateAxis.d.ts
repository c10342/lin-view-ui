import { VNode } from "vue";
import {
  LinViewUIComponent,
  DateMixinDateType,
  LinViewUIDateMixin
} from "./component";

export declare class LinDateAxis extends LinViewUIComponent
  implements LinViewUIDateMixin {
  // 绑定值
  value: Date | string;
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
  // 用户点击日期的时候触发
  $emit(eventName: "select", data: Date): this;
  // 点击上一周按钮触发
  $emit(eventName: "prevWeek", data: Date): this;
  // 点击下一周按钮触发
  $emit(eventName: "nextWeek", data: Date): this;
  // 点击上一天按钮触发
  $emit(eventName: "prevDay", data: Date): this;
  // 点击下一天按钮触发
  $emit(eventName: "nextDay", data: Date): this;
  // 更多日期选择器隐藏的时候触发
  $emit(eventName: "hide"): this;
  // 更多日期选择器显示的时候触发
  $emit(eventName: "show"): this;
  //   选中日期发生变化的时候触发
  $emit(eventName: "change", data: Date): this;

  $slots: {
    // 时间轴每一项显示的内容，参数为日期对象
    "": VNode[];
    default: VNode[];
    // 上一周按钮内容
    prevWeek: VNode[];
    // 上一天按钮内容
    prevDay: VNode[];
    // 下一天按钮内容
    nextDay: VNode[];
    // 下一周按钮内容
    nextWeek: VNode[];
    // 更多按钮内容
    more: VNode[];
  };
}
