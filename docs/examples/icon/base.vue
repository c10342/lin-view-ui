<template>
  <div class="icon-wrapper">
    <div
      v-for="(icon, index) in icons"
      :key="index"
      class="icon-item flex-center"
    >
      <lin-icon :name="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const icons = [
      "delete",
      "edit",
      "left",
      "right",
      "user",
      "arrowhead-left-outli",
      "search",
      "arrowhead-right",
      "email",
      "loading"
    ];
    return {
      icons
    };
  }
});
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .icon-item {
    width: 20%;
    height: 60px;
    line-height: 60px;
    flex-shrink: 0;
    text-align: center;
    font-size: 26px;
  }
}
</style>
