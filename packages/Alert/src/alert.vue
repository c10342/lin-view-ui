<template>
  <transition name="lin-alert-fade" @after-leave="afterLeave">
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

<script>
export default {
  name: 'LinAlert',
  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },
    // 辅助性文字
    description: {
      type: String,
      default: '',
    },
    // 图标
    icon: {
      type: String,
      default: '',
    },
    // 是否可关闭
    closable: {
      type: Boolean,
      default: false,
    },
    // 类型
    type: {
      type: String,
      default: 'success',
    },
    // 主题
    effect: {
      type: String,
      default: 'light',
    },
    // 文字是否居中
    center: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 是否显示
      show: true,
    };
  },
  methods: {
    onCloseClick() {
      this.show = false;
    },
    afterLeave() {
      this.$emit('close');
    },
  },
};
</script>
