<template>
  <div class="lin-limit-textarea">
    <textarea
      @keyup="handleInput"
      v-bind="textareaProps"
      class="lin-limit-textarea-input"
      :class="{ 'lin-limit-textarea-over': isOver }"
      :value="value"
    ></textarea>
    <span v-if="maxLen !== -1" class="lin-limit-textarea-text">
      {{
        isOver
          ? t("LinViewUI.LimitTextarea.exceeded")
          : t("LinViewUI.LimitTextarea.enterInput")
      }}
      <span
        class="lin-limit-textarea-num"
        :class="{ 'lin-limit-textarea-num-over': isOver }"
        >{{ num }}</span
      >{{ t("LinViewUI.LimitTextarea.word") }}
    </span>
    <span v-else class="lin-limit-textarea-text">
      {{ t("LinViewUI.LimitTextarea.entered") }}
      <span class="lin-limit-textarea-num">{{ value.toString().length }}</span
      >{{ t("LinViewUI.LimitTextarea.word") }}
    </span>
  </div>
</template>

<script>
import { LocaleMixin } from "@src/mixins";

export default {
  name: "LinLimitTextarea",
  mixins: [LocaleMixin],
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    // 输入框占位符
    placeholder: {
      type: String
    },
    // 行高
    rows: {
      type: Number,
      default: 4
    },
    // 最大长度
    maxLen: {
      type: Number,
      default: -1
    },
    // 超出字符是否裁剪
    isCut: {
      type: Boolean,
      default: false
    },
    // 绑定值
    value: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      // 是否溢出,即超出最大长度
      isOver: false,
      // 可输入的字符数
      num: this.maxLen
    };
  },
  methods: {
    handleInput(event) {
      const { value } = event.target;
      if (this.maxLen === -1) {
        // 不限制长度
        // this.$emit('input', value);
        this.$emit("change", value);
      } else if (value.length <= this.maxLen || !this.isCut) {
        // 限制长度
        // this.$emit('input', value);
        this.$emit("change", value);
        this.setCurrentValue(value);
      }
    },
    setCurrentValue(value) {
      const currentValue = value.toString();
      if (currentValue.length <= this.maxLen) {
        // 没有超出长度
        this.isOver = false;
        // 还可以输入多少字符数
        this.num = this.maxLen - currentValue.length;
      } else {
        // if (this.isCut) {
        //   // 超出了多少字符数
        //   this.num = currentValue.length - this.maxLen;
        //   return;
        // }
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
      }
      return -1;
    },
    // 文本属性
    textareaProps() {
      const obj = {
        placeholder: this.placeholder
          ? this.placeholder
          : this.t("LinViewUI.LimitTextarea.placeholder"),
        rows: this.rows
      };
      if (this.maxlength !== -1) {
        obj.maxlength = this.maxlength;
      }
      return {
        ...this.$attrs,
        ...obj
      };
    }
  }
};
</script>
