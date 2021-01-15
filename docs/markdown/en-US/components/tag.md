<style lang="scss" scoped>
.demo-block {
  ::v-deep .lin-tag {
    margin-right: 10px;
  }
}
.tag-row {
  margin-bottom:10px;
  ::v-deep .lin-tag {
    margin-right: 10px;
  }
}
</style>

# Tag

---

## Basic usage

Select the type of tag by the `type` attribute, or define the background color through the `color` attribute.

<div class='demo-block'>
      <lin-tag text="label1"></lin-tag>
      <lin-tag text="label2" type="success"></lin-tag>
      <lin-tag text="label3" type="info"></lin-tag>
      <lin-tag text="label4" type="warning"></lin-tag>
      <lin-tag text="label5" type="danger"></lin-tag>
</div>

:::demo

```html
<div class="tag-row">
  <lin-tag text="label1"></lin-tag>
  <lin-tag text="label2" type="success"></lin-tag>
  <lin-tag text="label3" type="info"></lin-tag>
  <lin-tag text="label4" type="warning"></lin-tag>
  <lin-tag text="label5" type="danger"></lin-tag>
</div>
```

:::

## Removable label

Setting the `closable` property can define whether a label can be removed.

<div class='demo-block'>
      <lin-tag closable text="label1"></lin-tag>
      <lin-tag closable text="label2" type="success"></lin-tag>
      <lin-tag closable text="label3" type="info"></lin-tag>
      <lin-tag closable text="label4" type="warning"></lin-tag>
      <lin-tag closable text="label5" type="danger"></lin-tag>
</div>

:::demo

```html
<div class="tag-row">
  <lin-tag closable text="label1"></lin-tag>
  <lin-tag closable text="label2" type="success"></lin-tag>
  <lin-tag closable text="label3" type="info"></lin-tag>
  <lin-tag closable text="label4" type="warning"></lin-tag>
  <lin-tag closable text="label5" type="danger"></lin-tag>
</div>
```

:::

## Different themes

Change the theme by setting the `effect` property. The default is `light`

<div class='demo-block'>
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
</div>

:::demo

```html
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
```

:::

## Attributes

| Attribute | Description      | Type    | Accepted Values                     | Default |
| --------- | ---------------- | ------- | ----------------------------------- | ------- |
| type      | Type             | String  | primary/success/info/warning/danger | primary |
| text      | text             | String  | —                                   | —       |
| color     | Background color | String  | —                                   | —       |
| closable  | Can I close it   | Boolean | —                                   | false   |
| effect    | theme            | String  | dark / light / plain                | light   |

## Events

| Event Name | Description                         | Parameters |
| ---------- | ----------------------------------- | ---------- |
| click      | Event triggered when tag is clicked | —          |
| close      | Event triggered when tag is closed  | —          |
