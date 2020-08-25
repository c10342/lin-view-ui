<template>
  <button
    @click="onClick"
    :class="['lin-text-effect',`lin-text-effect-theme-${theme}`,`lin-text-effect-type-${type}`]"
  >
    <slot>{{text}}</slot>
  </button>
</template>


<script>
export default {
  name: "LinTextEffect",
  props: {
    type: {
      type: String,
      default: "primary",
    },
    theme: {
      type: String,
      default: "neon",
    },
    text: {
      type: String,
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>