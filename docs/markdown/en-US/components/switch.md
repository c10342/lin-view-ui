# Switch

[[toc]]

---

## Basic usage

Bi directional data binding using `v-model`

:::demo

```vue
<template>
  <lin-switch v-model="value1" />
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

## Background color

Use the `activeColor` and `inactiveColor` properties to set the background color of the switch

:::demo

```vue
<template>
  <lin-switch v-model="value2" active-color="green" inactive-color="red" />
</template>

<script>
export default {
  data() {
    return {
      value2: false,
    };
  },
};
</script>
```

:::

## Disabled

Adding the disabled attribute `disabled` Switch.

:::demo

```vue
<template>
  <lin-switch v-model="value3" disabled />
</template>

<script>
export default {
  data() {
    return {
      value3: false,
    };
  },
};
</script>
```

:::

## Essential attribute

Currently, only `name` can be bound to native properties

:::demo

```vue
<template>
  <lin-switch v-model="value4" name="userName" />
</template>

<script>
export default {
  data() {
    return {
      value4: false,
    };
  },
};
</script>
```

:::

## Attributes

| Attribute       | Description                         | Type    | Accepted Values | Default |
| --------------- | ----------------------------------- | ------- | --------------- | ------- |
| value / v-model | binding value                       | Boolean | —               | false   |
| activeColor     | Background color when switch is on  | String  | —               | —       |
| inactiveColor   | Background color when switch is off | String  | —               | —       |
| name            | input name of Switch                | String  | —               | —       |
| disabled        | whether Switch is disabled          | Boolean | —               | false   |
