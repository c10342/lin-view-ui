<template>
  <div class="l-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "l-form",
  props: {
    model: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: "80px"
    }
  },
  provide() {
    return {
      Form: this
    };
  }
};
</script>
