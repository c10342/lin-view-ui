<template>
  <div class="lin-date-axis">
    <div
      ref="wrapperRef"
      class="lin-date-axis-wrapper"
    >
      <span
        class="lin-date-axis-left lin-date-axis-arrow"
        @click="prevWeek"
      >
        <slot name="prevWeek">
          <LinIcon
            name="arrowhead-left"
            class="lin-date-axis-icon"
          />
        </slot>
      </span>
      <span
        class="lin-date-axis-left lin-date-axis-arrow"
        @click="prevDay"
      >
        <slot name="prevDay">
          <LinIcon
            name="left"
            class="lin-date-axis-icon"
          />
        </slot>
      </span>
      <ul class="lin-date-axis-list">
        <li
          v-for="(date, index) in timeList"
          :id="`dateAxis-${date.getDay()}`"
          :key="index"
          :class="[
            'lin-date-axis-item',
            { 'is-active': isEqual(props.value, date) },
            { 'is-disabled': isDisabledDate(date) }
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
      <span
        class="lin-date-axis-right lin-date-axis-arrow"
        @click="nextDay"
      >
        <slot name="nextDay">
          <LinIcon
            name="right"
            class="lin-date-axis-icon"
          />
        </slot>
      </span>
      <span
        class="lin-date-axis-right lin-date-axis-arrow"
        @click="nextWeek"
      >
        <slot name="nextWeek">
          <LinIcon
            name="arrowhead-right"
            class="lin-date-axis-icon"
          />
        </slot>
      </span>
      <div
        class="lin-date-axis-line"
        :style="{
          width: lineWidth,
          transform: `translateX(${lineTranslateX})`
        }"
      />
    </div>
    <div
      ref="moreRef"
      class="lin-date-axis-more"
    >
      <div @click="onMoreClick">
        <slot name="more">
          <div class="lin-date-axis-more-content">
            <LinIcon name="date" />
            <span>{{ t("more") }}</span>
          </div>
        </slot>
      </div>
      <transition name="lin-fade">
        <div
          v-show="isShowPopup"
          ref="scrollRef"
          :class="[
            'lin-date-axis-popup',
            { 'is-left': !isRight },
            { 'is-right': isRight }
          ]"
          :style="{ left }"
        >
          <LinDatePicker
            :value="props.value"
            show-always
            :show-input="false"
            :disabled-before-date="disabledBeforeDate"
            :disabled-after-date="disabledAfterDate"
            :disabled-range-date="disabledRangeDate"
            :disabled-date="disabledDate"
            :disabled="disabled"
            @select="onDateSelect"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  DateProps,
  useClickOutside,
  useDate,
  useScopeLocale
} from "@packages/hooks";
import { getYearMonthDay, throttle } from "@packages/utils";
import { nextTick, ref, onMounted, onBeforeUnmount } from "vue";
import LinDatePicker from "@packages/date-picker";

const ONEDAY = 60 * 60 * 1000 * 24;
const ONEWEEK = ONEDAY * 7;
defineOptions({
  name: "LinDateAxis"
});

const props = defineProps({
  // 绑定值
  value: {
    type: Date,
    default: () => new Date()
  },
  ...DateProps
});

// 显示日期选择器
const isShowPopup = ref(false);
// 时间轴列表
const timeList = ref<Date[]>([]);
// 下划线宽度，就是有个三角符号凸起来的那个东西
const lineWidth = ref("0px");
// 下划线位移距离
const lineTranslateX = ref("0px");
// 日期选择器出现位置，左边或者右边
const isRight = ref(true);
// 日期选择器距离左边距离
const left = ref("0px");

const { t } = useScopeLocale("DateAxis");

const { isEqAndLt, isDisabledDate, isLt, isEqAndGt, isGt, isEqual } =
  useDate(props);

const daysObj: Record<number, string> = {
  0: t("sun"),
  1: t("mon"),
  2: t("tue"),
  3: t("wed"),
  4: t("thu"),
  5: t("fir"),
  6: t("sat")
};

const emit = defineEmits([
  "select",
  "prevWeek",
  "nextWeek",
  "prevDay",
  "nextDay",
  "hide",
  "show",
  "update:value"
]);
const wrapperRef = ref<HTMLElement | null>(null);
const scrollRef = ref<HTMLElement | null>(null);
const moreRef = ref<HTMLElement | null>(null);
// 设置日期选择器位置，左边或者右边
const setPlacement = () => {
  nextTick(() => {
    if (!scrollRef.value || !moreRef.value) {
      return;
    }
    const { left } = moreRef.value.getBoundingClientRect();
    const right = window.innerWidth - left;
    if (right > scrollRef.value.clientWidth) {
      // 先判断右边位置是否充足
      setToRight();
    } else if (left > scrollRef.value.clientWidth) {
      // 判断左边位置是否充足
      setToLeft();
    } else {
      setToRight();
    }
  });
};
// 日期选择器设置为右边出现
const setToRight = () => {
  isRight.value = true;
  left.value = "0px";
};
// 日期选择器设置为左边出现
const setToLeft = () => {
  isRight.value = false;
  if (!scrollRef.value || !moreRef.value) {
    return;
  }
  left.value = `${-scrollRef.value.clientWidth + moreRef.value.clientWidth}px`;
};
// 日期选择器点击选择日期事件
const onDateSelect = (date: Date) => {
  const startTime = timeList.value[0];
  const endTime = timeList.value[timeList.value.length - 1];
  if (date < startTime || date > endTime) {
    // 选中的日期不在日期轴中，重新初始化日期轴
    init(date);
  } else {
    setLine();
  }
  hidePopup();
  emit("select", date);
  emit("update:value", date);
};
// 点击上一个星期按钮
const prevWeek = () => {
  if (props.disabled) {
    return;
  }
  // 今天周四，点击上一周当前选中时间应该变成上一周周四
  let currentDate: Date | number = props.value;
  currentDate = currentDate.getTime() - ONEWEEK;
  currentDate = new Date(currentDate);
  const selDate = currentDate;
  // 上一周的最后一天，即周六
  const sat = new Date(
    currentDate.getTime() + ONEDAY * (6 - currentDate.getDay())
  );
  if (props.disabledBeforeDate) {
    // 看看周六，即最后一天是否小于等于disabledBeforeDate这个日期，是，则被禁用了，不能选
    const d = new Date(props.disabledBeforeDate);
    if (isEqAndLt(sat, d)) {
      return;
    }
  }
  // 如果被禁用，先找后面的
  while (isDisabledDate(currentDate) && isLt(currentDate, sat)) {
    currentDate = currentDate.getTime() + ONEDAY;
    currentDate = new Date(currentDate);
  }

  if (isDisabledDate(currentDate)) {
    // 后面的找完了(就是后面的日期也被禁用了)，就开始往前面找
    currentDate = new Date(selDate.getTime() - ONEDAY);
    while (isDisabledDate(currentDate)) {
      currentDate = currentDate.getTime() - ONEDAY;
      currentDate = new Date(currentDate);
    }
  }

  emit("update:value", currentDate);
  init(currentDate);
  emit("prevWeek", currentDate);
};
// 点击下一个星期
const nextWeek = () => {
  if (props.disabled) {
    return;
  }
  let currentDate: Date | number = props.value;
  currentDate = currentDate.getTime() + ONEWEEK;
  currentDate = new Date(currentDate);

  const selDate = currentDate;
  // 上一周的第一天，即周日
  const sun = new Date(currentDate.getTime() - ONEDAY * currentDate.getDay());
  if (props.disabledAfterDate) {
    const d = new Date(props.disabledAfterDate);
    if (isEqAndGt(sun, d)) {
      return;
    }
  }
  // 如果被禁用，先找前面的
  while (isDisabledDate(currentDate) && isGt(currentDate, sun)) {
    currentDate = currentDate.getTime() - ONEDAY;
    currentDate = new Date(currentDate);
  }

  if (isDisabledDate(currentDate)) {
    currentDate = new Date(selDate.getTime() + ONEDAY);
    while (isDisabledDate(currentDate)) {
      currentDate = currentDate.getTime() + ONEDAY;
      currentDate = new Date(currentDate);
    }
  }

  emit("update:value", currentDate);
  init(currentDate);
  emit("nextWeek", currentDate);
};
// 点击前一天
const prevDay = () => {
  if (props.disabled) {
    return;
  }
  let currentDate: Date | number = props.value;
  currentDate = currentDate.getTime() - ONEDAY;
  currentDate = new Date(currentDate);
  if (props.disabledBeforeDate) {
    // 前一天小于等于disabledBeforeDate说明前面的所有日期被禁用了
    const d = new Date(props.disabledBeforeDate);
    if (isEqAndLt(currentDate, d)) {
      return;
    }
  }
  // 如果被禁用了，就近原则找一个没有被禁用的日期
  // 往前面找
  while (isDisabledDate(currentDate)) {
    currentDate = currentDate.getTime() - ONEDAY;
    currentDate = new Date(currentDate);
  }
  emit("update:value", currentDate);
  const startTime = timeList.value[0];
  if (+currentDate < startTime.getTime()) {
    // 找到的日期超出时间轴的日期列表,需要重新渲染日期轴
    init(currentDate);
  } else {
    setLine();
  }
  emit("prevDay", currentDate);
};
// 点击明天,后一天
const nextDay = () => {
  if (props.disabled) {
    return;
  }
  let currentDate: Date | number = props.value;
  currentDate = currentDate.getTime() + ONEDAY;
  currentDate = new Date(currentDate);
  if (props.disabledAfterDate) {
    const d = new Date(props.disabledAfterDate);
    if (isEqAndGt(currentDate, d)) {
      return;
    }
  }
  // 往后面找
  while (isDisabledDate(currentDate)) {
    currentDate = currentDate.getTime() + ONEDAY;
    currentDate = new Date(currentDate);
  }
  emit("update:value", currentDate);
  const endTime = timeList.value[timeList.value.length - 1];
  if (+currentDate > endTime.getTime()) {
    init(currentDate);
  } else {
    setLine();
  }
  emit("nextDay", currentDate);
};
// 点击日期轴项
const onItemClick = (date: Date) => {
  if (isDisabledDate(date)) {
    return;
  }
  if (isEqual(props.value, date)) {
    return;
  }
  emit("update:value", date);
  setLine();
  emit("select", date);
};
// 格式化显示时间
const formatDate = (date: Date) => {
  const d = getYearMonthDay(date);
  return d ? `${d.month}-${d.day}` : "";
};
// 格式化星期几
const formatDay = (date: Date) => {
  const day = date.getDay();
  return daysObj[day];
};
// 初始化日期轴
const init = (date: Date) => {
  const day = date.getDay();
  const tList = [];
  const d = new Date(date);
  d.setDate(d.getDate() - day);
  for (let i = 0; i < 7; i++) {
    tList.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  timeList.value = tList;
  setLine();
};
// 设置下划线位置,即有个三角形突出的那个东西
const setLine = () => {
  nextTick(() => {
    if (!wrapperRef.value) {
      return;
    }
    const dom = document.getElementById(`dateAxis-${props.value.getDay()}`);
    if (dom) {
      lineWidth.value = `${dom.offsetWidth}px`;
      const { left } = dom.getBoundingClientRect();
      const dateAxisWrapperX = wrapperRef.value.getBoundingClientRect().left;
      lineTranslateX.value = `${left - dateAxisWrapperX}px`;
    }
  });
};
// 点击更多
const onMoreClick = () => {
  if (isShowPopup.value) {
    hidePopup();
  } else {
    showPopup();
  }
};
// 隐藏日期选择器
const hidePopup = () => {
  isShowPopup.value = false;
  emit("hide");
};
// 显示日期选择器
const showPopup = () => {
  isShowPopup.value = true;
  emit("show");
  setPlacement();
};

init(props.value);
useClickOutside(moreRef, hidePopup);
const throttleFn = throttle(setLine, 500);
onMounted(() => {
  // 动态设置下划线宽度
  window.addEventListener("resize", throttleFn);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", throttleFn);
});
</script>
