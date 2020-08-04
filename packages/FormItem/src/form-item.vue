<template>
  <div class="lin-form-item">
    <label class="lin-form-item-label" :style="{width: this.Form.labelWidth}">{{label}}</label>
    <div class="lin-form-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinFormItem",
  props: {
    label: String,
  },
  inject: ["Form"],
};
</script>

