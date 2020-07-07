import "./style.scss";

import * as utils from "packages/assets/js/utils";
export default {
  name: "l-date-picker",
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
    } = this;
    return (
      <div v-click-outside class="l-date-picker">
        {showInput && (
          <div class="l-date-picker-input-box">
            <i class="l-icon-date l-date-picker-icon"></i>
            <input
              onClick={focus}
              readonly
              placeholder={placeholder}
              type="text"
              value={formatDate}
              disabled={disabled}
              class={[
                { "l-date-picker-disabled": disabled },
                "l-date-picker-input",
              ]}
            />
          </div>
        )}

        <transition name="fade">
          {(isVisible || showAlways) && (
            <div
              class={[
                { "l-date-picker-absolute": !showAlways },
                "l-date-picker-pannel",
              ]}
            >
              <div class="l-date-picker-pannel-header">
                <span onClick={prevYear} class="l-icon-left"></span>
                <span onClick={prevMonth} class="l-icon-leftarrow"></span>
                <span>
                  <span>{time.year}年</span>
                  <span class="l-date-picker-month">{time.month}月</span>
                </span>
                <span onClick={nextMonth} class="l-icon-rightarrow"></span>
                <span onClick={nextYear} class="l-icon-right"></span>
              </div>
              <div class="l-date-picker-pannel-content">
                <div class="l-date-picker-pannel-days">
                  <div>
                    {weekDays.map((w) => {
                      return (
                        <span
                          style={{
                            width: `${cellWidth}px`,
                            height: `${labelHeight}px`,
                          }}
                          class="l-date-picker-pannel-label-cell l-date-picker-cell"
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
                                "l-date-picker-pannel-cell l-date-picker-cell",
                                {
                                  "l-date-picker-not-current-month": !isCurrentMonth(
                                    currentTime
                                  ),
                                },
                                {
                                  "l-date-picker-current-val": isCurrentval(
                                    currentTime
                                  ),
                                },
                                {
                                  "l-date-picker-disabled-date": isDisabledDate(
                                    currentTime
                                  ),
                                },
                                {
                                  "l-date-picker-radius": radius,
                                },
                              ]}
                            >
                              {info ? (
                                info
                              ) : (
                                <span class="l-date-picker-info">
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
      type: String,
      default: "请选择日期",
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
    const { year, month } = utils.getYearMonthDay(this.handleValue());
    return {
      weekDays: ["日", "一", "二", "三", "四", "五", "六"],
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
      const { year, month } = utils.getYearMonthDay(
        utils.getDate(this.time.year, this.time.month, 1)
      );
      //   本月1号的时间对象
      const currentFirstDay = utils.getDate(year, month, 1);
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
      const { year, month, day } = utils.getYearMonthDay(this.currentValue);
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
      const d = utils.getDate(this.time.year, this.time.month, 1);
      d.setFullYear(d.getFullYear() - 1);
      this.setTime(d);
      this.$emit("prevYear", d);
    },
    prevMonth() {
      const d = utils.getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() - 1);
      this.setTime(d);
      this.$emit("prevMonth", d);
    },
    nextMonth() {
      const d = utils.getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() + 1);
      this.setTime(d);
      this.$emit("nextMonth", d);
    },
    nextYear() {
      const d = utils.getDate(this.time.year, this.time.month, 1);
      d.setFullYear(d.getFullYear() + 1);
      this.setTime(d);
      this.$emit("nextYear", d);
    },
    isCurrentMonth(date) {
      const { year, month } = utils.getYearMonthDay(
        utils.getDate(this.time.year, this.time.month, 1)
      );
      const { year: y, month: m } = utils.getYearMonthDay(date);
      return year === y && month === m;
    },
    isCurrentval(date) {
      const { year, month, day } = utils.getYearMonthDay(this.currentValue);
      const { year: y, month: m, day: d } = utils.getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    selectDate(date) {
      if (this.isDisabledDate(date)) {
        return;
      }
      const { year, month, day } = utils.getYearMonthDay(date);
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
      const { year, month } = utils.getYearMonthDay(date);
      this.time = { year, month };
    },
  },
};
