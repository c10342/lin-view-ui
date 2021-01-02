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
                'lin-message-box-type',
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
    [Input.name]: Input,
  },
  props: {
    title: String,
    message: String,
    dangerouslyUseHTMLString: Boolean,
    type: String,
    iconClass: String,
    customClass: String,
    showClose: {
      type: Boolean,
      default: true,
    },
    beforeClose: Function,
    showCancelButton: Boolean,
    showConfirmButton: { type: Boolean, default: true },
    cancelButtonText: String,
    confirmButtonText: String,
    cancelButtonClass: String,
    confirmButtonClass: String,
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    closeOnHashChange: {
      type: Boolean,
      default: true,
    },
    showInput: {
      typs: Boolean,
      default: false,
    },
    inputPlaceholder: String,
    inputType: {
      type: String,
      default: 'text',
    },
    inputValue: String,
    inputPattern: RegExp,
    inputValidator: Function,
    inputErrorMessage: String,
    roundButton: Boolean,
    confirmButtonLoading: Boolean,
    loadingSize: {
      type: String,
      default: '11px',
    },
  },
  data() {
    return {
      show: false,
      value: '',
      errorMessage: '',
      showErrorMessage: false,
      dialogStyle: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      },
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
    },
  },
  mounted() {
    if (this.closeOnPressEscape) {
      window.addEventListener('keyup', this.onESCDown);
    }
    if (this.closeOnHashChange) {
      window.addEventListener('hashchange', this.hashchange);
    }
    if (this.inputValue) {
      this.value = this.inputValue;
    }
    if (this.myInputErrorMessage) {
      this.errorMessage = this.myInputErrorMessage;
    }
  },
  methods: {
    emitClose(by) {
      this.$emit('close', {
        by,
        value: this.value,
      });
    },
    handleClose(by) {
      if (typeof this.beforeClose === 'function') {
        const done = () => {
          this.show = false;
          this.emitClose(by);
        };
        this.beforeClose({ by }, this, done);
      } else {
        this.show = false;
        this.emitClose(by);
      }
    },
    onMaskClick() {
      if (this.closeOnClickModal) {
        this.handleClose('mask');
      }
    },
    onCancelBtnClick() {
      this.handleClose('cancelButton');
    },
    onConfirmBtnClick() {
      if (this.showInput && (this.inputPattern || this.inputValidator)) {
        this.onInputChange(this.value);
        if (!this.showErrorMessage) {
          this.handleClose('confirmButton');
        }
      } else {
        this.handleClose('confirmButton');
      }
    },
    onIconClick() {
      this.handleClose('icon');
    },
    onESCDown(event) {
      if (event.keyCode === 27) {
        this.handleClose('esc');
      }
    },
    hashchange() {
      this.handleClose('hash');
    },
    onInputChange(data) {
      if (typeof this.inputValidator === 'function') {
        const result = this.inputValidator(data);
        if (typeof result === 'boolean') {
          this.showErrorMessage = !result;
        } else if (typeof result === 'string') {
          if (result) {
            this.showErrorMessage = true;
            this.errorMessage = result;
          } else {
            this.showErrorMessage = false;
            this.errorMessage = this.myInputErrorMessage;
          }
        }
      } else if (this.inputPattern) {
        const result = this.inputPattern.test(data);
        this.showErrorMessage = !result;
      }
    },
  },
  beforeDestroy() {
    if (this.closeOnPressEscape) {
      window.removeEventListener('keyup', this.onESCDown);
    }
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.hashchange);
    }
  },
};
</script>
