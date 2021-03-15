<template>
  <div :class="['lin-spinner', `lin-spinner-${vertical}`]">
    <div
      :style="loadingStyle"
      :class="[
        'lin-spinner-loading',
        `lin-spinner-type-${type}`,
        `lin-spinner-proportion-${proportion}`,
      ]"
    ></div>
    <div class="lin-spinner-text" v-if="text" :style="textStyle">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinSpinner',
  props: {
    // 主题类型
    type: {
      type: String,
      default: 'primary',
      validator (value) {
        return ['primary', 'success', 'info', 'warning', 'danger'].includes(
          value
        );
      }
    },
    // 文案对齐方向	
    vertical: {
      type: String,
      default: 'row',
      validator (value) {
        return ['col', 'row'].includes(value);
      }
    },
    // 弧度
    proportion: {
      type: [String,Number],
      default: '1',
      validator (value) {
        return ['1', '2', '3',1,2,3].includes(value);
      }
    },
    // 显示器颜色	
    loadingColor: String,
    // 显示器大小
    size: String,
    // 圆环宽度
    strokeWidth: String,
    // 线条样式
    lineStyle: {
      type: String,
      validator (value) {
        return [
          'dotted',
          'dashed',
          'solid',
          'double',
          'groove',
          'ridge',
          'inset',
          'outset'
        ].includes(value);
      }
    },
    // css3 动画名称
    animationName: String,
    // 运动时长	
    animationDuration: String,
    // 运动方式
    timingFunction: {
      type: String,
      validator (value) {
        const result = [
          'linear',
          'ease',
          'ease-in',
          'ease-out',
          'ease-in-out'
        ].includes(value);
        if (result) {
          return true;
        } if (value.startsWith('cubic-bezie')) {
          return true;
        }
        return false;
      }
    },
    // 运动次数	
    iterationCount: {
      type: [String, Number],
      validator (value) {
        if (typeof value === 'number') {
          return true;
        } if (value === 'infinite') {
          return true;
        }
        return false;
      }
    },
    // 加载文案	
    text: String,
    // 加载文案字体大小
    textSize: String,
    // 加载文案字体颜色
    textColor: String
  },
  computed: {
    // 加载器样式
    loadingStyle () {
      const obj = {};
      if (this.loadingColor) {
        obj['border-color'] = this.loadingColor;
      }
      if (this.size) {
        obj.width = this.size;
        obj.height = this.size;
      }
      if (this.strokeWidth) {
        obj['border-width'] = this.strokeWidth;
      }
      if (this.lineStyle) {
        obj['border-style'] = this.lineStyle;
      }
      if (this.animationName) {
        obj['animation-name'] = this.animationName;
      }
      if (this.animationDuration) {
        obj['animation-duration'] = this.animationDuration;
      }
      if (this.timingFunction) {
        obj['animation-timing-function'] = this.timingFunction;
      }
      if (this.iterationCount) {
        obj['animation-iteration-count'] = this.iterationCount;
      }
      return obj;
    },
    // 文本样式
    textStyle () {
      const obj = {};
      if (this.textSize) {
        obj['font-size'] = this.textSize;
      }
      if (this.textColor) {
        obj.color = this.textColor;
      }
      return obj;
    }
  }
};
</script>
