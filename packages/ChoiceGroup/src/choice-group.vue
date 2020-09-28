<template>
  <div class="lin-choice-group">
    <div class="lin-choice-group-input-container">
      <input
        readonly
        :placeholder="placeholder"
        class="lin-choice-group-input"
        type="text"
        :value="groupLabel"
      />
      <i class="lin-icon-down lin-choice-group-icon"></i>
    </div>
    <div class="lin-choice-container">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "LinChoiceGroup",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: [Object, String, Number],
    },
    valueKey: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      groupLabel: "",
    };
  },
  provide() {
    return {
      group: this,
    };
  },
};
</script>

