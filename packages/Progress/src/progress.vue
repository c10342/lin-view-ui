<template>
  <div class="lin-progress">
    <div class="lin-progress-out" :style="outStyle">
      <div :class="['lin-progress-inner',{[`lin-progress-${type}`]:type}]" :style="innerStyle">
        <div class="lin-progress-inside-text" v-if="isShowInsideText">
          <slot name="text">
            <span class="lin-progress-inside-tip">{{textInside}}</span>
          </slot>
        </div>
      </div>
    </div>
    <div class="lin-progress-outside-text" v-if="isShowOutsideText">
      <slot>
        <span class="lin-progress-outside-tip">{{textOutside}}</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinProgress',
  props: {
    // 百分比（必填）
    percent: {
      type: Number,
      default: 0
    },
    // 进度条底层颜色
    innerColor: {
      type: String,
      default: ''
    },
    // 进度条上层颜色
    outColor: {
      type: String,
      default: ''
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
      default: ''
    },
    // 进度条类型
    type: {
      type: String,
      default: 'primary'
    },
    // 进度条里面的提示文字
    textInside: {
      type: String,
      default: ''
    }
  },
  computed: {
    width () {
      if (this.percent < 0) {
        return '0%';
      }
      if (this.percent > 1) {
        return '100%';
      }
      return `${this.percent * 100}%`;
    },
    // 内层进度条样式
    innerStyle () {
      const style = {
        width: this.width
      };
      if (this.innerColor) {
        style.backgroundColor = this.innerColor;
      }

      if (this.radius) {
        style.borderRadius = `${this.height / 2}px`;
      }

      return style;
    },
    // 外层进度条样式
    outStyle () {
      const style = {};
      if (this.outColor) {
        style.backgroundColor = this.outColor;
      }
      if (this.height) {
        style.height = `${this.height}px`;
      }
      if (this.radius) {
        style.borderRadius = `${this.height / 2}px`;
      }

      return style;
    },
    // 是否显示外层文本
    isShowOutsideText () {
      if (this.textOutside || this.$slots.default) {
        return true;
      }
      return false;
    },
    // 是否显示内层文本
    isShowInsideText () {
      if (this.textInside || this.$slots.text) {
        return true;
      }

      return false;
    }
  }
};
</script>
