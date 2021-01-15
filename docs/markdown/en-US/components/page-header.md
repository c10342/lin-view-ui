# PageHeader

[[toc]]

---

## Basic usage

:::demo

```vue
<template>
  <lin-page-header title="Details page" @back="back"></lin-page-header>
</template>

<script>
export default {
  methods: {
    back() {
      alert("back");
    },
  },
};
</script>
```

:::

## Show right button

Set the `right` property to display the button on the right

:::demo

```vue
<template>
  <lin-page-header
    title="List page"
    :back="false"
    right
    @more="more"
  ></lin-page-header>
</template>

<script>
export default {
  methods: {
    more() {
      alert("more");
    },
  },
};
</script>
```

:::

## Show bottom border

Set the `border` property to display the bottom border

:::demo

```vue
<template>
  <lin-page-header title="Details page" border></lin-page-header>
</template>
```

:::

## Show active status

Set the `active` property to display the activation status

:::demo

```vue
<template>
  <lin-page-header
    title="List page"
    :back="false"
    right
    active
    border
  ></lin-page-header>
</template>
```

:::

## Attributes

| Attribute | Description                                | Type    | Accepted Values | Default |
| --------- | ------------------------------------------ | ------- | --------------- | ------- |
| back      | Is the return button displayed             | Boolean | —               | true    |
| backTip   | Back to button text                        | String  | —               | Back    |
| title     | title                                      | String  | —               | —       |
| right     | Is the right button displayed              | Boolean | —               | false   |
| active    | Whether the activation status is displayed | Boolean | —               | false   |
| border    | Show bottom border                         | Boolean | —               | false   |

## Slots

| Name  | Description                          |
| ----- | ------------------------------------ |
| —     | Content of the title                 |
| back  | Return to the contents of the button |
| right | Content of the right button          |

## Events

| Event Name | Description                                      | Parameters |
| ---------- | ------------------------------------------------ | ---------- |
| back       | Triggered when you click the back button         | —          |
| more       | Triggered when you click the button on the right | —          |
