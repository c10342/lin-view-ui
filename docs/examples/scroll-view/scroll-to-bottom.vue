<template>
  <div class="scroll-view">
    <lin-scroll-view :loading="loading" @scrollToBottom="scrollToBottom">
      <div class="scroll-item" v-for="(item, index) in list" :key="index">
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
    const loading = ref(false);
    let count = 1;
    const initData = () => {
      const listData = [];
      for (let i = 0; i < 6; i++) {
        listData.push("这是内容" + id);
        id++;
      }
      list.value = listData;
    };
    initData();
    const scrollToBottom = () => {
      if (count > 3 || loading.value) {
        return;
      }
      loading.value = true;
      setTimeout(() => {
        for (let i = 0; i < 6; i++) {
          list.value.push("这是内容" + id);
          id++;
        }
        count++;
        loading.value = false;
      }, 2000);
    };
    return {
      list,
      loading,
      scrollToBottom
    };
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
