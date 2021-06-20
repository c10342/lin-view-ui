

import { LocaleMixin, DateMixin } from '@lin-view-ui/mixins'
import {getDate,getYearMonthDay,dispatch} from '@lin-view-ui/utils'

export default {
  name: 'LinDatePicker',
  mixins: [LocaleMixin, DateMixin],
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
      t,
      top
    } = this;
    return (
      <div v-click-outside class="lin-date-picker" ref="container">
        {showInput && (
          <div class="lin-date-picker-input-box" ref="boxContainer">
            <i class="lin-icon-date lin-date-picker-icon"></i>
            <input
              onClick={focus}
              readonly
              placeholder={placeholder || t('LinViewUI.DatePicker.placeholder')}
              type="text"
              value={formatDate}
              disabled={disabled}
              class={[
                { 'lin-date-picker-disabled': disabled },
                'lin-date-picker-input'
              ]}
            />
          </div>
        )}

        <transition name="lin-date-picker-fade">
          {(isVisible || showAlways) && (
            <div
              style={{ top }}
              ref="popupContainer"
              class={[
                { 'lin-date-picker-absolute': !showAlways },
                'lin-date-picker-pannel'
              ]}
            >
              <div class="lin-date-picker-pannel-header">
                <span onClick={prevYear} class="lin-icon-left"></span>
                <span onClick={prevMonth} class="lin-icon-leftarrow"></span>
                <span>
                  <span>
                    {time.year}
                    {t('LinViewUI.DatePicker.year')}
                  </span>
                  <span class="lin-date-picker-month">
                    {time.month}
                    {t('LinViewUI.DatePicker.month')}
                  </span>
                </span>
                <span onClick={nextMonth} class="lin-icon-rightarrow"></span>
                <span onClick={nextYear} class="lin-icon-right"></span>
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
                        const currentTime = visibeDays[(i - 1) * 7 + (j - 1)];
                        const info = renderInfo && renderInfo(h, currentTime);
                        return (
                          <span
                            key={j}
                            style={{
                              width: `${cellWidth}px`,
                              height: `${cellHeight}px`
                            }}
                            onClick={() => selectDate(currentTime)}
                            class={[
                              'lin-date-picker-pannel-cell lin-date-picker-cell',
                              {
                                'lin-date-picker-not-current-month': !isCurrentMonth(
                                  currentTime
                                )
                              },
                              {
                                'lin-date-picker-current-val': isCurrentval(
                                  currentTime
                                )
                              },
                              {
                                'lin-date-picker-disabled-date': isDisabledDate(
                                  currentTime
                                )
                              },
                              {
                                'lin-date-picker-radius': radius
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
        document.addEventListener('click', handler);
      },
      unbind(el) {
        document.removeEventListener('click', el.handler);
      }
    }
  },
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
      type: [Date, String, Number],
      default: ''
    },
    // 输入框占位符
    placeholder: {
      type: String
    },
    // 自定义渲染日期块，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个是日期对象。可以使用 jsx
    renderInfo: {
      type: Function,
      default: null
    },
    // 格式化 value/v-model 绑定值
    format: {
      type: String,
      default: 'string'
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
    }
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
        this.t('LinViewUI.DatePicker.sat')
      ],
      // 是否显示选择器
      isVisible: false,
      // 头部当前日期
      time: { year, month },
      // 选择器距离顶部距离
      top: 0
    };
  },
  computed: {
    // 当前选中日期
    currentValue() {
      if (!this.value) {
        return '';
      }
      if (typeof this.value === 'string' || typeof this.value === 'number') {
        return new Date(this.value);
      }
      if (this.value instanceof Date) {
        return this.value;
      }
      return '';
    },
    // 显示在选择器上面的日期
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
    // 显示在输入框中的日期
    formatDate() {
      if (this.showFormat) {
        return this.showFormat(this.currentValue);
      }
      if (!this.currentValue) {
        return '';
      }
      const { year, month, day } = getYearMonthDay(this.currentValue);
      return `${year}-${month}-${day}`;
    }
  },
  methods: {
    // 设置日期选择器位置
    setPlacement() {
      this.$nextTick(() => {
        const popupContainer = this.$refs.popupContainer;
        const container = this.$refs.container;
        const bottom =
          window.innerHeight - container.getBoundingClientRect().bottom;
        const top = container.getBoundingClientRect().top;
        if (bottom > popupContainer.clientHeight) {
          this.setDownTop();
        } else if (top > popupContainer.clientHeight) {
          this.setUpTop();
        } else {
          this.setDownTop();
        }
      });
    },
    // 设置日期选择器向下显示
    setDownTop() {
      const boxContainer = this.$refs.boxContainer;
      this.top = `${boxContainer.clientHeight}px`;
    },
    // 设置日期选择器向上显示
    setUpTop() {
      const popupContainer = this.$refs.popupContainer;
      this.top = `${-popupContainer.clientHeight}px`;
    },
    // 将时间格式化为时间对象
    handleValue() {
      if (!this.value) {
        return new Date();
      }
      if (typeof this.value === 'string' || typeof this.value === 'number') {
        return new Date(this.value);
      }
      if (this.value instanceof Date) {
        return this.value;
      }
      return new Date();
    },
    // 点击上一年按钮
    prevYear() {
      const d = getDate(this.time.year, this.time.month, 1);
      d.setFullYear(d.getFullYear() - 1);
      this.setTime(d);
      this.$emit('prevYear', d);
    },
    // 点击上一个月按钮
    prevMonth() {
      const d = getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() - 1);
      this.setTime(d);
      this.$emit('prevMonth', d);
    },
    // 点击下一个月按钮
    nextMonth() {
      const d = getDate(this.time.year, this.time.month, 1);
      d.setMonth(d.getMonth() + 1);
      this.setTime(d);
      this.$emit('nextMonth', d);
    },
    // 点击下一年按钮
    nextYear() {
      const d = getDate(this.time.year, this.time.month, 1);
      d.setFullYear(d.getFullYear() + 1);
      this.setTime(d);
      this.$emit('nextYear', d);
    },
    // 判断传入的时间是否为当前头部日期的月份
    isCurrentMonth(date) {
      const { year, month } = getYearMonthDay(
        getDate(this.time.year, this.time.month, 1)
      );
      const { year: y, month: m } = getYearMonthDay(date);
      return year === y && month === m;
    },
    // 判断传入的日期是否跟当前选中日期相等
    isCurrentval(date) {
      const { year, month, day } = getYearMonthDay(this.currentValue);
      const { year: y, month: m, day: d } = getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    // 点击选项选择日期
    selectDate(date) {
      if (this.isDisabledDate(date)) {
        return;
      }
      const { year, month, day } = getYearMonthDay(date);
      this.time = { year, month };
      let d;
      if (this.format === 'string') {
        d = `${year}-${month}-${day}`;
      } else if (this.format === 'number') {
        d = new Date(date).getTime();
      } else {
        d = date;
      }
      this.$emit('input', d);
      dispatch.call(this, {
        eventName: 'validate',
        componentName: 'LinFormItem'
      });
      this.$emit('select', d);
      this.blur();
    },
    // 点击input输入框
    focus() {
      if (this.disabled) {
        return;
      }
      this.isVisible = !this.isVisible;
      if (this.isVisible) {
        this.setPlacement();
        this.$emit('focus');
      } else {
        this.$emit('blur');
      }
    },
    // 模拟失去焦点
    blur() {
      this.isVisible = false;
      this.$emit('blur');
    },
    // 设置头部当前日期
    setTime(date) {
      const { year, month } = getYearMonthDay(date);
      this.time = { year, month };
    }
  }
};
