<template>
  <label
    class="lin-radio"
    :class="{
      'lin-radio-is-checked': label === model,
      'lin-radio-is-disabled': isDisable
    }"
  >
    <span class="lin-radio-input">
      <span class="lin-radio-inner"></span>
      <input
        :disabled="isDisable"
        class="lin-radio-original"
        type="radio"
        :value="label"
        :name="name"
        v-model="model"
      />
    </span>
    <span class="lin-radio-label">
      <slot></slot>
      <!-- 如果没有传内容，我们就把label当成内容 -->
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
import {dispatch} from '@lin-view-ui/utils';

export default {
  name: 'LinRadio',
  // 需要提供一个计算属性 model
  inject: {
    RadioGroup: {
      default: ''
    }
  },
  computed: {
    model: {
      get() {
        return this.isGroup ? this.RadioGroup.value : this.value;
      },
      set(value) {
        // 触发父组件给当前组件注册的input事件
        if (this.isGroup) {
          this.RadioGroup.$emit('input', value);
        } else {
          this.$emit('input', value);
        }
        dispatch.call(this, {
          eventName: 'validate',
          componentName: 'LinFormItem'
        });
      }
    },
    isGroup() {
      // 用于判断radio是否被radioGroup所包裹
      return !!this.RadioGroup;
    },
    isDisable() {
      if (this.isGroup) {
        if (this.RadioGroup.disabled) {
          return true;
        }
      }
      return this.disabled;
    }
  },
  props: {
    // Radio 的 value
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    // 绑定值
    value: null,
    // 原生属性 name
    name: {
      type: String,
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
