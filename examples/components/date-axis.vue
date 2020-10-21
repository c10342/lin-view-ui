<template>
  <div>
    <div style="margin-bottom: 10px">
      <lin-date-axis v-model="value" disabled> </lin-date-axis>
    </div>
    <div style="margin-bottom: 10px">
      <lin-date-axis> </lin-date-axis>
    </div>

    <div style="margin-bottom: 10px">
        <p>disabledRangeDate</p>
      <lin-date-axis :disabledRangeDate="disabledRangeDate"> </lin-date-axis>
    </div>

    <div style="margin-bottom: 10px">
        <p>disabledDate</p>
      <lin-date-axis :disabledDate="disabledDate"> </lin-date-axis>
    </div>

    <div style="margin-bottom: 10px">
        <p>disabledBeforeDate</p>
      <lin-date-axis :disabledBeforeDate="disabledBeforeDate"> </lin-date-axis>
    </div>

    <div style="margin-bottom: 10px">
        <p>disabledAfterDate</p>
      <lin-date-axis :disabledAfterDate="disabledAfterDate"> </lin-date-axis>
    </div>
  </div>
</template>


<script>
export default {
  name: "test-date-axis",
  data() {
    return {
      value: "",
      disabledRangeDate: [new Date("2020-10-11"), new Date("2020-10-17")],
      disabledDate: [
        new Date("2020-10-4"),
        new Date("2020-10-6"),
        new Date("2020-10-8"),
      ],
      disabledBeforeDate: new Date("2020-10-20"),
      disabledAfterDate: new Date("2020-10-20"),
    };
  },
  methods: {
    formatDate(date) {
      console.log(date);
      return date.getDay();
    },
  },
};
</script>