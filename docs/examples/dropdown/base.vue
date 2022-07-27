<template>
  <lin-dropdown>
    <span class="lin-dropdown-link">
      下拉菜单
      <LinIcon name="down" />
    </span>
    <template #dropdown>
      <lin-dropdown-group>
        <lin-dropdown-item>黄金糕</lin-dropdown-item>
        <lin-dropdown-item>狮子头</lin-dropdown-item>
        <lin-dropdown-item>螺蛳粉</lin-dropdown-item>
        <lin-dropdown-item disabled>
          双皮奶
        </lin-dropdown-item>
        <lin-dropdown-item divided>
          蚵仔煎
        </lin-dropdown-item>
      </lin-dropdown-group>
    </template>
  </lin-dropdown>
</template>

<style lang="scss" scoped>
.lin-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
