<template>
  <div
    class="lin-switch"
    :class="{'lin-switch-is-checked': value,'lin-switch-is-disabled':disabled}"
    @click="handleClick"
  >
    <input v-if="name" :value="value" class="lin-switch-input" type="checkbox" :name="name" />
    <span :style="{'border-color':color,'background-color':color}" class="lin-switch-core">
      <span class="lin-switch-button"></span>
    </span>
  </div>
</template>

<script>
import dispatch from 'src/utils/dispatch.js';

export default {
  name: 'LinSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$emit('input', !this.value);
        dispatch.call(this, {
          eventName: 'validate',
          componentName: 'LinFormItem'
        });
      }
    }
  },
  computed: {
    color () {
      if (this.value) {
        if (this.activeColor) {
          return this.activeColor;
        }
        return '';
      }
      if (this.inactiveColor) {
        return this.inactiveColor;
      }
      return '';
    }
  }
};
</script>
