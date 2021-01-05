<template>
  <div class="lin-choice-option">
    <slot name="label">
      <div class="lin-choice-option-label">
        {{ label }}
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LinChoiceOption',
  props: {
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  provide () {
    return {
      option: this
    };
  }
};
</script>
