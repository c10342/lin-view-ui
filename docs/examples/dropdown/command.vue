<template>
  <lin-dropdown @command="handleCommand">
    <span class="lin-dropdown-link">
      下拉菜单
      <LinIcon name="down" />
    </span>
    <template #dropdown>
      <lin-dropdown-group>
        <lin-dropdown-item command="a">
          黄金糕
        </lin-dropdown-item>
        <lin-dropdown-item command="b">
          狮子头
        </lin-dropdown-item>
        <lin-dropdown-item command="c">
          螺蛳粉
        </lin-dropdown-item>
        <lin-dropdown-item
          command="d"
          disabled
        >
          双皮奶
        </lin-dropdown-item>
        <lin-dropdown-item
          command="e"
          divided
        >
          蚵仔煎
        </lin-dropdown-item>
      </lin-dropdown-group>
    </template>
  </lin-dropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const handleCommand = (command: string) => {
      alert("click on item " + command);
    };
    return {
      handleCommand
    };
  }
});
</script>

<style lang="scss" scoped>
.lin-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
