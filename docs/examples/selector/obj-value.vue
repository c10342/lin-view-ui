<template>
  <lin-selector-group label="标签：" value-key="id" v-model:value="value">
    <lin-selector-item
      v-for="item in list"
      :key="item.id"
      :value="item"
      :label="item.name"
    ></lin-selector-item>
  </lin-selector-group>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
const list = [
  {
    name: "标签一",
    id: 1
  },
  {
    name: "标签二",
    id: 2
  },
  {
    name: "标签三",
    id: 3
  },
  {
    name: "标签四",
    id: 4
  }
];
export default defineComponent({
  setup() {
    const value = ref({
      name: "标签一",
      id: 1
    });
    return {
      list,
      value
    };
  }
});
</script>
