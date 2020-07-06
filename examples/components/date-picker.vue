<template>
  <div>
    <l-date-picker disabledBeforeDate="2020-7-3" v-model="now1" />
    <l-date-picker v-model="now2" :cellWidth="50" :cellHeight="50" :renderInfo="renderInfo" />
    <l-date-picker radius v-model="now3" :showFormat="showFormat" />

    <l-date-picker v-model="now4" showAlways :showInput="false" />
  </div>
</template>

<script>
export default {
  name: "test-date-picker",
  data() {
    return {
      now1: "",
      now2: new Date(),
      now3: "",
      now4: ""
    };
  },
  methods: {
    renderInfo(h, time) {
      if (
        time.getDate() === new Date().getDate() &&
        time.getMonth() === new Date().getMonth()
      ) {
        return <span>今天</span>;
      }
      return null;
    },
    showFormat(time) {
      return time;
    }
  }
};
</script>