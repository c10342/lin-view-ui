<template>
  <div class="lin-badge">
    <slot />
    <span
      v-if="!isDot"
      :class="['is-fixed', 'lin-badge-text', `lin-badge-${type}`]"
    >
      {{ text }}
    </span>
    <span
      v-if="isDot"
      :class="['is-fixed', 'lin-badge-dot', `lin-badge-${type}`]"
    />
  </div>
</template>

<script lang="ts">
import { isNumber, isString } from "@packages/utils";
import { computed, defineComponent, PropType } from "vue";
export default defineComponent({
  name: "LinBadge",
  props: {
    // 显示的值
    value: {
      type: [String, Number] as PropType<string | number>,
      default: ""
    },
    // 最大值，超过最大值会显示 '{max}+'
    max: {
      type: Number,
      default: null
    },
    // 是否显示小圆点
    isDot: {
      type: Boolean,
      default: false
    },
    // 类型
    type: {
      type: String as PropType<
        "primary" | "success" | "warning" | "danger" | "info"
      >,
      default: "primary"
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
    return { text };
  }
});
</script>
