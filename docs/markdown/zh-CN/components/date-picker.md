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

# DatePicker 日期选择器

---

# 基础用法

`v-model` 绑定的值就是选中的日期

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

## 禁用日期

`disabledBeforeDate` 可禁用小于等于该日期的日期。`disabledAfterDate` 可禁用大于等于该日期的日期。
`disabledRangeDate` 可禁用范围内的时间，它是一个数组，第一项为开始时间，第二项为结束时间，数组只有一项的时候，效果跟 `disabledAfterDate` 属性一样。`disabledDate` 禁用指定日期，它接收一个数组。

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

## 禁用整个日期选择器

设置 `disabled` 属性为 `true` 即可禁用整个日期选择器

<div class='demo-block'>
<lin-date-picker disabled />
</div>

:::demo

```html
<lin-date-picker disabled />
```

:::

## 自定义显示日期块

当你需要自定义显示日期块的样式和结构时，你可以设置 `renderInfo` ，并返回一个 jsx

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
          return <span>今天</span>;
        }
        return null;
      },
    },
  };
</script>
```

:::

## 其他使用

当你需要日期选择一直显示并且隐藏输入框，你可以设置 `showAlways` 属性和 `showInput` 属性

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

## 属性

| 参数               | 说明                                                                                                | 类型                   | 可选值             | 默认值     |
| ------------------ | --------------------------------------------------------------------------------------------------- | ---------------------- | ------------------ | ---------- |
| radius             | 日期块是否为圆角                                                                                    | Boolean                | —                  | false      |
| cellWidth          | 日期块宽度                                                                                          | Number                 | —                  | 32         |
| value / v-model    | 绑定值                                                                                              | Date / String / Number | —                  | —          |
| cellHeight         | 日期块高度                                                                                          | Number                 | —                  | 32         |
| labelHeight        | 头部标签的高度                                                                                      | Number                 | —                  | 32         |
| disabled           | 是否禁用                                                                                            | Boolean                | —                  | false      |
| placeholder        | 输入框占位符                                                                                        | String                 | —                  | 请选择日期 |
| disabledBeforeDate | 禁用小于等于该日期的日期                                                                            | Date / String / Number | —                  | —          |
| disabledAfterDate  | 禁用大于等于该日期的日期                                                                            | Date / String / Number | —                  | —          |
| disabledRangeDate  | 禁用指定范围内的日期                                                                                | Array                  | —                  | —          |
| disabledDate       | 禁用指定日期                                                                                        | Array                  | —                  | —          |
| renderInfo         | 自定义渲染日期块，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个是日期对象。可以使用 jsx | Function               | —                  | —          |
| format             | 格式化 value/v-model 绑定值                                                                         | String                 | string/number/Date | string     |
| showFormat         | 自定义输入框的显示内容                                                                              | Function               | —                  | —          |
| showAlways         | 是否一直显示时间选择器                                                                              | Boolean                | —                  | false      |
| showInput          | 是否显示输入框                                                                                      | Boolean                | —                  | true       |

## 事件

| 事件名称  | 说明                 | 回调参数       |
| --------- | -------------------- | -------------- |
| prevYear  | 点击上一年按钮触发   | 日期对象       |
| nextYear  | 点击下一年按钮触发   | 日期对象       |
| prevMonth | 点击上一个月按钮触发 | 日期对象       |
| nextMonth | 点击下一个月按钮触发 | 日期对象       |
| select    | 选中日期时触发       | 选中的日期对象 |
| focus     | 日期选择器显示时触发 | —              |
| blur      | 日期选择器隐藏时触发 | —              |
