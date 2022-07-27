<template>
  <div>
    <div
      v-if="label"
      class="lin-dropdown-group-label"
    >
      {{ label }}
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LinDropdownGroup",
  props: {
    // 分组的组名
    label: {
      type: String,
      default: null
    }
  }
});
</script>
