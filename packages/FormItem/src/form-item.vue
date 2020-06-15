<template>
  <div class="l-form-item">
    <label class="l-form-item-label" :style="{width: this.Form.labelWidth}">{{label}}</label>
    <div class="l-form-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "l-form-item",
  props: {
    label: String
  },
  inject: ["Form"]
};
</script>

