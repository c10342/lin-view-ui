<template>
  <div class="lin-magnifier">
    <div
      :style="smallStyle"
      ref="smallBox"
      class="lin-magnifier-small"
      @mousemove="onMousemove"
      @mouseout="onMouseout"
      @mouseover="onMouseover"
    >
      <slot name="small">
        <img :src="smallPic" alt />
      </slot>
      <div :style="moveStyle" ref="moveMask" v-show="showMoveMask" class="lin-magnifier-move-slot">
        <slot name="move">
          <div :style="{'background-color':maskColor}" class="lin-magnifier-move"></div>
        </slot>
      </div>
    </div>
    <div :style="bigBoxStyle" ref="bigBox" class="lin-magnifier-big" v-show="showBigImg">
      <div :style="bigImgStyle" class="lin-magnifier-big-slot">
        <slot name="big">
          <img class="lin-magnifier-big-img" :src="bigPic" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinMagnifier',
  props: {
    // 小图片路径地址
    smallPic: {
      type: String,
      require: true
    },
    // 大图片路径地址
    bigPic: {
      type: String,
      require: true
    },
    // 小图片样式（必须设置宽高，否则宽高为 0）
    smallStyle: {
      type: Object,
      default: () => ({
        width: 0,
        height: 0
      })
    },
    // 大图片样式（必须设置宽高，否则宽高为 0）
    bigStyle: {
      type: Object,
      default: () => ({
        width: 0,
        height: 0
      })
    },
    // 鼠标移动的遮罩层背景色
    maskColor: String
  },
  data () {
    return {
      // 是否显示鼠标移动遮罩层
      showMoveMask: false,
      // 是否显示大图片
      showBigImg: false,
      // 鼠标移动的样式,就是鼠标遮罩层需要跟随鼠标移动
      moveStyle: { left: 0, top: 0 },
      // 大图片样式
      bigImgStyle: { left: 0, top: 0 }
    };
  },
  computed: {
    bigBoxStyle () {
      return {
        ...this.bigStyle,
        // 让大图片距离左边小图片的边距
        left: `${parseFloat(this.smallStyle.width) + 10}px`
      };
    }
  },
  mounted () {
    // 初始化DOM
    this.smallBox = this.$refs.smallBox;
    this.moveMask = this.$refs.moveMask;
    this.bigBox = this.$refs.bigBox;
  },
  methods: {
    onMouseover () {
      // 鼠标进来
      this.showMoveMask = true;
      this.showBigImg = true;
      this.$emit('show');
    },
    onMouseout () {
      // 鼠标离开
      this.showMoveMask = false;
      this.showBigImg = false;
      this.$emit('hide');
    },
    onMousemove (event) {
      const { smallBox } = this;
      const { moveMask } = this;
      const { bigBox } = this;
      // 计算出鼠标距离小图片左边的位置，同时要使鼠标遮罩层居中，就是鼠标要在遮罩层中间
      let x = event.clientX -
        smallBox.getBoundingClientRect().left -
        moveMask.offsetWidth / 2;
        // 同上，计算上边位置
      let y = event.clientY -
        smallBox.getBoundingClientRect().top -
        moveMask.offsetHeight / 2;

      // 临界值处理
      if (x < 0) {
        x = 0;
      } else if (x > smallBox.offsetWidth - moveMask.offsetWidth) {
        x = smallBox.offsetWidth - moveMask.offsetWidth;
      }
      if (y < 0) {
        y = 0;
      } else if (y > smallBox.offsetHeight - moveMask.offsetHeight) {
        y = smallBox.offsetHeight - moveMask.offsetHeight;
      }

      this.moveStyle = {
        left: `${x}px`,
        top: `${y}px`
      };
      this.bigImgStyle = {
        left: `${(-x * bigBox.offsetWidth) / smallBox.offsetWidth}px`,
        top: `${(-y * bigBox.offsetHeight) / smallBox.offsetHeight}px`
      };

      this.$emit('move', event);
    }
  }
};
</script>
