<template>
  <lin-date-picker
    disabledBeforeDate="2022-7-2"
    disabledAfterDate="2022-7-30"
    :disabledRangeDate="disabledRangeDate"
    :disabledDate="disabledDate"
    v-model:value="now"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      now: "",
      disabledRangeDate: ["2022-7-5", "2022-7-10"],
      disabledDate: ["2022-7-12", "2022-7-14", "2022-7-16"]
    };
  }
});
</script>
