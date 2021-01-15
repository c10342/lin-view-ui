# Link

[[toc]]

---

## Basic usage

Basic text link

:::demo

```vue
<template>
  <div class="link-group">
    <lin-link href="https://github.com/c10342/lin-view-ui" target="_blank"
      >default</lin-link
    >
    <lin-link type="primary">primary</lin-link>
    <lin-link type="success">success</lin-link>
    <lin-link type="warning">warning</lin-link>
    <lin-link type="danger">danger</lin-link>
    <lin-link type="info">info</lin-link>
  </div>
</template>
```

:::

## Disabled

Disabled state of link

:::demo

```vue
<template>
  <div class="link-group">
    <lin-link disabled>default</lin-link>
    <lin-link type="primary" disabled>primary</lin-link>
    <lin-link type="success" disabled>success</lin-link>
    <lin-link type="warning" disabled>warning</lin-link>
    <lin-link type="danger" disabled>danger</lin-link>
    <lin-link type="info" disabled>info</lin-link>
  </div>
</template>
```

:::

## Underline

Underline of link

:::demo

```vue
<template>
  <div class="link-group">
    <lin-link :underline="false">Without Underline</lin-link>
    <lin-link>With Underline</lin-link>
  </div>
</template>
```

:::

## Icon

Link with icon

:::demo

```vue
<template>
  <div class="link-group">
    <lin-link icon="lin-icon-thumbsup">Edit</lin-link>
    <lin-link
      >Check<i style="margin-left:5px;" class="lin-icon-chat"></i>
    </lin-link>
  </div>
</template>
```

:::

## Attributes

| Attribute | Description                         | Type    | Accepted values                             | Default |
| --------- | ----------------------------------- | ------- | ------------------------------------------- | ------- |
| type      | type                                | String  | primary , success , warning , danger , info | default |
| underline | whether the component has underline | Boolean | —                                           | true    |
| disabled  | whether the component is disabled   | Boolean | —                                           | false   |
| href      | same as native hyperlink's `href`   | String  | —                                           | false   |
| icon      | class name of icon                  | String  | —                                           | —       |

## Slots

| Name | Description     |
| ---- | --------------- |
| —    | Content of Link |
