# DateAxis

[[toc]]

---

# Basic usage

The value of `v-model` binding is the selected date

:::demo

```vue
<template>
  <lin-date-axis v-model="value"></lin-date-axis>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
};
</script>
```

:::

## Use Slots

The dateaxis component provides five named slots for `prevWeek`, `prevDay`, `nextDay`, `nextWeek`, `more`, and `default`

:::demo

```vue
<template>
  <lin-date-axis>
    <template slot-scope="data">
      <div>{{ formatDate(data.date) }}</div>
    </template>
  </lin-date-axis>
</template>

<script>
export default {
  methods: {
    formatDate(date) {
      return `${date.getMonth()}-${date.getDate()}`;
    },
  },
};
</script>
```

:::

## Disable date

`disabledBeforeDate` to disable dates less than or equal to that date. `disabledAfterDate` to disable a date greater than or equal to that date.`disabledRangeDate` can disable the time in the range. It is an array. The first item is the start time and the second item is the end time. When there is only one item in the array, the effect is the same as the `disabledAfterDate` property. `disabledDate` disable the specified date, which receives an array.

:::demo

```vue
<template>
  <lin-date-axis :disabledDate="disabledDate"></lin-date-axis>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      disabledDate: [
        new Date("2020-10-4"),
        new Date("2020-10-6"),
        new Date("2020-10-8"),
      ],
    };
  },
};
</script>
```

:::

## Attributes

| Attribute          | Description                                      | Type                   | Accepted Values | Default |
| ------------------ | ------------------------------------------------ | ---------------------- | --------------- | ------- |
| value / v-model    | Binding value                                    | Date                   | —               | —       |
| disabled           | Wheter to disable                                | Boolean                | —               | false   |
| disabledBeforeDate | Disable dates less than or equal to that date    | Date / String / Number | —               | —       |
| disabledAfterDate  | Disable dates greater than or equal to this date | Date / String / Number | —               | —       |
| disabledRangeDate  | Disable dates in the specified range             | Array                  | —               | —       |
| disabledDate       | Disable specified date                           | Array                  | —               | —       |

## Slots

| Name     | Description                                                             |
| -------- | ----------------------------------------------------------------------- |
| —        | The contents of the time axis display. The parameter is the date object |
| prevWeek | Previous week button content                                            |
| prevDay  | Previous day button content                                             |
| nextDay  | Next day button content                                                 |
| nextWeek | Next week button content                                                |

## Events

| Event Name | Description                                      | Parameters    |
| ---------- | ------------------------------------------------ | ------------- |
| select     | Triggered when a date is selected                | Selected date |
| prevWeek   | Click the button of last week to trigger         | current date  |
| nextWeek   | Click the next week button to trigger            | current date  |
| prevDay    | Click the previous day button to trigger         | current date  |
| nextDay    | Click the next day button to trigger             | current date  |
| hide       | Triggered when more date selectors are hidden    | —             |
| show       | Triggered when more date selectors are displayed | —             |
