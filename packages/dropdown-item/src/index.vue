<template>
  <div
    @click="onItemClick"
    :class="[
      { 'is-divided': divided },
      { 'is-disabled': disabled },
      'lin-dropdown-item'
    ]"
  >
    <LinIcon :name="icon" class="lin-dropdown-item-icon" v-if="icon" />
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import LinIcon from "@packages/icon";
import { dropdownKey } from "@packages/tokens";

export default defineComponent({
  name: "LinDropdownItem",
  components: { LinIcon },
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
      default: ""
    }
  },
  setup(props) {
    const { hideOnClick, emitCommand, hideList } = inject(dropdownKey, {
      hideOnClick: computed(() => true)
    });
    // 点击菜单项
    const onItemClick = () => {
      if (hideOnClick?.value) {
        hideList?.();
      }
      emitCommand?.(props.command);
    };
    return { onItemClick };
  }
});
</script>
