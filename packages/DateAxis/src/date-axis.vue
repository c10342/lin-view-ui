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
            { 'lin-date-axis-disabled': isDisabledDate(date) },
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
          transform: `translateX(${lineTranslateX})`,
        }"
      ></div>
    </div>
    <div class="lin-date-axis-more" ref="notOutsideContainer">
      <div @click="onMoreClick">
        <slot name="more">
          <div class="lin-date-axis-more-content">
            <i class="lin-icon-date"></i>
            <span>{{ t("LinViewUI.DateAxis.more") }}</span>
          </div>
        </slot>
      </div>
      <transition name="fade">
        <div
          :class="[
            'lin-date-axis-popup',
            { 'lin-date-axis-popup-left': !isRight },
            { 'lin-date-axis-popup-right': isRight },
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
import DatePicker from "packages/DatePicker/index.js";
import documentClick from "src/mixins/documentClick.js";
import LocaleMixin from "src/mixins/locale.js";
import DateMixin from "src/mixins/date.js";
import getYearMonthDay from "src/utils/getYearMonthDay.js";
import { throttle } from "lodash";
export default {
  name: "LinDateAxis",
  mixins: [documentClick, LocaleMixin, DateMixin],
  components: {
    [DatePicker.name]: DatePicker,
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: [Date, String],
    },
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
      isShowPopup: false,
      selectTime: new Date(),
      timeList: [],
      lineWidth: "0px",
      lineTranslateX: "0px",
      isRight: true,
      left: "0px",
    };
  },
  created() {
    this.daysObj = {
      0: this.t("LinViewUI.DateAxis.sun"),
      1: this.t("LinViewUI.DateAxis.mon"),
      2: this.t("LinViewUI.DateAxis.tue"),
      3: this.t("LinViewUI.DateAxis.wed"),
      4: this.t("LinViewUI.DateAxis.thu"),
      5: this.t("LinViewUI.DateAxis.fir"),
      6: this.t("LinViewUI.DateAxis.sat"),
    };
    this.init(this.currentDate);
  },
  mounted() {
    this.throttleFn = throttle(this.setLine, 500);
    window.addEventListener("resize", this.throttleFn);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.throttleFn);
  },
  methods: {
    setPlacement() {
      this.$nextTick(() => {
        const scrollContainer = this.$refs.scrollContainer;
        const notOutsideContainer = this.$refs.notOutsideContainer;
        const right =
          window.innerWidth - notOutsideContainer.getBoundingClientRect().left;
        const left = notOutsideContainer.getBoundingClientRect().left;
        if (right > scrollContainer.clientWidth) {
          this.setToRight();
        } else if (left > scrollContainer.clientWidth) {
          this.setToLeft();
        } else {
          this.setToRight();
        }
      });
    },
    setToRight() {
      this.isRight = true;
      this.left = "0px";
    },
    setToLeft() {
      this.isRight = false;
      const scrollContainer = this.$refs.scrollContainer;
      const notOutsideContainer = this.$refs.notOutsideContainer;
      this.left = `${
        -scrollContainer.clientWidth + notOutsideContainer.clientWidth
      }px`;
    },
    onDateSelect(date) {
      const startTime = this.timeList[0];
      const endTime = this.timeList[this.timeList.length - 1];
      if (date < startTime || date > endTime) {
        this.init(date);
      } else {
        this.setLine();
      }
      this.hidePopup();
      this.$emit("select", date);
    },
    prevWeek() {
      if(this.disabled){
        return
      }
      let currentDate = this.currentDate;
      currentDate = currentDate.getTime() - 60 * 60 * 1000 * 24 * 7;
      currentDate = new Date(currentDate);
      const selDate = currentDate
      // 上一周的最后一天，即周六
      const sat = new Date(
        currentDate.getTime() + 60 * 60 * 1000 * 24 * (6 - currentDate.getDay())
      );
      if (this.disabledBeforeDate) {
        const d = new Date(this.disabledBeforeDate);
        if (this.isEqAndLt(sat, d)) {
          return;
        }
      }
      // 如果被禁用，先找后面的
      while (
        this.isDisabledDate(currentDate) &&
        this.isLt(currentDate, sat)
      ) {
        currentDate = currentDate.getTime() + 60 * 60 * 1000 * 24;
        currentDate = new Date(currentDate);
      }

      if (this.isDisabledDate(currentDate)) {
        currentDate = new Date(selDate.getTime() -60 * 60 * 1000 * 24)
        while (this.isDisabledDate(currentDate)) {
          currentDate = currentDate.getTime() - 60 * 60 * 1000 * 24;
          currentDate = new Date(currentDate);
        }
      }

      this.currentDate = currentDate;
      this.init(currentDate);
      this.$emit("prevWeek", currentDate);
    },
    nextWeek() {
      if(this.disabled){
        return
      }
      let currentDate = this.currentDate;
      currentDate = currentDate.getTime() + 60 * 60 * 1000 * 24 * 7;
      currentDate = new Date(currentDate);

      const selDate = currentDate
      // 上一周的第一天，即周日
      const sun = new Date(
        currentDate.getTime() - 60 * 60 * 1000 * 24 * currentDate.getDay()
      );
      if (this.disabledAfterDate) {
        const d = new Date(this.disabledAfterDate);
        if (this.isEqAndGt(sun, d)) {
          return;
        }
      }
      // 如果被禁用，先找前面的
      while (
        this.isDisabledDate(currentDate) &&
        this.isGt(currentDate, sun)
      ) {
        currentDate = currentDate.getTime() - 60 * 60 * 1000 * 24;
        currentDate = new Date(currentDate);
      }

      if (this.isDisabledDate(currentDate)) {
        currentDate = new Date(selDate.getTime() +60 * 60 * 1000 * 24)
        while (this.isDisabledDate(currentDate)) {
          currentDate = currentDate.getTime() + 60 * 60 * 1000 * 24;
          currentDate = new Date(currentDate);
        }
      }


      this.currentDate = currentDate;
      this.init(currentDate);
      this.$emit("nextWeek", currentDate);
    },
    prevDay() {
      if(this.disabled){
        return
      }
      let currentDate = this.currentDate;
      currentDate = currentDate.getTime() - 60 * 60 * 1000 * 24;
      currentDate = new Date(currentDate);
      if (this.disabledBeforeDate) {
        const d = new Date(this.disabledBeforeDate);
        if (this.isEqAndLt(currentDate, d)) {
          return;
        }
      }
      while (this.isDisabledDate(currentDate)) {
        currentDate = currentDate.getTime() - 60 * 60 * 1000 * 24;
        currentDate = new Date(currentDate);
      }
      this.currentDate = currentDate;
      const startTime = this.timeList[0];
      if (currentDate < startTime.getTime()) {
        this.init(currentDate);
      } else {
        this.setLine();
      }
      this.$emit("prevDay", currentDate);
    },
    nextDay() {
      if(this.disabled){
        return
      }
      let currentDate = this.currentDate;
      currentDate = currentDate.getTime() + 60 * 60 * 1000 * 24;
      currentDate = new Date(currentDate);
      if (this.disabledAfterDate) {
        const d = new Date(this.disabledAfterDate);
        if (this.isEqAndGt(currentDate, d)) {
          return;
        }
      }
      while (this.isDisabledDate(currentDate)) {
        currentDate = currentDate.getTime() + 60 * 60 * 1000 * 24;
        currentDate = new Date(currentDate);
      }
      this.currentDate = currentDate;
      const endTime = this.timeList[this.timeList.length - 1];
      if (currentDate > endTime.getTime()) {
        this.init(currentDate);
      } else {
        this.setLine();
      }
      this.$emit("nextDay", currentDate);
    },
    onItemClick(date) {
      if (this.isDisabledDate(date)) {
        return;
      }
      if (this.isEqual(this.currentDate, date)) {
        return;
      }
      this.currentDate = date;
      this.setLine();
      this.$emit("select", date);
    },
    formatDate(date) {
      const d = getYearMonthDay(date);
      return `${d.month}-${d.day}`;
    },
    formatDay(date) {
      const day = date.getDay();
      return this.daysObj[day];
    },
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
    setLine() {
      this.$nextTick(() => {
        const dom = document.getElementById(
          `dateAxis-${this.currentDate.getDay()}`
        );
        if (dom) {
          this.lineWidth = `${dom.offsetWidth}px`;
          const left = dom.getBoundingClientRect().left;
          const dateAxisWrapper = this.$refs.dateAxisWrapper;
          const dateAxisWrapperX = dateAxisWrapper.getBoundingClientRect().left;
          this.lineTranslateX = `${left - dateAxisWrapperX}px`;
        }
      });
    },
    onMoreClick() {
      if (this.isShowPopup) {
        this.hidePopup();
      } else {
        this.showPopup();
      }
    },
    hidePopup() {
      this.isShowPopup = false;
      this.$emit("hide");
    },
    showPopup() {
      this.isShowPopup = true;
      this.$emit("show");
      this.setPlacement();
    },
    onDocumentClick(event) {
      const notOutsideContainer = this.$refs.notOutsideContainer;
      if (!notOutsideContainer.contains(event.target)) {
        this.hidePopup();
      }
    },
  },
  computed: {
    currentDate: {
      get() {
        if (this.value == null) {
          return this.selectTime;
        } else {
          if (this.value instanceof Date) {
            return this.value;
          }
          const now = new Date();
          return now;
        }
      },
      set(val) {
        if (this.isEqual(this.currentDate, val)) {
          return;
        }
        if (this.value == null) {
          this.selectTime = val;
        }
        this.$emit("change", val);
      },
    },
  },
};
</script>