<template>
  <div class="wrapper">
    <div>
      <p class="demo-title">
        默认
      </p>
      <lin-image class="demo-image" />
    </div>
    <div>
      <p class="demo-title">
        自定义
      </p>
      <lin-image class="demo-image">
        <div class="error-cover">
          自定义失败封面
        </div>
      </lin-image>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .demo-image {
    width: 200px;
    height: 200px;
  }

  .demo-title {
    margin-bottom: 10px;
    text-align: center;
  }

  .error-cover {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #ccc;
    background-color: #e8f3fe;
  }
}
</style>
