<template>
  <span class="lin-show-more">
    <span>{{ text | filterText(textLen) }}</span>
    <a
      class="lin-show-more-tip"
      @click="showMore"
      v-if="textLen !== -1 && textLen < text.length"
      >{{ showText || t("LinViewUI.ShowMore.showText") }}</a
    >
    <a
      class="lin-show-more-tip"
      @click="showMore"
      v-if="textLen !== -1 && textLen === text.length && allowFold"
      >{{ hiddenText || t("LinViewUI.ShowMore.hiddenText") }}</a
    >
  </span>
</template>

<script>
import { LocaleMixin } from "@src/mixins";

export default {
  name: "LinShowMore",
  mixins: [LocaleMixin],
  props: {
    // 显示文本的长度
    len: {
      type: Number,
      default: -1
    },
    // 文本
    text: {
      type: String,
      default: ""
    },
    // 折叠时需要显示文案
    showText: {
      type: String
    },
    // 隐藏时需要显示文案
    hiddenText: {
      type: String
    },
    // 是否允许折叠
    allowFold: Boolean
  },
  data() {
    return {
      // 记录文本长度
      textLen: this.len
    };
  },
  methods: {
    showMore() {
      this.textLen =
        this.textLen === this.text.length ? this.len : this.text.length;
    }
  },
  filters: {
    filterText(value, textLen) {
      if (textLen !== -1 && textLen < value.length) {
        return `${value.substring(0, textLen)}...`;
      }
      return value;
    }
  }
};
</script>
