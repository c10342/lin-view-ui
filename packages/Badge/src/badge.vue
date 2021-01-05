<template>
  <div class="lin-badge">
    <slot></slot>
    <span
    v-if="!isDot"
    :class="['lin-badge-fix','lin-badge-text', `lin-badge-${type}`]">
    {{ text }}
    </span>
    <span v-if="isDot" :class="['lin-badge-fix','lin-badge-dot', `lin-badge-${type}`]"></span>
  </div>
</template>

<script>
export default {
  name: 'LinBadge',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    max: {
      type: Number
    },
    isDot: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    text () {
      if (typeof this.value === 'string') {
        return this.value;
      } if (typeof this.value === 'number') {
        if (this.max && this.max < this.value) {
          return `${this.max}+`;
        }
        return this.value;
      }
      return '';
    }
  }
};
</script>
