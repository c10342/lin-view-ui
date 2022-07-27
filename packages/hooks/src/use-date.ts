import { isArray, isDate } from "@packages/utils";

interface Props {
  disabled: boolean;
  disabledBeforeDate: any;
  disabledAfterDate: any;
  disabledRangeDate: Array<any>;
  disabledDate: Array<any>;
}

export const DateProps = {
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
};

export const useDate = (props: Props) => {
  // 对比日期
  const compareDate = (
    date1: Date,
    date2: Date,
    type: "Equal" | "EqAndLt" | "EqAndGt" | "Lt" | "Gt"
  ) => {
    if (!isDate(date1)) {
      date1 = new Date(date1);
    }
    if (!isDate(date2)) {
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
  };
  
  // 判断2个日期是否相等
  const isEqual = (date1: Date, date2: Date) => {
    return compareDate(date1, date2, "Equal");
  };
    // 判断date1是否小于等于date2
  const isEqAndLt = (date1: Date, date2: Date) => {
    return compareDate(date1, date2, "EqAndLt");
  };
    // 判断date1是否大于等于date2
  const isEqAndGt = (date1: Date, date2: Date) => {
    return compareDate(date1, date2, "EqAndGt");
  };
    // 判断date1是否小于date2
  const isLt = (date1: Date, date2: Date) => {
    return compareDate(date1, date2, "Lt");
  };
    // 判断date1是否大于date2
  const isGt = (date1: Date, date2: Date) => {
    return compareDate(date1, date2, "Gt");
  };
  // 判断传入的日期是否为禁用的日期
  const isDisabledDate = (date: Date) => {
    if (props.disabled) {
      return true;
    }
    if (props.disabledBeforeDate) {
      const d = new Date(props.disabledBeforeDate);
      if (isEqAndGt(d, date)) {
        return true;
      }
    }
    if (props.disabledAfterDate) {
      const d = new Date(props.disabledAfterDate);
      if (isEqAndLt(d, date)) {
        return true;
      }
    }
    if (
      isArray(props.disabledRangeDate)
      && props.disabledRangeDate.length !== 0
    ) {
      if (props.disabledRangeDate.length === 1) {
        const d = new Date(props.disabledRangeDate[0]);
        if (isEqAndLt(d, date)) {
          return true;
        }
      }
      if (props.disabledRangeDate.length >= 2) {
        const d1 = new Date(props.disabledRangeDate[0]);
        const d2 = new Date(props.disabledRangeDate[1]);
        if (isEqAndLt(d1, date) && isEqAndGt(d2, date)) {
          return true;
        }
      }
    }
    if (isArray(props.disabledDate) && props.disabledDate.length !== 0) {
      const isDisable = props.disabledDate.some((item) => isEqual(item, date));
      if (isDisable) {
        return true;
      }
    }
    return false;
  };

  return {
    isDisabledDate,
    isEqual,
    isEqAndLt,
    isEqAndGt,
    isLt,
    isGt
  };
};
