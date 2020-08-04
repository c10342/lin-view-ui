<template>
  <div class="lin-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LinForm",
  props: {
    model: {
      type: Object,
      required: true,
    },
    labelWidth: {
      type: String,
      default: "80px",
    },
  },
  provide() {
    return {
      Form: this,
    };
  },
};
</script>
