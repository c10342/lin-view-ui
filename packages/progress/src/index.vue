<template>
  <div class="lin-progress">
    <div class="lin-progress-out" :style="outStyle">
      <div
        :class="['lin-progress-inner', { [`is-${type}`]: type }]"
        :style="innerStyle"
      >
        <div v-if="isShowInsideText" class="lin-progress-inside-text">
          <slot name="text">
            <span class="lin-progress-inside-tip">{{ textInside }}</span>
          </slot>
        </div>
      </div>
    </div>
    <div v-if="isShowOutsideText" class="lin-progress-outside-text">
      <slot>
        <span class="lin-progress-outside-tip">{{ textOutside }}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "LinProgress",
  props: {
    // 百分比（必填）
    percent: {
      type: Number,
      default: 0
    },
    // 进度条底层颜色
    innerColor: {
      type: String,
      default: ""
    },
    // 进度条上层颜色
    outColor: {
      type: String,
      default: ""
    },
    // 进度条的高度，单位 px
    height: {
      type: Number,
      default: 10
    },
    // 是否需要圆角
    radius: {
      type: Boolean,
      default: true
    },
    // 进度条外面的提示文字
    textOutside: {
      type: String,
      default: ""
    },
    // 进度条类型
    type: {
      type: String as PropType<"primary" | "success" | "warning" | "danger">,
      default: "primary"
    },
    // 进度条里面的提示文字
    textInside: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    const width = computed(() => {
      if (props.percent < 0) {
        return "0%";
      }
      if (props.percent > 1) {
        return "100%";
      }
      return `${props.percent * 100}%`;
    });
    // 内层进度条样式
    const innerStyle = computed(() => {
      const style: {
        width: string;
        backgroundColor?: string;
        borderRadius?: string;
      } = {
        width: width.value
      };
      if (props.innerColor) {
        style.backgroundColor = props.innerColor;
      }

      if (props.radius) {
        style.borderRadius = `${props.height / 2}px`;
      }

      return style;
    });

    // 外层进度条样式
    const outStyle = computed(() => {
      const style: {
        backgroundColor?: string;
        height?: string;
        borderRadius?: string;
      } = {};
      if (props.outColor) {
        style.backgroundColor = props.outColor;
      }
      if (props.height) {
        style.height = `${props.height}px`;
      }
      if (props.radius) {
        style.borderRadius = `${props.height / 2}px`;
      }

      return style;
    });

    // 是否显示外层文本
    const isShowOutsideText = computed(() => {
      if (props.textOutside || context.slots.default) {
        return true;
      }
      return false;
    });
    // 是否显示内层文本
    const isShowInsideText = computed(() => {
      if (props.textInside || context.slots.text) {
        return true;
      }

      return false;
    });

    return {
      outStyle,
      innerStyle,
      isShowInsideText,
      isShowOutsideText
    };
  }
});
</script>
