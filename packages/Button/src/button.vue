<template>
  <button
    @click="onButtonClick"
    class="l-button"
    :class="[
      `l-button-${type}`,
      { 'l-button-plain': plain },
      { 'l-button-round': round },
      { 'l-button-circle': circle },
      { 'l-button-disabled': disabled },
      `l-button-size-${size}`
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
  name: "l-button",

  props: {
    type: {
      type: String,
      default: "default"
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "default"
    }
  },

  methods: {
    onButtonClick() {
      this.$emit("click");
    }
  }
};
</script>

