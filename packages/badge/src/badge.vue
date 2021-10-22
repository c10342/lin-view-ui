<template>
  <div class="lin-badge">
    <slot></slot>
    <span
      v-if="!isDot"
      :class="['lin-badge-fix', 'lin-badge-text', `lin-badge-${type}`]"
    >
      {{ text }}
    </span>
    <span
      v-if="isDot"
      :class="['lin-badge-fix', 'lin-badge-dot', `lin-badge-${type}`]"
    ></span>
  </div>
</template>

<script>
import { isNumber, isString } from "@src/utils";
export default {
  name: "LinBadge",
  props: {
    // 显示的值
    value: {
      type: [String, Number],
      default: ""
    },
    // 最大值，超过最大值会显示 '{max}+'
    max: {
      type: Number
    },
    // 是否显示小圆点
    isDot: {
      type: Boolean,
      default: false
    },
    // 类型
    type: {
      type: String,
      default: "primary",
      options: ["primary", "success", "warning", "danger", "info"]
    }
  },
  computed: {
    text() {
      if (isString(this.value)) {
        return this.value;
      }
      if (isNumber(this.value)) {
        if (this.max && this.max < this.value) {
          return `${this.max}+`;
        }
        return this.value;
      }
      return "";
    }
  }
};
</script>
