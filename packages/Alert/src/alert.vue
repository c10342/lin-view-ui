<template>
  <transition name="lin-alert-fade" @after-leave="afterLeave">
    <div
      :class="[
        'lin-alert',
        `lin-alert-${type}`,
        `lin-alert-${effect}`,
        { 'lin-alert-center': center },
      ]"
      v-if="show"
    >
      <slot name="icon">
        <i :class="['lin-alert-icon', icon]" v-if="icon"></i>
      </slot>
      <div class="lin-alert-content">
        <slot name="title">
          <span class="lin-alert-title">{{ title }}</span>
        </slot>
        <slot name="description">
          <span class="lin-alert-description" v-if="description">{{
            description
          }}</span>
        </slot>
      </div>
      <span class="lin-alert-close" v-if="closable" @click="onCloseClick">
        <slot name="close">
          <i class="lin-icon-close"></i>
        </slot>
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LinAlert',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    closable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'success',
    },
    effect: {
      type: String,
      default: 'light',
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    onCloseClick() {
      this.show = false;
    },
    afterLeave() {
      this.$emit('close');
    },
  },
};
</script>
