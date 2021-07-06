import { isArray } from "@lin-view-ui/utils";

export default {
  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 禁用小于等于该日期的日期
    disabledBeforeDate: {
      type: [Date, String, Number],
      default: ""
    },
    // 禁用大于等于该日期的日期
    disabledAfterDate: {
      type: [Date, String, Number],
      default: ""
    },
    // 禁用指定范围内的日期
    disabledRangeDate: {
      type: Array,
      default: () => []
    },
    // 禁用指定日期
    disabledDate: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 判断传入的日期是否为禁用的日期
    isDisabledDate(date) {
      if (this.disabled) {
        return true;
      }
      if (this.disabledBeforeDate) {
        const d = new Date(this.disabledBeforeDate);
        if (this.isEqAndGt(d, date)) {
          return true;
        }
      }
      if (this.disabledAfterDate) {
        const d = new Date(this.disabledAfterDate);
        if (this.isEqAndLt(d, date)) {
          return true;
        }
      }
      if (
        isArray(this.disabledRangeDate) &&
        this.disabledRangeDate.length !== 0
      ) {
        if (this.disabledRangeDate.length === 1) {
          const d = new Date(this.disabledRangeDate[0]);
          if (this.isEqAndLt(d, date)) {
            return true;
          }
        }
        if (this.disabledRangeDate.length >= 2) {
          const d1 = new Date(this.disabledRangeDate[0]);
          const d2 = new Date(this.disabledRangeDate[1]);
          if (this.isEqAndLt(d1, date) && this.isEqAndGt(d2, date)) {
            return true;
          }
        }
      }
      if (isArray(this.disabledDate) && this.disabledDate.length !== 0) {
        const isdisable = this.disabledDate.some(item =>
          this.isEqual(item, date)
        );
        if (isdisable) {
          return true;
        }
      }
      return false;
    },
    // 对比日期
    compareDate(date1, date2, type) {
      if (!(date1 instanceof Date)) {
        date1 = new Date(date1);
      }
      if (!(date2 instanceof Date)) {
        date2 = new Date(date2);
      }
      const newDate1 = new Date(
        `${date1.getFullYear()}/${date1.getMonth()}/${date1.getDate()}`
      );
      const newDate2 = new Date(
        `${date2.getFullYear()}/${date2.getMonth()}/${date2.getDate()}`
      );
      const obj = {
        Equal: newDate1.getTime() === newDate2.getTime(),
        EqAndLt: newDate1 <= newDate2,
        EqAndGt: newDate1 >= newDate2,
        Lt: newDate1 < newDate2,
        Gt: newDate1 > newDate2
      };
      return obj[type];
    },
    // 判断2个日期是否相等
    isEqual(date1, date2) {
      return this.compareDate(date1, date2, "Equal");
    },
    // 判断date1是否小于等于date2
    isEqAndLt(date1, date2) {
      return this.compareDate(date1, date2, "EqAndLt");
    },
    // 判断date1是否大于等于date2
    isEqAndGt(date1, date2) {
      return this.compareDate(date1, date2, "EqAndGt");
    },
    // 判断date1是否小于date2
    isLt(date1, date2) {
      return this.compareDate(date1, date2, "Lt");
    },
    // 判断date1是否大于date2
    isGt(date1, date2) {
      return this.compareDate(date1, date2, "Gt");
    }
  }
};
