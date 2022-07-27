<template>
  <div
    v-loading="loading"
    class="loading-box"
    lin-loading-text="拼命加载中"
    lin-loading-background="rgba(0, 0, 0, 0.8)"
    lin-loading-textColor="#fff"
  />
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
