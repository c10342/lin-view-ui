# VideoCard

[[toc]]

---

## Basic usage

Use the `imageUrl` attribute to define the cover of the card and customize the content at the bottom of the card.

::: demo

```vue
<template>
  <lin-video-card :imageUrl="require('../../../assets/img/video-card.png')">
    <template>
      <div class="card-bottom">
        <p>one has attained a success and is well-contented</p>
        <p>This is a card</p>
        <p>lin-view-ui</p>
      </div>
    </template>
  </lin-video-card>
</template>
```

:::

## Define card width and height

Use the `cardHeight` and `cardWidth` attributes to define the width and height of the card

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
        <p>one has attained a success and is well-contented</p>
        <p>This is a card</p>
        <p>lin-vue-ui</p>
      </div>
    </template>
  </lin-video-card>
</template>
```

:::

## Define picture height

Use the `imageHeight` attribute to define the height of the image

:::demo

```vue
<template>
  <lin-video-card
    imageHeight="150px"
    :imageUrl="require('../../../assets/img/video-card.png')"
  >
    <template>
      <div class="card-bottom">
        <p>one has attained a success and is well-contented</p>
        <p>This is a card</p>
        <p>lin-vue-ui</p>
      </div>
    </template>
  </lin-video-card>
</template>
```

:::

## Define default picture

Use the `defaultImageUrl` property to define the default image. When the imageurl value is empty or the imageurl fails to load, the default image will be displayed.

:::demo

```vue
<template>
  <lin-video-card :defaultImageUrl="require('../../../assets/img/logo.png')">
    <template>
      <div class="card-bottom">
        <p>one has attained a success and is well-contented</p>
        <p>This is a card</p>
        <p>lin-vue-ui</p>
      </div>
    </template>
  </lin-video-card>
</template>
```

:::

## Tips at the bottom right corner of the cover

Use the `coverTip` property to define the prompt at the bottom right corner of the cover

:::demo

```vue
<template>
  <lin-video-card
    coverTip="Tips"
    :imageUrl="require('../../../assets/img/video-card.png')"
    :defaultImageUrl="require('../../../assets/img/logo.png')"
  >
    <template>
      <div class="card-bottom">
        <p>one has attained a success and is well-contented</p>
        <p>This is a card</p>
        <p>lin-vue-ui</p>
      </div>
    </template>
  </lin-video-card>
</template>
```

:::

## Picture loading failure prompt

Use the `errorTip` attribute to define the prompt displayed when the image fails to load. When imageurl and defaultimageurl are empty or both fail to load, the prompt will be displayed

:::demo

```vue
<template>
  <lin-video-card errorTip="Image loading failed">
    <template>
      <div class="card-bottom">
        <p>one has attained a success and is well-contented</p>
        <p>This is a card</p>
        <p>lin-vue-ui</p>
      </div>
    </template>
  </lin-video-card>
</template>
```

:::

## Attributes

| Attribute       | Description                                  | Type   | Accepted Values | Default        |
| --------------- | -------------------------------------------- | ------ | --------------- | -------------- |
| data            | Card related data                            | Object | —               | —              |
| cardHeight      | Card height                                  | String | —               | auto           |
| cardWidth       | Card width                                   | String | —               | 262px          |
| imageHeight     | Cover height                                 | String | —               | 146px          |
| coverTip        | Tips at the bottom right corner of the cover | String | —               | —              |
| errorTip        | Picture loading failure prompt               | String | —               | Loading failed |
| defaultImageUrl | Default cover picture                        | String | —               | —              |
| imageUrl        | cover photo                                  | String | —               | —              |

## Events

| Event Name | Description                        | Parameters           |
| ---------- | ---------------------------------- | -------------------- |
| click      | Triggered when the card is clicked | data：data attribute |

## Slots

| Name | Description           |
| ---- | --------------------- |
| —    | Custom bottom content |
| top  | Custom top content    |
