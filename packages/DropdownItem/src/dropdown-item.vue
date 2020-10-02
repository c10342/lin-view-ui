<template>
  <div
    @click="onItemClick"
    :class="[{'lin-dropdown-item-divided':divided},{'lin-dropdown-item-disabled':disabled},'lin-dropdown-item']"
  >
    <span :class="[icon,'lin-dropdown-item-icon']" v-if="icon"></span>
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

