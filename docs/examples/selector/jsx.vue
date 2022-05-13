<template>
  <lin-selector-group
    :render-more="renderMore"
    :render-label="renderLabel"
    label="学科："
    v-model:value="value"
  >
    <lin-selector-item
      v-for="(item, index) in list"
      :key="index"
      :value="item"
      :label="item"
    ></lin-selector-item>
  </lin-selector-group>
</template>

<script lang="tsx">
import { defineComponent, ref } from "vue";
const list = [
  "标签一",
  "标签二",
  "标签三",
  "标签四",
  "标签五",
  "标签六",
  "标签七",
  "标签八",
  "标签九",
  "标签十",
  "标签十一"
];
export default defineComponent({
  setup() {
    const value = ref("标签一");
    const renderMore = (status: number) => {
      if (status === 1) {
        return <span>展开</span>;
      } else {
        return <span>收起</span>;
      }
    };
    const renderLabel = () => {
      return <span>标签</span>;
    };
    return {
      list,
      value,
      renderMore,
      renderLabel
    };
  }
});
</script>
