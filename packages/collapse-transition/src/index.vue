<template>
  <transition v-on="on">
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Transition from "./transition";
export default defineComponent({
  name: "LinCollapseTransition",
  setup() {
    return {
      on: Transition
    };
  }
});
</script>
