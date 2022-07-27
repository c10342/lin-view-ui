<template>
  <div
    ref="containerRef"
    class="lin-dropdown"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click.stop
  >
    <div
      ref="labelRef"
      class="lin-dropdown-label"
      @click="onLabelClick"
    >
      <slot />
    </div>
    <transition name="lin-fade">
      <div
        v-show="isShow"
        ref="dropdownRef"
        :class="[
          'lin-dropdown-container',
          { 'is-down': isDown },
          { 'is-up': !isDown }
        ]"
        :style="{ top }"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { useClickOutside } from "@packages/hooks";
import { dropdownKey } from "@packages/tokens";
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  provide,
  ref
} from "vue";
const triggerType = {
  hover: "hover",
  click: "click"
};
export default defineComponent({
  name: "LinDropdown",
  props: {
    // 触发下拉的行为
    trigger: {
      type: String,
      default: "hover"
    },
    // 是否在点击菜单项后隐藏菜单
    hideOnClick: {
      type: Boolean,
      default: true
    }
  },
  emits: ["visible-change", "command"],
  setup(props, context) {
    // 是否显示下拉菜单
    const isShow = ref(false);
    // 下拉菜单距离顶部距离
    const top = ref<number | string>(0);
    // 向下显示或者向上显示
    const isDown = ref(true);

    const containerRef = ref<HTMLElement | null>(null);
    const labelRef = ref<HTMLElement | null>(null);
    const dropdownRef = ref<HTMLElement | null>(null);
    const setDownTop = () => {
      if (!labelRef.value) {
        return;
      }
      isDown.value = true;
      top.value = `${labelRef.value.clientHeight + 8}px`;
    };
    const setUpTop = () => {
      if (!dropdownRef.value) {
        return;
      }
      isDown.value = false;
      top.value = `${-(dropdownRef.value.clientHeight + 10)}px`;
    };
    const setPlacement = () => {
      nextTick(() => {
        if (!dropdownRef.value || !containerRef.value) {
          return;
        }
        const bottom
          = window.innerHeight
          - containerRef.value.getBoundingClientRect().bottom;
        const { top:vTop } = containerRef.value.getBoundingClientRect();
        if (bottom > dropdownRef.value.clientHeight) {
          setDownTop();
        } else if (vTop > dropdownRef.value.clientHeight) {
          setUpTop();
        } else {
          setDownTop();
        }
      });
    };
    // 显示下拉框
    const showList = () => {
      if (!isShow.value) {
        isShow.value = true;
        setPlacement();
        context.emit("visible-change", true);
      }
    };
    // 隐藏下拉框
    const hideList = () => {
      if (isShow.value) {
        isShow.value = false;
        context.emit("visible-change", false);
      }
    };
    useClickOutside(containerRef, () => {
      hideList();
    });

    const emitCommand = (command: string) => {
      context.emit("command", command);
    };
    // 鼠标进入容器
    const onMouseEnter = () => {
      if (props.trigger === triggerType.hover) {
        showList();
      }
    };
    // 鼠标离开容器
    const onMouseLeave = () => {
      if (props.trigger === triggerType.hover) {
        hideList();
      }
    };
    // 下拉框显示或者隐藏切换
    const toggleList = () => {
      if (isShow.value) {
        hideList();
      } else {
        showList();
      }
    };
    // 点击标签
    const onLabelClick = () => {
      if (props.trigger === triggerType.click) {
        toggleList();
      }
    };

    onMounted(() => {
      setPlacement();
    });
    provide(dropdownKey, {
      hideOnClick: computed(() => props.hideOnClick),
      hideList,
      emitCommand
    });
    return {
      onMouseEnter,
      onMouseLeave,
      onLabelClick,
      isShow,
      isDown,
      top,
      containerRef,
      labelRef,
      dropdownRef
    };
  }
});
</script>
