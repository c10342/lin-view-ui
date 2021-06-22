# Magnifier 放大镜

[[toc]]

---

## 基础用法

需要设置属性 `smallPic` 和 `bigPic` 图片路径。还有属性 `smallStyle` 和 `bigStyle` 的宽高。

:::demo

```vue
<template>
  <lin-magnifier
    :smallStyle="{ width: '350px', height: '350px' }"
    :bigStyle="{ width: '450px', height: '450px' }"
    :smallPic="require('../../../assets/img/small.jpg')"
    :bigPic="require('../../../assets/img/big.jpg')"
  ></lin-magnifier>
</template>
```

:::

## 插槽

`Magnifier` 放大镜组件提供了 `small` 、 `move` 和 `big` 三个具名插槽

:::demo

```vue
<template>
  <lin-magnifier
    :smallStyle="{ width: '350px', height: '350px' }"
    :bigStyle="{ width: '450px', height: '450px' }"
  >
    <template slot="small">
      <img :src="require('../../../assets/img/small.jpg')" />
    </template>
    <template slot="big">
      <img :src="require('../../../assets/img/big.jpg')" />
    </template>
    <template slot="move">
      <div style="width:50px;height:50px;background-color:green;"></div>
    </template>
  </lin-magnifier>
</template>
```

:::

## 属性

| 参数       | 说明                                     | 类型   | 可选值 | 默认值 |
| ---------- | ---------------------------------------- | ------ | ------ | ------ |
| smallPic   | 小图片路径地址                           | String | —      | —      |
| bigPic     | 大图片路径地址                           | String | —      | —      |
| smallStyle | 小图片样式（必须设置宽高，否则宽高为 0） | Object | —      | —      |
| bigStyle   | 大图片样式（必须设置宽高，否则宽高为 0） | Object | —      | —      |
| maskColor  | 鼠标移动的遮罩层背景色                   | String | —      | —      |

## 插槽

| 插槽名称 | 说明               |
| -------- | ------------------ |
| small    | 小图片 的内容      |
| move     | 鼠标移动跟随的内容 |
| big      | 大图片 的内容      |

## 事件

| 事件名称 | 说明                 | 回调参数       |
| -------- | -------------------- | -------------- |
| show     | 大图片显示的时候触发 | —              |
| hide     | 大图片隐藏的时候触发 | —              |
| move     | 鼠标移动的时候触发   | event 事件对象 |
