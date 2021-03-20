<template>
  <!-- 对话框的遮罩 .self代表只有点击自己才触发 -->
  <transition name="lin-dialog-fade">
    <div
      class="lin-dialog-wrapper"
      v-show="visible"
      @click.self="onWrapperClick"
    >
      <div
        ref="dragContainer"
        @mousedown="onDragClick"
        class="lin-dialog"
        :style="{ width, marginTop: top, ...dialogStyle }"
      >
        <div class="lin-dialog-header">
          <slot name="title">
            <span class="lin-dialog-title">{{
              title || t("LinViewUI.Dialog.title")
            }}</span>
          </slot>
          <button class="lin-dialog-headerbtn" @click="handleClose">
            <i class="lin-icon-close"></i>
          </button>
        </div>
        <div class="lin-dialog-body">
          <!-- 默认插槽 -->
          <slot></slot>
        </div>
        <div class="lin-dialog-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import LocaleMixin from 'src/mixins/locale.js';
import DragMixin from 'src/mixins/drag.js';

export default {
  name: 'LinDialog',
  mixins: [LocaleMixin, DragMixin],
  props: {
    // 标题
    title: {
      type: String
    },
    // 宽度
    width: {
      type: String,
      default: '50%'
    },
    // 距离顶部距离，即margin-top的属性
    top: {
      type: String,
      default: '15vh'
    },
    // 控制组件是否显示，支持.sync 修饰符
    visible: {
      type: Boolean,
      default: false
    },
    // 关闭前的回调，会暂停 Dialog 的关闭
    beforeClose: {
      type: Function
    },
    // 是否可以通过点击 modal 关闭 Dialog
    closeOnClickModa: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    // 点击关闭按钮
    handleClose () {
      const done = () => {
        this.$emit('update:visible', false);
        this.$emit('close');
      };
      if (this.beforeClose) {
        this.beforeClose(done);
      } else {
        done();
      }
    },
    // 点击遮罩层
    onWrapperClick () {
      if (this.closeOnClickModa) {
        this.handleClose();
      }
    }
  }
};
</script>
