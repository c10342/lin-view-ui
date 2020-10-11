<style lang="scss" scoped>
.demo-block{
    display:flex;
    flex-direction:row;
    justify-content:space-around;
}
.demo-image{
    width:200px;
    height:200px;
}
::v-deep .error-cover{
    height: 100%;
    width: 100%;
    background-color: #e8f3fe;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #ccc;
}

.demo-title{
        text-align:center;
        margin-bottom:10px;
    }
</style>

# Image

---

## Basic usage

Set the `imgUrl` property

<div class='demo-block'>
<lin-image :img-url="require('../../../assets/img/video-card.png')" />
</div>

:::demo

```html
<lin-image :img-url="require('../../../assets/img/video-card.png')" />
```

:::

## Multiple pictures

`imgUrl` attribute can pass in an array containing the path of the image. When the first image fails to load, the second image will be loaded, and so on. When all images fail to load, the default loading failure cover will be displayed

<div class='demo-block'>
<lin-image :img-url="['xxx.png',require('../../../assets/img/logo.png')]" />
</div>

:::demo

```html
<lin-image :img-url="['xxx.png',require('../../../assets/img/logo.png')]" />
```

:::

## Picture preview

Set the `preview` property to true to enable image preview

<div class='demo-block'>
<lin-image preview :img-url="require('../../../assets/img/logo.png')" />
</div>

:::demo

```html
<lin-image preview :img-url="require('../../../assets/img/logo.png')" />
```

:::

## Loading failed

<div class='demo-block'>
<div>
<p class='demo-title'>Default</p>
<lin-image class='demo-image' />
</div>
<div>
<p class='demo-title'>Custom</p>
<lin-image class='demo-image' >
<div class='error-cover'>Custom failed cover</div>
</lin-image>
</div>
</div>

:::demo

```html
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
