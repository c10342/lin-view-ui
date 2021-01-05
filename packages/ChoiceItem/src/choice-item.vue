<template>
  <div
    @click="onItemClick"
    :class="[
      { 'lin-choice-item-active': itemValue === groupValue },
      { 'lin-choice-item-disabled': itemDisabled },
      'lin-choice-item',
    ]"
  >
    <slot>
      {{ itemLabel }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'LinChoiceItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [Object, String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    group: {
      default: ''
    },
    option: {
      default: ''
    }
  },
  computed: {
    itemDisabled () {
      if (this.option && this.option.disabled) {
        return true;
      }
      return this.disabled;
    },
    itemValue () {
      const valueKey = this.group?.valueKey;
      if (valueKey && this.value) {
        return this.value[valueKey];
      }
      return this.value;
    },
    groupValue () {
      const valueKey = this.group?.valueKey;
      const value = this.group?.value;
      if (valueKey && value) {
        return value[valueKey];
      }
      return value;
    },
    itemLabel () {
      return this.label ? this.label : this.value;
    }
  },
  methods: {
    onItemClick () {
      if (this.group && !this.itemDisabled) {
        this.group.emitInputEvent(this.value);
      }
    }
  },
  watch: {
    groupValue: {
      immediate: true,
      handler (newVal) {
        if (this.itemValue === newVal && this.group) {
          this.group.groupLabel = this.itemLabel;
        }
      }
    }
  }
};
</script>
