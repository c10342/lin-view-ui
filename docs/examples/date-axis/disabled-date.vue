<template>
  <lin-date-axis
    v-model:value="value"
    :disabled-date="disabledDate"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
const ONE = 1000 * 60 * 60 * 24;
export default defineComponent({
  setup() {
    const value = ref(new Date());
    const now = new Date();
    const disabledDate = [
      new Date(+now - ONE * 2),
      new Date(+now - ONE),
      new Date(+now + ONE * 2)
    ];
    return {
      value,
      disabledDate
    };
  }
});
</script>

<style></style>
