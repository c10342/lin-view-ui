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
        'lin-link-underline': underline && !disabled
      }
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
  name: "LinLink",
  props: {
    // 类型
    type: {
      type: String,
      default: "default"
    },
    // 是否有下划线
    underline: {
      type: Boolean,
      default: true
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 原生href属性
    href: {
      type: String,
      default: ""
    },
    // 图标类名
    icon: {
      type: String,
      default: ""
    }
  },
  methods: {
    onClick(event) {
      if (!this.href || this.disabled) {
        event.preventDefault();
      }
    }
  }
};
</script>
