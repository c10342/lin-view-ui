<template>
  <lin-date-axis v-model:value="value"></lin-date-axis>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref(new Date());
    return {
      value
    };
  }
});
</script>
