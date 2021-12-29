<template>
  <transition name="lin-fade-in">
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

<script lang='ts'>
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from "@vue/runtime-core";
import { throttle } from "lodash";

const cubic = (value: number) => value ** 3;
const easeInOutCubic = (value: number) => {
  const percent =
    value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
  return percent;
};

export default defineComponent({
  name: "LinBacktop",
  emits:['click','scroll','end'],
  props: {
    // 显示位置，距离页面右边距离
    right: {
      type: Number,
      default: 40,
    },
    // 显示位置，距离页面底部距离
    bottom: {
      type: Number,
      default: 40,
    },
    // 滚动触发的对象
    target: {
      type: String,
      default: null,
    },
    // 滚动高度达到次参数才显示组件
    visibilityHeight: {
      type: Number,
      default: 200,
    },
  },
  setup(props, context) {
    const visible = ref(false);

    let el: HTMLElement | null = null;
    let container: HTMLElement | null | Document = null;

    // 初始化el和container变量
    function init() {
      container = document;
      el = document.documentElement || document.body;
      if (props.target) {
        el = document.querySelector(props.target);
        if (!el) {
          throw new Error(`target is not existed: ${props.target}`);
        }
        container = el;
      }
    }

    // 滚动事件
    function onScroll() {
      if (el) {
        const { scrollTop } = el;
        visible.value = scrollTop >= props.visibilityHeight;
      }
    }
    // 滚动事件节流
    const throttledScrollHandler = throttle(onScroll, 300);

    // 点击事件
    function onClick(e: Event) {
      scrollToTop();
      context.emit("click", e);
    }

    // 回到顶部
    function scrollToTop() {
      if (!el) {
        return;
      }
      const beginTime = Date.now();
      const beginValue = el.scrollTop;
      const rAF =
        window.requestAnimationFrame || ((func) => setTimeout(func, 16));
      const frameFunc = () => {
        if (!el) {
          return;
        }
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          context.emit("scroll", el.scrollTop);
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
          context.emit("end");
        }
      };
      rAF(frameFunc);
    }

    onMounted(() => {
      init();
      
      container?.addEventListener("scroll", throttledScrollHandler);
    });

    onBeforeUnmount(() => {
      container?.removeEventListener("scroll", throttledScrollHandler);
      el = null;
      container = null;
    });

    return {
      visible,
      onClick,
    };
  },
});
</script>
