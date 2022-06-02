<template>
  <transition name="lin-fade" @after-leave="afterLeave">
    <div
      v-if="show"
      @click="onTagClick"
      :class="[
        'lin-tag',
        `is-${type}`,
        `is-${effect}`,
        { [`is-${tagSize}`]: tagSize }
      ]"
      :style="{ 'background-color': color }"
    >
      <span>{{ text }}</span>
      <Icon
        v-if="closable"
        @click="onCloseClick"
        name="close"
        class="lin-tag-close"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import Icon from "@packages/icon";
import { useGlobalConfig } from "@packages/hooks";

export default defineComponent({
  name: "LinTag",
  components: { Icon },
  props: {
    // 类型
    type: {
      type: String as PropType<
        "primary" | "success" | "info" | "warning" | "danger"
      >,
      default: "primary"
    },
    // 文本
    text: {
      type: String,
      default: ""
    },
    // 背景色
    color: {
      type: String,
      default: ""
    },
    // 是否可关闭
    closable: {
      type: Boolean,
      default: false
    },
    // 主题
    effect: {
      type: String as PropType<"dark" | "light" | "plain">,
      default: "light"
    },
    // 尺寸
    size: {
      type: String as PropType<"large" | "small">,
      default: ""
    }
  },
  emits: ["click", "close"],
  setup(props, context) {
    const { size } = useGlobalConfig();
    // 控制是否显示
    const show = ref(true);
    const tagSize = computed(() => {
      return props.size ?? size?.value;
    });
    // 点击标签
    const onTagClick = () => {
      context.emit("click");
    };
    // 点击关闭按钮
    const onCloseClick = () => {
      show.value = false;
    };
    // vue过度动画结束
    const afterLeave = () => {
      context.emit("close");
    };
    return {
      show,
      onTagClick,
      onCloseClick,
      afterLeave,
      tagSize
    };
  }
});
</script>
