<template>
  <transition name="lin-message-fade">
    <div
      :class="['lin-message-box', customClass]"
      @click.self="onMaskClick"
      v-if="show"
    >
      <div
        @mousedown="onDragClick"
        :style="dialogStyle"
        ref="dragContainer"
        class="lin-message-box-wrapper"
      >
        <div class="lin-message-box-header">
          <div class="lin-message-box-title">{{ title }}</div>
          <span
            class="lin-icon-close lin-message-box-icon"
            v-if="showClose"
            @click="onIconClick"
          ></span>
        </div>
        <div class="lin-message-box-content">
          <div class="lin-message-box-container">
            <span
              v-if="!iconClass"
              :class="[
                type ? `lin-icon-${type} lin-message-box-${type}` : '',
                'lin-message-box-type'
              ]"
            ></span>
            <span v-else :class="[iconClass, 'lin-message-box-type']"></span>
            <div
              class="lin-message-box-message"
              v-if="!dangerouslyUseHTMLString"
            >
              {{ message }}
            </div>
            <div class="lin-message-box-message" v-else v-html="message"></div>
          </div>
          <div class="lin-message-box-entering" v-if="showInput">
            <lin-input
              @input="onInputChange"
              v-model="value"
              :placeholder="inputPlaceholder"
              :type="inputType"
            />
            <p
              class="lin-message-box-errormsg"
              :style="{ visibility: showErrorMessage ? 'visible' : 'hidden' }"
            >
              {{ errorMessage }}
            </p>
          </div>
        </div>
        <div class="lin-message-box-btns">
          <lin-button
            :round="roundButton"
            :class="[cancelButtonClass]"
            v-if="showCancelButton"
            @click="onCancelBtnClick"
            >{{ myCancelButtonText }}</lin-button
          >
          <lin-button
            :loadingSize="loadingSize"
            :loading="confirmButtonLoading"
            :round="roundButton"
            @click="onConfirmBtnClick"
            :class="[confirmButtonClass]"
            type="primary"
            v-if="showConfirmButton"
            >{{ myConfirmButtonText }}</lin-button
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from 'packages/Button/index.js';
import Input from 'packages/Input/index.js';
import LocaleMixin from 'src/mixins/locale.js';
import DragMixin from 'src/mixins/drag.js';

export default {
  name: 'LinMessageBox',
  mixins: [LocaleMixin, DragMixin],
  components: {
    [Button.name]: Button,
    [Input.name]: Input
  },
  props: {
    // MessageBox 标题
    title: String,
    // MessageBox 消息正文内容
    message: String,
    // 是否将 message 属性作为 HTML 片段处理
    dangerouslyUseHTMLString: Boolean,
    // 消息类型，用于显示图标
    type: String,
    // 自定义图标的类名，会覆盖 type
    iconClass: String,
    // MessageBox 的自定义类名
    customClass: String,
    // MessageBox 是否显示右上角关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // MessageBox 关闭前的回调，会暂停实例的关闭
    beforeClose: Function,
    // 是否显示取消按钮
    showCancelButton: Boolean,
    // 是否显示确定按钮
    showConfirmButton: { type: Boolean, default: true },
    // 取消按钮的文本内容
    cancelButtonText: String,
    // 确定按钮的文本内容
    confirmButtonText: String,
    // 取消按钮的自定义类名
    cancelButtonClass: String,
    // 确定按钮的自定义类名
    confirmButtonClass: String,
    // 是否可通过点击遮罩关闭 MessageBox
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    // 是否可通过按下 ESC 键关闭 MessageBox
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    // 是否在 hashchange 时关闭 MessageBox
    closeOnHashChange: {
      type: Boolean,
      default: true
    },
    // 是否显示输入框
    showInput: {
      typs: Boolean,
      default: false
    },
    // 输入框的占位符
    inputPlaceholder: String,
    // 输入框的类型
    inputType: {
      type: String,
      default: 'text'
    },
    // 输入框的初始文本
    inputValue: String,
    // 输入框的校验表达式
    inputPattern: RegExp,
    // 输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage
    inputValidator: Function,
    // 校验未通过时的提示文本
    inputErrorMessage: String,
    // 是否使用圆角按钮
    roundButton: Boolean,
    // 是否显示确认按钮的 loading 状态
    confirmButtonLoading: Boolean,
    // loading指示器大小
    loadingSize: {
      type: String,
      default: '11px'
    }
  },
  data() {
    return {
      // 控制是否显示
      show: false,
      // 输入框的值
      value: '',
      // 错误信息
      errorMessage: '',
      showErrorMessage: false,
      // 样式，用于拖拽的
      dialogStyle: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
      }
    };
  },
  computed: {
    myCancelButtonText() {
      if (this.cancelButtonText) {
        return this.cancelButtonText;
      }
      return this.t('LinViewUI.MessageBox.cancelButtonText');
    },
    myConfirmButtonText() {
      if (this.confirmButtonText) {
        return this.confirmButtonText;
      }
      return this.t('LinViewUI.MessageBox.confirmButtonText');
    },
    myInputErrorMessage() {
      if (this.inputErrorMessage) {
        return this.inputErrorMessage;
      }
      return this.t('LinViewUI.MessageBox.inputErrorMessage');
    }
  },
  mounted() {
    if (this.closeOnPressEscape) {
      // 监听esc事件
      window.addEventListener('keyup', this.onESCDown);
    }
    if (this.closeOnHashChange) {
      // 监听hash值变化
      window.addEventListener('hashchange', this.hashchange);
    }
    if (this.inputValue) {
      // 初始化输入框默认值
      this.value = this.inputValue;
    }
    if (this.myInputErrorMessage) {
      // 初始化错误消息
      this.errorMessage = this.myInputErrorMessage;
    }
  },
  methods: {
    // 关闭组件，有不同的渠道去关闭
    emitClose(by) {
      this.$emit('close', {
        by,
        value: this.value
      });
    },
    // 处理关闭事件
    handleClose(by) {
      if (typeof this.beforeClose === 'function') {
        const done = () => {
          this.show = false;
          this.emitClose(by);
        };
        // 关闭前回调，可中断关闭
        this.beforeClose({ by }, this, done);
      } else {
        this.show = false;
        this.emitClose(by);
      }
    },
    onMaskClick() {
      if (this.closeOnClickModal) {
        // 点击遮罩层关闭
        this.handleClose('mask');
      }
    },
    onCancelBtnClick() {
      // 点击取消按钮关闭
      this.handleClose('cancelButton');
    },
    onConfirmBtnClick() {
      if (this.showInput && (this.inputPattern || this.inputValidator)) {
        // 需要验证输入框值
        this.onInputChange(this.value);
        if (!this.showErrorMessage) {
          // 校验成功则关闭
          this.handleClose('confirmButton');
        }
      } else {
        // 点击确认按钮关闭
        this.handleClose('confirmButton');
      }
    },
    onIconClick() {
      // 点击关闭图标关闭
      this.handleClose('icon');
    },
    onESCDown(event) {
      if (event.keyCode === 27) {
        // 按下esc键关闭
        this.handleClose('esc');
      }
    },
    hashchange() {
      // hash值改变关闭
      this.handleClose('hash');
    },
    // 校验输入框的值
    onInputChange(data) {
      if (typeof this.inputValidator === 'function') {
        // 自定义校验方法
        const result = this.inputValidator(data);
        if (typeof result === 'boolean') {
          this.showErrorMessage = !result;
        } else if (typeof result === 'string') {
          if (result) {
            // 有返回结果,返回结果就是错误消息
            this.showErrorMessage = true;
            this.errorMessage = result;
          } else {
            this.showErrorMessage = false;
            this.errorMessage = this.myInputErrorMessage;
          }
        }
      } else if (this.inputPattern) {
        // 正则表达式校验
        const result = this.inputPattern.test(data);
        this.showErrorMessage = !result;
      }
    }
  },
  beforeDestroy() {
    if (this.closeOnPressEscape) {
      window.removeEventListener('keyup', this.onESCDown);
    }
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.hashchange);
    }
  }
};
</script>
