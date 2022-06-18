<template>
  <lin-button @click="onClick">点击打开Dialog</lin-button>
  <lin-dialog v-model:visible="visible" width="30%" title="标题" top="20vh">
    <span>这是一段信息</span>
    <template v-slot:footer>
      <span class="dialog-footer">
        <lin-button @click="visible = false">取 消</lin-button>
        <lin-button class="lin-ml-10" type="primary" @click="visible = false">
          确 定
        </lin-button>
      </span>
    </template>
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
