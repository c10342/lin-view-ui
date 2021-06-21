<template>
  <div
    class="lin-input-number"
    :class="{ 'lin-input-number-disabled': disabled }"
  >
    <span
      class="lin-input-number-reduce lin-input-number-btn"
      :class="{ 'lin-input-number-btn-disabled': disabledReduce }"
      @click="reduce"
      >-</span
    >
    <input
      :disabled="disabled"
      :value="value"
      class="lin-input-number-text"
      type="text"
      @blur="onBlur"
    />
    <span
      class="lin-input-number-plus lin-input-number-btn"
      :class="{ 'lin-input-number-btn-disabled': disabledPlus }"
      @click="plus"
      >+</span
    >
  </div>
</template>

<script>
import {dispatch} from '@lin-view-ui/utils';

export default {
  name: 'LinInputNumber',
  props: {
    // 绑定值
    value: {
      type: [Number, String]
    },
    // 设置计数器允许的最小值
    min: {
      type: Number,
      default: NaN
    },
    // 设置计数器允许的最大值
    max: {
      type: Number,
      default: NaN
    },
    // 计数器步长
    step: {
      type: Number,
      default: 1
    },
    // 是否禁用计数器
    disabled: {
      type: Boolean,
      default: false
    },
    // 输入框占位符
    placeholder: {
      type: String,
      default: ''
    },
    // 是否只能输入 step 的倍数
    stepStrictly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 点击减号
    reduce() {
      if (this.disabledReduce) {
        return;
      }
      const value = this.value * 1 - this.step;
      this.emitInputEvent(value);
      this.$emit('reduce', value);
    },
    // 点击加号
    plus() {
      if (this.disabledPlus) {
        return;
      }
      const value = this.value * 1 + this.step;
      this.emitInputEvent(value);
      this.$emit('plus', value);
    },
    // 失去焦点，判断边界情况，以及stepStrictly为true的情况
    onBlur(e) {
      let value = e.target.value * 1;
      if (this.stepStrictly) {
        if (!Number.isNaN(this.min) && value < this.min) {
          value = this.min + (this.step - (this.min % this.step));
        } else if (!Number.isNaN(this.max) && value > this.max) {
          value = this.max - (this.min % this.step);
        } else {
          value -= value % this.step;
        }
      } else if (!Number.isNaN(this.min) && value < this.min) {
        value = this.min;
      } else if (!Number.isNaN(this.max) && value > this.max) {
        value = this.max;
      }
      this.emitInputEvent(value);
    },
    emitInputEvent(value) {
      this.$emit('input', value);
      dispatch.call(this, {
        eventName: 'validate',
        componentName: 'LinFormItem'
      });
    }
  },
  computed: {
    // 是否禁用减号
    disabledReduce() {
      if (this.disabled) {
        return true;
      }
      // 数字越界的情况下也要禁用
      if (Number.isNaN(this.min)) {
        return false;
      }
      if (
        this.value === '' ||
        this.value === null ||
        this.value === undefined
      ) {
        return false;
      }
      if (this.value <= this.min) {
        return true;
      }
      return false;
    },
    // 是否禁用加号
    disabledPlus() {
      if (this.disabled) {
        return true;
      }
      // 数字越界的情况下也要禁用
      if (Number.isNaN(this.max)) {
        return false;
      }
      if (
        this.value === '' ||
        this.value === null ||
        this.value === undefined
      ) {
        return false;
      }
      if (this.value >= this.max) {
        return true;
      }
      return false;
    }
  }
};
</script>
