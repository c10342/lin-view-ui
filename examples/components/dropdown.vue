<template>
  <div style="margin:200px;">
    <lin-dropdown @command='handleCommand'>
      <!-- <span>
        下拉菜单
      </span> -->
      <div class="test">
        下拉菜单
      </div>
      <lin-dropdown-group slot="dropdown">
        <lin-dropdown-item command="a">黄金糕</lin-dropdown-item>
        <lin-dropdown-item command="b">狮子头</lin-dropdown-item>
        <lin-dropdown-item command="c">螺蛳粉</lin-dropdown-item>
        <lin-dropdown-item command="d" disabled>双皮奶</lin-dropdown-item>
        <lin-dropdown-item command="e" divided>蚵仔煎</lin-dropdown-item>
      </lin-dropdown-group>
      <lin-dropdown-group slot="dropdown">
        <lin-dropdown-item command="a">黄金糕</lin-dropdown-item>
        <lin-dropdown-item command="b">狮子头</lin-dropdown-item>
        <lin-dropdown-item command="c">螺蛳粉</lin-dropdown-item>
        <lin-dropdown-item command="d" disabled>双皮奶</lin-dropdown-item>
        <lin-dropdown-item command="e" divided>蚵仔煎</lin-dropdown-item>
      </lin-dropdown-group>
    </lin-dropdown>

    <!-- <lin-dropdown trigger='click'>
      <span>
        下拉菜单
      </span>
      <lin-dropdown-group slot="dropdown">
        <lin-dropdown-item>黄金糕</lin-dropdown-item>
        <lin-dropdown-item>狮子头</lin-dropdown-item>
        <lin-dropdown-item>螺蛳粉</lin-dropdown-item>
        <lin-dropdown-item disabled>双皮奶</lin-dropdown-item>
        <lin-dropdown-item divided>蚵仔煎</lin-dropdown-item>
      </lin-dropdown-group>
    </lin-dropdown>

    <lin-dropdown trigger='click' :hide-on-click='false'>
      <span>
        下拉菜单
      </span>
      <lin-dropdown-group slot="dropdown">
        <lin-dropdown-item>黄金糕</lin-dropdown-item>
        <lin-dropdown-item>狮子头</lin-dropdown-item>
        <lin-dropdown-item>螺蛳粉</lin-dropdown-item>
        <lin-dropdown-item disabled>双皮奶</lin-dropdown-item>
        <lin-dropdown-item divided>蚵仔煎</lin-dropdown-item>
      </lin-dropdown-group>
    </lin-dropdown> -->
  </div>
</template>

<script>
export default {
  name: "test-dropdown",
  methods:{
    handleCommand(command){
      console.log(command);
    }
  }
};
</script>

<style lang="scss">
.test{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: red;
  text-align: center;
  line-height: 100px;
}
</style>