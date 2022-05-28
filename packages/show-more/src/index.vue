<template>
  <span class="lin-show-more">
    <span>{{ filterText(text) }}</span>
    <a
      class="lin-show-more-tip"
      @click="showMore"
      v-if="textLen !== -1 && textLen < text.length"
      >{{ showText || t("showText") }}</a
    >
    <a
      class="lin-show-more-tip"
      @click="showMore"
      v-if="textLen !== -1 && textLen === text.length && allowFold"
      >{{ hiddenText || t("hiddenText") }}</a
    >
  </span>
</template>

<script lang="ts">
import { useScopeLocale } from "@packages/hooks";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "LinShowMore",
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
    allowFold: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const textLen = ref(props.len);
    const showMore = () => {
      const { text, len } = props;
      textLen.value = textLen.value === text.length ? len : text.length;
    };
    const filterText = (value: string) => {
      if (textLen.value !== -1 && textLen.value < value.length) {
        return `${value.substring(0, textLen.value)}...`;
      }
      return value;
    };
    const { t } = useScopeLocale("ShowMore");
    return {
      showMore,
      filterText,
      textLen,
      t
    };
  }
});
</script>
