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

# Tag 标签

---

## Basic usage

由 `type` 属性来选择 tag 的Type，也可以通过 `color` 属性来自定义背景色。

<div class='demo-block'>
      <lin-tag text="标签1"></lin-tag>
      <lin-tag text="标签2" type="success"></lin-tag>
      <lin-tag text="标签3" type="info"></lin-tag>
      <lin-tag text="标签4" type="warning"></lin-tag>
      <lin-tag text="标签5" type="danger"></lin-tag>
</div>

:::demo

```html
<div class="tag-row">
  <lin-tag text="标签1"></lin-tag>
  <lin-tag text="标签2" type="success"></lin-tag>
  <lin-tag text="标签3" type="info"></lin-tag>
  <lin-tag text="标签4" type="warning"></lin-tag>
  <lin-tag text="标签5" type="danger"></lin-tag>
</div>
```

:::

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。

<div class='demo-block'>
      <lin-tag closable text="标签1"></lin-tag>
      <lin-tag closable text="标签2" type="success"></lin-tag>
      <lin-tag closable text="标签3" type="info"></lin-tag>
      <lin-tag closable text="标签4" type="warning"></lin-tag>
      <lin-tag closable text="标签5" type="danger"></lin-tag>
</div>

:::demo

```html
<div class="tag-row">
  <lin-tag closable text="标签1"></lin-tag>
  <lin-tag closable text="标签2" type="success"></lin-tag>
  <lin-tag closable text="标签3" type="info"></lin-tag>
  <lin-tag closable text="标签4" type="warning"></lin-tag>
  <lin-tag closable text="标签5" type="danger"></lin-tag>
</div>
```

:::

## 不同主题

通过设置 `effect` 属性来改变主题，默认为 `light`。

<div class='demo-block'>
    <div class="tag-row">
      <lin-tag effect="dark" closable text="标签1"></lin-tag>
      <lin-tag effect="dark" closable text="标签2" type="success"></lin-tag>
      <lin-tag effect="dark" closable text="标签3" type="info"></lin-tag>
      <lin-tag effect="dark" closable text="标签4" type="warning"></lin-tag>
      <lin-tag effect="dark" closable text="标签5" type="danger"></lin-tag>
    </div>
    <div class="tag-row">
      <lin-tag effect="plain" closable text="标签1"></lin-tag>
      <lin-tag effect="plain" closable text="标签2" type="success"></lin-tag>
      <lin-tag effect="plain" closable text="标签3" type="info"></lin-tag>
      <lin-tag effect="plain" closable text="标签4" type="warning"></lin-tag>
      <lin-tag effect="plain" closable text="标签5" type="danger"></lin-tag>
    </div>
</div>

:::demo

```html
<div class="tag-row">
  <lin-tag effect="dark" closable text="标签1"></lin-tag>
  <lin-tag effect="dark" closable text="标签2" type="success"></lin-tag>
  <lin-tag effect="dark" closable text="标签3" type="info"></lin-tag>
  <lin-tag effect="dark" closable text="标签4" type="warning"></lin-tag>
  <lin-tag effect="dark" closable text="标签5" type="danger"></lin-tag>
</div>
<div class="tag-row">
  <lin-tag effect="plain" closable text="标签1"></lin-tag>
  <lin-tag effect="plain" closable text="标签2" type="success"></lin-tag>
  <lin-tag effect="plain" closable text="标签3" type="info"></lin-tag>
  <lin-tag effect="plain" closable text="标签4" type="warning"></lin-tag>
  <lin-tag effect="plain" closable text="标签5" type="danger"></lin-tag>
</div>
```

:::

## 属性

| 参数     | 说明       | Type    | Accepted Values                              | Default  |
| -------- | ---------- | ------- | ----------------------------------- | ------- |
| type     | Type       | String  | primary/success/info/warning/danger | primary |
| text     | 文本       | String  | —                                   | —       |
| color    | 背景色     | String  | —                                   | —       |
| closable | 是否可关闭 | Boolean | —                                   | false   |
| effect   | 主题       | String  | dark / light / plain                | light   |

## 事件

| Event Name | 说明                  | Parameters |
| -------- | --------------------- | -------- |
| click    | 点击 Tag 时触发的事件 | —        |
| close    | 关闭 Tag 时触发的事件 | —        |
