<template>
  <label
    class="l-radio"
    :class="{'l-radio-is-checked': label === model,'l-radio-is-disabled':isDisable}"
  >
    <span class="l-radio-input">
      <span class="l-radio-inner"></span>
      <input
        :disabled="isDisable"
        class="l-radio-original"
        type="radio"
        :value="label"
        :name="name"
        v-model="model"
      />
    </span>
    <span class="l-radio-label">
      <slot></slot>
      <!-- 如果没有传内容，我们就把label当成内容 -->
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: "l-radio",
  // 需要提供一个计算属性 model
  inject: {
    RadioGroup: {
      default: ""
    }
  },
  computed: {
    model: {
      get() {
        // this.RadioGroup.value
        return this.isGroup ? this.RadioGroup.value : this.value;
      },
      set(value) {
        // 触发父组件给当前组件注册的input事件
        this.$emit("input", value);
        this.isGroup
          ? this.RadioGroup.$emit("input", value)
          : this.$emit("input", value);
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
      // return this.isGroup ? this.RadioGroup.disabled : this.disabled;
    }
  },
  props: {
    label: {
      type: [String, Number, Boolean],
      default: ""
    },
    value: null,
    name: {
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
