<template>
  <div class="container">
    <sideNav class="nav"></sideNav>
    <router-view
      :class="['view', 'beautyScroll', componentClass]"
    ></router-view>
    <lin-backtop :key="$route.name" target=".container .view"></lin-backtop>
  </div>
</template>

<script>
import mainHeader from "../components/header.vue";
import sideNav from "../components/side-nav.vue";
export default {
  components: {
    mainHeader,
    sideNav,
  },
  computed: {
    componentClass() {
      return `component-${this.$route.path.split("/").pop()}`;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/var.scss";
.container {
  padding-left: $padding;
  background-color: #fff;
  .nav {
    float: left;
    width: 210px;
    height: calc(100vh - #{$header-height});
    overflow-y: auto;
    padding: 32px 0;
  }
  .view {
    float: left;
    width: calc(100% - 215px);
    padding: 32px 250px 48px 48px;
    box-sizing: border-box;
    height: calc(100vh - #{$header-height});
    overflow-y: auto;
  }

  .component-icon {
    padding-right: $component-padding-right;
  }
  .component-logs {
    padding-right: $component-padding-right;
  }
}

.container:after {
  content: "";
  clear: both;
  display: block;
}
</style>
