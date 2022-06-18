<template>
  <lin-pagination
    :page-size="20"
    :page-count="11"
    layout="prev, pager, next"
    :total="1000"
    v-model:pageIndex="pageIndex"
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
