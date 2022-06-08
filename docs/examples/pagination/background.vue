<template>
  <lin-pagination
    v-model:pageIndex="pageIndex"
    background
    layout="prev, pager, next"
    :total="1000"
  >
  </lin-pagination>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const pageIndex = ref(1);
    return {
      pageIndex
    };
  }
});
</script>
