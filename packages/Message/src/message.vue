<template>
  <transition name="message" @after-leave="afterLeave">
    <div
      :class="[
        'lin-message',
        `lin-message-${type}`,
        { 'lin-message-center': center },
        customClass ? customClass : '',
      ]"
      v-show="show"
      :style="{ top: `${offsetTop}px` }"
    >
      <i
        :class="[
          'lin-message-icon',
          iconClass ? iconClass : `lin-icon-${type}`,
        ]"
      ></i>
      <p class="lin-message-content" v-if="!dangerouslyUseHTMLString">
        {{ message }}
      </p>
      <p
        class="lin-message-content"
        v-if="dangerouslyUseHTMLString"
        v-html="message"
      ></p>
      <i
        class="lin-icon-close lin-message-close-icon"
        v-if="showClose"
        @click="onCloseClick"
      ></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LinMessage',
  props: {
    type: {
      type: String,
      default: 'info',
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
    },
    iconClass: {
      type: String,
    },
    dangerouslyUseHTMLString: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
    },
    // duration: {
    //   type: Number,
    //   default: 3000,
    // },
    center: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
    },
    offset: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      show: false,
      top: 0,
    };
  },
  methods: {
    onCloseClick() {
      if (this.show) {
        this.show = false;
        this.$emit('close');
      }
    },
    afterLeave() {
      this.$emit('closed');
      if (this.onClose) {
        this.onClose();
      }
    },
  },
  computed: {
    offsetTop() {
      return this.top + this.offset;
    },
  },
};
</script>
