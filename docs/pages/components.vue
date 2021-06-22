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
import sideNav from "../components/side-nav.vue";
export default {
  components: {
    sideNav
  },
  computed: {
    componentClass() {
      return `component-${this.$route.path.split("/").pop()}`;
    }
  }
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
    padding: 32px 0;
    overflow-y: auto;
  }

  .view {
    box-sizing: border-box;
    float: left;
    width: calc(100% - 215px);
    height: calc(100vh - #{$header-height});
    padding: 32px 250px 48px 48px;
    overflow-y: auto;
  }

  .component-icon {
    padding-right: $component-padding-right;
  }

  .component-logs {
    padding-right: $component-padding-right;
  }
}

.container::after {
  display: block;
  clear: both;
  content: "";
}
</style>
