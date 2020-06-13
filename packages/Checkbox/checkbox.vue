<template>
  <label
    class="l-checkbox"
    :class="{'l-checkbox-is-checked': isChecked,'l-checkbox-is-disabled':isDisabled}"
  >
    <span class="l-checkbox-input">
      <span class="l-checkbox-inner"></span>
      <input
        type="checkbox"
        class="l-checkbox-original"
        :name="name"
        v-model="model"
        :value="label"
        :disabled="isDisabled"
      />
    </span>
    <span class="l-checkbox-label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: "l-checkbox",
  inject: {
    CheckboxGroup: {
      default: ""
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
        this.isGroup
          ? this.CheckboxGroup.$emit("input", value)
          : this.$emit("input", value);
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
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
@import "packages/assets/styles/variables/checkbox.scss";
.l-checkbox {
  color: $checkbox-color;
  font-weight: $checkbox-font-weight;
  font-size: $checkbox-font-size;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  margin-right: $checkbox-margin-right;
  .l-checkbox-input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: $checkbox-input-line-height;
    position: relative;
    vertical-align: middle;
    .l-checkbox-inner {
      display: inline-block;
      position: relative;
      border: $checkbox-inner-border;
      border-radius: $checkbox-inner-border-radius;
      box-sizing: border-box;
      width: $checkbox-inner-width;
      height: $checkbox-inner-height;
      background-color: $checkbox-inner-background-color;
      z-index: $checkbox-inner-z-index;
      transition: $checkbox-inner-transition;
      &:after {
        box-sizing: content-box;
        content: "";
        border: $checkbox-inner-after-border;
        border-left: $checkbox-inner-after-border-left;
        border-top: $checkbox-inner-after-border-top;
        height: $checkbox-inner-after-height;
        left: $checkbox-inner-after-left;
        position: absolute;
        top: $checkbox-inner-after-top;
        transform: $checkbox-inner-after-transform;
        width: $checkbox-inner-after-width;
        transition: $checkbox-inner-after-transition;
        transform-origin: $checkbox-inner-after-transform-origin;
      }
    }
    .l-checkbox-original {
      opacity: 0;
      outline: none;
      position: absolute;
      left: 10px;
      margin: 0;
      width: 0;
      height: 0;
      z-index: -1;
    }
  }
  .l-checkbox-label {
    display: inline-block;
    padding-left: $checkbox-label-padding-left;
    line-height: $checkbox-label-line-height;
    font-size: $checkbox-label-font-size;
  }
}
.l-checkbox.l-checkbox-is-checked {
  .l-checkbox-input {
    .l-checkbox-inner {
      background-color: $checkbox-checked-background-color;
      border-color: $checkbox-checked-border-color;
      &:after {
        transform: $checkbox-checked-transform;
      }
    }
  }
  .l-checkbox-label {
    color: $checkbox-checked-color;
  }
}
.l-checkbox-is-disabled {
  cursor: not-allowed;
  color: $checkbox-disabled-color;
  .l-checkbox-input {
    cursor: not-allowed;
  }
}
</style>
