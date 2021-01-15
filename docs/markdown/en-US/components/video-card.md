<style lang="scss" scoped>
.card-bottom {
  height: 102px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > p {
    font-size: 12px;
    font-weight: 400;
    color: #666;
    margin: 0;
    &:nth-child(1) {
      font-size: 14px;
      font-weight: 400;
      color: #333;
    }
  }
}
</style>

# VideoCard

---

## Basic usage

Use the `imageUrl` attribute to define the cover of the card and customize the content at the bottom of the card.

<div class='demo-block'>
    <lin-video-card 
    :imageUrl="require('../../../assets/img/video-card.png')">
      <template>
        <div class="card-bottom">
          <p>one has attained a success and is well-contented</p>
          <p>This is a card</p>
          <p>lin-view-ui</p>
        </div>
      </template>
    </lin-video-card>
</div>

::: demo

```html
<lin-video-card :imageUrl="require('../../../assets/img/video-card.png')">
  <template>
    <div class="card-bottom">
      <p>one has attained a success and is well-contented</p>
      <p>This is a card</p>
      <p>lin-view-ui</p>
    </div>
  </template>
</lin-video-card>
```

:::

## Define card width and height

Use the `cardHeight` and `cardWidth` attributes to define the width and height of the card

<div class='demo-block'>
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
</div>

:::demo

```html
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
```

:::

## Define picture height

Use the `imageHeight` attribute to define the height of the image

<div class='demo-block'>
    <lin-video-card 
    imageHeight="150px" 
    :imageUrl="require('../../../assets/img/video-card.png')">
      <template>
        <div class="card-bottom">
          <p>one has attained a success and is well-contented</p>
          <p>This is a card</p>
          <p>lin-vue-ui</p>
        </div>
      </template>
    </lin-video-card>
</div>

:::demo

```html
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
```

:::

## Define default picture

Use the `defaultImageUrl` property to define the default image. When the imageurl value is empty or the imageurl fails to load, the default image will be displayed.

<div class='demo-block'>
    <lin-video-card 
    :defaultImageUrl="require('../../../assets/img/logo.png')">
      <template>
        <div class="card-bottom">
          <p>one has attained a success and is well-contented</p>
          <p>This is a card</p>
          <p>lin-vue-ui</p>
        </div>
      </template>
    </lin-video-card>
</div>

:::demo

```html
<lin-video-card :defaultImageUrl="require('../../../assets/img/logo.png')">
  <template>
    <div class="card-bottom">
      <p>one has attained a success and is well-contented</p>
      <p>This is a card</p>
      <p>lin-vue-ui</p>
    </div>
  </template>
</lin-video-card>
```

:::

## Tips at the bottom right corner of the cover

Use the `coverTip` property to define the prompt at the bottom right corner of the cover

<div class='demo-block'>
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
</div>

:::demo

```html
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
```

:::

## Picture loading failure prompt

Use the `errorTip` attribute to define the prompt displayed when the image fails to load. When imageurl and defaultimageurl are empty or both fail to load, the prompt will be displayed

<div class='demo-block'>
    <lin-video-card errorTip="Image loading failed">
      <template>
        <div class="card-bottom">
          <p>one has attained a success and is well-contented</p>
          <p>This is a card</p>
          <p>lin-vue-ui</p>
        </div>
      </template>
    </lin-video-card>
</div>

:::demo

```html
<lin-video-card errorTip="Image loading failed">
  <template>
    <div class="card-bottom">
      <p>one has attained a success and is well-contented</p>
      <p>This is a card</p>
      <p>lin-vue-ui</p>
    </div>
  </template>
</lin-video-card>
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
