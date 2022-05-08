<template>
  <lin-row type="flex" class="mb-10">
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row type="flex" class="mb-10" justify="center">
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row type="flex" class="mb-10" justify="end">
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row type="flex" class="mb-10" justify="between">
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row type="flex" class="mb-10" justify="around">
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
</template>

<style lang="scss" scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
</style>
