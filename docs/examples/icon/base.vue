<template>
  <div class="icon-wrapper">
    <div v-for="(icon, index) in icons" :key="index" class="icon-item">
      <lin-icon :name="icon" />
      <span class="mt-10 icon-name">{{ icon }}</span>
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
      "arrowhead-left",
      "search",
      "arrowhead-right",
      "email",
      "loading",
      "close",
      "upload"
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
    height: 80px;
    flex-shrink: 0;
    font-size: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    margin-right: -1px;
    margin-bottom: -1px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      color: var(--lin-color-primary);
    }
    .icon-name {
      font-size: 14px;
    }
  }
}
</style>
