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
  name: "LinMagnifier",
  props: {
    smallPic: {
      type: String,
      require: true,
    },
    bigPic: {
      type: String,
      require: true,
    },
    smallStyle: {
      type: Object,
      default: () => ({
        width: 0,
        height: 0,
      }),
    },
    bigStyle: {
      type: Object,
      default: () => ({
        width: 0,
        height: 0,
      }),
    },
    maskColor: String,
  },
  data() {
    return {
      showMoveMask: false,
      showBigImg: false,
      moveStyle: { left: 0, top: 0 },
      bigImgStyle: { left: 0, top: 0 },
    };
  },
  computed: {
    bigBoxStyle() {
      return {
        ...this.bigStyle,
        left: parseFloat(this.smallStyle.width) + 10 + "px",
      };
    },
  },
  mounted() {
    this.smallBox = this.$refs.smallBox;
    this.moveMask = this.$refs.moveMask;
    this.bigBox = this.$refs.bigBox;
  },
  methods: {
    onMouseover() {
      this.showMoveMask = true;
      this.showBigImg = true;
      this.$emit("show");
    },
    onMouseout() {
      this.showMoveMask = false;
      this.showBigImg = false;
      this.$emit("hide");
    },
    onMousemove(event) {
      const smallBox = this.smallBox;
      const moveMask = this.moveMask;
      const bigBox = this.bigBox;
      let x =
        event.clientX -
        smallBox.getBoundingClientRect().left -
        moveMask.offsetWidth / 2;

      let y =
        event.clientY -
        smallBox.getBoundingClientRect().top -
        moveMask.offsetHeight / 2;
      // let x =
      //   event.clientX -
      //   smallBox.offsetParent.offsetLeft -
      //   moveMask.offsetWidth / 2;
      // let y =
      //   event.clientY -
      //   smallBox.offsetParent.offsetTop -
      //   moveMask.offsetHeight / 2;
      // document.getElementById().getBoundingClientRect
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
        top: `${y}px`,
      };
      this.bigImgStyle = {
        left: `${(-x * bigBox.offsetWidth) / smallBox.offsetWidth}px`,
        top: `${(-y * bigBox.offsetHeight) / smallBox.offsetHeight}px`,
      };

      this.$emit("move", event);
    },
  },
};
</script>

