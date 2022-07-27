import { getDate, getYearMonthDay } from "@packages/utils";
import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  ref,
  Transition
} from "vue";

import LinIcon from "@packages/icon";
import {
  DateProps,
  useClickOutside,
  useDate,
  useScopeLocale
} from "@packages/hooks";

export default defineComponent({
  name: "LinDatePicker",

  props: {
    // 日期块是否为圆角
    radius: {
      type: Boolean,
      default: false
    },
    // 日期块宽度
    cellWidth: {
      type: Number,
      default: 32
    },
    // 日期块高度
    cellHeight: {
      type: Number,
      default: 32
    },
    // 头部标签的高度
    labelHeight: {
      type: Number,
      default: 32
    },
    // 绑定值
    value: {
      type: [Date, String] as PropType<Date | "">,
      default: ""
    },
    // 输入框占位符
    placeholder: {
      type: String,
      default: null
    },
    // 自定义渲染日期块，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个是日期对象。可以使用 jsx
    renderInfo: {
      type: Function,
      default: null
    },
    // 自定义输入框的显示内容
    showFormat: {
      type: Function,
      default: null
    },
    // 自定义输入框的显示内容
    showAlways: {
      type: Boolean,
      default: false
    },
    // 是否显示输入框
    showInput: {
      type: Boolean,
      default: true
    },
    ...DateProps
  },
  emits: [
    "prevYear",
    "prevMonth",
    "nextMonth",
    "nextYear",
    "update:value",
    "select",
    "focus",
    "blur"
  ],
  setup(props, context) {
    const { t } = useScopeLocale("DatePicker");
    const { isDisabledDate } = useDate(props);
    // 是否显示选择器
    const isVisible = ref(false);
    // 头部当前日期
    const { year, month } = getYearMonthDay(props.value || new Date()) || {};
    const time = ref<{ year: number | undefined; month: number | undefined }>({
      year,
      month
    });
    // 选择器距离顶部距离
    const top = ref("0px");
    const weekDays = computed(() => {
      return [
        t("sun"),
        t("mon"),
        t("tue"),
        t("wed"),
        t("thu"),
        t("fir"),
        t("sat")
      ];
    });

    const popupRef = ref<HTMLElement | null>(null);
    const containerRef = ref<HTMLElement | null>(null);
    const inputWrapperRef = ref<HTMLElement | null>(null);

    // 显示在选择器上面的日期
    const visibleDays = computed(() => {
      const { year:vYear, month:vMonth }
        = getYearMonthDay(getDate(time.value.year, time.value.month, 1)) || {};
      //   本月1号的时间对象
      const currentFirstDay = getDate(vYear, vMonth, 1);
      //   本月1号星期几
      const week = currentFirstDay.getDay();
      //   日历上第一行第一列的开始时间
      const startDay = +currentFirstDay - week * 60 * 60 * 1000 * 24;
      const arr = [];
      //   42:日历上6行7列
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24));
      }
      return arr;
    });
    // 显示在输入框中的日期
    const formatDate = computed(() => {
      if (props.showFormat) {
        return props.showFormat(props.value);
      }
      if (!props.value) {
        return "";
      }
      const { year:vYear, month:vMonth , day } = getYearMonthDay(props.value) || {};
      return `${vYear}-${vMonth}-${day}`;
    });
    // 设置日期选择器向下显示
    const setDownTop = () => {
      if (!inputWrapperRef.value) {
        return;
      }
      top.value = `${inputWrapperRef.value.clientHeight}px`;
    };
    // 设置日期选择器向上显示
    const setUpTop = () => {
      if (!popupRef.value) {
        return;
      }
      top.value = `${-popupRef.value.clientHeight}px`;
    };
    // 设置日期选择器位置
    const setPlacement = () => {
      nextTick(() => {
        if (!popupRef.value || !containerRef.value) {
          return;
        }
        const { bottom, top:vTop } = containerRef.value.getBoundingClientRect();
        const bottomOffset = window.innerHeight - bottom;
        if (bottomOffset > popupRef.value.clientHeight) {
          setDownTop();
        } else if (vTop > popupRef.value.clientHeight) {
          setUpTop();
        } else {
          setDownTop();
        }
      });
    };
    // 设置头部当前日期
    const setTime = (date: Date) => {
      const { year:vYear, month:vMonth } = getYearMonthDay(date) || {};
      time.value = { year:vYear, month:vMonth };
    };
    // 点击上一年按钮
    const prevYear = () => {
      const d = getDate(time.value.year, time.value.month, 1);
      d.setFullYear(d.getFullYear() - 1);
      setTime(d);
      context.emit("prevYear", d);
    };
    // 点击上一个月按钮
    const prevMonth = () => {
      const d = getDate(time.value.year, time.value.month, 1);
      d.setMonth(d.getMonth() - 1);
      setTime(d);
      context.emit("prevMonth", d);
    };
    // 点击下一个月按钮
    const nextMonth = () => {
      const d = getDate(time.value.year, time.value.month, 1);
      d.setMonth(d.getMonth() + 1);
      setTime(d);
      context.emit("nextMonth", d);
    };
    // 点击下一年按钮
    const nextYear = () => {
      const d = getDate(time.value.year, time.value.month, 1);
      d.setFullYear(d.getFullYear() + 1);
      setTime(d);
      context.emit("nextYear", d);
    };
    // 判断传入的时间是否为当前头部日期的月份
    const isCurrentMonth = (date: Date) => {
      const { year:vYear, month:vMonth }
        = getYearMonthDay(getDate(time.value.year, time.value.month, 1)) || {};
      const { year: y, month: m } = getYearMonthDay(date) || {};
      return vYear === y && vMonth === m;
    };
    // 判断传入的日期是否跟当前选中日期相等
    const isCurrentVal = (date: Date) => {
      const {  year:vYear, month:vMonth, day }
        = getYearMonthDay(props.value || undefined) || {};
      const { year: y, month: m, day: d } = getYearMonthDay(date) || {};
      return vYear === y && vMonth === m && day === d;
    };
    // 模拟失去焦点
    const blur = () => {
      isVisible.value = false;
      context.emit("blur");
    };
    // 点击选项选择日期
    const selectDate = (date: Date) => {
      if (isDisabledDate(date)) {
        return;
      }
      const {  year:vYear, month:vMonth } = getYearMonthDay(date) || {};
      time.value = { year:vYear, month:vMonth };
      context.emit("update:value", date);
      // dispatch.call(this, {
      //   eventName: "validate",
      //   componentName: "LinFormItem"
      // });
      context.emit("select", date);
      blur();
    };
    // 点击input输入框
    const focus = () => {
      if (props.disabled) {
        return;
      }
      isVisible.value = !isVisible.value;
      if (isVisible.value) {
        setPlacement();
        context.emit("focus");
      } else {
        context.emit("blur");
      }
    };
    
    const onClickOutside = () => {
      if (!props.showAlways && isVisible.value) {
        blur();
      }
    };

    useClickOutside(containerRef, onClickOutside);

    return {
      formatDate,
      isVisible,
      top,
      prevYear,
      prevMonth,
      time,
      t,
      nextMonth,
      nextYear,
      weekDays,
      visibleDays,
      selectDate,
      isCurrentMonth,
      isCurrentVal,
      isDisabledDate,
      focus,
      popupRef,
      containerRef,
      inputWrapperRef
    };
  },

  render() {
    const {
      showInput,
      placeholder,
      formatDate,
      disabled,
      isVisible,
      showAlways,
      top,
      prevYear,
      prevMonth,
      time,
      t,
      nextMonth,
      nextYear,
      weekDays,
      cellWidth,
      labelHeight,
      renderInfo,
      visibleDays,
      cellHeight,
      selectDate,
      isCurrentMonth,
      isCurrentVal,
      isDisabledDate,
      radius,
      focus
    } = this;
    return (
      <div class="lin-date-picker" ref="containerRef">
        {showInput && (
          <div class="lin-date-picker-input-box" ref="inputWrapperRef">
            <LinIcon name="date" class="lin-date-picker-icon" />
            <input
              onClick={focus}
              readonly
              placeholder={placeholder || t("placeholder")}
              type="text"
              value={formatDate}
              disabled={disabled}
              class={[{ "is-disabled": disabled }, "lin-date-picker-input"]}
            />
          </div>
        )}

        <Transition name="lin-fade">
          {(isVisible || showAlways) && (
            <div
              style={{ top }}
              ref="popupRef"
              class={[{ "is-absolute": !showAlways }, "lin-date-picker-pannel"]}
            >
              <div class="lin-date-picker-pannel-header">
                <LinIcon onClick={prevYear} name="left" />
                <LinIcon onClick={prevMonth} name="arrowhead-left" />
                <span>
                  <span>
                    {time.year}
                    {t("year")}
                  </span>
                  <span class="lin-date-picker-month">
                    {time.month}
                    {t("month")}
                  </span>
                </span>
                <LinIcon onClick={nextMonth} name="arrowhead-right" />
                <LinIcon onClick={nextYear} name="right" />
              </div>
              <div class="lin-date-picker-pannel-content">
                <div class="lin-date-picker-pannel-days">
                  <div class="lin-date-picker-pannel-row">
                    {weekDays.map((w) => (
                      <span
                        style={{
                          width: `${cellWidth}px`,
                          height: `${labelHeight}px`
                        }}
                        class="lin-date-picker-pannel-label-cell lin-date-picker-cell"
                        key={w}
                      >
                        {w}
                      </span>
                    ))}
                  </div>

                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i}>
                      {[1, 2, 3, 4, 5, 6, 7].map((j) => {
                        const currentTime = visibleDays[(i - 1) * 7 + (j - 1)];
                        const info = renderInfo && renderInfo(currentTime);
                        return (
                          <span
                            key={j}
                            style={{
                              width: `${cellWidth}px`,
                              height: `${cellHeight}px`
                            }}
                            onClick={() => selectDate(currentTime)}
                            class={[
                              "lin-date-picker-pannel-cell lin-date-picker-cell",
                              {
                                "is-not-current-month":
                                  !isCurrentMonth(currentTime)
                              },
                              {
                                "is-current-val": isCurrentVal(currentTime)
                              },
                              {
                                "is-disabled-date": isDisabledDate(currentTime)
                              },
                              {
                                "is-radius": radius
                              }
                            ]}
                          >
                            {info || (
                              <span class="lin-date-picker-info">
                                {currentTime.getDate()}
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
});
