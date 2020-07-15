<template>
  <div class="l-input-number" :class="{'l-input-number-disabled':disabled}">
    <span
      class="l-input-number-reduce l-input-number-btn"
      :class="{'l-input-number-btn-disabled':disabledReduce}"
      @click="reduce"
    >-</span>
    <input
      :disabled="disabled"
      :value="value"
      class="l-input-number-text"
      type="text"
      @blur="onBlur"
    />
    <span
      class="l-input-number-plus l-input-number-btn"
      :class="{'l-input-number-btn-disabled':disabledPlus}"
      @click="plus"
    >+</span>
  </div>
</template>

<script>
export default {
  name: "l-input-number",
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
      default: ""
    },
    stepStrictly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    reduce() {
      if (this.disabledReduce) {
        return;
      }
      const value = this.value * 1 - this.step;
      this.$emit("input", value);
      this.$emit("reduce", value);
    },
    plus() {
      if (this.disabledPlus) {
        return;
      }
      const value = this.value * 1 + this.step;
      this.$emit("input", value);
      this.$emit("plus", value);
    },
    onBlur(e) {
      let value = e.target.value * 1;
      if (this.stepStrictly) {
        if (this.min !== NaN && value < this.min) {
          value = this.min + (this.step - (this.min % this.step));
        } else if (this.max !== NaN && value > this.max) {
          value = this.max - (this.min % this.step);
        } else {
          value = value - (value % this.step);
        }
      } else {
        if (this.min !== NaN && value < this.min) {
          value = this.min;
        } else if (this.max !== NaN && value > this.max) {
          value = this.max;
        }
      }
      this.$emit("input", value);
    }
  },
  computed: {
    disabledReduce() {
      if (this.disabled) {
        return true;
      }
      if (this.min === NaN) {
        return false;
      } else if (
        this.value === "" ||
        this.value === null ||
        this.value === undefined
      ) {
        return false;
      } else {
        if (this.value <= this.min) {
          return true;
        } else {
          return false;
        }
      }
    },
    disabledPlus() {
      if (this.disabled) {
        return true;
      }
      if (this.max === NaN) {
        return false;
      } else if (
        this.value === "" ||
        this.value === null ||
        this.value === undefined
      ) {
        return false;
      } else {
        if (this.value >= this.max) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
};
</script>

