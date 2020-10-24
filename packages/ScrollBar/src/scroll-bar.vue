<template>
  <div
    :style="{ ...style, width: width }"
    class="lin-scroll-bar"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      @scroll="onWrapperScroll"
      class="lin-scroll-bar-wrapper"
      ref="wrapper"
      :style="style"
    >
      <div class="lin-scroll-bar-content" ref="content">
        <slot></slot>
        <div class="lin-scroll-bar-spinner" v-if="loading">
          <slot name="loading">
            <lin-spinner :text="loadingText" :size="loadingSize" />
          </slot>
        </div>
      </div>
    </div>
    <div
      class="lin-srcoll-bar-barwrapper"
      v-if="showBar"
      @click="onBarWrapperClick"
    >
      <div
        v-show="hoverBar || hover"
        @mousedown="onMouseDown"
        ref="bar"
        class="lin-srcoll-bar-bar"
        :style="{ height: `${barHeight}px`, top: `${barTop}px` }"
      ></div>
    </div>
  </div>
</template>

<script>
import ResizeObserver from "resize-observer-polyfill";
import Spinner from "packages/Spinner/index.js";
export default {
  name: "LinScrollBar",
  components: {
    [Spinner.name]: Spinner,
  },
  props: {
    hover: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: "100%",
    },
    width: {
      type: String,
      default: "100%",
    },
    maxHeight: {
      type: String,
    },
    minHeight: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: String,
    loadingSize: String,
  },
  data() {
    return {
      barHeight: 0,
      barTop: 0,
      showBar: false,
      hoverBar: false,
    };
  },
  mounted() {
    this.wrapperHeight = 0;
    this.contentHeight = 0;
    this.barWrapperHeight = 0;
    this.startY = 0;
    this.observer = null;
    this.isMove = false;
    this.isLeave = false;
    this.init();
    this.initObserver();
  },
  methods: {
    initObserver() {
      this.observer = new ResizeObserver((entries, observer) => {
        this.init();
      });

      this.observer.observe(this.$refs.content);
    },
    init() {
      this.initDom();
      this.initBar();
    },
    initDom() {
      this.wrapperHeight = this.$refs.wrapper.clientHeight;
      this.contentHeight = this.$refs.content.clientHeight;
    },
    initBar() {
      const wrapperHeight = this.wrapperHeight;
      const contentHeight = this.contentHeight;
      //求 滚动条的高度
      if (wrapperHeight / contentHeight < 1) {
        this.barHeight = (wrapperHeight / contentHeight) * wrapperHeight;
        this.showBar = true;
      } else {
        this.showBar = false;
      }
      if (this.showBar) {
        const scrollTop = this.$refs.wrapper.scrollTop;
        const percent = scrollTop / contentHeight;
        const barTop = percent * wrapperHeight;
        this.barTop = barTop;
      }
    },
    onWrapperScroll(event) {
      const contentHeight = this.contentHeight;
      const wrapperHeight = this.wrapperHeight;
      const scrollTop = event.target.scrollTop;
      const percent = scrollTop / (contentHeight - wrapperHeight);
      const barTop = percent * (wrapperHeight - this.barHeight);
      this.barTop = barTop;
      this.$emit("scroll", event);
      if (scrollTop + wrapperHeight >= contentHeight) {
        this.$emit("scrollToBottom", event);
      }
    },
    onMouseDown(event) {
      this.isMove = true;
      document.getElementsByTagName("body")[0].classList.add("user-no-select");
      this.startY = event.clientY;
      document.addEventListener("mousemove", this.onMousemove);
      document.addEventListener("mouseup", this.onMouseup);
    },
    onMousemove(event) {
      // 纵轴坐标
      const topY = event.clientY - this.startY;
      const barTop = this.$refs.bar.offsetTop + topY;
      this.updatePosition(barTop);
      this.startY = event.clientY;
    },
    onMouseup() {
      this.isMove = false;
      if (this.isLeave) {
        this.hoverBar = false;
      }
      document
        .getElementsByTagName("body")[0]
        .classList.remove("user-no-select");
      document.removeEventListener("mousemove", this.onMousemove);
      document.removeEventListener("mouseup", this.onMouseup);
    },
    updatePosition(barTop) {
      const wrapperHeight = this.wrapperHeight;
      const contentHeight = this.contentHeight;
      const barHeight = this.$refs.bar.clientHeight;
      if (barTop >= wrapperHeight - barHeight) {
        barTop = wrapperHeight - barHeight;
      }
      if (barTop <= 0) {
        barTop = 0;
      }
      this.barTop = barTop;
      const percent = barTop / wrapperHeight;
      const contentTop = percent * contentHeight;
      this.$refs.wrapper.scrollTop = contentTop;
    },
    onMouseEnter() {
      this.hoverBar = true;
      this.isLeave = false;
    },
    onMouseLeave() {
      this.isLeave = true;
      if (!this.isMove) {
        this.hoverBar = false;
      }
    },
    onBarWrapperClick(event) {
      const clientY = event.clientY;
      const marginTop = this.$refs.wrapper.getBoundingClientRect().top;
      // console.log(clientY,marginTop);
      this.updatePosition(clientY - marginTop - this.barHeight / 2);
    },
  },
  computed: {
    style() {
      const style = {};
      if (this.height) {
        style.height = this.height;
      }
      if (this.maxHeight) {
        style["max-height"] = this.maxHeight;
      }
      if (this.minHeight) {
        style["min-height"] = this.minHeight;
      }
      return style;
    },
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    document.removeEventListener("mousemove", this.onMousemove);
    document.removeEventListener("mouseup", this.onMouseup);
  },
};
</script>