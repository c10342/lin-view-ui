<template>
  <div
    class="lin-selector-item"
    :class="{
      'lin-selector-active': active,
      'lin-selector-disabled': isDisabled
    }"
    @click="onClick"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<script>
import { isPlainObject } from "@src/utils";
export default {
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
  inject: {
    group: {
      default: ""
    }
  },
  computed: {
    // 是否是选择中状态
    active() {
      if (this.group) {
        const { valueKey } = this.group;
        if (isPlainObject(this.value) && valueKey) {
          // 对象的情况
          return this.value[valueKey] === this.group.value[valueKey];
        }
        // 其他情况
        return this.value === this.group.value;
      }
      return false;
    },
    // 是否禁用该选项
    isDisabled() {
      if (this.group && this.group.disabled) {
        return true;
      }
      return this.disabled;
    }
  },
  methods: {
    // 点击该项
    onClick() {
      if (this.group && !this.isDisabled) {
        const value = JSON.parse(JSON.stringify(this.value));
        this.group.$emit("input", value);
        this.group.$emit("onChange", value);
      }
    }
  }
};
</script>
