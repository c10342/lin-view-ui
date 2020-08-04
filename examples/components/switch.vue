<template>
  <div>
    <lin-switch v-model="value1" />
    <lin-switch v-model="value2" activeColor="green" inactiveColor="red" />
    <lin-switch v-model="value3" activeColor="green" />
    <lin-switch disabled v-model="value4" inactiveColor="red" />
  </div>
</template>

<script>
export default {
  name: "test-switch",
  data() {
    return {
      value1: true,
      value2: false,
      value3: true,
      value4: false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
