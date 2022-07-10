<template>
  <lin-date-axis v-model:value="value">
    <template v-slot:default="slotProps">
      <div>{{ formatDate(slotProps.date) }}</div>
    </template>
  </lin-date-axis>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, context) {
    const formatDate = (date: Date) => {
      return `${date.getMonth()}-${date.getDate()}`;
    };
    const value = ref(new Date());
    return {
      formatDate,
      value
    };
  }
});
</script>
