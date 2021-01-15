# Checkbox

[[toc]]

---

## Basic usage

To use the checkbox component, you only need to set the `v-model` binding variable. Selecting means that the value of the variable is `Boolean`

:::demo

```vue
<template>
  <lin-checkbox v-model="value1">man</lin-checkbox>
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

## Disabled

Just set the `disabled` attribute in the `lin-checkbox` or `lin-checkbox-group` elements. It accepts a `Boolean` and `true` is disabled

:::demo

```vue
<template>
  <lin-checkbox-group disabled v-model="value2">
    <lin-checkbox label="smoking"></lin-checkbox>
    <lin-checkbox label="drink"></lin-checkbox>
    <lin-checkbox label="probe"></lin-checkbox>
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

## Multi box group

The combination of the `lin-checkbox-group` element and the sub element `lin-checkbox` can realize multiple selection of groups. Bind the `v-model` in the `lin-checkbox-group` and set the `label` in the `lin-checkbox`. There is no need to bind variables to each `lin-checkbox`.

:::demo

```vue
<template>
  <lin-checkbox-group v-model="value3">
    <lin-checkbox label="smoking"></lin-checkbox>
    <lin-checkbox label="drink"></lin-checkbox>
    <lin-checkbox label="probe"></lin-checkbox>
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

## Checkbox Attributes

| Attribute       | Description                                                                       | Type                    | Accepted Values | Default |
| --------------- | --------------------------------------------------------------------------------- | ----------------------- | --------------- | ------- |
| value / v-model | binding value                                                                     | String, Number, Boolean | —               | —       |
| label           | The value of lin-checkbox can only be used in combination with lin-checkbox-group | String, Number, Boolean | —               | —       |
| name            | Native attribute name                                                             | String                  | —               | —       |
| disabled        | whether the Checkbox is disabled                                                  | Boolean                 | —               | false   |

## Checkbox Slots

| Name | Description          |
| ---- | -------------------- |
| —    | Custom label content |

## CheckboxGroup Attributes

| Attribute       | Description                           | Type                    | Accepted Values | Default |
| --------------- | ------------------------------------- | ----------------------- | --------------- | ------- |
| value / v-model | binding value                         | String, Number, Boolean | —               | —       |
| disabled        | whether the CheckboxGroup is disabled | Boolean                 | —               | false   |
