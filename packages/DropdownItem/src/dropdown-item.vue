<template>
  <div
    @click="onItemClick"
    :class="[{'lin-dropdown-item-divided':divided},{'lin-dropdown-item-disabled':disabled},'lin-dropdown-item']"
  >
    <span class="lin-icon-loading lin-dropdown-item-icon" v-if="icon"></span>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinDropdownItem",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    divided: {
      type: Boolean,
      default: false,
    },
    command: null,
    icon:{
        type:String,
        default:''
    }
  },
  computed: {
    hideOnClick() {
      return this.dropdown ? this.dropdown.hideOnClick : true;
    },
  },
  inject: {
    dropdown: {
      default: null,
    },
  },
  methods: {
    onItemClick() {
      if (this.dropdown) {
        if (this.hideOnClick) {
          this.dropdown.hideList();
        }
        this.dropdown.$emit("command", this.command);
      }
    },
  },
};
</script>

<style lang="scss">
.lin-dropdown-item {
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;

  font-size: 14px;
  padding: 0 20px;
  position: relative;
  user-select: none;
  display:flex;
  flex-direction: row;
  align-items: center;

  &:not(.lin-dropdown-item-disabled):hover {
    color: #409eff;
    background-color: rgba(#409eff, 0.2);
  }
}

.lin-dropdown-item-icon{
    margin-right: 5px;
}

.lin-dropdown-item-disabled {
  color: #dcdfe6;
  cursor: not-allowed;
  pointer-events: none;
}

.lin-dropdown-item-divided {
  margin-top: 6px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: 0;
    width: 100%;
    border-top: 1px solid #dcdfe6;
    z-index: 100;
  }
}
</style>