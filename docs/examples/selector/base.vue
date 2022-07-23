<template>
  <lin-selector-group v-model:value="value" label="标签：">
    <lin-selector-item v-for="(item, index) in list" :key="index" :value="item">
      {{ item }}
    </lin-selector-item>
  </lin-selector-group>
</template>

<script lang="ts">
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

    return {
      list,
      value
    };
  }
});
</script>
