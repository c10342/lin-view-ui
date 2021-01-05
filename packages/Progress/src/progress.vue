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
    percent: {
      type: Number,
      default: 0
    },
    innerColor: {
      type: String,
      default: ''
    },
    outColor: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 10
    },
    radius: {
      type: Boolean,
      default: true
    },
    textOutside: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    },
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
    isShowOutsideText () {
      if (this.textOutside || this.$slots.default) {
        return true;
      }
      return false;
    },
    isShowInsideText () {
      if (this.textInside || this.$slots.text) {
        return true;
      }

      return false;
    }
  }
};
</script>
