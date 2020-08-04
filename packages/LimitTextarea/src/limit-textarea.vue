<template>
  <div class="lin-limit-textarea">
    <textarea
      @input="handleInput"
      v-bind="$props"
      class="lin-limit-textarea-input"
      :class="{'lin-limit-textarea-over': isOver}"
      :value="value"
      :maxlength="maxlength"
    ></textarea>
    <span v-if="maxLen!==-1" class="lin-limit-textarea-text">
      {{isOver ? '已超出' : '还可以输入'}}
      <span
        class="lin-limit-textarea-num"
        :class="{'lin-limit-textarea-num-over': isOver}"
      >{{num}}</span>个字
    </span>
    <span v-else class="lin-limit-textarea-text">
      已输入
      <span class="lin-limit-textarea-num">{{value.toString().length}}</span>个字
    </span>
  </div>
</template>

<script>
export default {
  name: "LinLimitTextarea",

  props: {
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    rows: {
      type: Number,
      default: 4,
    },
    maxLen: {
      type: Number,
      default: -1,
    },
    isCut: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      isOver: false,
      num: this.maxLen,
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
    },
  },
  computed: {
    maxlength() {
      if (this.isCut) {
        return this.maxLen;
      } else {
        return -1;
      }
    },
  },
};
</script>
