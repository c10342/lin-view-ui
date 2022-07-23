<template>
  <div v-loading="loading" class="loading-box"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const loading = ref(true);
    return {
      loading
    };
  }
});
</script>

<style lang="scss" scoped>
.loading-box {
  height: 200px;
}
</style>
