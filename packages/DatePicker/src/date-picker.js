import "./style.scss";

import getDate from "src/utils/getDate.js";
import getYearMonthDay from "src/utils/getYearMonthDay.js";
import dispatch from "src/utils/dispatch.js";
import LocaleMixin from 'src/mixins/locale.js'
export default {
  name: "LinDatePicker",
  mixins:[LocaleMixin],
  render(h) {
    const {
      cellWidth,
      focus,
      placeholder,
      formatDate,
      disabled,
      prevYear,
      prevMonth,
      nextMonth,
      time,
      nextYear,
      labelHeight,
      visibeDays,
      isVisible,
      weekDays,
      isCurrentMonth,
      isCurrentval,
      cellHeight,
      isDisabledDate,
      selectDate,
      renderInfo,
      radius,
      showAlways,
      showInput,
      t
    } = this;
    return (
      <div v-click-outside class="lin-date-picker">
        {showInput && (
          <div class="lin-date-picker-input-box">
            <i class="lin-icon-date lin-date-picker-icon"></i>
            <input
              onClick={focus}
              readonly
              placeholder={placeholder || t('LinViewUI.DatePicker.placeholder')}
              type="text"
              value={formatDate}
              disabled={disabled}
              class={[
                { "lin-date-picker-disabled": disabled },
                "lin-date-picker-input",
              ]}
            />
          </div>
        )}

        <transition name="fade">
          {(isVisible || showAlways) && (
            <div
              class={[
                { "lin-date-picker-absolute": !showAlways },
                "lin-date-picker-pannel",
              ]}
            >
              <div class="lin-date-picker-pannel-header">
                <span onClick={prevYear} class="lin-icon-left"></span>
                <span onClick={prevMonth} class="lin-icon-leftarrow"></span>
                <span>
            <span>{time.year}{t('LinViewUI.DatePicker.year')}</span>
            <span class="lin-date-picker-month">{time.month}{t('LinViewUI.DatePicker.month')}</span>
                </span>
                <span onClick={nextMonth} class="lin-icon-rightarrow"></span>
                <span onClick={nextYear} class="lin-icon-right"></span>
              </div>
              <div class="lin-date-picker-pannel-content">
                <div class="lin-date-picker-pannel-days">
                  <div>
                    {weekDays.map((w) => {
                      return (
                        <span
                          style={{
                            width: `${cellWidth}px`,
                            height: `${labelHeight}px`,
                          }}
                          class="lin-date-picker-pannel-label-cell lin-date-picker-cell"
                          key={w}
                        >
                          {w}
                        </span>
                      );
                    })}
                  </div>

                  {[1, 2, 3, 4, 5, 6].map((i) => {
                    return (
                      <div key={i}>
                        {[1, 2, 3, 4, 5, 6, 7].map((j) => {
                          const currentTime = visibeDays[(i - 1) * 7 + (j - 1)];
                          const info = renderInfo && renderInfo(h, currentTime);
                          return (
                            <span
                              key={j}
                              style={{
                                width: `${cellWidth}px`,
                                height: `${cellHeight}px`,
                              }}
                              onClick={() => selectDate(currentTime)}
                              class={[
                                "lin-date-picker-pannel-cell lin-date-picker-cell",
                                {
                                  "lin-date-picker-not-current-month": !isCurrentMonth(
                                    currentTime
                                  ),
                                },
                                {
                                  "lin-date-picker-current-val": isCurrentval(
                                    currentTime
                                  ),
                                },
                                {
                                  "lin-date-picker-disabled-date": isDisabledDate(
                                    currentTime
                                  ),
                                },
                                {
                                  "lin-date-picker-radius": radius,
                                },
                              ]}
                            >
                              {info ? (
                                info
                              ) : (
                                <span class="lin-date-picker-info">
                                  {currentTime.getDate()}
                                </span>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </transition>
      </div>
    );
  },
  directives: {
    clickOutside: {
      bind(el, bindings, vnode) {
        const handler = (e) => {
          if (!el.contains(e.target) && !vnode.context.showAlways) {
            if (vnode.context.isVisible) {
              vnode.context.blur();
            }
          }
        };
        el.handler = handler;
        document.addEventListener("click", handler);
      },
      unbind(el) {
        document.removeEventListener("click", el.handler);
      },
    },
  },
  props: {
    radius: {
      type: Boolean,
      default: false,
    },
    cellWidth: {
      type: Number,
      default: 32,
    },
    cellHeight: {
      type: Number,
      default: 32,
    },
    labelHeight: {
      type: Number,
      default: 32,
    },
    value: {
      type: [Date, String, Number],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String
    },
    disabledBeforeDate: {
      type: [Date, String, Number],
      default: "",
    },
    disabledAfterDate: {
      type: [Date, String, Number],
      default: "",
    },
    disabledRangeDate: {
      type: Array,
      default: () => [],
    },
    disabledDate: {
      type: Array,
      default: () => [],
    },
    renderInfo: {
      type: Function,
      default: null,
    },
    format: {
      type: String,
      default: "string",
    },
    showFormat: {
      type: Function,
      default: null,
    },
    showAlways: {
      type: Boolean,
      default: false,
    },
    showInput: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const { year, month } = getYearMonthDay(this.handleValue());
    return {
      weekDays: [
        this.t('LinViewUI.DatePicker.sun'), 
        this.t('LinViewUI.DatePicker.mon'), 
        this.t('LinViewUI.DatePicker.tue'), 
        this.t('LinViewUI.DatePicker.wed'), 
        this.t('LinViewUI.DatePicker.thu'), 
        this.t('LinViewUI.DatePicker.fir'), 
        this.t('LinViewUI.DatePicker.sat')],
      isVisible: false,
      time: { year, month },
    };
  },
  computed: {
    currentValue() {
      if (!this.value) {
        return "";
      }
      if (typeof this.value === "string" || typeof this.value === "number") {
        return new Date(this.value);
      } else if (this.value instanceof Date) {
        return this.value;
      }
      return "";
    },
    visibeDays() {
      const { year, month } = getYearMonthDay(
        getDate(this.time.year, this.time.month, 1)
      );
      //   本月1号的时间对象
      const currentFirstDay = getDate(year, month, 1);
      //   本月1号星期几
      const week = currentFirstDay.getDay();
      //   日历上第一行第一列的开始时间
      const startDay = currentFirstDay - week * 60 * 60 * 1000 * 24;
      const arr = [];
      //   42:日历上6行7列
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24));
      }
      return arr;
    },
    formatDate() {
      if (this.showFormat) {
        return this.showFormat(this.currentValue);
      }
      if (!this.currentValue) {
        return "";
      }
      const { year, month, day } = getYearMonthDay(this.currentValue);
      return `${year}-${month}-${day}`;
    },
  },
  methods: {
    isDisabledDate(date) {
      if (this.disabled) {
        return true;
      }
      if (this.disabledBeforeDate) {
        const d = new Date(this.disabledBeforeDate);
        if (d >= date) {
          return true;
        }
      }
      if (this.disabledAfterDate) {
        const d = new Date(this.disabledAfterDate);
        if (d <= date) {
          return true;
        }
      }
      if (
        Array.isArray(this.disabledRangeDate) &&
        this.disabledRangeDate.length !== 0
      ) {
        if (this.disabledRangeDate.length === 1) {
          const d = new Date(this.disabledRangeDate[0]);
          if (d <= date) {
            return true;
          }
        }
        if (this.disabledRangeDate.length >= 2) {
          const d1 = new Date(this.disabledRangeDate[0]);
          const d2 = new Date(this.disabledRangeDate[1]);
          if (d1 <= date && d2 >= date) {
            return true;
          }
        }
      }
      if (Array.isArray(this.disabledDate) && this.disabledDate.length !== 0) {
        const isdisable = this.disabledDate.some((item) => {
          return new Date(item).getTime() == date.getTime();
        });
        if (isdisable) {
          return true;
        }
      }
      return false;
    },
    handleValue() {
      if (!this.value) {
        return new Date();
      }
      if (typeof this.value === "string" || typeof this.value === "number") {
        return new Date(this.value);
      } else if (this.value instanceof Date) {
        return this.value;
      }
      return new Date();
    },
    prevYear() {
      const d = getDate(this.time.year, this.time.month, 1);
      d.setFullYear(d.getFullYear() - 1);
      this.setTime(d);
      this.$emit("prevYear", d);
    },
    prevMonth() {
      const d = getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() - 1);
      this.setTime(d);
      this.$emit("prevMonth", d);
    },
    nextMonth() {
      const d = getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() + 1);
      this.setTime(d);
      this.$emit("nextMonth", d);
    },
    nextYear() {
      const d = getDate(this.time.year, this.time.month, 1);
      d.setFullYear(d.getFullYear() + 1);
      this.setTime(d);
      this.$emit("nextYear", d);
    },
    isCurrentMonth(date) {
      const { year, month } = getYearMonthDay(
        getDate(this.time.year, this.time.month, 1)
      );
      const { year: y, month: m } = getYearMonthDay(date);
      return year === y && month === m;
    },
    isCurrentval(date) {
      const { year, month, day } = getYearMonthDay(this.currentValue);
      const { year: y, month: m, day: d } = getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    selectDate(date) {
      if (this.isDisabledDate(date)) {
        return;
      }
      const { year, month, day } = getYearMonthDay(date);
      this.time = { year, month };
      let d;
      if (this.format === "string") {
        d = `${year}-${month}-${day}`;
      } else if (this.format === "number") {
        d = new Date(date).getTime();
      } else {
        d = date;
      }
      this.$emit("input", d);
      dispatch.call(this, {
        eventName: "validate",
        componentName: "LinFormItem",
      });
      this.$emit("select", d);
      this.blur();
    },
    focus() {
      if (this.disabled) {
        return;
      }
      this.isVisible = true;
      this.$emit("focus");
    },
    blur() {
      this.isVisible = false;
      this.$emit("blur");
    },
    setTime(date) {
      const { year, month } = getYearMonthDay(date);
      this.time = { year, month };
    },
  },
};
