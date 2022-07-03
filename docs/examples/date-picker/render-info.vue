<template>
  <lin-date-picker
    v-model:value="now"
    :cellWidth="40"
    :cellHeight="40"
    :renderInfo="renderInfo"
  />
</template>

<script lang="tsx">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const now = ref("");
    const renderInfo = (time: Date) => {
      if (
        time.getDate() === new Date().getDate() &&
        time.getMonth() === new Date().getMonth()
      ) {
        return <span>今天</span>;
      }
      return null;
    };

    return {
      now,
      renderInfo
    };
  }
});
</script>
