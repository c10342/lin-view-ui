<template>
  <div class="lin-collapse-item">
    <div class="lin-collapse-item-header" @click="onHeaderClick">
      <i :class="[{'lin-collapse-arrow-down':show},'lin-icon-right','lin-collapse-arrow']"></i>
      <slot></slot>
    </div>
    <transition name="lin-collapse-item-animation">
      <div class="lin-collapse-item-content" v-show="show">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "LinCollapseItem",
  props: {
    name: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onHeaderClick() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss">
.lin-collapse-item + .lin-collapse-item {
  border-top: 1px solid #dcdee2;
}
.lin-collapse-item-header {
  box-sizing: border-box;
  padding: 10px 16px;
  background-color: #f7f7f7;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
}
.lin-collapse-arrow {
  margin-right: 5px;
  transition: all 300ms;
}
.lin-collapse-item-content {
  padding: 16px;
  border-top: 1px solid #dcdee2;
  //   height: 100%;
  //   overflow: hidden;
  //   transition: all 500ms;
}

.lin-collapse-arrow-down {
  transform: rotate(90deg);
}

// @keyframes collapse-animation {
//   0% {
//     height: 0;
//   }
//   100% {
//     height: auto;
//   }
// }

// .lin-collapse-item-animation-enter-active {
//   animation: collapse-animation 300ms ease-out;
// }

// .lin-collapse-item-animation-leave-active {
//   animation: collapse-animation 300ms reverse ease-out;
// }

.lin-collapse-item-animation-enter-active,
.lin-collapse-item-animation-leave-active {
  transition: all 500ms;
}

.lin-collapse-item-animation-enter,
.lin-collapse-item-animation-leave-to {
  //   height: 0;
  opacity: 0;
}
</style>