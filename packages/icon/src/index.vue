<template>
  <span
    :class="['lin-icon', 'lin-iconfont', `lin-icon-${name}`]"
    :style="{ 'font-size': size, color: color }"
  ></span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LinIcon",
  props: {
    name: {
      type: String
    },
    size: {
      type: String
    },
    color: {
      type: String
    }
  }
});
</script>
