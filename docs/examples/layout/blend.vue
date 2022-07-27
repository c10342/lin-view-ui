<template>
  <lin-row
    :gutter="20"
    class="mb-10"
  >
    <lin-col :span="16">
      <div class="grid-content bg-purple" />
    </lin-col>
    <lin-col :span="8">
      <div class="grid-content bg-purple" />
    </lin-col>
  </lin-row>
  <lin-row
    :gutter="20"
    class="mb-10"
  >
    <lin-col :span="8">
      <div class="grid-content bg-purple" />
    </lin-col>
    <lin-col :span="8">
      <div class="grid-content bg-purple" />
    </lin-col>
    <lin-col :span="4">
      <div class="grid-content bg-purple" />
    </lin-col>
    <lin-col :span="4">
      <div class="grid-content bg-purple" />
    </lin-col>
  </lin-row>
  <lin-row
    :gutter="20"
    class="mb-10"
  >
    <lin-col :span="4">
      <div class="grid-content bg-purple" />
    </lin-col>
    <lin-col :span="16">
      <div class="grid-content bg-purple" />
    </lin-col>
    <lin-col :span="4">
      <div class="grid-content bg-purple" />
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
