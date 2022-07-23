<template>
  <lin-date-picker
    v-model:value="now"
    disabled-before-date="2022-7-2"
    disabled-after-date="2022-7-30"
    :disabled-range-date="disabledRangeDate"
    :disabled-date="disabledDate"
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
