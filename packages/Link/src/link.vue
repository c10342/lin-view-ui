<template>
  <a
    @click="onClick"
    :href="href"
    v-bind="$attrs"
    :class="[
      'lin-link',
      `lin-link-${type}`,
      {
        'lin-link-disabled': disabled,
        'lin-link-underline': underline && !disabled,
      },
    ]"
  >
    <i :class="[icon, 'lin-link-icon']" v-if="icon"></i>
    <span>
      <slot></slot>
    </span>
  </a>
</template>

<script>
export default {
  name: 'LinLink',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    underline: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClick(event) {
      if (!this.href || this.disabled) {
        event.preventDefault();
      }
    },
  },
};
</script>
