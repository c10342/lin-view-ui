<template>
  <transition name="lin-fade" @after-leave="onAfterLeave">
    <div
      :class="[
        'lin-alert',
        `lin-alert-${type}`,
        `is-${effect}`,
        { 'is-center': center }
      ]"
      v-if="show"
    >
      <slot name="icon">
        <LinIcon class="lin-alert-icon" :name="icon" v-if="icon" />
      </slot>
      <div class="lin-alert-content">
        <slot name="title">
          <span class="lin-alert-title">{{ title }}</span>
        </slot>
        <slot name="description">
          <span class="lin-alert-description" v-if="description">
            {{ description }}
          </span>
        </slot>
      </div>
      <span class="lin-alert-close" v-if="closable" @click="onCloseClick">
        <slot name="close">
          <LinIcon name="close" />
        </slot>
      </span>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import LinIcon from "@packages/icon";
export default defineComponent({
  name: "LinAlert",
  components: { LinIcon },
  props: {
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 辅助性文字
    description: {
      type: String,
      default: ""
    },
    // 图标
    icon: {
      type: String,
      default: ""
    },
    // 是否可关闭
    closable: {
      type: Boolean,
      default: false
    },
    // 类型
    type: {
      type: String as PropType<"success" | "warning" | "info" | "danger">,
      default: "success"
    },
    // 主题
    effect: {
      type: String as PropType<"light" | "dark">,
      default: "light"
    },
    // 文字是否居中
    center: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(props, context) {
    // 是否显示
    const show = ref(true);
    const onCloseClick = () => {
      show.value = false;
    };
    const onAfterLeave = () => {
      context.emit("close");
    };
    return {
      show,
      onCloseClick,
      onAfterLeave
    };
  }
});
</script>
