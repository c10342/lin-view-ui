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
  name: "LinSpinner",
  props: {
    type: {
      type: String,
      default: "primary",
      validator(value) {
        return ["primary", "success", "info", "warning", "danger"].includes(
          value
        );
      },
    },
    vertical: {
      type: String,
      default: "row",
      validator(value) {
        return ["col", "row"].includes(value);
      },
    },
    proportion: {
      type: String,
      default: "1",
      validator(value) {
        return ["1", "2", "3"].includes(value);
      },
    },
    loadingColor: String,
    size: String,
    strokeWidth: String,
    lineStyle: {
      type: String,
      validator(value) {
        return [
          "dotted",
          "dashed",
          "solid",
          "double",
          "groove",
          "ridge",
          "inset",
          "outset",
        ].includes(value);
      },
    },
    animationName: String,
    animationDuration: String,
    timingFunction: {
      type: String,
      validator(value) {
        const result = [
          "linear",
          "ease",
          "ease-in",
          "ease-out",
          "ease-in-out",
        ].includes(value);
        if (result) {
          return true;
        } else if (value.startsWith("cubic-bezie")) {
          return true;
        }
        return false;
      },
    },
    iterationCount: {
      type: [String, Number],
      validator(value) {
        if (typeof value === "number") {
          return true;
        } else if (value === "infinite") {
          return true;
        }
        return false;
      },
    },
    text: String,
    textSize: String,
    textColor: String,
  },
  computed: {
    loadingStyle() {
      const obj = {};
      if (this.loadingColor) {
        obj["border-color"] = this.loadingColor;
      }
      if (this.size) {
        obj["width"] = this.size;
        obj["height"] = this.size;
      }
      if (this.strokeWidth) {
        obj["border-width"] = this.strokeWidth;
      }
      if (this.lineStyle) {
        obj["border-style"] = this.lineStyle;
      }
      if (this.animationName) {
        obj["animation-name"] = this.animationName;
      }
      if (this.animationDuration) {
        obj["animation-duration"] = this.animationDuration;
      }
      if (this.timingFunction) {
        obj["animation-timing-function"] = this.timingFunction;
      }
      if (this.iterationCount) {
        obj["animation-iteration-count"] = this.iterationCount;
      }
      return obj;
    },
    textStyle(){
        const obj = {}
        if(this.textSize){
            obj['font-size']=this.textSize
        }
        if(this.textColor){
            obj['color']=this.textColor
        }
        return obj
    }
  },
};
</script>