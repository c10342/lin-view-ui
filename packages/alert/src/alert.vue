<template>
  <transition name="lin-fade-in" @after-leave="afterLeave">
    <div
      :class="[
        'lin-alert',
        `lin-alert-${type}`,
        `lin-alert-${effect}`,
        { 'lin-alert-center': center },
      ]"
      v-if="show"
    >
      <slot name="icon">
        <i :class="['lin-alert-icon', icon]" v-if="icon"></i>
      </slot>
      <div class="lin-alert-content">
        <slot name="title">
          <span class="lin-alert-title">{{ title }}</span>
        </slot>
        <slot name="description">
          <span class="lin-alert-description" v-if="description">{{
            description
          }}</span>
        </slot>
      </div>
      <span class="lin-alert-close" v-if="closable" @click="onCloseClick">
        <slot name="close">
          <i class="lin-icon-close"></i>
        </slot>
      </span>
    </div>
  </transition>
</template>

<script lang='ts'>
// import { validatorStringArrayProps } from "@src/utils";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LinAlert",
  emits: ["close"],
  props: {
    // 标题
    title: {
      type: String,
      default: "",
    },
    // 辅助性文字
    description: {
      type: String,
      default: "",
    },
    // 图标
    icon: {
      type: String,
      default: "",
    },
    // 是否可关闭
    closable: {
      type: Boolean,
      default: false,
    },
    // 类型
    type: {
      type: String,
      default: "success",
      options: ["success", "warning", "info", "danger"],
      // validator(val: string) {
      //   return validatorStringArrayProps("type", val, [
      //     "success",
      //     "warning",
      //     "info",
      //     "danger",
      //   ]);
      // },
    },
    // 主题
    effect: {
      type: String,
      default: "light",
      options: ["light", "dark"],
      // validator(val: string) {
      //   return validatorStringArrayProps("effect", val, ["light", "dark"]);
      // },
    },
    // 文字是否居中
    center: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const show = ref(true);
    function onCloseClick() {
      show.value = false;
    }
    function afterLeave() {
      context.emit("close");
    }
    return {
      show,
      onCloseClick,
      afterLeave,
    };
  },
});
</script>
