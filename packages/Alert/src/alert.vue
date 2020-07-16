<template>
  <transition name="fade" @after-leave="afterLeave">
    <div
      :class="['l-alert',`l-alert-${type}`,`l-alert-${effect}`,{'l-alert-center':center}]"
      v-if="show"
    >
      <slot name="icon">
        <i :class="['l-alert-icon',icon]" v-if="icon"></i>
      </slot>
      <div class="l-alert-content">
        <slot name="title">
          <span class="l-alert-title">{{title}}</span>
        </slot>
        <slot name="description">
          <span class="l-alert-description" v-if="description">{{description}}</span>
        </slot>
      </div>
      <span class="l-alert-close" v-if="closable" @click="onCloseClick">
        <slot name="close">
          <i class="l-icon-close"></i>
        </slot>
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "l-alert",
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    closable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "success"
    },
    effect: {
      type: String,
      default: "light"
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    onCloseClick() {
      this.show = false;
    },
    afterLeave() {
      this.$emit("close");
    }
  }
};
</script>

