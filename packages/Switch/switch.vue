<template>
  <div
    class="l-switch"
    :class="{'l-switch-is-checked': value,'l-switch-is-disabled':disabled}"
    @click="handleClick"
  >
    <input v-if="name" :value="value" class="l-switch-input" type="checkbox" :name="name" />
    <span :style="{'border-color':color,'background-color':color}" class="l-switch-core">
      <span class="l-switch-button"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: "l-switch",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ""
    },
    inactiveColor: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit("input", !this.value);
      }
    }
  },
  computed: {
    color() {
      if (this.value) {
        if (this.activeColor) {
          return this.activeColor;
        }
        return "";
      } else {
        if (this.inactiveColor) {
          return this.inactiveColor;
        }
        return "";
      }
    }
  }
};
</script>

<style lang="scss">
@import "packages/assets/styles/variables/switch.scss";
.l-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: $switch-font-size;
  line-height: $switch-line-height;
  height: $switch-height;
  vertical-align: middle;
}
.l-switch-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
}
.l-switch-core {
  margin: $switch-core-margin;
  display: inline-block;
  position: relative;
  width: $switch-core-width;
  height: $switch-core-height;
  border: $switch-core-border;
  outline: none;
  border-radius: $switch-core-border-radius;
  box-sizing: border-box;
  background: $switch-core-background;
  cursor: pointer;
  transition: $switch-core-transition;
  vertical-align: middle;
  .l-switch-button {
    position: absolute;
    top: $switch-button-top;
    left: $switch-button-left;
    border-radius: $switch-button-border-radius;
    transition: $switch-button-transition;
    width: $switch-button-width;
    height: $switch-button-height;
    background-color: $switch-button-background-color;
  }
}
.l-switch.l-switch-is-checked {
  .l-switch-core {
    border-color: $switch-checked-border-color;
    background-color: $switch-checked-background-color;
    .l-switch-button {
      transform: $switch-checked-transform;
    }
  }
}

.l-switch-is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
  .l-switch-core {
    cursor: not-allowed;
  }
}
</style>
