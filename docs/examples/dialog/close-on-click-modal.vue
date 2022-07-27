<template>
  <lin-button @click="onClick">
    点击打开Dialog
  </lin-button>
  <lin-dialog
    v-model:visible="visible"
    :close-on-click-modal="false"
  >
    <span>这是一段信息</span>
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
