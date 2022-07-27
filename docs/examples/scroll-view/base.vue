<template>
  <div class="scroll-view">
    <lin-scroll-view>
      <div
        v-for="(item, index) in list"
        :key="index"
        class="scroll-item"
      >
        {{ item }}
      </div>
    </lin-scroll-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    let id = 1;
    const list = ref<string[]>([]);
    const initData = () => {
      const listData = [];
      for (let i = 0; i < 10; i++) {
        listData.push("这是内容" + id);
        id++;
      }
      list.value = listData;
    };

    initData();
    return { list };
  }
});
</script>

<style lang="scss" scoped>
.scroll-view {
  height: 200px;
  width: 300px;
  border: 1px solid #cccccc;
}
.scroll-item {
  height: 100px;
  line-height: 100px;
}
</style>
