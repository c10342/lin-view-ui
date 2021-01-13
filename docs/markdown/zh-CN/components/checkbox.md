# Checkbox 多选框

---

## 基础用法

要使用 Checkbox 组件，只需要设置 `v-model` 绑定变量，选中意味着变量的值为`Boolean`

:::demo

```vue
<template>
  <lin-checkbox v-model="value1">男</lin-checkbox>
</template>

<script>
export default {
  data() {
    return {
      value1: false,
    };
  },
};
</script>
```

:::

## 禁用状态

只要在 `lin-checkbox` 或者 `lin-checkbox-group` 元素中设置 `disabled` 属性即可，它接受一个 `Boolean` ，`true` 为禁用

:::demo

```vue
<template>
  <lin-checkbox-group disabled v-model="value2">
    <lin-checkbox label="抽烟"></lin-checkbox>
    <lin-checkbox label="喝酒"></lin-checkbox>
    <lin-checkbox label="探头"></lin-checkbox>
  </lin-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      value2: [],
    };
  },
};
</script>
```

:::

## 多选框组

结合 `lin-checkbox-group` 元素和子元素 `lin-checkbox` 可以实现多选组，在 `lin-checkbox-group` 中绑定 `v-model` ，在 `lin-checkbox` 中设置好 `label` 即可，无需再给每一个 `lin-checkbox` 绑定变量。

:::demo

```vue
<template>
  <lin-checkbox-group v-model="value3">
    <lin-checkbox label="抽烟"></lin-checkbox>
    <lin-checkbox label="喝酒"></lin-checkbox>
    <lin-checkbox label="探头"></lin-checkbox>
  </lin-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      value3: [],
    };
  },
};
</script>
```

:::

## Checkbox 属性

| 参数            | 说明                                                    | 类型                    | 可选值 | 默认值 |
| --------------- | ------------------------------------------------------- | ----------------------- | ------ | ------ |
| value / v-model | 绑定值                                                  | String, Number, Boolean | —      | —      |
| label           | lin-checkbox 的 value，只能结合 lin-checkbox-group 使用 | String, Number, Boolean | —      | —      |
| name            | 原生属性 name                                           | String                  | —      | —      |
| disabled        | 是否禁用                                                | Boolean                 | —      | false  |

## Checkbox 插槽

| 插槽名称 | 说明           |
| -------- | -------------- |
| —        | 自定义标签内容 |

## CheckboxGroup 属性

| 参数            | 说明     | 类型                    | 可选值 | 默认值 |
| --------------- | -------- | ----------------------- | ------ | ------ |
| value / v-model | 绑定值   | String, Number, Boolean | —      | —      |
| disabled        | 是否禁用 | Boolean                 | —      | false  |
