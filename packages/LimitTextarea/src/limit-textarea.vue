<template>
  <div class="lin-limit-textarea">
    <textarea
      @input="handleInput"
      v-bind="textareaProps"
      class="lin-limit-textarea-input"
      :class="{'lin-limit-textarea-over': isOver}"
      :value="value"
      :maxlength="maxlength"
    ></textarea>
    <span v-if="maxLen!==-1" class="lin-limit-textarea-text">
      {{isOver ? t('LinViewUI.LimitTextarea.exceeded') : t('LinViewUI.LimitTextarea.enterInput')}}
      <span
        class="lin-limit-textarea-num"
        :class="{'lin-limit-textarea-num-over': isOver}"
      >{{num}}</span>{{t('LinViewUI.LimitTextarea.word')}}
    </span>
    <span v-else class="lin-limit-textarea-text">
      {{t('LinViewUI.LimitTextarea.entered')}}
      <span class="lin-limit-textarea-num">{{value.toString().length}}</span>{{t('LinViewUI.LimitTextarea.word')}}
    </span>
  </div>
</template>

<script>
import LocaleMixin from 'src/mixins/locale.js'
export default {
  name: "LinLimitTextarea",
  mixins:[LocaleMixin],
  props: {
    placeholder: {
      type: String
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
    textareaProps(){
      return {
        ...this.$props,
        placeholder:this.placeholder?this.placeholder:this.t('LinViewUI.LimitTextarea.placeholder')
      }
    }
  },
};
</script>
