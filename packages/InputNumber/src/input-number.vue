<template>
  <div class="lin-input-number" :class="{'lin-input-number-disabled':disabled}">
    <span
      class="lin-input-number-reduce lin-input-number-btn"
      :class="{'lin-input-number-btn-disabled':disabledReduce}"
      @click="reduce"
    >-</span>
    <input
      :disabled="disabled"
      :value="value"
      class="lin-input-number-text"
      type="text"
      @blur="onBlur"
    />
    <span
      class="lin-input-number-plus lin-input-number-btn"
      :class="{'lin-input-number-btn-disabled':disabledPlus}"
      @click="plus"
    >+</span>
  </div>
</template>

<script>
import dispatch from 'src/utils/dispatch.js';

export default {
  name: 'LinInputNumber',
  props: {
    value: {
      type: [Number, String]
    },
    min: {
      type: Number,
      default: NaN
    },
    max: {
      type: Number,
      default: NaN
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    stepStrictly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    reduce () {
      if (this.disabledReduce) {
        return;
      }
      const value = this.value * 1 - this.step;
      this.emitInputEvent(value);
      this.$emit('reduce', value);
    },
    plus () {
      if (this.disabledPlus) {
        return;
      }
      const value = this.value * 1 + this.step;
      this.emitInputEvent(value);
      this.$emit('plus', value);
    },
    onBlur (e) {
      let value = e.target.value * 1;
      if (this.stepStrictly) {
        if (!Number.isNaN(this.min) && value < this.min) {
          value = this.min + (this.step - (this.min % this.step));
        } else if (!Number.isNaN(this.max) && value > this.max) {
          value = this.max - (this.min % this.step);
        } else {
          value -= (value % this.step);
        }
      } else if (!Number.isNaN(this.min) && value < this.min) {
        value = this.min;
      } else if (!Number.isNaN(this.max) && value > this.max) {
        value = this.max;
      }
      this.emitInputEvent(value);
    },
    emitInputEvent (value) {
      this.$emit('input', value);
      dispatch.call(this, {
        eventName: 'validate',
        componentName: 'LinFormItem'
      });
    }
  },
  computed: {
    disabledReduce () {
      if (this.disabled) {
        return true;
      }
      if (Number.isNaN(this.min)) {
        return false;
      } if (
        this.value === '' ||
        this.value === null ||
        this.value === undefined
      ) {
        return false;
      } if (this.value <= this.min) {
        return true;
      }
      return false;
    },
    disabledPlus () {
      if (this.disabled) {
        return true;
      }
      if (Number.isNaN(this.max)) {
        return false;
      } if (
        this.value === '' ||
        this.value === null ||
        this.value === undefined
      ) {
        return false;
      } if (this.value >= this.max) {
        return true;
      }
      return false;
    }
  }
};
</script>
