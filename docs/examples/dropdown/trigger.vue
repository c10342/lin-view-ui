<template>
  <lin-row class="block-col-2">
    <lin-col :span="12">
      <span class="demonstration">hover 激活</span>
      <lin-dropdown>
        <span class="lin-dropdown-link">
          下拉菜单
          <LinIcon name="down" />
        </span>
        <template #dropdown>
          <lin-dropdown-group>
            <lin-dropdown-item icon="lin-icon-date"> 黄金糕 </lin-dropdown-item>
            <lin-dropdown-item icon="lin-icon-thumbsup">
              狮子头
            </lin-dropdown-item>
            <lin-dropdown-item icon="lin-icon-chat"> 螺蛳粉 </lin-dropdown-item>
            <lin-dropdown-item icon="lin-icon-search">
              双皮奶
            </lin-dropdown-item>
            <lin-dropdown-item icon="lin-icon-upload">
              蚵仔煎
            </lin-dropdown-item>
          </lin-dropdown-group>
        </template>
      </lin-dropdown>
    </lin-col>
    <lin-col :span="12">
      <span class="demonstration">click 激活</span>
      <lin-dropdown trigger="click">
        <span class="lin-dropdown-link">
          下拉菜单
          <LinIcon name="down" />
        </span>
        <template #dropdown>
          <lin-dropdown-group>
            <lin-dropdown-item icon="user"> 黄金糕 </lin-dropdown-item>
            <lin-dropdown-item icon="edit"> 狮子头 </lin-dropdown-item>
            <lin-dropdown-item icon="email"> 螺蛳粉 </lin-dropdown-item>
            <lin-dropdown-item icon="search"> 双皮奶 </lin-dropdown-item>
            <lin-dropdown-item icon="upload"> 蚵仔煎 </lin-dropdown-item>
          </lin-dropdown-group>
        </template>
      </lin-dropdown>
    </lin-col>
  </lin-row>
</template>

<style lang="scss" scoped>
.lin-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
