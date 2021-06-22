<template>
  <transition name="lin-tag-fade" @after-leave="afterLeave">
    <div
      v-if="show"
      @click="onTagclick"
      :class="['lin-tag', `lin-tag-${type}`, `lin-tag-${effect}`]"
      :style="{ 'background-color': color }"
    >
      <span>{{ text }}</span>
      <i
        v-if="closable"
        @click="onCloseClick"
        class="lin-icon-close lin-tag-close"
      ></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LinTag",
  props: {
    // 类型
    type: {
      type: String,
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
      type: String,
      default: "light"
    }
  },
  data() {
    return {
      // 控制是否显示
      show: true
    };
  },
  methods: {
    // 点击标签
    onTagclick() {
      this.$emit("click");
    },
    // 点击关闭按钮
    onCloseClick() {
      this.show = false;
    },
    // vue过度动画结束
    afterLeave() {
      this.$emit("close");
    }
  }
};
</script>
