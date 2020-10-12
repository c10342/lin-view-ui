<script>
export default {
  data() {
    return {
      now1: "",
      now2: '',
      now3: "",
      now4: new Date(),
      disabledRangeDate:["2020-7-5","2020-7-10"],
      disabledDate:["2020-7-12","2020-7-14","2020-7-16"]
    };
  },
  methods: {
    renderInfo(h, time) {
      if (
        time.getDate() === new Date().getDate() &&
        time.getMonth() === new Date().getMonth()
      ) {
        return <span>today</span>;
      }
      return null;
    },
    showFormat(time) {
      return time;
    }
  }
};
</script>

# DatePicker

---

# Basic usage

The value of `v-model` binding is the selected date

<div class='demo-block'>
<lin-date-picker  v-model="now1" />
</div>

:::demo

```html
<lin-date-picker v-model="now1" />

<script>
  export default {
    data() {
      return {
        now1: "",
      };
    },
  };
</script>
```

:::

## Disable date

`disabledBeforeDate` to disable dates less than or equal to that date. `disabledAfterDate` to disable a date greater than or equal to that date.`disabledRangeDate` can disable the time in the range. It is an array. The first item is the start time and the second item is the end time. When there is only one item in the array, the effect is the same as the `disabledAfterDate` property. `disabledDate` disable the specified date, which receives an array.

<div class='demo-block'>
    <lin-date-picker 
    disabledBeforeDate="2020-7-2"
    disabledAfterDate="2020-7-30"
    :disabledRangeDate='disabledRangeDate'
  :disabledDate='disabledDate'
     v-model="now2" />
</div>

:::demo

```html
<lin-date-picker
  disabledBeforeDate="2020-7-2"
  disabledAfterDate="2020-7-30"
  :disabledRangeDate="disabledRangeDate"
  :disabledDate="disabledDate"
  v-model="now2"
/>

<script>
  export default {
    data() {
      return {
        now2: "",
        disabledRangeDate: ["2020-7-5", "2020-7-10"],
        disabledDate: ["2020-7-12", "2020-7-14", "2020-7-16"],
      };
    },
  };
</script>
```

:::

## Disable entire date selector

Set the `disabled` property to `true` to disable the entire date selector

<div class='demo-block'>
<lin-date-picker disabled />
</div>

:::demo

```html
<lin-date-picker disabled />
```

:::

## Custom display date block

When you need to customize the style and structure of display date block, you can set `renderInfo` and return a JSX

<div class='demo-block'>
<lin-date-picker 
v-model="now3" 
:cellWidth="40" 
:cellHeight="40" 
:renderInfo="renderInfo" />
</div>

:::demo

```html
<lin-date-picker
  v-model="now3"
  :cellWidth="40"
  :cellHeight="40"
  :renderInfo="renderInfo"
/>

<script>
  export default {
    data() {
      return {
        now3: "",
      };
    },
    methods: {
      renderInfo(h, time) {
        if (
          time.getDate() === new Date().getDate() &&
          time.getMonth() === new Date().getMonth()
        ) {
          return <span>today</span>;
        }
        return null;
      },
    },
  };
</script>
```

:::

## Other uses

When you need the date selection to always show and hide the input box, you can set the `showAlways` and `showInput` properties

<div class='demo-block'>
<lin-date-picker 
v-model="now4" 
showAlways 
:showInput="false" />
</div>

:::demo

```html
<lin-date-picker v-model="now4" showAlways :showInput="false" />

<script>
  export default {
    data() {
      return {
        now4: new Date(),
      };
    },
  };
</script>
```

:::

## Attributes

| Attribute          | Description                                                                                                                                         | Type                   | Accepted Values    | Default                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------ | ---------------------- |
| radius             | Is the date block rounded                                                                                                                           | Boolean                | —                  | false                  |
| cellWidth          | Date block width                                                                                                                                    | Number                 | —                  | 32                     |
| value / v-model    | Binding value                                                                                                                                       | Date / String / Number | —                  | —                      |
| cellHeight         | Date block height                                                                                                                                   | Number                 | —                  | 32                     |
| labelHeight        | Height of head label                                                                                                                                | Number                 | —                  | 32                     |
| disabled           | Wheter to disable                                                                                                                                   | Boolean                | —                  | false                  |
| placeholder        | Input box placeholder                                                                                                                               | String                 | —                  | Please select the date |
| disabledBeforeDate | Disable dates less than or equal to that date                                                                                                       | Date / String / Number | —                  | —                      |
| disabledAfterDate  | Disable dates greater than or equal to this date                                                                                                    | Date / String / Number | —                  | —                      |
| disabledRangeDate  | Disable dates in the specified range                                                                                                                | Array                  | —                  | —                      |
| disabledDate       | Disable specified date                                                                                                                              | Array                  | —                  | —                      |
| renderInfo         | Custom rendering date block, using Vue's render function. Pass in two parameters, the first is h and the second is the date object. You can use JSX | Function               | —                  | —                      |
| format             | Format value / V-model binding value                                                                                                                | String                 | string/number/Date | string                 |
| showFormat         | Customize the display of the input box                                                                                                              | Function               | —                  | —                      |
| showAlways         | Is the time selector always displayed                                                                                                               | Boolean                | —                  | false                  |
| showInput          | Display input box                                                                                                                                   | Boolean                | —                  | true                   |

## Events

| Event Name | Description                                   | Parameters           |
| ---------- | --------------------------------------------- | -------------------- |
| prevYear   | Click the previous year button to trigger     | Date object          |
| nextYear   | Click the next year button to trigger         | Date object          |
| prevMonth  | Click the previous month button to trigger    | Date object          |
| nextMonth  | Click the next month button to trigger        | Date object          |
| select     | Triggered when a date is selected             | Selected date object |
| focus      | Triggered when the date selector is displayed | —                    |
| blur       | Triggered when the date selector is hidden    | —                    |
