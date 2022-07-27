<template>
  <div
    :style="{ ...style, width: width }"
    class="lin-scroll-view"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      ref="wrapperRef"
      class="lin-scroll-view-wrapper"
      :style="style"
      @scroll="onWrapperScroll"
    >
      <div
        ref="contentRef"
        class="lin-scroll-view-content"
      >
        <slot />
        <div
          v-if="loading"
          class="lin-scroll-view-spinner"
        >
          <slot name="loading">
            <Icon name="loading" />
          </slot>
        </div>
      </div>
    </div>
    <div
      v-if="showBar"
      class="lin-scroll-view-barwrapper"
      @click="onBarWrapperClick"
    >
      <div
        v-show="hoverBar || hover"
        ref="barRef"
        class="lin-scroll-view-bar"
        :style="{ height: `${barHeight}px`, top: `${barTop}px` }"
        @mousedown="onMouseDown"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ResizeObserver from "resize-observer-polyfill";
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref
} from "vue";
import Icon from "@packages/icon";

export default defineComponent({
  name: "LinScrollView",
  components: { Icon },
  props: {
    // 是否一直显示自定义滚动条
    hover: {
      type: Boolean,
      default: false
    },
    // 高度
    height: {
      type: String,
      default: "100%"
    },
    // 宽度
    width: {
      type: String,
      default: "100%"
    },
    // 最大高度
    maxHeight: {
      type: String,
      default: null
    },
    // 最小高度
    minHeight: {
      type: String,
      default: null
    },
    // 是否正在加载，显示加载动画
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["scroll", "scrollToBottom"],
  setup(props, context) {
    // 自定义滚动条高度
    const barHeight = ref(0);
    // 自定义滚动条距离顶部距离
    const barTop = ref(0);
    // 是否显示滚动条
    const showBar = ref(false);
    // 鼠标悬浮在容器中时候显示自定义滚动条
    const hoverBar = ref(false);

    const contentRef = ref<HTMLElement | null>(null);
    const wrapperRef = ref<HTMLElement | null>(null);
    const barRef = ref<HTMLElement | null>(null);

    // 内容容器高度
    let wrapperHeight = 0;
    // 内容高度
    let contentHeight = 0;
    // 自定义滚动条一开始所在位置
    let startY = 0;
    // 观察DOM元素变化实例对象
    let observer: ResizeObserver | null = null;
    // 标志位，鼠标是否可以进行移动了（能否拖拽）
    let isMove = false;
    // 鼠标是否离开容器
    let isLeave = false;
    const initObserver = () => {
      if (!contentRef.value) {
        return;
      }
      // DOM元素大小（宽高）发生变化的时候
      observer = new ResizeObserver(() => {
        init();
      });

      observer.observe(contentRef.value);
    };
    const init = () => {
      initDom();
      initBar();
    };
    // 获取相关DOM元素高度
    const initDom = () => {
      if (!wrapperRef.value || !contentRef.value) {
        return;
      }
      wrapperHeight = wrapperRef.value.clientHeight;
      contentHeight = contentRef.value.clientHeight;
    };
    // 初始化自定义滚动条
    const initBar = () => {
      // 求 滚动条的高度
      if (wrapperHeight / contentHeight < 1) {
        // 内容高度大于容器高度
        // 滚动条高度/容器高度 = 容器高度/内容高度
        barHeight.value = (wrapperHeight / contentHeight) * wrapperHeight;
        // 此时需要显示自定义滚动条
        showBar.value = true;
      } else {
        showBar.value = false;
      }
      if (showBar.value) {
        // 如果需要显示自定义滚动条，要初始化滚动条的位置
        const { scrollTop } = wrapperRef.value as HTMLElement;
        // 算出自定义滚动条，相对于容器的y轴位置
        const percent = scrollTop / contentHeight;
        barTop.value = percent * wrapperHeight;
        console.log(scrollTop);
      }
    };
    // 监听容器的滚动事件
    const onWrapperScroll = (event: Event) => {
      const { scrollTop } = event.target as HTMLElement;
      // 算出自定义滚动条，相对于容器的y轴位置
      const percent = scrollTop / (contentHeight - wrapperHeight);
      barTop.value = percent * (wrapperHeight - barHeight.value);

      context.emit("scroll", event);
      if (scrollTop + wrapperHeight >= contentHeight) {
        // 滚动到底部
        context.emit("scrollToBottom", event);
      }
    };
    // 鼠标按下事件
    const onMouseDown = (event: MouseEvent) => {
      // 标志位
      isMove = true;
      // 给body添加样式，不能让鼠标在移动的时候选中文字，否则会造成鼠标抬起事件丢失
      document.getElementsByTagName("body")[0].classList.add("user-no-select");
      // 记录鼠标点击的初始位置
      startY = event.clientY;
      // 监听鼠标移动事件和抬起事件
      document.addEventListener("mousemove", onMousemove);
      document.addEventListener("mouseup", onMouseup);
    };
    // 鼠标移动事件
    const onMousemove = (event: MouseEvent) => {
      if (!barRef.value) {
        return;
      }
      // 纵轴坐标
      const topY = event.clientY - startY;
      // 计算自定义滚动条应该距离顶部多少
      const vBarTop = barRef.value.offsetTop + topY;
      // 更新位置
      updatePosition(vBarTop);
      startY = event.clientY;
    };
    // 鼠标抬起事件
    const onMouseup = () => {
      // 标志位，此时应该不能再进行拖拽了
      isMove = false;
      if (isLeave) {
        hoverBar.value = false;
      }
      // 取消鼠标按下时添加的样式
      document
        .getElementsByTagName("body")[0]
        .classList.remove("user-no-select");
      // 注销事件
      document.removeEventListener("mousemove", onMousemove);
      document.removeEventListener("mouseup", onMouseup);
    };
    const updatePosition = (barTopVal: number) => {
      if (!barRef.value || !wrapperRef.value) {
        return;
      }
      const vBarHeight = barRef.value.clientHeight;
      // 边界情况处理
      if (barTopVal >= wrapperHeight - vBarHeight) {
        barTopVal = wrapperHeight - vBarHeight;
      }
      if (barTopVal <= 0) {
        barTopVal = 0;
      }
      barTop.value = barTopVal;
      // 自定义滚动条位置发生了变化，容器也要相对应进行移动
      const percent = barTop.value / wrapperHeight;
      const contentTop = percent * contentHeight;
      wrapperRef.value.scrollTop = contentTop;
    };

    // 鼠标进入事件
    const onMouseEnter = () => {
      hoverBar.value = true;
      isLeave = false;
    };
    // 鼠标离开事件
    const onMouseLeave = () => {
      isLeave = true;
      if (!isMove) {
        hoverBar.value = false;
      }
    };
    // 点击自定义滚动条
    const onBarWrapperClick = (event: MouseEvent) => {
      if (!wrapperRef.value) {
        return;
      }
      // 获取点击位置
      const { clientY } = event;
      // 获取容器距离页面的距离
      const marginTop = wrapperRef.value.getBoundingClientRect().top;
      // 计算出鼠标点击的位置距离容器顶部的距离，this.barHeight / 2 是为了让滚动条移动后，鼠标位于滚动条中间
      updatePosition(clientY - marginTop - barHeight.value / 2);
    };
    const style = computed(() => {
      const styleObj: {
        height?: string;
        "max-height"?: string;
        "min-height"?: string;
      } = {};
      if (props.height) {
        styleObj.height = props.height;
      }
      if (props.maxHeight) {
        styleObj["max-height"] = props.maxHeight;
      }
      if (props.minHeight) {
        styleObj["min-height"] = props.minHeight;
      }
      return styleObj;
    });
    onMounted(() => {
      // 初始化
      init();
      // 初始化DOM观察
      initObserver();
    });

    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      document.removeEventListener("mousemove", onMousemove);
      document.removeEventListener("mouseup", onMouseup);
    });

    return {
      barHeight,
      barTop,
      showBar,
      hoverBar,
      wrapperRef,
      contentRef,
      style,
      barRef,
      onMouseEnter,
      onMouseLeave,
      onWrapperScroll,
      onBarWrapperClick,
      onMouseDown
    };
  }
});
</script>

<style></style>
