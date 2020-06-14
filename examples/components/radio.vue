<template>
  <div>
    <l-radio label="1" v-model="value1">男</l-radio>
    <l-radio label="2" v-model="value1">女</l-radio>

    <l-radio-group v-model="value2">
      <l-radio label="3">男</l-radio>
      <l-radio label="4">女</l-radio>
    </l-radio-group>

    <l-radio disabled label="1" v-model="value1">男</l-radio>
    <l-radio disabled label="2" v-model="value1">女</l-radio>

    <l-radio-group v-model="value2">
      <l-radio disabled label="3">男</l-radio>
      <l-radio disabled label="4">女</l-radio>
    </l-radio-group>
    <l-radio-group disabled v-model="value2">
      <l-radio label="3">男</l-radio>
      <l-radio label="4">女</l-radio>
    </l-radio-group>
  </div>
</template>

<script>
export default {
  name: "test-radio",
  data() {
    return {
      value1: "",
      value2: ""
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
