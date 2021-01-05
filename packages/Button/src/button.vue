<template>
  <button
    @click="onButtonClick"
    class="lin-button"
    :class="[
      `lin-button-${type}`,
      { 'lin-button-plain': plain },
      { 'lin-button-round': round },
      { 'lin-button-circle': circle },
      { 'lin-button-disabled': disabled },
      { 'lin-button-loading': loading },
      `lin-button-size-${size}`,
    ]"
    :disabled="disabled"
  >
    <lin-spinner
      v-if="loading"
      class="lin-button-spinner"
      :loadingColor="loadingColor"
      :size="loadingSize"
    ></lin-spinner>
    <i v-if="icon" :class="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import Spinner from 'packages/Spinner/index.js';

export default {
  name: 'LinButton',
  components: {
    [Spinner.name]: Spinner
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default'
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingColor: {
      type: String,
      default: '#fff'
    },
    loadingSize: {
      type: String,
      default: '14px'
    }
  },

  methods: {
    onButtonClick () {
      if (!this.loading) {
        this.$emit('click');
      }
    }
  }
};
</script>
