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
