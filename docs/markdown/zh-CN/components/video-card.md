# VideoCard 卡片

[[toc]]

---

## 基础用法

使用`imageUrl`属性来定义卡片的封面，以及自定义卡片底部内容即可。

::: demo

```vue
<template>
  <lin-video-card :imageUrl="require('../../../assets/img/video-card.png')">
    <template>
      <div class="card-bottom">
        <p>春风得意</p>
        <p>这是一个卡片</p>
        <p>lin-view-ui</p>
      </div>
    </template>
  </lin-video-card>
</template>
```

:::

## 定义卡片宽高

使用`cardHeight`和`cardWidth`属性来定义卡片的宽度和高度

:::demo

```vue
<template>
  <lin-video-card
    cardHeight="270px"
    cardWidth="300px"
    :imageUrl="require('../../../assets/img/video-card.png')"
  >
    <template>
      <div class="card-bottom">
        <p>春风得意</p>
        <p>这是一个卡片</p>
        <p>lin-vue-ui</p>
      </div>
    </template>
  </lin-video-card>
</template>
```

:::

## 定义图片高度

使用`imageHeight`属性来定义图片的高度

:::demo

```vue
<template>
  <lin-video-card
    imageHeight="150px"
    :imageUrl="require('../../../assets/img/video-card.png')"
  >
    <template>
      <div class="card-bottom">
        <p>春风得意</p>
        <p>这是一个卡片</p>
        <p>lin-vue-ui</p>
      </div>
    </template>
  </lin-video-card>
</template>
```

:::

## 定义默认图片

使用`defaultImageUrl`属性来定义默认图片，当 imageUrl 的值为空或者 imageUrl 加载失败就会显示默认图片。

:::demo

```vue
<template>
  <lin-video-card :defaultImageUrl="require('../../../assets/img/logo.png')">
    <template>
      <div class="card-bottom">
        <p>春风得意</p>
        <p>这是一个卡片</p>
        <p>lin-vue-ui</p>
      </div>
    </template>
  </lin-video-card>
</template>
```

:::

## 封面右下角提示

使用`coverTip`属性来定义封面右下角的提示

:::demo

```vue
<template>
  <lin-video-card
    coverTip="小提示"
    :imageUrl="require('../../../assets/img/video-card.png')"
    :defaultImageUrl="require('../../../assets/img/logo.png')"
  >
    <template>
      <div class="card-bottom">
        <p>春风得意</p>
        <p>这是一个卡片</p>
        <p>lin-vue-ui</p>
      </div>
    </template>
  </lin-video-card>
</template>
```

:::

## 图片加载失败提示语

使用`errorTip`属性来定义图片加载失败时显示的提示语，当 imageUrl 和 defaultImageUrl 为空或者都加载失败时就会显示该提示语

:::demo

```vue
<template>
  <lin-video-card errorTip="图片加载失败">
    <template>
      <div class="card-bottom">
        <p>春风得意</p>
        <p>这是一个卡片</p>
        <p>lin-vue-ui</p>
      </div>
    </template>
  </lin-video-card>
</template>
```

:::

## 属性

| 参数            | 说明               | 类型   | 可选值 | 默认值   |
| --------------- | ------------------ | ------ | ------ | -------- |
| data            | 卡片相关数据       | Object | —      | —        |
| cardHeight      | 卡片高度           | String | —      | auto     |
| cardWidth       | 卡片宽度           | String | —      | 262px    |
| imageHeight     | 封面高度           | String | —      | 146px    |
| coverTip        | 封面右下角提示     | String | —      | —        |
| errorTip        | 图片加载失败提示语 | String | —      | 加载失败 |
| defaultImageUrl | 封面默认图片       | String | —      | —        |
| imageUrl        | 封面图片           | String | —      | —        |

## 事件

| 事件名称 | 说明           | 回调参数        |
| -------- | -------------- | --------------- |
| click    | 点击卡片时触发 | data：data 属性 |

## 插槽

| 插槽名称 | 说明           |
| -------- | -------------- |
| —        | 自定义底部内容 |
| top      | 自定义顶部内容 |
