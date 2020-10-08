
<script>
export default {
    methods:{
       back(){
           alert('back')
       } ,
       more(){
           alert('more')
       }
    }
}
</script>

# PageHeader 页头

---

## Basic usage

<div class='demo-block'>
<lin-page-header title="详情页面" @back="back"></lin-page-header>
</div>

:::demo
```html
<lin-page-header title="详情页面" @back="back"></lin-page-header>
<script>
export default {
    methods:{
       back(){
           alert('back')
       } 
    }
}
</script>
```
:::

## 显示右侧按钮

设置 `right` 属性即可显示右侧按钮

<div class='demo-block'>
<lin-page-header title="列表页面" :back='false' right @more='more'></lin-page-header>
</div>

:::demo
```html
<lin-page-header title="列表页面" :back='false' right @more='more'></lin-page-header>
<script>
export default {
    methods:{
       more(){
           alert('more')
       } 
    }
}
</script>
```
:::

## 显示底部边框

设置 `border` 属性即可显示底部边框

<div class='demo-block'>
<lin-page-header title="详情页面" border></lin-page-header>
</div>

:::demo
```html
<lin-page-header title="详情页面" border></lin-page-header>
```
:::

## 显示激活状态

设置 `active` 属性即可显示激活状态

<div class='demo-block'>
<lin-page-header title="列表页面" :back='false' right active border></lin-page-header>
</div>

:::demo
```html
<lin-page-header title="列表页面" :back='false' right active border></lin-page-header>
```
:::


## 属性

| 参数       | 说明                                     | Type   | Accepted Values | Default |
| ---------- | ---------------------------------------- | ------ | ------ | ------ |
| back   | 是否显示返回按钮                           | Boolean | —      | true      |
| backTip     | 返回按钮文字                           | String | —      | 返回      |
| title | 标题 | String | —      | —      |
| right   | 是否显示右侧按钮 | Boolean | —      | false      |
| active  | 是否显示激活状态                   | Boolean | —      | false      |
| border  | 是否显示底部边框                   | Boolean | —      | false      |

## 插槽

| Name | 说明               |
| -------- | ------------------ |
| —    | 标题的内容      |
| back    | 返回按钮的内容      |
| right     | 右侧按钮的内容 |

## 事件

| Event Name | 说明                 | Parameters       |
| -------- | -------------------- | -------------- |
| back     | 点击返回按钮的时候触发 | —              |
| more     | 点击右侧按钮的时候触发 | —              |


