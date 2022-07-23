<template>
  <lin-date-picker
    v-model:value="now"
    :cell-width="40"
    :cell-height="40"
    :render-info="renderInfo"
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
