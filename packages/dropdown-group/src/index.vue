<template>
  <div>
    <div class="lin-dropdown-group-label" v-if="label">{{ label }}</div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LinDropdownGroup",
  props: {
    // 分组的组名
    label: String
  }
});
</script>
