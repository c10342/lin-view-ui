<template>
  <div
    class="lin-selecotr-item"
    :class="{'lin-selecotr-active':active,'lin-selecotr-disabled':isDisabled}"
    @click="onClick"
  >
    <slot>{{label}}</slot>
  </div>
</template>

<script>
export default {
  name: 'LinSelectorItem',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  inject: {
    group: {
      default: '',
    },
  },
  computed: {
    active() {
      if (this.group) {
        const { valueKey } = this.group;
        const { toString } = Object.prototype;
        if (toString.call(this.value) === '[object Object]' && valueKey) {
          return this.value[valueKey] === this.group.value[valueKey];
        }
        return this.value === this.group.value;
      }
      return false;
    },
    isDisabled() {
      if (this.group && this.group.disabled) {
        return true;
      }
      return this.disabled;
    },
  },
  methods: {
    onClick() {
      if (this.group && !this.isDisabled) {
        const value = JSON.parse(JSON.stringify(this.value));
        this.group.$emit('input', value);
        this.group.$emit('onChange', value);
      }
    },
  },
};
</script>
