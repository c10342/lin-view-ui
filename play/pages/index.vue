<template>
  <div>
    <div v-for="item in list" :key="item.name">
      <RouterLink :to="item.path">
        {{ item.name }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const list = computed(() => {
  const routes = router.getRoutes();
  return routes.filter((item) => item.name !== "index");
});
</script>
