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

