<template>
  <lin-pagination
    v-model:pageIndex="pageIndex"
    :page-size="20"
    :page-count="11"
    layout="prev, pager, next"
    :total="1000"
  />
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
