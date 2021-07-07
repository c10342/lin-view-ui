<template>
  <div
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click.stop
    class="lin-dropdown"
    ref="notOutsideContainer"
  >
    <div class="lin-dropdown-label" @click="onLabelClick" ref="dropdownLabel">
      <slot></slot>
    </div>
    <transition name="lin-dropdown-fade">
      <div
        v-show="isShow"
        :class="[
          'lin-dropdown-container',
          { 'lin-dropdown-container-down': isDown },
          { 'lin-dropdown-container-up': !isDown }
        ]"
        :style="{ top }"
        ref="dropdownContainer"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { DocumentClickMixin } from "@lin-view-ui/mixins";
import { triggerType } from "./enum.js";

export default {
  name: "LinDropdown",
  mixins: [DocumentClickMixin],
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
  data() {
    return {
      // 是否显示下拉菜单
      isShow: false,
      // 下拉菜单距离顶部距离
      top: 0,
      // 向下显示或者向上显示
      isDown: true
    };
  },
  mounted() {
    this.setPlacement();
  },
  provide() {
    return {
      dropdown: this
    };
  },
  methods: {
    // 鼠标进入容器
    onMouseEnter() {
      if (this.trigger === triggerType.hover) {
        this.showList();
      }
    },
    // 鼠标离开容器
    onMouseLeave() {
      if (this.trigger === triggerType.hover) {
        this.hideList();
      }
    },
    // 点击标签
    onLabelClick() {
      if (this.trigger === triggerType.click) {
        this.toggleList();
      }
    },
    // 显示下拉框
    showList() {
      if (!this.isShow) {
        this.isShow = true;
        this.setPlacement();
        this.$emit("visible-change", true);
      }
    },

    setDownTop() {
      this.isDown = true;
      const { dropdownLabel } = this.$refs;
      this.top = `${dropdownLabel.clientHeight + 8}px`;
    },
    setUpTop() {
      this.isDown = false;
      const { dropdownContainer } = this.$refs;
      this.top = `${-(dropdownContainer.clientHeight + 10)}px`;
    },
    setPlacement() {
      this.$nextTick(() => {
        const { dropdownContainer } = this.$refs;
        const { notOutsideContainer } = this.$refs;
        const bottom =
          window.innerHeight -
          notOutsideContainer.getBoundingClientRect().bottom;
        const { top } = notOutsideContainer.getBoundingClientRect();
        if (bottom > dropdownContainer.clientHeight) {
          this.setDownTop();
        } else if (top > dropdownContainer.clientHeight) {
          this.setUpTop();
        } else {
          this.setDownTop();
        }
      });
    },
    // 隐藏下拉框
    hideList() {
      if (this.isShow) {
        this.isShow = false;
        this.$emit("visible-change", false);
      }
    },
    // 下拉框显示或者隐藏切换
    toggleList() {
      if (this.isShow) {
        this.hideList();
      } else {
        this.showList();
      }
    },
    // 点击组件外部
    onDocumentClick(event) {
      const { notOutsideContainer } = this.$refs;
      if (!notOutsideContainer.contains(event.target)) {
        this.hideList();
      }
    }
  }
};
</script>
