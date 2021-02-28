import Vue from "vue";

export declare class LinViewUIComponent extends Vue {
  static install(vue: typeof Vue): void;
}

export type DateMixinDateType = Date | string | number;

export interface LinViewUIDateMixin {
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
}
