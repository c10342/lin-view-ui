<template>
  <div
    class="lin-skeleton"
    :style="{ background: bgColor, paddingBottom, width }"
  ></div>
</template>

<script>
export default {
  name: "LinSkeleton",
  props: {
    // 高、宽比
    proportion: {
      type: Number,
      default: 1
    }, // h : w
    // 背景色
    bgColor: {
      type: String,
      default: "#b4bccc"
    },
    // 占位长度
    width: {
      type: String,
      default: "100%"
    },
    // 占位宽度
    height: {
      type: [String, Boolean],
      default: false
    }
  },
  data() {
    return {
      // padding使用百分比的时候是按照宽度来算的
      paddingBottom: this.height || `${this.proportion * 100}%`
    };
  }
};
</script>
