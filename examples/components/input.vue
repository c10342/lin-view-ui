<template>
  <div>
    <lin-input v-model="value1" placeholder="请输入"></lin-input>
    <lin-input v-model="value2" placeholder="请输入" name="userName"></lin-input>
    <lin-input v-model="value3" placeholder="请输入" disabled></lin-input>
    <lin-input v-model="value4" placeholder="请输入" clearable></lin-input>
    <lin-input v-model="value5" placeholder="请输入" showPassword></lin-input>
    <lin-input v-model="value6" placeholder="请输入">
      <i class="lin-icon-s-promotion"></i>
    </lin-input>
  </div>
</template>

<script>
export default {
  name: "test-input",
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
    };
  },
};
</script>
