<template>
  <!-- 对话框的遮罩 .self代表只有点击自己才触发 -->
  <transition name="l-dialog-fade">
    <div class="l-dialog-wrapper" v-show="visible" @click.self="onWrapperClick">
      <div class="l-dialog" :style="{width, marginTop: top}">
        <div class="l-dialog-header">
          <slot name="title">
            <span class="l-dialog-title">{{title}}</span>
          </slot>
          <button class="l-dialog-headerbtn" @click="handleClose">
            <i class="l-icon-close"></i>
          </button>
        </div>
        <div class="l-dialog-body">
          <!-- 默认插槽 -->
          <slot></slot>
        </div>
        <div class="l-dialog-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "l-dialog",
  props: {
    title: {
      type: String,
      default: "提示"
    },
    width: {
      type: String,
      default: "50%"
    },
    top: {
      type: String,
      default: "15vh"
    },
    visible: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function
    },
    closeOnClickModa: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClose() {
      const done = () => {
        this.$emit("update:visible", false);
        this.$emit("close");
      };
      if (this.beforeClose) {
        this.beforeClose(done);
      } else {
        done();
      }
    },
    onWrapperClick() {
      if (this.closeOnClickModa) {
        this.handleClose();
      }
    }
  }
};
</script>

<style lang="scss">
@import "packages/assets/styles/variables/dialog.scss";
// scoped会给当前组件的模板中的所有的元素都添加一个随机的属性
// scoped会给当前组件中所有的样式 页添加一个对应的的属性选择器
.l-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: $dialog-wrapper-background-color;

  .l-dialog {
    position: relative;
    margin: $dialog-margin;
    background: $dialog-background;
    border-radius: $dialog-border-radius;
    box-shadow: $dialog-box-shadow;
    box-sizing: border-box;
    width: $dialog-width;

    &-header {
      padding: $dialog-header-padding;
      .l-dialog-title {
        line-height: $dialog-title-line-height;
        font-size: $dialog-title-font-size;
        color: $dialog-title-color;
      }
      .l-dialog-headerbtn {
        position: absolute;
        top: $dialog-headerbtn-top;
        right: $dialog-headerbtn-right;
        padding: $dialog-headerbtn-padding;
        background: $dialog-headerbtn-background;
        border: $dialog-headerbtn-border;
        outline: $dialog-headerbtn-outline;
        cursor: pointer;
        font-size: $dialog-headerbtn-font-size;
        .l-icon-close {
          color: $dialog-close-color;
        }
      }
    }

    &-body {
      padding: $dialog-body-padding;
      color: $dialog-body-color;
      font-size: $dialog-body-font-size;
      word-break: $dialog-body-word-break;
    }
    &-footer {
      padding: $dialog-footer-padding;
      text-align: $dialog-footer-text-align;
      box-sizing: border-box;
      // 深度选择器 scss ::v-deep  less /deep/  css >>>
      // ::v-deep .l-button:first-child {
      //   margin-right: 20px;
      // }
    }
  }
}

.l-dialog-fade-enter-active {
  animation: $dialog-animation-enter;
}

.l-dialog-fade-leave-active {
  animation: $dialog-animation-leave;
}
</style>
