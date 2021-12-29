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

<script lang='ts'>
// import { dispatch } from "@src/utils";

import { UPDATE_MODEL_EVENT } from "@src/utils";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "LinInput",
  inheritAttrs: false,
  emits:['input',UPDATE_MODEL_EVENT,'clear','blur','focus'],
  props: {
    // 输入框占位符
    placeholder: {
      type: String,
      default: "",
    },
    // 输入框类型
    type: {
      type: String,
      default: "text",
    },
    // 原生属性name
    name: {
      type: String,
      default: "",
    },
    // 是否禁用文本框
    disabled: {
      type: Boolean,
      default: false,
    },
    // 绑定值
    value: {
      type: String,
      default: "",
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: false,
    },
    // 是否显示切换密码图标，即密文切换成明文，明文切换成密文
    showPassword: {
      type: Boolean,
      default: false,
    },
    // 最大长度
    maxlength: {
      type: Number,
      default: -1,
    },
    // 最小长度
    minlength: {
      type: Number,
      default: -1,
    },
  },
  setup(props, context) {
    // 是否显示清空图标或者切面密码图标
    const showSuffix = computed(() => props.clearable || props.showPassword);
    // input额外的属性
    const inputAttr = computed(() => {
      const obj: { [key: string]: any } = {};
      if (props.maxlength !== -1) {
        obj.maxlength = props.maxlength;
      }
      if (props.minlength !== -1) {
        obj.minlength = props.minlength;
      }
      if (props.name) {
        obj.name = props.name;
      }
      return {
        ...obj,
        ...context.attrs,
      };
    });
    // 用于控制是否显示密码框
    const passwordVisible = ref(false);
    // 键盘抬起事件
    function handleInput(event: Event) {
      const { value } = event.target as HTMLInputElement;
      emitInputEvent(value);
    }

    // 发射事件
    function emitInputEvent(data: any) {
      context.emit("input", data);
      context.emit(UPDATE_MODEL_EVENT, data);
    }

    // 清空内容
    function clear() {
      emitInputEvent("");
      context.emit("clear");
    }

    // 切换密码图标的变化
    function handlePassword() {
      passwordVisible.value = !passwordVisible.value;
    }
    function onBlur(e: Event) {
      context.emit("blur", e);
    }
    function onFocus(e: Event) {
      context.emit("focus", e);
    }

    return {
      showSuffix,
      inputAttr,
      passwordVisible,
      handleInput,
      clear,
      handlePassword,
      onBlur,
      onFocus
    };
  }
});
</script>
