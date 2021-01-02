<template>
  <div v-show="currentValue===childrenIndex" class="lin-tab-item">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LinTabItem',
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  inject: {
    tabGroup: {
      default: null,
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    childrenIndex() {
      return this.name ? this.name : this.index;
    },
    currentValue() {
      if (this.tabGroup) {
        return this.tabGroup.currentValue;
      }

      return 0;
    },
  },
};
</script>
