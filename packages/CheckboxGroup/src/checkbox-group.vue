<template>
  <div class="lin-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LinCheckboxGroup",
  props: {
    value: {
      type: Array,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      CheckboxGroup: this,
    };
  },
};
</script>

