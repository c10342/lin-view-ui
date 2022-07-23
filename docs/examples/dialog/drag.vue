<template>
  <lin-button @click="onClick">点击打开Dialog</lin-button>
  <lin-dialog v-model:visible="visible" drag title="拖拽">
    <span>这个 Dialog 弹框可进行拖拽</span>
  </lin-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const visible = ref(false);
    const onClick = () => {
      visible.value = true;
    };
    return {
      onClick,
      visible
    };
  }
});
</script>
