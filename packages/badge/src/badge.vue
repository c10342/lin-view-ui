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

<script lang='ts'>
import { isNumber, isString } from "@src/utils";

import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "LinBadge",
  props: {
    // 显示的值
    value: {
      type: [String, Number],
      default: "",
    },
    // 最大值，超过最大值会显示 '{max}+'
    max: {
      type: Number,
    },
    // 是否显示小圆点
    isDot: {
      type: Boolean,
      default: false,
    },
    // 类型
    type: {
      type: String,
      default: "primary",
      options: ["primary", "success", "warning", "danger", "info"],
      // validator(val: string) {
      //   return validatorStringArrayProps("type", val, ["primary", "success", "warning", "danger", "info"]);
      // }
    }
  },
  setup(props) {
    const text = computed(() => {
      if (isString(props.value)) {
        return props.value;
      }
      if (isNumber(props.value)) {
        if (props.max && props.max < props.value) {
          return `${props.max}+`;
        }
        return props.value;
      }
      return "";
    });
    return {
      text,
    };
  },
});
</script>
