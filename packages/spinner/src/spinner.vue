<template>
  <div :class="['lin-spinner', `lin-spinner-${vertical}`]">
    <div
      :style="loadingStyle"
      :class="[
        'lin-spinner-loading',
        `lin-spinner-type-${type}`,
        `lin-spinner-proportion-${proportion}`,
      ]"
    ></div>
    <div class="lin-spinner-text" v-if="text" :style="textStyle">
      {{ text }}
    </div>
  </div>
</template>

<script lang='ts'>
// import { INFINITE } from "./constant";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "LinSpinner",
  emits:[],
  props: {
    // 主题类型
    type: {
      type: String,
      default: "primary",
      options:[
          "primary",
          "success",
          "info",
          "warning",
          "danger",
        ]
      // validator(value: string) {
      //   return validatorStringArrayProps("type", value, [
      //     "primary",
      //     "success",
      //     "info",
      //     "warning",
      //     "danger",
      //   ]);
      // },
    },
    // 文案对齐方向
    vertical: {
      type: String,
      default: "row",
      options:["col", "row"]
      // validator(value: string) {
      //   return validatorStringArrayProps("vertical", value, ["col", "row"]);
      // },
    },
    // 弧度
    proportion: {
      type: [String, Number],
      default: "1",
      options:[
          "1",
          "2",
          "3",
          1,
          2,
          3,
        ]
      // validator(value: string | number) {
      //   return validatorStringArrayProps("proportion", value, [
      //     "1",
      //     "2",
      //     "3",
      //     1,
      //     2,
      //     3,
      //   ]);
      // },
    },
    // 显示器颜色
    loadingColor: String,
    // 显示器大小
    size: String,
    // 圆环宽度
    strokeWidth: String,
    // 线条样式
    lineStyle: {
      type: String,
      options: [
          "dotted",
          "dashed",
          "solid",
          "double",
          "groove",
          "ridge",
          "inset",
          "outset",
        ]
      // validator(value: string) {
      //   return validatorStringArrayProps("lineStyle", value, [
      //     "dotted",
      //     "dashed",
      //     "solid",
      //     "double",
      //     "groove",
      //     "ridge",
      //     "inset",
      //     "outset",
      //   ]);
      // },
    },
    // css3 动画名称
    animationName: String,
    // 运动时长
    animationDuration: String,
    // 运动方式
    timingFunction: {
      type: String,
      // validator(value: string) {
      //   const result = [
      //     "linear",
      //     "ease",
      //     "ease-in",
      //     "ease-out",
      //     "ease-in-out",
      //   ].includes(value);
      //   if (result) {
      //     return true;
      //   }
      //   if (value.startsWith("cubic-bezie")) {
      //     return true;
      //   }
      //   return false;
      // },
    },
    // 运动次数
    iterationCount: {
      type: [String, Number],
      // validator(value) {
      //   if (isNumber(value)) {
      //     return true;
      //   }
      //   if (value === INFINITE) {
      //     return true;
      //   }
      //   return false;
      // },
    },
    // 加载文案
    text: String,
    // 加载文案字体大小
    textSize: String,
    // 加载文案字体颜色
    textColor: String,
  },
  setup(props) {
    const loadingStyle = computed(() => {
      const obj: { [key: string]: any } = {};
      if (props.loadingColor) {
        obj["border-color"] = props.loadingColor;
      }
      if (props.size) {
        obj.width = props.size;
        obj.height = props.size;
      }
      if (props.strokeWidth) {
        obj["border-width"] = props.strokeWidth;
      }
      if (props.lineStyle) {
        obj["border-style"] = props.lineStyle;
      }
      if (props.animationName) {
        obj["animation-name"] = props.animationName;
      }
      if (props.animationDuration) {
        obj["animation-duration"] = props.animationDuration;
      }
      if (props.timingFunction) {
        obj["animation-timing-function"] = props.timingFunction;
      }
      if (props.iterationCount) {
        obj["animation-iteration-count"] = props.iterationCount;
      }
      return obj;
    });

    const textStyle = computed(() => {
      const obj: { [key: string]: any } = {};
      if (props.textSize) {
        obj["font-size"] = props.textSize;
      }
      if (props.textColor) {
        obj.color = props.textColor;
      }
      return obj;
    });

    return {
      loadingStyle,
      textStyle
    }
  },
});
</script>
