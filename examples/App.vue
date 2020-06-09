<template>
  <div id="app">
    <l-switch v-model="value1" />
    <l-switch v-model="value2" activeColor="green" inactiveColor="red" />
    <l-switch v-model="value3" activeColor="green" />
    <l-switch disabled v-model="value4" inactiveColor="red" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      value2: false,
      value3: true,
      value4: false
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
