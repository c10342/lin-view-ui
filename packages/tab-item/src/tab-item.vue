<template>
  <div v-show="currentValue === childrenIndex" class="lin-tab-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LinTabItem',
  props: {
    // 选项卡标题
    label: {
      type: String,
      default: ''
    },
    // 与选项卡绑定值 value 对应的标识符，表示选项卡别名
    name: {
      type: String,
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    tabGroup: {
      default: null
    }
  },
  data() {
    return {
      index: 0
    };
  },
  computed: {
    // 组件唯一标识
    childrenIndex() {
      return this.name ? this.name : this.index;
    },
    // 当前选中的tab
    currentValue() {
      if (this.tabGroup) {
        return this.tabGroup.currentValue;
      }

      return 0;
    }
  }
};
</script>
