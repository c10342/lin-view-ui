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
