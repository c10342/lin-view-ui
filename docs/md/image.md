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

# Image 图片

---

## 基础用法

设置 `imgUrl` 属性即可

<div class='demo-block'>
<l-image :img-url="require('../assets/img/video-card.png')" />
</div>

:::demo

```html
<l-image :img-url="require('../assets/img/video-card.png')" />
```

:::

## 多图片

`imgUrl` 属性可以传入一个数组，数组里面存放的是图片的路径，当第一张图片加载失败的时候就会加载第二张图片，如此类推，当全部图片都加载失败的时候就会显示默认的加载失败封面

<div class='demo-block'>
<l-image :img-url="['xxx.png',require('../assets/img/logo.png')]" />
</div>

:::demo

```html
<l-image :img-url="['xxx.png',require('../assets/img/logo.png')]" />
```

:::

## 图片预览

设置 `preview` 属性为 true 即可开启图片预览

<div class='demo-block'>
<l-image preview :img-url="require('../assets/img/logo.png')" />
</div>

:::demo

```html
<l-image preview :img-url="require('../assets/img/logo.png')" />
```

:::

## 加载失败

<div class='demo-block'>
<div>
<p class='demo-title'>默认</p>
<l-image class='demo-image' />
</div>
<div>
<p class='demo-title'>自定义</p>
<l-image class='demo-image' >
<div class='error-cover'>自定义失败封面</div>
</l-image>
</div>
</div>

:::demo

```html
<div>
  <p class="demo-title">默认</p>
  <l-image class="demo-image" />
</div>
<div>
  <p class="demo-title">自定义</p>
  <l-image class="demo-image">
    <div class="error-cover">自定义失败封面</div>
  </l-image>
</div>
```

:::

## 属性

| 参数           | 说明                                           | 类型          | 可选值 | 默认值            |
| -------------- | ---------------------------------------------- | ------------- | ------ | ----------------- |
| imgUrl         | 图片路径                                       | Array, String | —      | —                 |
| fit            | 确定图片如何适应容器框，同原生 object-fit      | String        | —      | —                 |
| referrerPolicy | 原生 referrerPolicy                            | String        | —      | —                 |
| alt            | 原生 alt                                       | String        | —      | —                 |
| preview        | 开启图片预览功能                               | Boolean       | —      | false             |
| transitionName | 图片预览显示动画，即 transition 组件 name 属性 | String        | —      | l-image-animation |
| clickMask      | 点击遮罩层是否可以关闭图片预览                 | Boolean       | —      | true              |
| errorMsg       | 图片加载失败提示语                             | String        | —      | 加载失败          |

## 插槽

| 插槽名称 | 说明                         |
| -------- | ---------------------------- |
| —        | Image 图片加载失败显示的内容 |

## 事件

| 事件名称 | 说明                                         | 回调参数                           |
| -------- | -------------------------------------------- | ---------------------------------- |
| error    | 图片加载失败时触发                           | {url:String,index?:Number,e:Event} |
| AllError | 当 imgUrl 为数组时并且所有图片加载失败时触发 | {url:Array\<String\>,e:Event}      |
| success  | 图片加载成功时触发                           | {url:String,index?:Number,e:Event} |
