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
    <transition name="fade">
      <div
        v-show="isShow"
        :class="['lin-dropdown-container',{'lin-dropdown-container-down':isDown}, {'lin-dropdown-container-up':!isDown}]"
        :style="{top}"
        ref="dropdownContainer"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import documentClick from "src/mixins/documentClick.js";
export default {
  name: "LinDropdown",
  mixins: [documentClick],
  props: {
    trigger: {
      type: String,
      default: "hover",
    },
    hideOnClick: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isShow: false,
      top: 0,
      isDown: true,
    };
  },
  mounted() {
    this.setPlacement();
  },
  provide() {
    return {
      dropdown: this,
    };
  },
  methods: {
    onMouseEnter() {
      if (this.trigger === "hover") {
        this.showList();
      }
    },
    onMouseLeave() {
      if (this.trigger === "hover") {
        this.hideList();
      }
    },
    onLabelClick() {
      if (this.trigger === "click") {
        this.toggleList();
      }
    },
    showList() {
      if (!this.isShow) {
        this.isShow = true;
        this.setPlacement();
        this.$emit("visible-change", true);
      }
    },

    setDownTop() {
      this.isDown = true;
      const dropdownLabel = this.$refs.dropdownLabel;
      this.top = `${dropdownLabel.clientHeight + 8}px`;
    },
    setUpTop() {
      this.isDown = false;
      const dropdownContainer = this.$refs.dropdownContainer;
      this.top = `${-(dropdownContainer.clientHeight + 10)}px`;
    },
    setPlacement() {
      this.$nextTick(() => {
        const dropdownContainer = this.$refs.dropdownContainer;
        const notOutsideContainer = this.$refs.notOutsideContainer;
        const bottom =
          window.innerHeight -
          notOutsideContainer.getBoundingClientRect().bottom;
        const top = notOutsideContainer.getBoundingClientRect().top;
        if (bottom > dropdownContainer.clientHeight) {
          this.setDownTop();
        } else if (top > dropdownContainer.clientHeight) {
          this.setUpTop();
        } else {
          this.setDownTop();
        }
      });
    },
    hideList() {
      if (this.isShow) {
        this.isShow = false;
        this.$emit("visible-change", false);
      }
    },
    toggleList() {
      if (this.isShow) {
        this.hideList();
      } else {
        this.showList();
      }
    },
    onDocumentClick(event) {
      const notOutsideContainer = this.$refs.notOutsideContainer;
      if (!notOutsideContainer.contains(event.target)) {
        this.hideList();
      }
    },
  },
};
</script>

<style lang="scss">
.lin-dropdown {
  display: inline-block;
  position: relative;
}

.lin-dropdown-label {
  cursor: pointer;
  color: #409eff;
}

.lin-dropdown-container {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 300px;
  background-color: #ffffff;
  white-space: nowrap;

  padding: 5px 0;
  border: 1px solid #e4e7ed;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  &::before {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    left: 50%;

    border: 1px solid #e4e7ed;
    box-sizing: border-box;
    background-color: #ffffff;
    border-top-color: transparent;
    border-right-color: transparent;
    border-radius: 2px;
  }
}

.lin-dropdown-container-down {
  &::before {
    top: -7px;
    transform: translateX(-50%) rotate(135deg);
  }
}

.lin-dropdown-container-up {
  &::before {
    bottom: -7px;
    transform: translateX(-50%) rotate(-45deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 100ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 1;
}
</style>