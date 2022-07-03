<template>
  <lin-date-picker v-model:value="now" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, context) {
    const now = ref("");
    return { now };
  }
});
</script>
