<template>
  <div>
    <lin-radio label="1" v-model="value1">男</lin-radio>
    <lin-radio label="2" v-model="value1">女</lin-radio>

    <lin-radio-group v-model="value2">
      <lin-radio label="3">男</lin-radio>
      <lin-radio label="4">女</lin-radio>
    </lin-radio-group>

    <lin-radio disabled label="1" v-model="value1">男</lin-radio>
    <lin-radio disabled label="2" v-model="value1">女</lin-radio>

    <lin-radio-group v-model="value2">
      <lin-radio disabled label="3">男</lin-radio>
      <lin-radio disabled label="4">女</lin-radio>
    </lin-radio-group>
    <lin-radio-group disabled v-model="value2">
      <lin-radio label="3">男</lin-radio>
      <lin-radio label="4">女</lin-radio>
    </lin-radio-group>
  </div>
</template>

<script>
export default {
  name: "test-radio",
  data() {
    return {
      value1: "",
      value2: "",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
