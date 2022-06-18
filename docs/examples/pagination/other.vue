<template>
  <div>
    <p>显示总数</p>
    <lin-pagination
      v-model:pageIndex="pageIndex1"
      background
      layout="total,prev, pager, next"
      :total="1000"
    >
    </lin-pagination>
  </div>
  <div>
    <p>直接前往</p>
    <lin-pagination
      v-model:pageIndex="pageIndex2"
      background
      layout="prev, pager, next,jumper"
      :total="1000"
    >
    </lin-pagination>
  </div>
  <div>
    <p>完整功能</p>
    <lin-pagination
      v-model:pageIndex="pageIndex3"
      background
      layout="total,prev, pager, next,jumper"
      :total="1000"
    >
    </lin-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const pageIndex1 = ref(1);
    const pageIndex2 = ref(1);
    const pageIndex3 = ref(1);
    return {
      pageIndex1,
      pageIndex2,
      pageIndex3
    };
  }
});
</script>
