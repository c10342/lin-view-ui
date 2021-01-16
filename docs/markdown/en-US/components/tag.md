# Tag

[[toc]]

---

## Basic usage

Select the type of tag by the `type` attribute, or define the background color through the `color` attribute.

:::demo

```vue
<template>
  <lin-tag text="label1"></lin-tag>
  <lin-tag text="label2" type="success"></lin-tag>
  <lin-tag text="label3" type="info"></lin-tag>
  <lin-tag text="label4" type="warning"></lin-tag>
  <lin-tag text="label5" type="danger"></lin-tag>
</template>
```

:::

## Removable label

Setting the `closable` property can define whether a label can be removed.

:::demo

```vue
<template>
  <lin-tag closable text="label1"></lin-tag>
  <lin-tag closable text="label2" type="success"></lin-tag>
  <lin-tag closable text="label3" type="info"></lin-tag>
  <lin-tag closable text="label4" type="warning"></lin-tag>
  <lin-tag closable text="label5" type="danger"></lin-tag>
</template>
```

:::

## Different themes

Change the theme by setting the `effect` property. The default is `light`

:::demo

```vue
<template>
  <div class="tag-row">
    <lin-tag effect="dark" closable text="label1"></lin-tag>
    <lin-tag effect="dark" closable text="label2" type="success"></lin-tag>
    <lin-tag effect="dark" closable text="label3" type="info"></lin-tag>
    <lin-tag effect="dark" closable text="label4" type="warning"></lin-tag>
    <lin-tag effect="dark" closable text="label5" type="danger"></lin-tag>
  </div>
  <div class="tag-row">
    <lin-tag effect="plain" closable text="label1"></lin-tag>
    <lin-tag effect="plain" closable text="label2" type="success"></lin-tag>
    <lin-tag effect="plain" closable text="label3" type="info"></lin-tag>
    <lin-tag effect="plain" closable text="label4" type="warning"></lin-tag>
    <lin-tag effect="plain" closable text="label5" type="danger"></lin-tag>
  </div>
</template>
```

:::

## Attributes

| Attribute | Description      | Type    | Accepted Values                     | Default |
| --------- | ---------------- | ------- | ----------------------------------- | ------- |
| type      | Type             | String  | primary,success,info,warning,danger | primary |
| text      | text             | String  | —                                   | —       |
| color     | Background color | String  | —                                   | —       |
| closable  | Can I close it   | Boolean | —                                   | false   |
| effect    | theme            | String  | dark , light , plain                | light   |

## Events

| Event Name | Description                         | Parameters |
| ---------- | ----------------------------------- | ---------- |
| click      | Event triggered when tag is clicked | —          |
| close      | Event triggered when tag is closed  | —          |
