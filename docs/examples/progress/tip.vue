<template>
  <lin-progress :height="20" type="danger" :percent="0.5">
    <p class="demo-out-tip">百分之五十</p>

    <template #text>
      <p class="demo-in-tip">百分之五十</p>
    </template>
  </lin-progress>
</template>

<style lang="scss" scoped>
.demo-in-tip {
  color: #fff;
  font-size: 12px;
}

.demo-out-tip {
  margin-left: 10px;
  font-size: 12px;
  color: #333;
}
</style>
