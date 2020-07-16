<style lang="scss" scoped>
.demo-block {
  ::v-deep .l-tag {
    margin-right: 10px;
  }
}
.tag-row {
  margin-bottom:10px;
  ::v-deep .l-tag {
    margin-right: 10px;
  }
}
</style>

# Tag 标签

---

## 基础用法

由 `type` 属性来选择 tag 的类型，也可以通过 `color` 属性来自定义背景色。

<div class='demo-block'>
      <l-tag text="标签1"></l-tag>
      <l-tag text="标签2" type="success"></l-tag>
      <l-tag text="标签3" type="info"></l-tag>
      <l-tag text="标签4" type="warning"></l-tag>
      <l-tag text="标签5" type="danger"></l-tag>
</div>

:::demo

```html
<div class="tag-row">
  <l-tag text="标签1"></l-tag>
  <l-tag text="标签2" type="success"></l-tag>
  <l-tag text="标签3" type="info"></l-tag>
  <l-tag text="标签4" type="warning"></l-tag>
  <l-tag text="标签5" type="danger"></l-tag>
</div>
```

:::

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。

<div class='demo-block'>
      <l-tag closable text="标签1"></l-tag>
      <l-tag closable text="标签2" type="success"></l-tag>
      <l-tag closable text="标签3" type="info"></l-tag>
      <l-tag closable text="标签4" type="warning"></l-tag>
      <l-tag closable text="标签5" type="danger"></l-tag>
</div>

:::demo

```html
<div class="tag-row">
  <l-tag closable text="标签1"></l-tag>
  <l-tag closable text="标签2" type="success"></l-tag>
  <l-tag closable text="标签3" type="info"></l-tag>
  <l-tag closable text="标签4" type="warning"></l-tag>
  <l-tag closable text="标签5" type="danger"></l-tag>
</div>
```

:::

## 不同主题

通过设置 `effect` 属性来改变主题，默认为 `light`。

<div class='demo-block'>
    <div class="tag-row">
      <l-tag effect="dark" closable text="标签1"></l-tag>
      <l-tag effect="dark" closable text="标签2" type="success"></l-tag>
      <l-tag effect="dark" closable text="标签3" type="info"></l-tag>
      <l-tag effect="dark" closable text="标签4" type="warning"></l-tag>
      <l-tag effect="dark" closable text="标签5" type="danger"></l-tag>
    </div>
    <div class="tag-row">
      <l-tag effect="plain" closable text="标签1"></l-tag>
      <l-tag effect="plain" closable text="标签2" type="success"></l-tag>
      <l-tag effect="plain" closable text="标签3" type="info"></l-tag>
      <l-tag effect="plain" closable text="标签4" type="warning"></l-tag>
      <l-tag effect="plain" closable text="标签5" type="danger"></l-tag>
    </div>
</div>

:::demo

```html
<div class="tag-row">
  <l-tag effect="dark" closable text="标签1"></l-tag>
  <l-tag effect="dark" closable text="标签2" type="success"></l-tag>
  <l-tag effect="dark" closable text="标签3" type="info"></l-tag>
  <l-tag effect="dark" closable text="标签4" type="warning"></l-tag>
  <l-tag effect="dark" closable text="标签5" type="danger"></l-tag>
</div>
<div class="tag-row">
  <l-tag effect="plain" closable text="标签1"></l-tag>
  <l-tag effect="plain" closable text="标签2" type="success"></l-tag>
  <l-tag effect="plain" closable text="标签3" type="info"></l-tag>
  <l-tag effect="plain" closable text="标签4" type="warning"></l-tag>
  <l-tag effect="plain" closable text="标签5" type="danger"></l-tag>
</div>
```

:::

## 属性

| 参数     | 说明       | 类型    | 可选值                              | 默认值  |
| -------- | ---------- | ------- | ----------------------------------- | ------- |
| type     | 类型       | String  | primary/success/info/warning/danger | primary |
| text     | 文本       | String  | —                                   | —       |
| color    | 背景色     | String  | —                                   | —       |
| closable | 是否可关闭 | Boolean | —                                   | false   |
| effect   | 主题       | String  | dark / light / plain                | light   |

## 事件

| 事件名称 | 说明                  | 回调参数 |
| -------- | --------------------- | -------- |
| click    | 点击 Tag 时触发的事件 | —        |
| close    | 关闭 Tag 时触发的事件 | —        |
