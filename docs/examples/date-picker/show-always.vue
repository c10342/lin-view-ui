<template>
  <lin-date-picker v-model:value="now" showAlways :showInput="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      now: new Date()
    };
  }
});
</script>
