<template>
  <div id="#app">
    <mainHeader></mainHeader>
    <!-- <div class="container" v-if="!isIndex">
      <sideNav class="nav"></sideNav>
      <router-view class="view"></router-view>
    </div>
    <router-view class="page" v-else></router-view> -->
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


