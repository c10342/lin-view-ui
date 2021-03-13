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
import ResizeObserver from 'resize-observer-polyfill';
import Spinner from 'packages/Spinner/index.js';

export default {
  name: 'LinScrollBar',
  components: {
    [Spinner.name]: Spinner
  },
  props: {
    // 是否一直显示自定义滚动条
    hover: {
      type: Boolean,
      default: false
    },
    // 高度
    height: {
      type: String,
      default: '100%'
    },
    // 宽度
    width: {
      type: String,
      default: '100%'
    },
    // 最大高度
    maxHeight: {
      type: String
    },
    // 最小高度
    minHeight: {
      type: String
    },
    // 是否正在加载，显示加载动画
    loading: {
      type: Boolean,
      default: false
    },
    // 加载文案
    loadingText: String,
    // 加载器大小
    loadingSize: String
  },
  data () {
    return {
      // 自定义滚动条高度
      barHeight: 0,
      // 自定义滚动条距离顶部距离
      barTop: 0,
      // 是否显示滚动条
      showBar: false,
      // 鼠标悬浮在容器中时候显示自定义滚动条
      hoverBar: false
    };
  },
  mounted () {
    // 内容容器高度
    this.wrapperHeight = 0;
    // 内容高度
    this.contentHeight = 0;

    // this.barWrapperHeight = 0;
    // 自定义滚动条一开始所在位置
    this.startY = 0;
    // 观察DOM元素变化实例对象
    this.observer = null;
    // 标志位，鼠标是否可以进行移动了（能否拖拽）
    this.isMove = false;
    // 鼠标是否离开容器
    this.isLeave = false;
    // 初始化
    this.init();
    // 初始化DOM观察
    this.initObserver();
  },
  methods: {
    initObserver () {
      // DOM元素大小（宽高）发生变化的时候
      this.observer = new ResizeObserver(() => {
        this.init();
      });

      this.observer.observe(this.$refs.content);
    },
    init () {
      this.initDom();
      this.initBar();
    },
    // 获取相关DOM元素高度
    initDom () {
      this.wrapperHeight = this.$refs.wrapper.clientHeight;
      this.contentHeight = this.$refs.content.clientHeight;
    },
    // 初始化自定义滚动条
    initBar () {
      const { wrapperHeight, contentHeight } = this;
      // const { contentHeight } = this;
      // 求 滚动条的高度
      if (wrapperHeight / contentHeight < 1) {
        // 内容高度大于容器高度
        // 滚动条高度/容器高度 = 容器高度/内容高度
        this.barHeight = (wrapperHeight / contentHeight) * wrapperHeight;
        // 此时需要显示自定义滚动条
        this.showBar = true;
      } else {
        this.showBar = false;
      }
      if (this.showBar) {
        // 如果需要显示自定义滚动条，要初始化滚动条的位置
        const { scrollTop } = this.$refs.wrapper;
        // 算出自定义滚动条，相对于容器的y轴位置
        const percent = scrollTop / contentHeight;
        const barTop = percent * wrapperHeight;
        this.barTop = barTop;
      }
    },
    // 监听容器的滚动事件
    onWrapperScroll (event) {
      const { contentHeight, wrapperHeight } = this;
      // const { wrapperHeight } = this;
      const { scrollTop } = event.target;
      // 算出自定义滚动条，相对于容器的y轴位置
      const percent = scrollTop / (contentHeight - wrapperHeight);
      const barTop = percent * (wrapperHeight - this.barHeight);
      this.barTop = barTop;
      this.$emit('scroll', event);
      if (scrollTop + wrapperHeight >= contentHeight) {
        // 滚动到底部
        this.$emit('scrollToBottom', event);
      }
    },
    // 鼠标按下事件
    onMouseDown (event) {
      // 标志位
      this.isMove = true;
      // 给body添加样式，不能让鼠标在移动的时候选中文字，否则会造成鼠标抬起事件丢失
      document.getElementsByTagName('body')[0].classList.add('user-no-select');
      // 记录鼠标点击的初始位置
      this.startY = event.clientY;
      // 监听鼠标移动事件和抬起事件
      document.addEventListener('mousemove', this.onMousemove);
      document.addEventListener('mouseup', this.onMouseup);
    },
    // 鼠标移动事件
    onMousemove (event) {
      // 纵轴坐标
      const topY = event.clientY - this.startY;
      // 计算自定义滚动条应该距离顶部多少
      const barTop = this.$refs.bar.offsetTop + topY;
      // 更新位置
      this.updatePosition(barTop);
      this.startY = event.clientY;
    },
    // 鼠标抬起事件
    onMouseup () {
      // 标志位，此时应该不能再进行拖拽了
      this.isMove = false;
      if (this.isLeave) {
        this.hoverBar = false;
      }
      // 取消鼠标按下时添加的样式
      document
        .getElementsByTagName('body')[0]
        .classList.remove('user-no-select');
      // 注销事件
      document.removeEventListener('mousemove', this.onMousemove);
      document.removeEventListener('mouseup', this.onMouseup);
    },
    updatePosition (barTop) {
      const { wrapperHeight, contentHeight } = this;
      // const { contentHeight } = this;
      const barHeight = this.$refs.bar.clientHeight;
      // 边界情况处理
      if (barTop >= wrapperHeight - barHeight) {
        barTop = wrapperHeight - barHeight;
      }
      if (barTop <= 0) {
        barTop = 0;
      }
      this.barTop = barTop;
      // 自定义滚动条位置发生了变化，容器也要相对应进行移动
      const percent = barTop / wrapperHeight;
      const contentTop = percent * contentHeight;
      this.$refs.wrapper.scrollTop = contentTop;
    },
    // 鼠标进入事件
    onMouseEnter () {
      this.hoverBar = true;
      this.isLeave = false;
    },
    // 鼠标离开事件
    onMouseLeave () {
      this.isLeave = true;
      if (!this.isMove) {
        this.hoverBar = false;
      }
    },
    // 点击自定义滚动条
    onBarWrapperClick (event) {
      // 获取点击位置
      const { clientY } = event;
      // 获取容器距离页面的距离
      const marginTop = this.$refs.wrapper.getBoundingClientRect().top;
      // 计算出鼠标点击的位置距离容器顶部的距离，this.barHeight / 2 是为了让滚动条移动后，鼠标位于滚动条中间
      this.updatePosition(clientY - marginTop - this.barHeight / 2);
    }
  },
  computed: {
    // 根节点样式
    style () {
      const style = {};
      if (this.height) {
        style.height = this.height;
      }
      if (this.maxHeight) {
        style['max-height'] = this.maxHeight;
      }
      if (this.minHeight) {
        style['min-height'] = this.minHeight;
      }
      return style;
    }
  },
  beforeDestroy () {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    document.removeEventListener('mousemove', this.onMousemove);
    document.removeEventListener('mouseup', this.onMouseup);
  }
};
</script>
