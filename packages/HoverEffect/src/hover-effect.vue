<template>
  <button
    @click="onClick"
    :class="['lin-hover-effect',`lin-hover-effect-theme-${theme}`,`lin-hover-effect-type-${type}`]"
  >
    <slot>{{text}}</slot>
  </button>
</template>

<script>
export default {
  name: 'LinHoverEffect',
  props: {
    // 效果类型
    type: {
      type: String,
      default: 'primary'
    },
    // 效果主题
    theme: {
      type: String,
      default: 'neon'
    },
    // 文本
    text: {
      type: String
    }
  },
  methods: {
    onClick () {
      this.$emit('click');
    }
  }
};
</script>
