<template>
  <div
    @click="onItemClick"
    :class="[
      { 'lin-choice-item-active': itemValue === groupValue },
      'lin-choice-item',
    ]"
  >
    <slot>
      {{ label }}
    </slot>
  </div>
</template>


<script>
export default {
  name: "LinChoiceItem",
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: [Object, String, Number],
    },
  },
  inject: {
    group: {
      default: "",
    },
  },
  computed: {
    itemValue() {
      const valueKey = this.group?.valueKey;
      if (valueKey && this.value) {
        return this.value[valueKey];
      }
      return this.value;
    },
    groupValue() {
      const valueKey = this.group?.valueKey;
      const value = this.group?.value;
      if (valueKey && value) {
        return value[valueKey];
      }
      return value;
    },
  },
  methods: {
    onItemClick() {
      if (this.group) {
        // this.group.groupLabel = this.label;
        this.group.$emit("input", this.value);
      }
    },
  },
  watch: {
    groupValue: {
      immediate: true,
      handler() {
        if (this.itemValue === this.groupValue && this.group) {
          this.group.groupLabel = this.label;
        }
      },
    },
  },
};
</script>

