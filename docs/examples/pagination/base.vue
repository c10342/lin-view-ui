<template>
  <p>页数较少时的效果</p>
  <lin-pagination
    v-model:pageIndex="pageIndex1"
    layout="prev, pager, next"
    :total="50"
  />
  <p>大于 7 页时的效果</p>
  <lin-pagination
    v-model:pageIndex="pageIndex2"
    layout="prev, pager, next"
    :total="1000"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const pageIndex1 = ref(1);
    const pageIndex2 = ref(1);
    return {
      pageIndex1,
      pageIndex2
    };
  }
});
</script>
