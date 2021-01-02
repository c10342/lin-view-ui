<template>
  <transition name="lin-backtop-fade">
    <div
      @click="onClick"
      v-if="visible"
      class="lin-backtop"
      :style="{ right: `${right}px`, bottom: `${bottom}px` }"
    >
      <slot>
        <div class="lin-backtop-container">
          <span class="lin-backtop-triangle"></span>
        </div>
      </slot>
    </div>
  </transition>
</template>

<script>
import { throttle } from 'lodash';

const cubic = (value) => value ** 3;
const easeInOutCubic = (value) => {
  const percent = (value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2);
  return percent;
};

export default {
  name: 'LinBacktop',
  props: {
    right: {
      type: Number,
      default: 40,
    },
    bottom: {
      type: Number,
      default: 40,
    },
    target: {
      type: String,
      default: null,
    },
    visibilityHeight: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    this.el = null;
    this.container = null;
    this.init();
    this.throttledScrollHandler = throttle(this.onScroll, 300);
    this.container.addEventListener('scroll', this.throttledScrollHandler);
  },
  methods: {
    init() {
      this.container = document;
      this.el = document.documentElement || document.body;
      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`);
        }
        this.container = this.el;
      }
    },
    onScroll() {
      const { scrollTop } = this.el;
      this.visible = scrollTop >= this.visibilityHeight;
    },
    onClick(e) {
      this.scrollToTop();
      this.$emit('click', e);
    },
    scrollToTop() {
      const { el } = this;
      const beginTime = Date.now();
      const beginValue = el.scrollTop;
      const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          this.$emit('scroll', el.scrollTop);
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
          this.$emit('end');
        }
      };
      rAF(frameFunc);
    },
  },
  beforeDestroy() {
    this.container.removeEventListener('scroll', this.throttledScrollHandler);
    this.el = null;
    this.container = null;
  },
};
</script>
