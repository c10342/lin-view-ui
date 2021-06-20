<template>
  <div
    @click="onItemClick"
    :class="[
      { 'lin-dropdown-item-divided': divided },
      { 'lin-dropdown-item-disabled': disabled },
      'lin-dropdown-item'
    ]"
  >
    <span :class="[icon, 'lin-dropdown-item-icon']" v-if="icon"></span>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinDropdownItem',
  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示分割线
    divided: {
      type: Boolean,
      default: false
    },
    // 指令
    command: null,
    // 图标类名
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    hideOnClick() {
      return this.dropdown ? this.dropdown.hideOnClick : true;
    }
  },
  inject: {
    dropdown: {
      default: null
    }
  },
  methods: {
    // 点击菜单项
    onItemClick() {
      if (this.dropdown) {
        if (this.hideOnClick) {
          this.dropdown.hideList();
        }
        this.dropdown.$emit('command', this.command);
      }
    }
  }
};
</script>
