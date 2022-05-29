<template>
  <p>如果你的title或者meta或者link是异步加载的，那么你可能需要这样使用</p>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  metaInfo() {
    return {
      title: this.pageName
    };
  },
  setup() {
    const pageName = ref("loading");
    onMounted(() => {
      setTimeout(() => {
        pageName.value = "MetaInfo 三要素";
      }, 2000);
    });
    return {
      pageName
    };
  }
});
</script>
