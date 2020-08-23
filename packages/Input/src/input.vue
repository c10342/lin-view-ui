<template>
  <div class="lin-input" :class="{'lin-input-suffix-content': showSuffix || $slots.default}">
    <!-- 如果传了show-password, 判断是否需要切换 密码的显示 如果不传，不判断 -->
    <input
      @blur="onBlur"
      @focus="onFocus"
      autocomplete="off"
      :maxlength="maxlength"
      :minlength="minlength"
      class="lin-input-inner"
      :class="{'lin-input-is-disabled': disabled}"
      :placeholder="placeholder"
      :type="showPassword ? (passwordVisible ? 'text':'password') : type"
      :name="name"
      :disabled="disabled"
      :value="value"
      @input="handleInput"
      v-bind="$attrs"
    />
    <span class="lin-input-suffix" v-if="showSuffix && !$slots.default">
      <i class="lin-input-icon lin-icon-close" v-if="clearable && value" @click="clear"></i>
      <i
        class="lin-input-icon lin-icon-password"
        v-if="showPassword"
        @click="handlePassword"
        :class="{'lin-icon-view-active':passwordVisible}"
      ></i>
    </span>
    <span v-if="$slots.default" class="lin-input-suffix">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import broadcast from 'src/utils/broadcast.js'

export default {
  name: "LinInput",
  data() {
    return {
      // 用于控制是否显示密码框
      passwordVisible: false,
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: -1,
    },
    minlength: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    showSuffix() {
      return this.clearable || this.showPassword;
    },
  },
  methods: {
    handleInput(e) {
      this.emitInputEvent(e.target.value)
    },
    clear() {
      // 把内容清空
      this.emitInputEvent('')
    },
    emitInputEvent(data){
      this.$emit("input", data);
      broadcast.call(this,{eventName:'validate',componentName:'LinFormItem'})
    },

    handlePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
    onBlur(e) {
      this.$emit("blur", e);
    },
    onFocus(e) {
      this.$emit("focus", e);
    },
  },
};
</script>

