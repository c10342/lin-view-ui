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

<style lang="scss">
@import "packages/assets/styles/variables/form-item.scss";
.l-form-item {
  margin-bottom: $form-item-margin-bottom;
  display: flex;
  flex-direction: row;
  align-items: center;
  .l-form-item-label {
    text-align: right;
    vertical-align: middle;
    font-size: $form-item-label-font-size;
    color: $form-item-label-color;
    line-height: $form-item-label-line-height;
    padding: $form-item-label-padding;
    box-sizing: border-box;
  }
  .l-form-item-content {
    flex: 1;
    width: 0;
    line-height: $form-item-content-line-height;
    position: relative;
    font-size: $form-item-content-font-size;
    overflow: hidden;
  }
}
</style>
