<template>
  <div>
    <lin-row>
      <lin-col :span="4">
        <lin-skeleton></lin-skeleton>
      </lin-col>
      <lin-col :span="4" class="ml-10">
        <lin-row>
          <lin-col :span="12">
            <lin-skeleton :proportion="0.2"></lin-skeleton>
          </lin-col>
          <lin-col :span="24" class="mt-10">
            <lin-skeleton :proportion="0.1"></lin-skeleton>
          </lin-col>
          <lin-col :span="24" class="mt-10">
            <lin-skeleton :proportion="0.1"></lin-skeleton>
          </lin-col>
        </lin-row>
      </lin-col>
    </lin-row>
  </div>
</template>

<script>
export default {
  name: "test-skeleton",
};
</script>

<style lang="scss">
.ml-10{
    margin-left: 10px;
}
.mt-10{
    margin-top: 10px;
}
</style>