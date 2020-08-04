<template>
  <button
    @click="onButtonClick"
    class="lin-button"
    :class="[
      `lin-button-${type}`,
      { 'lin-button-plain': plain },
      { 'lin-button-round': round },
      { 'lin-button-circle': circle },
      { 'lin-button-disabled': disabled },
      `lin-button-size-${size}`
    ]"
    :disabled="disabled"
  >
    <i v-if="icon" :class="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "LinButton",

  props: {
    type: {
      type: String,
      default: "default",
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "default",
    },
  },

  methods: {
    onButtonClick() {
      this.$emit("click");
    },
  },
};
</script>

