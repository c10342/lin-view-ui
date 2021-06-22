# Radio

[[toc]]

---

## Basic usage

To use the radio component, you only need to set the `v-model` binding variable. Selecting means that the value of the variable is the value of the corresponding radio `label` property. The label can be `String`,`Number` or `Boolean`

:::demo

```vue
<template>
  <lin-radio label="1" v-model="value1">man</lin-radio>
  <lin-radio label="2" v-model="value1">woman</lin-radio>
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

## Disabled

Just set the `disabled` attribute in the `lin-radio` or `lin-radio-group` elements. It accepts a `Boolean` and `true` is disabled

:::demo

```vue
<template>
  <lin-radio disabled label="1" v-model="value2">man</lin-radio>
  <lin-radio disabled label="2" v-model="value2">woman</lin-radio>
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

## Radio box group

The combination of the `lin-radio-group` element and the sub element `lin-radio` can realize the single selection group. Bind the `v-model` in the `lin-radio-group` and set the `label` in the `lin-radio` field. There is no need to bind each `lin-radio` variable.

:::demo

```vue
<template>
  <lin-radio-group v-model="value3">
    <lin-radio label="3">man</lin-radio>
    <lin-radio label="4">woman</lin-radio>
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

## Radio Attributes

| Attribute       | Description               | Type                    | Accepted Values | Default |
| --------------- | ------------------------- | ----------------------- | --------------- | ------- |
| value / v-model | binding value             | String, Number, Boolean | —               | —       |
| label           | the value of Radio        | String, Number, Boolean | —               | —       |
| name            | native 'name' attribute   | String                  | —               | —       |
| disabled        | whether Radio is disabled | Boolean                 | —               | false   |

## Radio slots

| Name | Description          |
| ---- | -------------------- |
| —    | Custom label content |

## RadioGroup Attributes

| Attribute       | Description                    | Type                    | Accepted Values | Default |
| --------------- | ------------------------------ | ----------------------- | --------------- | ------- |
| value / v-model | binding value                  | String, Number, Boolean | —               | —       |
| disabled        | whether RadioGroup is disabled | Boolean                 | —               | false   |
