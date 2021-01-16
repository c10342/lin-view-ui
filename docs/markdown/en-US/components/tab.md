# Tab

[[toc]]

---

## Basic usage

Basic, concise tabs. The `Tab` component provides the tab function. The first tab is selected by default. You can also specify the currently selected tab through the value attribute.

:::demo

```vue
<template>
  <lin-tab-group v-model="activeName" @tab-click="handleClick">
    <lin-tab-item label="User" name="first">User</lin-tab-item>
    <lin-tab-item label="Config" name="second">Config</lin-tab-item>
    <lin-tab-item label="Role" name="third">Role</lin-tab-item>
    <lin-tab-item label="Task" name="fourth">Task</lin-tab-item>
  </lin-tab-group>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(data) {
      console.log(data);
    },
  },
};
</script>
```

:::

## Card Style

Tabs styled as cards.Set `type` to `card` can get a card-styled tab.

:::demo

```vue
<template>
  <lin-tab-group type="card">
    <lin-tab-item label="User" name="first">User</lin-tab-item>
    <lin-tab-item label="Config" name="second">Config</lin-tab-item>
    <lin-tab-item label="Role" name="third">Role</lin-tab-item>
    <lin-tab-item label="Task" name="fourth">Task</lin-tab-item>
  </lin-tab-group>
</template>
```

:::

## Border card

Border card tabs.Set `type` to `border-card`.

:::demo

```vue
<template>
  <lin-tab-group type="border-card">
    <lin-tab-item label="User" name="first">User</lin-tab-item>
    <lin-tab-item label="Config" name="second">Config</lin-tab-item>
    <lin-tab-item label="Role" name="third">Role</lin-tab-item>
    <lin-tab-item label="Task" name="fourth">Task</lin-tab-item>
  </lin-tab-group>
</template>
```

:::

## Custom Tab

You can use named slot to customize the tab label content.

:::demo

```vue
<template>
  <lin-tab-group type="border-card">
    <lin-tab-item label="Route" name="first">
      <span slot="label">
        <i class="lin-icon-date"></i>
        <span>Route</span>
      </span>
      Route
    </lin-tab-item>
    <lin-tab-item label="Config" name="second">Config</lin-tab-item>
    <lin-tab-item label="Role" name="third">Role</lin-tab-item>
    <lin-tab-item label="Task" name="fourth">Task</lin-tab-item>
  </lin-tab-group>
</template>
```

:::

## TabGroup Attributes

| Attribute       | Description                             | Type   | Accepted Values  | Default |
| --------------- | --------------------------------------- | ------ | ---------------- | ------- |
| value / v-model | binding value, name of the selected tab | String | —                | —       |
| type            | type of Tab                             | String | card,border-card | —       |

## TabGroup Events

| Event Name | Description                    | Parameters  |
| ---------- | ------------------------------ | ----------- |
| tab-click  | triggers when a tab is clicked | clicked tab |

## TabItem Attributes

| Attribute | Description                                                                         | Type    | Accepted Values | Default                                                                      |
| --------- | ----------------------------------------------------------------------------------- | ------- | --------------- | ---------------------------------------------------------------------------- |
| label     | title of the TabItem                                                                | String  | —               | —                                                                            |
| name      | identifier corresponding to the name of Tabs, representing the alias of the TabItem | String  | —               | ordinal number of the TabItem in the sequence, e.g. the first TabItem is '1' |
| disabled  | whether Tab is disabled                                                             | Boolean | —               | false                                                                        |

## TabItem Slots

| Name  | Description     |
| ----- | --------------- |
| —     | TabItem content |
| label | Custom label    |
