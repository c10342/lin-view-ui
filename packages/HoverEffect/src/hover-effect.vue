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
    type: {
      type: String,
      default: 'primary'
    },
    theme: {
      type: String,
      default: 'neon'
    },
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
