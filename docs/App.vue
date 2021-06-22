<template>
  <div id="#app">
    <mainHeader></mainHeader>
    <router-view />
  </div>
</template>

<script>
import mainHeader from "./components/header.vue";
export default {
  components: {
    mainHeader
  }
};
</script>
