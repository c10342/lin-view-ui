<template>
  <div
    class="lin-selector-item"
    :class="{
      'is-active': isActive,
      'is-disabled': isDisabled
    }"
    @click="onClick"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<script lang="ts">
import { SelectorContextKey } from "@packages/tokens";
import { isPlainObject, isUndef } from "@packages/utils";
import { computed, defineComponent, inject } from "vue";
export default defineComponent({
  name: "LinSelectorItem",
  props: {
    // 标签内容
    label: {
      type: String,
      default: ""
    },
    // 选项的值
    value: {
      default: ""
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { parentValueKey, parentValue, parentDisabled, parentEmitChange } =
      inject(SelectorContextKey, {
        parentDisabled: computed(() => props.disabled)
      });
    // 是否是选择中状态
    const isActive = computed(() => {
      if (isUndef(parentValueKey) || isUndef(parentValue)) {
        return false;
      }

      if (isPlainObject(props.value) && parentValueKey!.value) {
        const valueKey = parentValueKey!.value as any;
        // 对象的情况
        return props.value[valueKey] === (parentValue!.value as any)[valueKey];
      }
      // 其他情况
      return props.value === parentValue!.value;
    });
    const isDisabled = computed(() => parentDisabled!.value);
    // 点击该项
    const onClick = () => {
      if (isDisabled.value || isActive.value || !parentEmitChange) {
        return;
      }

      parentEmitChange(props.value);
    };
    return {
      isActive,
      isDisabled,
      onClick
    };
  }
});
</script>
