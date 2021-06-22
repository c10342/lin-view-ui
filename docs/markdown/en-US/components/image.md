# Image

[[toc]]

---

## Basic usage

Set the `imgUrl` property

:::demo

```vue
<template>
  <lin-image :img-url="require('../../../assets/img/video-card.png')" />
</template>
```

:::

## Multiple pictures

`imgUrl` attribute can pass in an array containing the path of the image. When the first image fails to load, the second image will be loaded, and so on. When all images fail to load, the default loading failure cover will be displayed

:::demo

```vue
<template>
  <lin-image :img-url="['xxx.png', require('../../../assets/img/logo.png')]" />
</template>
```

:::

## Picture preview

Set the `preview` property to true to enable image preview

:::demo

```vue
<template>
  <lin-image preview :img-url="require('../../../assets/img/logo.png')" />
</template>
```

:::

## Loading failed

:::demo

```vue
<template>
  <div>
    <p class="demo-title">Default</p>
    <lin-image class="demo-image" />
  </div>
  <div>
    <p class="demo-title">Custom</p>
    <lin-image class="demo-image">
      <div class="error-cover">Custom failed cover</div>
    </lin-image>
  </div>
</template>
```

:::

## Attributes

| Attribute      | Description                                                                                   | Type          | Accepted Values | Default             |
| -------------- | --------------------------------------------------------------------------------------------- | ------------- | --------------- | ------------------- |
| imgUrl         | Picture path                                                                                  | Array, String | —               | —                   |
| fit            | To determine how the image fits into the container box, the same as the native object fit     | String        | —               | —                   |
| referrerPolicy | Native referrerPolicy                                                                         | String        | —               | —                   |
| alt            | Native alt                                                                                    | String        | —               | —                   |
| preview        | Enable picture preview                                                                        | Boolean       | —               | false               |
| transitionName | The image preview shows the animation, that is, the name property of the transition component | String        | —               | lin-image-animation |
| clickMask      | Can I turn off picture preview by clicking mask layer                                         | Boolean       | —               | true                |
| errorMsg       | Picture loading failure prompt                                                                | String        | —               | Loading failed      |

## Slots

| Name | Description                |
| ---- | -------------------------- |
| —    | Image image failed to load |

## Events

| Event Name | Description                                                   | Parameters                         |
| ---------- | ------------------------------------------------------------- | ---------------------------------- |
| error      | Triggered when image loading fails                            | {url:String,index?:Number,e:Event} |
| AllError   | Triggered when imgurl is an array and all images fail to load | {url:Array\<String\>,e:Event}      |
| success    | Triggered when the image is loaded successfully               | {url:String,index?:Number,e:Event} |
