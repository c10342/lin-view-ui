<template>
  <label
    class="lin-checkbox"
    :class="{
      'lin-checkbox-is-checked': isChecked,
      'lin-checkbox-is-disabled': isDisabled
    }"
  >
    <span class="lin-checkbox-input">
      <span class="lin-checkbox-inner"></span>
      <input
        type="checkbox"
        class="lin-checkbox-original"
        :name="name"
        v-model="model"
        :value="label"
        :disabled="isDisabled"
      />
    </span>
    <span class="lin-checkbox-label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
import {dispatch} from '@lin-view-ui/utils';

export default {
  name: 'LinCheckbox',
  inject: {
    CheckboxGroup: {
      default: ''
    }
  },
  computed: {
    isGroup() {
      return !!this.CheckboxGroup;
    },
    model: {
      get() {
        return this.isGroup ? this.CheckboxGroup.value : this.value;
      },
      set(value) {
        if (this.isGroup) {
          this.CheckboxGroup.$emit('input', value);
        } else {
          this.$emit('input', value);
        }
        dispatch.call(this, {
          eventName: 'validate',
          componentName: 'LinFormItem'
        });
      }
    },
    isChecked() {
      // 如果是group包裹，判断 label是否在model中
      // 如果没有group包裹，直接使用model
      return this.isGroup ? this.model.includes(this.label) : this.model;
    },
    isDisabled() {
      if (this.isGroup) {
        if (this.CheckboxGroup.disabled) {
          return true;
        }
      }
      return this.disabled;
    }
  },
  props: {
    // 绑定值
    value: {
      type: Boolean,
      default: false
    },
    // 原生属性name
    name: {
      type: String,
      default: ''
    },
    // lin-checkbox 的 value，只能结合 lin-checkbox-group 使用
    label: {
      type: [String, Number],
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
