<template>
  <div
    class="lin-input"
    :class="{ 'lin-input-suffix-content': showSuffix || $slots.default }"
  >
    <!-- 如果传了show-password, 判断是否需要切换 密码的显示 如果不传，不判断 -->
    <input
      @blur="onBlur"
      @focus="onFocus"
      autocomplete="off"
      class="lin-input-inner"
      :class="{ 'lin-input-is-disabled': disabled }"
      :placeholder="placeholder"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :disabled="disabled"
      :value="value"
      @keyup="handleInput"
      v-bind="inputAttr"
    />
    <span class="lin-input-suffix" v-if="showSuffix && !$slots.default">
      <i
        class="lin-input-icon lin-icon-close"
        v-if="clearable && value"
        @click="clear"
      ></i>
      <i
        class="lin-input-icon lin-icon-password"
        v-if="showPassword"
        @click="handlePassword"
        :class="{ 'lin-icon-view-active': passwordVisible }"
      ></i>
    </span>
    <span v-if="$slots.default" class="lin-input-suffix">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import {dispatch} from '@lin-view-ui/utils';

export default {
  name: 'LinInput',
  data() {
    return {
      // 用于控制是否显示密码框
      passwordVisible: false
    };
  },
  props: {
    // 输入框占位符
    placeholder: {
      type: String,
      default: ''
    },
    // 输入框类型
    type: {
      type: String,
      default: 'text'
    },
    // 原生属性name
    name: {
      type: String,
      default: ''
    },
    // 是否禁用文本框
    disabled: {
      type: Boolean,
      default: false
    },
    // 绑定值
    value: {
      type: String,
      default: ''
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否显示切换密码图标，即密文切换成明文，明文切换成密文
    showPassword: {
      type: Boolean,
      default: false
    },
    // 最大长度
    maxlength: {
      type: Number,
      default: -1
    },
    // 最小长度
    minlength: {
      type: Number,
      default: -1
    }
  },
  computed: {
    // 是否显示清空图标或者切面密码图标
    showSuffix() {
      return this.clearable || this.showPassword;
    },
    // input额外的属性
    inputAttr() {
      const obj = {};
      if (this.maxlength !== -1) {
        obj.maxlength = this.maxlength;
      }
      if (this.minlength !== -1) {
        obj.minlength = this.minlength;
      }
      if (this.name) {
        obj.name = this.name;
      }
      return {
        ...obj,
        ...this.$attrs
      };
    }
  },
  methods: {
    // 键盘抬起事件
    handleInput(e) {
      this.emitInputEvent(e.target.value);
    },
    // 清空内容
    clear() {
      // 把内容清空
      this.emitInputEvent('');
      this.$emit('clear');
    },
    // 发射事件
    emitInputEvent(data) {
      this.$emit('input', data);
      dispatch.call(this, {
        eventName: 'validate',
        componentName: 'LinFormItem'
      });
    },
    // 切换密码图标的变化
    handlePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
    onBlur(e) {
      this.$emit('blur', e);
    },
    onFocus(e) {
      this.$emit('focus', e);
    }
  }
};
</script>
