<script>
export default {
    data(){
        return {
            value:'',
            disabledDate: [
              new Date("2020-10-4"),
              new Date("2020-10-6"),
              new Date("2020-10-8"),
            ],
        }
    },
    methods:{
        formatDate(date){
            return `${date.getMonth()}-${date.getDate()}`
        }
    }
}
</script>

# DateAxis 日期轴

---

# 基础用法

`v-model` 绑定的值就是选中的日期

<div class='demo-block'>
<lin-date-axis v-model="value"></lin-date-axis>
</div>

:::demo

```html
<lin-date-axis v-model="value"></lin-date-axis>

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

## 使用插槽

DateAxis 组件提供 `prevWeek`，`prevDay`，`nextDay`，`nextWeek`，`more`，`default` 五个具名插槽

<div class='demo-block'>
<lin-date-axis>
<template slot-scope="data">
<div>{{formatDate(data.date)}}</div>
</template>
</lin-date-axis>
</div>

:::demo

```html
<lin-date-axis>
  <template slot-scope="data">
    <div>{{formatDate(data.date)}}</div>
  </template>
</lin-date-axis>

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

## 禁用日期

`disabledBeforeDate` 可禁用小于等于该日期的日期。`disabledAfterDate` 可禁用大于等于该日期的日期。
`disabledRangeDate` 可禁用范围内的时间，它是一个数组，第一项为开始时间，第二项为结束时间，数组只有一项的时候，效果跟 `disabledAfterDate` 属性一样。`disabledDate` 禁用指定日期，它接收一个数组。

<div class='demo-block'>
<lin-date-axis :disabledDate="disabledDate"></lin-date-axis>
</div>

:::demo

```html
<lin-date-axis :disabledDate="disabledDate"></lin-date-axis>

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

## 属性

| 参数               | 说明                     | 类型                   | 可选值 | 默认值 |
| ------------------ | ------------------------ | ---------------------- | ------ | ------ |
| value / v-model    | 绑定值                   | Date                   | —      | —      |
| disabled           | 是否禁用                 | Boolean                | —      | false  |
| disabledBeforeDate | 禁用小于等于该日期的日期 | Date / String / Number | —      | —      |
| disabledAfterDate  | 禁用大于等于该日期的日期 | Date / String / Number | —      | —      |
| disabledRangeDate  | 禁用指定范围内的日期     | Array                  | —      | —      |
| disabledDate       | 禁用指定日期             | Array                  | —      | —      |

## 插槽

| 插槽名称 | 说明                             |
| -------- | -------------------------------- |
| —        | 时间轴显示的内容，参数为日期对象 |
| prevWeek | 上一周按钮内容                   |
| prevDay  | 上一天按钮内容                   |
| nextDay  | 下一天按钮内容                   |
| nextWeek | 下一周按钮内容                   |

## 事件

| 事件名称 | 说明                         | 回调参数   |
| -------- | ---------------------------- | ---------- |
| select   | 选中日期的时候触发           | 选中的日期 |
| prevWeek | 点击上一周按钮触发           | 当前日期   |
| nextWeek | 点击下一周按钮触发           | 当前日期   |
| prevDay  | 点击上一天按钮触发           | 当前日期   |
| nextDay  | 点击下一天按钮触发           | 当前日期   |
| hide     | 更多日期选择器隐藏的时候触发 | —          |
| show     | 更多日期选择器显示的时候触发 | —          |
