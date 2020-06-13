<template>
  <div id="app">
    <l-checkbox v-model="value1">男</l-checkbox>

    <l-checkbox-group v-model="value2">
      <l-checkbox label="抽烟"></l-checkbox>
      <l-checkbox label="喝酒"></l-checkbox>
      <l-checkbox label="探头"></l-checkbox>
    </l-checkbox-group>

    <l-checkbox disabled v-model="value3">男</l-checkbox>

    <l-checkbox-group disabled v-model="value4">
      <l-checkbox label="抽烟"></l-checkbox>
      <l-checkbox label="喝酒"></l-checkbox>
      <l-checkbox label="探头"></l-checkbox>
    </l-checkbox-group>
    <l-checkbox-group v-model="value5">
      <l-checkbox disabled label="抽烟"></l-checkbox>
      <l-checkbox label="喝酒"></l-checkbox>
      <l-checkbox label="探头"></l-checkbox>
    </l-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: false,
      value2: [],
      value3: false,
      value4: [],
      value5: []
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
