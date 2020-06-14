<template>
  <div>
    <l-input v-model="value1" placeholder="请输入"></l-input>
    <l-input v-model="value2" placeholder="请输入" name="userName"></l-input>
    <l-input v-model="value3" placeholder="请输入" disabled></l-input>
    <l-input v-model="value4" placeholder="请输入" clearable></l-input>
    <l-input v-model="value5" placeholder="请输入" showPassword></l-input>
    <l-input v-model="value6" placeholder="请输入">
      <i class="l-icon-s-promotion"></i>
    </l-input>
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
      value6: ""
    };
  }
};
</script>
