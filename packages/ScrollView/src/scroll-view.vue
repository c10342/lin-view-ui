<template>
  <div
    class="lin-scroll-view"
    :style="{ height: `${height}px` }"
    @scroll="onScroll"
  >
    <div ref="lScrollViewContent">
      <div class="lin-scroll-view-content">
        <slot />
      </div>
      <slot name="loading" v-if="isShowLoading">
        <div class="lin-scroll-view-loading">
          <span class="lin-scroll-view-icon"></span>
          <span class="lin-scroll-view-tip">{{ loadingTip }}</span>
        </div>
      </slot>
      <slot name="no-more" v-if="isShowNoMoreTip">
        <p class="lin-scroll-view-nomore-tip">{{ noMoreTip }}</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinScrollView',
  props: {
    // 容器高度
    height: {
      type: Number,
      default: 700,
    },
    // 是否需要节流
    isThrottle: {
      type: Boolean,
      default: true,
    },
    // 滚动执行间隔时长，isThrottle 为 true 才有效
    time: {
      type: Number,
      default: 500,
    },
    // 数据是否全部加载完毕，即是否不在触发 scrollToEnd 事件
    isEnd: {
      type: Boolean,
      default: false,
    },
    // 是否显示正在加载动画
    showLoading: {
      type: Boolean,
      default: true,
    },
    // 是否需要派发 scroll 滚动事件
    emitScrollEvent: {
      type: Boolean,
      default: true,
    },
    // 显示的视图数据，用于刷新内容的高度
    data: [Object, Array],
    // 正在加载的提示语
    loadingTip: {
      type: String,
      default: '',
    },
    // 数据加载完毕时候的提示语
    noMoreTip: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // 内容高度
      contentHeight: 0,
    };
  },
  mounted() {
    this.timer = null;
    this.$nextTick(() => {
      // 初始化内容高度
      if (this.$refs.lScrollViewContent) {
        this.contentHeight = this.$refs.lScrollViewContent.clientHeight;
      }
    });
  },
  methods: {
    // 监听滚动事件
    onScroll(e) {
      // 节流
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
    // 处理滚动事件
    handelScroll(e) {
      if (!this.isEnd) {
        // 数据还没全部加载完毕
        const { scrollTop } = e.target;
        if (scrollTop + this.height >= this.contentHeight) {
          // 滚动到底部
          this.$emit('scrollToEnd', e);
        }
      }
      if (this.emitScrollEvent) {
        // 派发滚动事件
        this.$emit('scroll', e);
      }
    },
  },
  computed: {
    // 是否显示loading
    isShowLoading() {
      if (this.contentHeight <= this.height) {
        return false;
      }
      if (this.showLoading && !this.isEnd) {
        return true;
      }
      return false;
    },
    // 是否显示加载完毕提示语
    isShowNoMoreTip() {
      if (this.contentHeight <= this.height) {
        return false;
      }
      if (this.isEnd && (this.noMoreTip || this.$slots['no-more'])) {
        return true;
      }
      return false;
    },
  },
  watch: {
    // 监听数据的变化，重新初始化内容的高度
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
