<style lang="scss" scoped>
.badge-item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>

# Badge 标记

---

## 基础用法

展示新消息数量。定义 `value` 属性，它接受 `Number` 或者 `String`。

<div class='demo-block'>
<lin-badge :value="12" class="badge-item">
    <lin-button>评论</lin-button>
    </lin-badge>
    <lin-badge :value="3" class="badge-item">
    <lin-button>回复</lin-button>
    </lin-badge>
    <lin-badge :value="1" class="badge-item" type="danger">
    <lin-button>评论</lin-button>
    </lin-badge>
    <lin-badge :value="2" class="badge-item" type="warning">
    <lin-button>回复</lin-button>
    </lin-badge>
</div>

:::demo

```html
<lin-badge :value="12" class="badge-item">
  <lin-button>评论</lin-button>
</lin-badge>
<lin-badge :value="3" class="badge-item">
  <lin-button>回复</lin-button>
</lin-badge>
<lin-badge :value="1" class="badge-item" type="danger">
  <lin-button>评论</lin-button>
</lin-badge>
<lin-badge :value="2" class="badge-item" type="warning">
  <lin-button>回复</lin-button>
</lin-badge>
```

:::

## 最大值

可自定义最大值。由 `max` 属性定义，它接受一个 `Number`，需要注意的是，只有当 `value` 为 `Number` 时，它才会生效。

<div class='demo-block'>
      <lin-badge :value="200" :max="99" class="badge-item">
        <lin-button>评论</lin-button>
      </lin-badge>
      <lin-badge :value="100" :max="10" class="badge-item">
        <lin-button>回复</lin-button>
      </lin-badge>
</div>

:::demo

```html
<lin-badge :value="200" :max="99" class="badge-item">
  <lin-button>评论</lin-button>
</lin-badge>
<lin-badge :value="100" :max="10" class="badge-item">
  <lin-button>回复</lin-button>
</lin-badge>
```

:::

## 自定义内容

可以显示数字以外的文本内容。定义 `value` 为 `String` 类型是时可以用于显示自定义文本。

<div class='demo-block'>
      <lin-badge value="new" class="badge-item">
        <lin-button>评论</lin-button>
      </lin-badge>
      <lin-badge value="hot" class="badge-item">
        <lin-button>回复</lin-button>
      </lin-badge>
</div>

:::demo

```html
<lin-badge value="new" class="badge-item">
  <lin-button>评论</lin-button>
</lin-badge>
<lin-badge value="hot" class="badge-item">
  <lin-button>回复</lin-button>
</lin-badge>
```

:::

## 小红点

以红点的形式标注需要关注的内容。除了数字外，设置 `is-dot` 属性，它接受一个 `Boolean`。

<div class='demo-block'>
      <lin-badge is-dot class="badge-item">数据查询</lin-badge>
      <lin-badge is-dot class="badge-item">
        <lin-button icon="lin-icon-thumbsup" type="primary"></lin-button>
      </lin-badge>
</div>

:::demo

```html
<lin-badge is-dot class="badge-item">数据查询</lin-badge>
<lin-badge is-dot class="badge-item">
  <lin-button icon="lin-icon-thumbsup" type="primary"></lin-button>
</lin-badge>
```

:::

## 属性

| 参数   | 说明                                                         | 类型           | 可选值                                          | 默认值  |
| ------ | ------------------------------------------------------------ | -------------- | ----------------------------------------------- | ------- |
| value  | 显示值                                                       | String，Number | —                                               | —       |
| max    | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 | Number         | —                                               | —       |
| is-dot | 小圆点                                                       | Boolean        | —                                               | false   |
| type   | 类型                                                         | String         | primary ， success ， warning ， danger ， info | primary |
