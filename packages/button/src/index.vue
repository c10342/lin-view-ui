<template>
  <button
    :class="[
      'lin-button',
      buttonSize ? `is-${buttonSize}` : null,
      type ? `lin-button-${type}` : null,
      { 'is-plain': plain },
      { 'is-round': round },
      { 'is-circle': circle },
      { 'is-loading': loading },
      { 'is-disabled': disabled }
    ]"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    @click="onClick"
  >
    <LinIcon
      v-if="loading"
      name="loading"
    />
    <LinIcon
      v-if="icon"
      :name="icon"
    />
    <span
      v-if="$slots.default"
      :class="{ 'lin-ml-6': loading || icon }"
    >
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import LinIcon from "@packages/icon";
import { useGlobalConfig } from "@packages/hooks";
export default defineComponent({
  name: "LinButton",
  components: { LinIcon },
  props: {
    size: {
      type: String as PropType<"large" | "small">,
      default: null
    },
    // 类型
    type: {
      type: String as PropType<"primary" | "success" | "warning" | "danger">,
      default: null
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
    // 是否加载中状态
    loading: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否自动获取焦点，原生属性
    autofocus: {
      type: Boolean,
      default: false
    },
    // 按钮图标
    icon: {
      type: String,
      default: null
    }
  },
  emits: ["click"],
  setup(props, context) {
    const { size } = useGlobalConfig();
    const buttonSize = computed(() => {
      return props.size ?? size?.value;
    });

    const onClick = () => {
      context.emit("click");
    };
    return {
      onClick,
      buttonSize
    };
  }
});
</script>
