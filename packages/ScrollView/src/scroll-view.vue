<template>
  <div class="lin-scroll-view" :style="{'height':`${height}px`}" @scroll="onScroll">
    <div ref="lScrollViewContent">
      <div class="lin-scroll-view-content">
        <slot />
      </div>
      <slot name="loading" v-if="isShowLoading">
        <div class="lin-scroll-view-loading">
          <span class="lin-scroll-view-icon"></span>
          <span class="lin-scroll-view-tip">{{loadingTip}}</span>
        </div>
      </slot>
      <slot name="no-more" v-if="isShowNoMoreTip">
        <p class="lin-scroll-view-nomore-tip">{{noMoreTip}}</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinScrollView',
  props: {
    height: {
      type: Number,
      default: 700,
    },
    isThrottle: {
      type: Boolean,
      default: true,
    },
    time: {
      type: Number,
      default: 500,
    },
    isEnd: {
      type: Boolean,
      default: false,
    },
    showLoading: {
      type: Boolean,
      default: true,
    },
    emitScrollEvent: {
      type: Boolean,
      default: true,
    },
    data: [Object, Array],
    loadingTip: {
      type: String,
      default: '',
    },
    noMoreTip: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      contentHeight: 0,
    };
  },
  mounted() {
    this.timer = null;
    this.$nextTick(() => {
      if (this.$refs.lScrollViewContent) {
        this.contentHeight = this.$refs.lScrollViewContent.clientHeight;
      }
    });
  },
  methods: {
    onScroll(e) {
      if (this.isThrottle) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.handelScroll(e);
        }, this.time);
      } else {
        this.handelScroll(e);
      }
    },
    handelScroll(e) {
      if (!this.isEnd) {
        const { scrollTop } = e.target;
        if (scrollTop + this.height >= this.contentHeight) {
          this.$emit('scrollToEnd', e);
        }
      }
      if (this.emitScrollEvent) {
        this.$emit('scroll', e);
      }
    },
  },
  computed: {
    isShowLoading() {
      if (this.contentHeight <= this.height) {
        return false;
      }
      if (this.showLoading && !this.isEnd) {
        return true;
      }
      return false;
    },
    isShowNoMoreTip() {
      if (this.contentHeight <= this.height) {
        return false;
      }
      if (this.isEnd && (this.noMoreTip || this.$slots['no-more'])) {
        return true;
      }
      // if (this.isEnd && this.$slots["no-more"]) {
      //   return true;
      // }
      return false;
    },
  },
  watch: {
    data() {
      if (this.$refs.lScrollViewContent) {
        this.contentHeight = this.$refs.lScrollViewContent.clientHeight;
      } else {
        this.contentHeight = 0;
      }
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },
};
</script>
