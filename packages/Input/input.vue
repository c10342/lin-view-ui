<template>
  <div class="l-input" :class="{'l-input-suffix-content': showSuffix || $slots.default}">
    <!-- 如果传了show-password, 判断是否需要切换 密码的显示 如果不传，不判断 -->
    <input
      @blur="onBlur"
      @focus="onFocus"
      autocomplete="off"
      :maxlength="maxlength"
      :minlength="minlength"
      class="l-input-inner"
      :class="{'l-input-is-disabled': disabled}"
      :placeholder="placeholder"
      :type="showPassword ? (passwordVisible ? 'text':'password') : type"
      :name="name"
      :disabled="disabled"
      :value="value"
      @input="handleInput"
    />
    <span class="l-input-suffix" v-if="showSuffix && !$slots.default">
      <i class="l-input-icon l-icon-circle-close" v-if="clearable && value" @click="clear"></i>
      <i
        class="l-input-icon l-icon-view"
        v-if="showPassword"
        @click="handlePassword"
        :class="{'l-icon-view-active':passwordVisible}"
      ></i>
    </span>
    <span v-if="$slots.default" class="l-input-suffix">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "l-input",
  data() {
    return {
      // 用于控制是否显示密码框
      passwordVisible: false
    };
  },
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    name: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: -1
    },
    minlength: {
      type: Number,
      default: -1
    }
  },
  computed: {
    showSuffix() {
      return this.clearable || this.showPassword;
    }
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    clear() {
      // 把内容清空
      this.$emit("input", "");
    },
    handlePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
    onBlur(e) {
      this.$emit("blur", e);
    },
    onFocus(e) {
      this.$emit("focus", e);
    }
  }
};
</script>

<style lang="scss">
@import "packages/assets/styles/variables/input.scss";
.l-input {
  width: 100%;
  position: relative;
  font-size: $input-font-size;
  display: inline-block;
  .l-input-inner {
    -webkit-appearance: none;
    background-color: $input-inner-background-color;
    background-image: none;
    border-radius: $input-inner-border-radius;
    border: $input-inner-border;
    box-sizing: border-box;
    color: $input-inner-color;
    display: inline-block;
    font-size: inherit;
    height: $input-inner-height;
    line-height: $input-inner-line-height;
    outline: none;
    padding: $input-inner-padding;
    transition: $input-inner-transition;
    width: 100%;

    &:focus {
      outline: none;
      border-color: $input-inner-focus-border-color;
    }
    &.l-input-is-disabled {
      background-color: $input-inner-disabled-background-color;
      border-color: $input-inner-disabled-border-color;
      color: $input-inner-disabled-color;
      cursor: not-allowed;
    }
  }
}

.l-input-suffix-content {
  .l-input-inner {
    padding-right: $input-suffix-inner-padding-right;
  }
}
.l-input-suffix {
  position: absolute;
  height: 100%;
  right: $input-suffix-right;
  top: $input-suffix-top;
  line-height: $input-suffix-line-height;
  text-align: $input-suffix-text-align;
  color: $input-suffix-color;
  transition: $input-suffix-transition;
  z-index: $input-suffix-z-index;
  .l-input-icon {
    color: $input-suffix-icon-color;
    font-size: $input-suffix-icon-font-size;
    cursor: pointer;
    transition: $input-suffix-icon-transition;
  }
  .l-icon-view-active {
    color: $input-suffix-icon-active-color;
  }
}
</style>
