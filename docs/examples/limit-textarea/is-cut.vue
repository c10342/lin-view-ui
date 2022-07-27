<template>
  <lin-limit-textarea
    v-model="value"
    :max-len="10"
    placeholder="最多输入10个字符"
    is-cut
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const value = ref("");
    return {
      value
    };
  }
});
</script>

<style></style>
