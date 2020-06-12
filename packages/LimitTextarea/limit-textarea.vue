<template>
  <div class="l-limit-textarea">
    <textarea
      @input="handleInput"
      v-bind="$props"
      class="l-limit-textarea-input"
      :class="{'l-limit-textarea-over': isOver}"
      :value="value"
      :maxlength="maxlength"
    ></textarea>
    <span v-if="maxLen!==-1" class="l-limit-textarea-text">
      {{isOver ? '已超出' : '还可以输入'}}
      <span
        class="l-limit-textarea-num"
        :class="{'l-limit-textarea-num-over': isOver}"
      >{{num}}</span>个字
    </span>
    <span v-else class="l-limit-textarea-text">
      已输入
      <span class="l-limit-textarea-num">{{value.toString().length}}</span>个字
    </span>
  </div>
</template>

<script>
export default {
  name: "l-limit-textarea",

  props: {
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    rows: {
      type: Number,
      default: 4
    },
    maxLen: {
      type: Number,
      default: -1
    },
    isCut: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      isOver: false,
      num: this.maxLen
    };
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      if (this.maxLen === -1) {
        // 不限制长度
        this.$emit("input", value);
        this.$emit("change", value);
      } else {
        // 限制长度
        if (value.length <= this.maxLen || !this.isCut) {
          this.$emit("input", value);
          this.$emit("change", value);
          this.setCurrentValue(value);
        }
      }
    },
    setCurrentValue(value) {
      const currentValue = value.toString();
      if (currentValue.length <= this.maxLen) {
        this.isOver = false;
        this.num = this.maxLen - currentValue.length;
      } else {
        if (this.isCut) {
          this.num = currentValue.length - this.maxLen;
          return;
        }
        this.isOver = true;
        this.num = currentValue.length - this.maxLen;
        this.$emit("overText", currentValue);
      }
    }
  },
  computed: {
    maxlength() {
      if (this.isCut) {
        return this.maxLen;
      } else {
        return -1;
      }
    }
  }
};
</script>

<style lang="scss">
@import "packages/assets/styles/variables/limit-textarea.scss";
.l-limit-textarea {
  position: relative;
}
.l-limit-textarea-input {
  border: $limit-textarea-input-border;
  display: block;
  resize: vertical;
  padding: $limit-textarea-input-padding;
  line-height: $limit-textarea-input-line-height;
  box-sizing: border-box;
  width: $limit-textarea-input-width;
  font-size: $limit-textarea-input-font-size;
  color: $limit-textarea-input-color;
  border-radius: $limit-textarea-input-border-radius;
  outline: $limit-textarea-input-outline;
  transition: $limit-textarea-input-transition;
}
.l-limit-textarea-input:focus {
  border: $limit-textarea-input-focus-border;
}
.l-limit-textarea-over {
  border: $limit-textarea-over-border;
}
.l-limit-textarea-text {
  position: absolute;
  bottom: $limit-textarea-text-bottom;
  right: $limit-textarea-text-right;
  font-size: $limit-textarea-text-font-size;
  color: $limit-textarea-text-color;
}
.l-limit-textarea-num {
  color: $limit-textarea-num-color;
}
.l-limit-textarea-num-over {
  color: $limit-textarea-num-over-color;
}
</style>
