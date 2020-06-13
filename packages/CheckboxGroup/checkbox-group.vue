<template>
  <div class="l-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "l-checkbox-group",
  props: {
    value: {
      type: Array
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      CheckboxGroup: this
    };
  }
};
</script>

<style lang="scss">
.l-checkbox-group {
  position: relative;
}
</style>

