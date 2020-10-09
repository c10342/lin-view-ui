# Skeleton 骨架屏

---

## 关于骨架屏介绍

骨架屏的作用主要是在网络请求较慢时，提供基础占位，当数据加载完成，恢复数据展示。这样给用户一种很自然的过渡，不会造成页面长时间白屏或者闪烁等情况。
常见的骨架屏实现方案有 `ssr` 服务端渲染和 `prerender` 两种解决方案。这里的组件只是一个很简单的样式而已。

## 骨架屏样式组件

当文本没有加载出来时，显示文本的默认占位图。

<div class="demo-block">
    <lin-row>
      <lin-col :span="4">
        <lin-skeleton></lin-skeleton>
      </lin-col>
      <lin-col :span="4" class="ml-10">
        <lin-row>
          <lin-col :span="12">
            <lin-skeleton :proportion="0.2"></lin-skeleton>
          </lin-col>
          <lin-col :span="24" class="mt-10">
            <lin-skeleton :proportion="0.1"></lin-skeleton>
          </lin-col>
          <lin-col :span="24" class="mt-10">
            <lin-skeleton :proportion="0.1"></lin-skeleton>
          </lin-col>
        </lin-row>
      </lin-col>
    </lin-row>
</div>

::: demo

```html
<lin-row>
  <lin-col :span="4">
    <lin-skeleton></lin-skeleton>
  </lin-col>
  <lin-col :span="4" class="ml-10">
    <lin-row>
      <lin-col :span="12">
        <lin-skeleton :proportion="0.2"></lin-skeleton>
      </lin-col>
      <lin-col :span="24" class="mt-10">
        <lin-skeleton :proportion="0.1"></lin-skeleton>
      </lin-col>
      <lin-col :span="24" class="mt-10">
        <lin-skeleton :proportion="0.1"></lin-skeleton>
      </lin-col>
    </lin-row>
  </lin-col>
</lin-row>
```

:::

## 属性

| 参数       | 说明     | Type   | Accepted Values | Default |
| ---------- | -------- | ------ | --------------- | ------- |
| width      | 占位长度 | String | —               | 100%    |
| height     | 占位宽度 | String | —               | —       |
| proportion | 高、宽比 | Number | —               | 1       |
| bgColor    | 背景色   | String | —               | #b4bccc |
