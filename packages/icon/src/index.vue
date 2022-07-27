<template>
  <span
    :class="['lin-icon', 'lin-iconfont', `lin-icon-${name}`]"
    :style="{ 'font-size': size, color: color }"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LinIcon",
  props: {
    name: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  }
});
</script>
