<template>
  <button
    @click="onButtonClick"
    class="lin-button"
    :class="[
      `lin-button-${type}`,
      { 'lin-button-plain': plain },
      { 'lin-button-round': round },
      { 'lin-button-circle': circle },
      { 'lin-button-disabled': disabled },
      { 'lin-button-loading': loading },
      `lin-button-size-${size}`
    ]"
    :disabled="disabled"
  >
    <lin-spinner
      v-if="loading"
      class="lin-button-spinner"
      :loadingColor="loadingColor"
      :size="loadingSize"
    ></lin-spinner>
    <i v-if="icon" :class="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import Spinner from "@lin-view-ui/spinner";

export default {
  name: "LinButton",
  components: {
    [Spinner.name]: Spinner
  },
  props: {
    // 类型
    type: {
      type: String,
      default: "default",
      options: ["default", "primary", "success", "warning", "danger", "info"]
    },
    // 是否为朴素按钮
    plain: {
      type: Boolean,
      default: false
    },
    // 是否为圆角按钮
    round: {
      type: Boolean,
      default: false
    },
    // 是否为圆形按钮
    circle: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 按钮图标
    icon: {
      type: String,
      default: ""
    },
    // 尺寸
    size: {
      type: String,
      default: "default",
      options: ["default", "medium", "small"]
    },
    // 是否加载中状态
    loading: {
      type: Boolean,
      default: false
    },
    // 加载器颜色
    loadingColor: {
      type: String,
      default: "#fff"
    },
    // 加载器大小
    loadingSize: {
      type: String,
      default: "14px"
    }
  },

  methods: {
    onButtonClick() {
      if (!this.loading) {
        this.$emit("click");
      }
    }
  }
};
</script>
