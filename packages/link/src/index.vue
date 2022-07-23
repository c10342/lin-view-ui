<template>
  <a
    :href="href"
    v-bind="$attrs"
    :class="[
      'lin-link',
      `lin-link-${type}`,
      {
        'is-disabled': disabled,
        'is-underline': underline && !disabled
      }
    ]"
    @click="onClick"
  >
    <LinIcon v-if="icon" class="lin-link-icon" :name="icon" />
    <span>
      <slot></slot>
    </span>
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import LinIcon from "@packages/icon";
export default defineComponent({
  name: "LinLink",
  components: { LinIcon },
  props: {
    // 类型
    type: {
      type: String as PropType<
        "primary" | "success" | "info" | "warning" | "danger"
      >,
      default: ""
    },
    // 是否有下划线
    underline: {
      type: Boolean,
      default: true
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 原生href属性
    href: {
      type: String,
      default: ""
    },
    // 图标类名
    icon: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const onClick = (event: MouseEvent) => {
      if (!props.href || props.disabled) {
        event.preventDefault();
      }
    };
    return {
      onClick
    };
  }
});
</script>
