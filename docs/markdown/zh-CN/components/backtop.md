# Backtop 回到顶部

---

## 基础用法

滑动页面即可看到右下方的按钮。

<div class='demo-block'>
Scroll down to see the bottom-right button.
<lin-backtop target=".container .view"></lin-backtop>
</div>

:::demo

```html
<template>
  Scroll down to see the bottom-right button.
  <lin-backtop target=".container .view"></lin-backtop>
</template>
```

:::

## 自定义显示内容

显示区域被固定为 40px \* 40px 的区域, 其中的内容可支持自定义。

<div class='demo-block'>
Scroll down to see the bottom-right button.
<lin-backtop target=".container .view" :bottom="100">
<div
      style="{
        height: 40px;
        width: 40px;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        cursor: pointer;
      }"
    >
      UP
    </div>
</lin-backtop>
</div>

:::demo

```html
<template>
  Scroll down to see the bottom-right button.
  <lin-backtop target=".container .view" :bottom="100">
    <div
      style="{
        height: 40px;
        width: 40px
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        cursor: pointer;
      }"
    >
      UP
    </div>
  </lin-backtop>
</template>
```

:::

## 属性

| 参数              | 说明                             | 类型   | 可选值 | 默认值 |
| ----------------- | -------------------------------- | ------ | ------ | ------ |
| target            | 触发滚动的对象                   | String | —      | —      |
| visibility-height | 滚动高度达到此参数值才出现       | Number | —      | 200    |
| right             | 控制其显示位置, 距离页面右边距   | Number | —      | 200    |
| bottom            | 控制其显示位置, 距离页面底部距离 | Number | —      | 40     |

## 事件

| 事件名称 | 说明                   | 回调参数  |
| -------- | ---------------------- | --------- |
| click    | 点击按钮触发的事件     | e:Event   |
| scroll   | 滚动对象正在滚动时触发 | scrollTop |
| end      | 滚动对象滚动结束时触发 | —         |
