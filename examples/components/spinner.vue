<template>
  <div>
    <div class="spinner-group">
      <lin-spinner type="primary"></lin-spinner>
      <lin-spinner type="success"></lin-spinner>
      <lin-spinner type="info"></lin-spinner>
      <lin-spinner type="warning"></lin-spinner>
      <lin-spinner type="danger"></lin-spinner>
    </div>
    <div class="spinner-group">
      <lin-spinner proportion='1'></lin-spinner>
      <lin-spinner proportion='2'></lin-spinner>
      <lin-spinner proportion='3'></lin-spinner>
    </div>
    <div class="spinner-group">
      <lin-spinner loadingColor='red'></lin-spinner>
      <lin-spinner loadingColor='blue'></lin-spinner>
      <lin-spinner loadingColor='green'></lin-spinner>
    </div>
    <div class="spinner-group">
      <lin-spinner size='22px'></lin-spinner>
      <lin-spinner strokeWidth='3px'></lin-spinner>
      <lin-spinner lineStyle='dotted'></lin-spinner>
    </div>
    <div class="spinner-group">
      <lin-spinner text='加载中'></lin-spinner>
      <lin-spinner text='加载中' vertical='col'></lin-spinner>
    </div>
  </div>
</template>


<script>
export default {
  name: "test-spinner",
};
</script>

<style lang="scss" scoped>
.spinner-group{
    >div{
        margin-right: 20px;
    }
}
</style>