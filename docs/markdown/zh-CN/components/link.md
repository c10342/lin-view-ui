<style lang="scss" scoped>
.link-group {
  margin-top: 10px;
  > a {
    margin-right: 10px;
  }
}
</style>

# Link 文字链接

---

## 基础用法

基础的文字链接用法。

<div class='demo-block'>
    <div class="link-group">
      <lin-link href="https://github.com/c10342/lin-view-ui" target="_blank"
        >默认链接</lin-link
      >
      <lin-link type="primary">主要链接</lin-link>
      <lin-link type="success">成功链接</lin-link>
      <lin-link type="warning">警告链接</lin-link>
      <lin-link type="danger">危险链接</lin-link>
      <lin-link type="info">信息链接</lin-link>
    </div>
</div>

:::demo

```html
<lin-link href="https://github.com/c10342/lin-view-ui" target="_blank"
  >默认链接</lin-link
>
<lin-link type="primary">主要链接</lin-link>
<lin-link type="success">成功链接</lin-link>
<lin-link type="warning">警告链接</lin-link>
<lin-link type="danger">危险链接</lin-link>
<lin-link type="info">信息链接</lin-link>
```

:::

## 禁用状态

文字链接不可用状态。

<div class='demo-block'>
    <div class="link-group">
      <lin-link disabled>默认链接</lin-link>
      <lin-link type="primary" disabled>主要链接</lin-link>
      <lin-link type="success" disabled>成功链接</lin-link>
      <lin-link type="warning" disabled>警告链接</lin-link>
      <lin-link type="danger" disabled>危险链接</lin-link>
      <lin-link type="info" disabled>信息链接</lin-link>
    </div>
</div>

:::demo

```html
<lin-link disabled>默认链接</lin-link>
<lin-link type="primary" disabled>主要链接</lin-link>
<lin-link type="success" disabled>成功链接</lin-link>
<lin-link type="warning" disabled>警告链接</lin-link>
<lin-link type="danger" disabled>危险链接</lin-link>
<lin-link type="info" disabled>信息链接</lin-link>
```

:::

## 下划线

文字链接下划线。

<div class='demo-block'>
    <div class="link-group">
      <lin-link :underline="false">无下划线</lin-link>
      <lin-link>有下划线</lin-link>
    </div>
</div>

:::demo

```html
<lin-link :underline="false">无下划线</lin-link> <lin-link>有下划线</lin-link>
```

:::

## 图标

带图标的文字链接可增强辨识度。

<div class='demo-block'>
<div class="link-group">
      <lin-link icon="lin-icon-thumbsup">编辑</lin-link>
      <lin-link>查看<i style='margin-left:5px;' class="lin-icon-chat"></i> </lin-link>
    </div>
</div>

:::demo

```html
<lin-link icon="lin-icon-thumbsup">编辑</lin-link>
<lin-link>查看<i style="margin-left:5px;" class="lin-icon-chat"></i> </lin-link>
```

:::

## 属性

| 参数      | 说明           | 类型    | 可选值                                      | 默认值  |
| --------- | -------------- | ------- | ------------------------------------------- | ------- |
| type      | 类型           | String  | primary / success / warning / danger / info | default |
| underline | 是否下划线     | Boolean | —                                           | true    |
| disabled  | 是否禁用状态   | Boolean | —                                           | false   |
| href      | 原生 href 属性 | String  | —                                           | false   |
| icon      | 图标类名       | String  | —                                           | —       |

## 插槽

| 插槽名称 | 说明     |
| -------- | -------- |
| —        | 链接内容 |
