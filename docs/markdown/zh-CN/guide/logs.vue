<template>
  <section>
    <h1>更新日志</h1>
    <hr />
    <logs-item v-for="(item, index) in logsList" :key="index" :log="item" />
  </section>
</template>

<script>
import LogsItem from '../../../components/logs-item.vue';
import logsList from './logs-list.js';
export default {
  components: {
    LogsItem,
  },
  data() {
    return {
      logsList,
    };
  },
};
</script>

<style lang="scss" scoped>
.logs {
}
</style>
