<template>
  <div class="loading-box" v-loading="loading"></div>
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
