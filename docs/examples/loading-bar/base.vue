<template>
  <lin-button @click="start">
    开始
  </lin-button>
  <lin-button
    class="ml-10"
    @click="end"
  >
    结束
  </lin-button>
  <lin-button
    class="ml-10"
    @click="error"
  >
    错误
  </lin-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onBeforeUnmount } from "vue";

export default defineComponent({
  setup() {
    const instance: any = getCurrentInstance();
    const loadingBar = instance.appContext.config.globalProperties.$loadingBar;

    const start = () => {
      loadingBar.start();
    };

    const end = () => {
      loadingBar.end();
    };
    const error = () => {
      loadingBar.error();
    };

    onBeforeUnmount(() => {
      loadingBar.end();
    });

    return {
      start,
      end,
      error
    };
  }
});
</script>
