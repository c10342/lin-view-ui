<template>
  <div>
    <lin-checkbox v-model="value1">男</lin-checkbox>

    <lin-checkbox-group v-model="value2">
      <lin-checkbox label="抽烟"></lin-checkbox>
      <lin-checkbox label="喝酒"></lin-checkbox>
      <lin-checkbox label="探头"></lin-checkbox>
    </lin-checkbox-group>

    <lin-checkbox disabled v-model="value3">男</lin-checkbox>

    <lin-checkbox-group disabled v-model="value4">
      <lin-checkbox label="抽烟"></lin-checkbox>
      <lin-checkbox label="喝酒"></lin-checkbox>
      <lin-checkbox label="探头"></lin-checkbox>
    </lin-checkbox-group>
    <lin-checkbox-group v-model="value5">
      <lin-checkbox disabled label="抽烟"></lin-checkbox>
      <lin-checkbox label="喝酒"></lin-checkbox>
      <lin-checkbox label="探头"></lin-checkbox>
    </lin-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "test-checkbox",
  data() {
    return {
      value1: false,
      value2: [],
      value3: false,
      value4: [],
      value5: [],
    };
  },
};
</script>

