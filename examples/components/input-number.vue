<template>
  <div>
    <l-input-number v-model="value" />
  </div>
</template>

<script>
export default {
  name: "test-input-number",
  data() {
    return {
      value: ""
    };
  }
};
</script>