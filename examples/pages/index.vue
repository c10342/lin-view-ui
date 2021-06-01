<template>
  <ul>
    <li v-for="item in routesList" :key="item.name">
      <router-link :to="{ path: item.path }">{{ item.name }}</router-link>
    </li>
  </ul>
</template>

<script>
import { getRoutes } from '../router/index.js';
export default {
  data() {
    return {
      routesList: getRoutes().filter((item) => item.path !== '/')
    };
  }
};
</script>
