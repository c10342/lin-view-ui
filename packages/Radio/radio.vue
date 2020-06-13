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

<style lang="scss">
@import "packages/assets/styles/variables/radio.scss";
.l-radio {
  color: $radio-color;
  font-weight: $radio-font-weight;
  line-height: $radio-line-height;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: $radio-font-size;
  margin-right: $radio-margin-right;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  .l-radio-input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: $radio-input-line-height;
    position: relative;
    vertical-align: middle;
    .l-radio-inner {
      border: $radio-inner-border;
      border-radius: $radio-inner-border-radius;
      width: $radio-inner-width;
      height: $radio-inner-height;
      background-color: $radio-inner-background-color;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;
      &:after {
        width: $radio-inner-after-width;
        height: $radio-inner-after-height;
        border-radius: $radio-inner-after-border-radius;
        background-color: $radio-inner-after-background-color;
        content: "";
        position: absolute;
        left: $radio-inner-after-left;
        top: $radio-inner-after-top;
        transform: $radio-inner-after-transform;
        transition: $radio-inner-after-transition;
      }
    }
    .l-radio-original {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0px;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
  .l-radio-label {
    font-size: $radio-label-font-size;
    padding-left: $radio-label-padding-left;
  }
}

.l-radio-is-checked {
  .l-radio-input {
    .l-radio-inner {
      border-color: $radio-checked-border-color;
      background: $radio-checked-background;
      &:after {
        transform: $radio-checked-transform;
      }
    }
  }
  .l-radio-label {
    color: $radio-checked-color;
  }
}

.l-radio-is-disabled {
  cursor: not-allowed;
  color: $radio-disabled-color;
  .l-radio-input {
    .l-radio-inner {
      cursor: not-allowed;
      border-color: $radio-disabled-border-color;
      background-color: $radio-disabled-background-color;
      &:after {
        background-color: $radio-disabled-after-background-color;
      }
    }
  }
  .l-radio-label {
    color: $radio-disabled-color;
  }
}
</style>
