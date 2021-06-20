<template>
  <div class="lin-data-axis">
    <div class="lin-date-axis-wrapper" ref="dateAxisWrapper">
      <span class="lin-date-axis-left lin-date-axis-arrow" @click="prevWeek">
        <slot name="prevWeek">
          <i class="lin-icon-leftarrow lin-data-axis-icon"></i>
        </slot>
      </span>
      <span class="lin-date-axis-left lin-date-axis-arrow" @click="prevDay">
        <slot name="prevDay">
          <i class="lin-icon-left lin-data-axis-icon"></i>
        </slot>
      </span>
      <ul class="lin-date-axis-list">
        <li
          :id="`dateAxis-${date.getDay()}`"
          v-for="(date, index) in timeList"
          :key="index"
          :class="[
            'lin-date-axis-item',
            { 'lin-date-axis-active': isEqual(currentDate, date) },
            { 'lin-date-axis-disabled': isDisabledDate(date) }
          ]"
          @click="onItemClick(date)"
        >
          <slot :date="date">
            <p class="lin-date-axis-text lin-date-axis-day">
              {{ formatDay(date) }}
            </p>
            <p class="lin-date-axis-text lin-date-axis-date">
              {{ formatDate(date) }}
            </p>
          </slot>
        </li>
      </ul>
      <span class="lin-date-axis-right lin-date-axis-arrow" @click="nextDay">
        <slot name="nextDay">
          <i class="lin-icon-right lin-data-axis-icon"></i>
        </slot>
      </span>
      <span class="lin-date-axis-right lin-date-axis-arrow" @click="nextWeek">
        <slot name="nextWeek">
          <i class="lin-icon-rightarrow lin-data-axis-icon"></i>
        </slot>
      </span>
      <div
        class="lin-date-axis-line"
        :style="{
          width: lineWidth,
          transform: `translateX(${lineTranslateX})`
        }"
      ></div>
    </div>
    <div class="lin-date-axis-more" ref="notOutsideContainer">
      <div @click="onMoreClick">
        <slot name="more">
          <div class="lin-date-axis-more-content">
            <i class="lin-icon-date"></i>
            <span>{{ t('LinViewUI.DateAxis.more') }}</span>
          </div>
        </slot>
      </div>
      <transition name="lin-date-axis-fade">
        <div
          :class="[
            'lin-date-axis-popup',
            { 'lin-date-axis-popup-left': !isRight },
            { 'lin-date-axis-popup-right': isRight }
          ]"
          v-show="isShowPopup"
          ref="scrollContainer"
          :style="{ left }"
        >
          <lin-date-picker
            format="Date"
            @select="onDateSelect"
            v-model="currentDate"
            showAlways
            :showInput="false"
            :disabledBeforeDate="disabledBeforeDate"
            :disabledAfterDate="disabledAfterDate"
            :disabledRangeDate="disabledRangeDate"
            :disabledDate="disabledDate"
            :disabled="disabled"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import DatePicker from '@lin-view-ui/date-picker';
import {DocumentClickMixin,LocaleMixin,DateMixin} from '@lin-view-ui/mixins'
import {getYearMonthDay} from '@lin-view-ui/utils'
import { throttle } from 'lodash';

const ONEDAY = 60 * 60 * 1000 * 24;
const ONEWEEK = ONEDAY * 7;

export default {
  name: 'LinDateAxis',
  mixins: [DocumentClickMixin, LocaleMixin, DateMixin],
  components: {
    [DatePicker.name]: DatePicker
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 绑定值
    value: {
      type: [Date, String]
    }
    // disabledBeforeDate: Date,
    // disabledAfterDate: Date,
    // disabledRangeDate: Array,
    // disabledDate: Array,
    // disabled: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      // 显示日期选择器
      isShowPopup: false,
      // 当外部没有传入value值的时候，使用内部的selectTime
      selectTime: new Date(),
      // 时间轴列表
      timeList: [],
      // 下划线宽度，就是有个三角符号凸起来的那个东西
      lineWidth: '0px',
      // 下划线位移距离
      lineTranslateX: '0px',
      // 日期选择器出现位置，左边或者右边
      isRight: true,
      // 日期选择器距离左边距离
      left: '0px'
    };
  },
  created() {
    this.daysObj = {
      0: this.t('LinViewUI.DateAxis.sun'),
      1: this.t('LinViewUI.DateAxis.mon'),
      2: this.t('LinViewUI.DateAxis.tue'),
      3: this.t('LinViewUI.DateAxis.wed'),
      4: this.t('LinViewUI.DateAxis.thu'),
      5: this.t('LinViewUI.DateAxis.fir'),
      6: this.t('LinViewUI.DateAxis.sat')
    };
    this.init(this.currentDate);
  },
  mounted() {
    // 动态设置下划线宽度
    this.throttleFn = throttle(this.setLine, 500);
    window.addEventListener('resize', this.throttleFn);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.throttleFn);
  },
  methods: {
    // 设置日期选择器位置，左边或者右边
    setPlacement() {
      this.$nextTick(() => {
        const { scrollContainer } = this.$refs;
        const { notOutsideContainer } = this.$refs;
        const right =
          window.innerWidth - notOutsideContainer.getBoundingClientRect().left;
        const { left } = notOutsideContainer.getBoundingClientRect();
        if (right > scrollContainer.clientWidth) {
          // 先判断右边位置是否充足
          this.setToRight();
        } else if (left > scrollContainer.clientWidth) {
          // 判断左边位置是否充足
          this.setToLeft();
        } else {
          this.setToRight();
        }
      });
    },
    // 日期选择器设置为右边出现
    setToRight() {
      this.isRight = true;
      this.left = '0px';
    },
    // 日期选择器设置为左边出现
    setToLeft() {
      this.isRight = false;
      const { scrollContainer } = this.$refs;
      const { notOutsideContainer } = this.$refs;
      this.left = `${
        -scrollContainer.clientWidth + notOutsideContainer.clientWidth
      }px`;
    },
    // 日期选择器点击选择日期事件
    onDateSelect(date) {
      const startTime = this.timeList[0];
      const endTime = this.timeList[this.timeList.length - 1];
      if (date < startTime || date > endTime) {
        // 选中的日期不在日期轴中，重新初始化日期轴
        this.init(date);
      } else {
        this.setLine();
      }
      this.hidePopup();
      this.$emit('select', date);
    },
    // 点击上一个星期按钮
    prevWeek() {
      if (this.disabled) {
        return;
      }
      // 今天周四，点击上一周当前选中时间应该变成上一周周四
      let { currentDate } = this;
      currentDate = currentDate.getTime() - ONEWEEK;
      currentDate = new Date(currentDate);
      const selDate = currentDate;
      // 上一周的最后一天，即周六
      const sat = new Date(
        currentDate.getTime() + ONEDAY * (6 - currentDate.getDay())
      );
      if (this.disabledBeforeDate) {
        // 看看周六，即最后一天是否小于等于disabledBeforeDate这个日期，是，则被禁用了，不能选
        const d = new Date(this.disabledBeforeDate);
        if (this.isEqAndLt(sat, d)) {
          return;
        }
      }
      // 如果被禁用，先找后面的
      while (this.isDisabledDate(currentDate) && this.isLt(currentDate, sat)) {
        currentDate = currentDate.getTime() + ONEDAY;
        currentDate = new Date(currentDate);
      }

      if (this.isDisabledDate(currentDate)) {
        // 后面的找完了(就是后面的日期也被禁用了)，就开始往前面找
        currentDate = new Date(selDate.getTime() - ONEDAY);
        while (this.isDisabledDate(currentDate)) {
          currentDate = currentDate.getTime() - ONEDAY;
          currentDate = new Date(currentDate);
        }
      }

      this.currentDate = currentDate;
      this.init(currentDate);
      this.$emit('prevWeek', currentDate);
    },
    // 点击下一个星期
    nextWeek() {
      if (this.disabled) {
        return;
      }
      let { currentDate } = this;
      currentDate = currentDate.getTime() + ONEWEEK;
      currentDate = new Date(currentDate);

      const selDate = currentDate;
      // 上一周的第一天，即周日
      const sun = new Date(
        currentDate.getTime() - ONEDAY * currentDate.getDay()
      );
      if (this.disabledAfterDate) {
        const d = new Date(this.disabledAfterDate);
        if (this.isEqAndGt(sun, d)) {
          return;
        }
      }
      // 如果被禁用，先找前面的
      while (this.isDisabledDate(currentDate) && this.isGt(currentDate, sun)) {
        currentDate = currentDate.getTime() - ONEDAY;
        currentDate = new Date(currentDate);
      }

      if (this.isDisabledDate(currentDate)) {
        currentDate = new Date(selDate.getTime() + ONEDAY);
        while (this.isDisabledDate(currentDate)) {
          currentDate = currentDate.getTime() + ONEDAY;
          currentDate = new Date(currentDate);
        }
      }

      this.currentDate = currentDate;
      this.init(currentDate);
      this.$emit('nextWeek', currentDate);
    },
    // 点击前一天
    prevDay() {
      if (this.disabled) {
        return;
      }
      let { currentDate } = this;
      currentDate = currentDate.getTime() - ONEDAY;
      currentDate = new Date(currentDate);
      if (this.disabledBeforeDate) {
        // 前一天小于等于disabledBeforeDate说明前面的所有日期被禁用了
        const d = new Date(this.disabledBeforeDate);
        if (this.isEqAndLt(currentDate, d)) {
          return;
        }
      }
      // 如果被禁用了，就近原则找一个没有被禁用的日期
      // 往前面找
      while (this.isDisabledDate(currentDate)) {
        currentDate = currentDate.getTime() - ONEDAY;
        currentDate = new Date(currentDate);
      }
      this.currentDate = currentDate;
      const startTime = this.timeList[0];
      if (currentDate < startTime.getTime()) {
        // 找到的日期超出时间轴的日期列表,需要重新渲染日期轴
        this.init(currentDate);
      } else {
        this.setLine();
      }
      this.$emit('prevDay', currentDate);
    },
    // 点击明天,后一天
    nextDay() {
      if (this.disabled) {
        return;
      }
      let { currentDate } = this;
      currentDate = currentDate.getTime() + ONEDAY;
      currentDate = new Date(currentDate);
      if (this.disabledAfterDate) {
        const d = new Date(this.disabledAfterDate);
        if (this.isEqAndGt(currentDate, d)) {
          return;
        }
      }
      // 往后面找
      while (this.isDisabledDate(currentDate)) {
        currentDate = currentDate.getTime() + ONEDAY;
        currentDate = new Date(currentDate);
      }
      this.currentDate = currentDate;
      const endTime = this.timeList[this.timeList.length - 1];
      if (currentDate > endTime.getTime()) {
        this.init(currentDate);
      } else {
        this.setLine();
      }
      this.$emit('nextDay', currentDate);
    },
    // 点击日期轴项
    onItemClick(date) {
      if (this.isDisabledDate(date)) {
        return;
      }
      if (this.isEqual(this.currentDate, date)) {
        return;
      }
      this.currentDate = date;
      this.setLine();
      this.$emit('select', date);
    },
    // 格式化显示时间
    formatDate(date) {
      const d = getYearMonthDay(date);
      return `${d.month}-${d.day}`;
    },
    // 格式化星期几
    formatDay(date) {
      const day = date.getDay();
      return this.daysObj[day];
    },
    // 初始化日期轴
    init(currentDate) {
      const day = currentDate.getDay();
      const timeList = [];
      const d = new Date(currentDate);
      d.setDate(d.getDate() - day);
      for (let i = 0; i < 7; i++) {
        timeList.push(new Date(d));
        d.setDate(d.getDate() + 1);
      }
      this.timeList = timeList;
      this.setLine();
    },
    // 设置下划线位置,即有个三角形突出的那个东西
    setLine() {
      this.$nextTick(() => {
        const dom = document.getElementById(
          `dateAxis-${this.currentDate.getDay()}`
        );
        if (dom) {
          this.lineWidth = `${dom.offsetWidth}px`;
          const { left } = dom.getBoundingClientRect();
          const { dateAxisWrapper } = this.$refs;
          const dateAxisWrapperX = dateAxisWrapper.getBoundingClientRect().left;
          this.lineTranslateX = `${left - dateAxisWrapperX}px`;
        }
      });
    },
    // 点击更多
    onMoreClick() {
      if (this.isShowPopup) {
        this.hidePopup();
      } else {
        this.showPopup();
      }
    },
    // 隐藏日期选择器
    hidePopup() {
      this.isShowPopup = false;
      this.$emit('hide');
    },
    // 显示日期选择器
    showPopup() {
      this.isShowPopup = true;
      this.$emit('show');
      this.setPlacement();
    },
    // 点击组件外部
    onDocumentClick(event) {
      const { notOutsideContainer } = this.$refs;
      if (!notOutsideContainer.contains(event.target)) {
        this.hidePopup();
      }
    }
  },
  computed: {
    // 当前选中的时间
    currentDate: {
      get() {
        if (this.value == null) {
          return this.selectTime;
        }
        if (this.value instanceof Date) {
          return this.value;
        }
        const now = new Date();
        return now;
      },
      set(val) {
        if (this.isEqual(this.currentDate, val)) {
          return;
        }
        if (this.value == null) {
          this.selectTime = val;
        }
        this.$emit('change', val);
      }
    }
  }
};
</script>
