# Radio 单选框

[[toc]]

---

## 基础用法

要使用 Radio 组件，只需要设置 `v-model` 绑定变量，选中意味着变量的值为相应 Radio `label` 属性的值，label 可以是 `String` 、 `Number` 或 `Boolean`

:::demo

```vue
<template>
  <lin-radio label="1" v-model="value1">男</lin-radio>
  <lin-radio label="2" v-model="value1">女</lin-radio>
</template>

<script>
export default {
  data() {
    return {
      value1: "1",
    };
  },
};
</script>
```

:::

## 禁用状态

只要在 `lin-radio` 或者 `lin-radio-group` 元素中设置 `disabled` 属性即可，它接受一个 `Boolean` ，`true` 为禁用

:::demo

```vue
<template>
  <lin-radio disabled label="1" v-model="value2">男</lin-radio>
  <lin-radio disabled label="2" v-model="value2">女</lin-radio>
</template>

<script>
export default {
  data() {
    return {
      value2: "2",
    };
  },
};
</script>
```

:::

## 单选框组

结合 `lin-radio-group` 元素和子元素 `lin-radio` 可以实现单选组，在 `lin-radio-group` 中绑定 `v-model` ，在 `lin-radio` 中设置好 `label` 即可，无需再给每一个 `lin-radio` 绑定变量。

:::demo

```vue
<template>
  <lin-radio-group v-model="value3">
    <lin-radio label="3">男</lin-radio>
    <lin-radio label="4">女</lin-radio>
  </lin-radio-group>
</template>

<script>
export default {
  data() {
    return {
      value3: "3",
    };
  },
};
</script>
```

:::

## Radio 属性

| 参数            | 说明           | 类型                    | 可选值 | 默认值 |
| --------------- | -------------- | ----------------------- | ------ | ------ |
| value / v-model | 绑定值         | String, Number, Boolean | —      | —      |
| label           | Radio 的 value | String, Number, Boolean | —      | —      |
| name            | 原生属性 name  | String                  | —      | —      |
| disabled        | 是否禁用       | Boolean                 | —      | false  |

## Radio 插槽

| 插槽名称 | 说明           |
| -------- | -------------- |
| —        | 自定义标签内容 |

## RadioGroup 属性

| 参数            | 说明     | 类型                    | 可选值 | 默认值 |
| --------------- | -------- | ----------------------- | ------ | ------ |
| value / v-model | 绑定值   | String, Number, Boolean | —      | —      |
| disabled        | 是否禁用 | Boolean                 | —      | false  |
