<template>
  <div>
    <div class="aaa">
      <lin-magnifier
        :smallStyle="{width:'350px',height:'350px'}"
        :bigStyle="{width:'450px',height:'450px'}"
        :smallPic="require('../assets/images/small.jpg')"
        :bigPic="require('../assets/images/big.jpg')"
      />
    </div>

    <lin-magnifier
      :smallStyle="{width:'350px',height:'350px'}"
      :bigStyle="{width:'450px',height:'450px'}"
    >
      <template slot="small">
        <img :src="require('../assets/images/small.jpg')" />
      </template>
      <template slot="big">
        <img :src="require('../assets/images/big.jpg')" />
      </template>
      <template slot="move">
        <div style="width:50px;height:50px;background-color:green;"></div>
      </template>
    </lin-magnifier>
  </div>
</template>


<script>
export default {
  name: "test-magnifier",
};
</script>

<style lang="scss" scoped>
.aaa {
  padding: 32px;
  border: 1px solid #e2ecf4;
  border-radius: 4px 4px 0 0;
  background-color: #fff;
  margin-top: 200px;
}
</style>