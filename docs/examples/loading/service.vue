<template>
  <lin-button v-loading.fullscreen="loading" type="primary" @click="onClick1">
    指令方式
  </lin-button>
  <lin-button class="ml-20" type="primary" @click="onClick2">
    服务方式
  </lin-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue";

export default defineComponent({
  setup() {
    const instance = getCurrentInstance();
    const $loading = instance?.appContext.config.globalProperties.$loading;
    const onClick2 = () => {
      $loading.open({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
        textColor: "#fff",
        time: 2000
      });
    };
    const loading = ref(false);
    const onClick1 = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    };

    return {
      onClick1,
      onClick2,
      loading
    };
  }
});
</script>

<style></style>
