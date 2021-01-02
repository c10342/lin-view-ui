<template>
  <span class="lin-show-more">
    <span>{{text | filterText(textLen)}}</span>
    <a
      class="lin-show-more-tip"
      @click="showMore"
      v-if="textLen !== -1 && textLen < text.length"
    >{{showText||t('LinViewUI.ShowMore.showText')}}</a>
    <a
      class="lin-show-more-tip"
      @click="showMore"
      v-if="textLen !== -1 && textLen === text.length && allowFold"
    >{{hiddenText||t('LinViewUI.ShowMore.hiddenText')}}</a>
  </span>
</template>

<script>
import LocaleMixin from 'src/mixins/locale.js';

export default {
  name: 'LinShowMore',
  mixins: [LocaleMixin],
  props: {
    len: {
      type: Number,
      default: -1,
    },
    text: {
      type: String,
      default: '',
    },
    showText: {
      type: String,
    },
    hiddenText: {
      type: String,
    },
    allowFold: Boolean,
  },
  data() {
    return {
      textLen: this.len,
    };
  },
  methods: {
    showMore() {
      this.textLen = this.textLen === this.text.length ? this.len : this.text.length;
    },
  },
  filters: {
    filterText(value, textLen) {
      if (textLen !== -1 && textLen < value.length) {
        return `${value.substring(0, textLen)}...`;
      }
      return value;
    },
  },
};
</script>
