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
    // 类型主题
    type: {
      type: String,
      default: 'info',
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: false,
    },
    // 消息文字
    message: {
      type: String,
    },
    // 自定义图标的类名，会覆盖 type
    iconClass: {
      type: String,
    },
    // 是否将 message 属性作为 HTML 片段处理
    dangerouslyUseHTMLString: {
      type: Boolean,
      default: false,
    },
    // 自定义类名
    customClass: {
      type: String,
    },
    // duration: {
    //   type: Number,
    //   default: 3000,
    // },
    // 文字是否居中
    center: {
      type: Boolean,
      default: false,
    },
    // 关闭时的回调函数
    onClose: {
      type: Function,
    },
    // Message 距离窗口顶部的偏移量
    offset: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      // 控制是否显示
      show: false,
      // 距离窗口顶部偏移量
      top: 0,
    };
  },
  methods: {
    // 点击关闭按钮
    onCloseClick() {
      if (this.show) {
        this.show = false;
        this.$emit('close');
      }
    },
    // vue动画结束后回调函数
    afterLeave() {
      this.$emit('closed');
      if (this.onClose) {
        this.onClose();
      }
    },
  },
  computed: {
    // 距离顶部距离
    offsetTop() {
      return this.top + this.offset;
    },
  },
};
</script>
