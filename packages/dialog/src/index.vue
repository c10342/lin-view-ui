<template>
  <!-- 对话框的遮罩 .self代表只有点击自己才触发 -->
  <transition name="lin-fade">
    <div
      class="lin-dialog-overlay"
      v-show="visible"
      @click.self="onWrapperClick"
    >
      <transition :name="drag ? '' : 'lin-dialog-fade'">
        <div
          v-show="visible"
          ref="dragRef"
          class="lin-dialog"
          :style="{ width, marginTop: top }"
        >
          <div class="lin-dialog-header">
            <slot name="title">
              <span class="lin-dialog-title">
                {{ title || t("title") }}
              </span>
            </slot>
            <LinIcon
              name="close"
              class="lin-dialog-close"
              @click="handleClose"
            />
          </div>
          <div class="lin-dialog-body">
            <!-- 默认插槽 -->
            <slot></slot>
          </div>
          <div class="lin-dialog-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { isFunction } from "@packages/utils";
import { useDrag, useScopeLocale } from "@packages/hooks";
import LinIcon from "@packages/icon";

export default defineComponent({
  name: "LinDialog",
  components: { LinIcon },
  props: {
    // 标题
    title: {
      type: String
    },
    // 宽度
    width: {
      type: String,
      default: "50%"
    },
    // 距离顶部距离，即margin-top的属性
    top: {
      type: String,
      default: "15vh"
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
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    drag: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const { t } = useScopeLocale("Dialog");
    const dragRef = ref<HTMLElement | null>(null);
    useDrag(props.drag, dragRef);
    // 点击关闭按钮
    const handleClose = () => {
      const done = () => {
        context.emit("update:visible", false);
        context.emit("close");
      };
      if (isFunction(props.beforeClose)) {
        props.beforeClose(done);
      } else {
        done();
      }
    };
    // 点击遮罩层
    const onWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleClose();
      }
    };

    return {
      dragRef,
      t,
      onWrapperClick,
      handleClose
    };
  }
});
</script>
