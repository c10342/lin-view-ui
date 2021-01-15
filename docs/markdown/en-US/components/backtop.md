# Backtop

[[toc]]

---

## Basic usage

Scroll down to see the bottom-right button.

:::demo

```vue
<template>
  Scroll down to see the bottom-right button.
  <lin-backtop target=".container .view"></lin-backtop>
</template>
```

:::

## Customizations

Display area is 40px \* 40px.

:::demo

```vue
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

## Attributes

| Attribute         | Description                                                         | Type   | Accepted Values | Default |
| ----------------- | ------------------------------------------------------------------- | ------ | --------------- | ------- |
| target            | the target to trigger scroll                                        | String | —               | —       |
| visibility-height | the button will not show until the scroll height reaches this value | Number | —               | 200     |
| right             | right distance                                                      | Number | —               | 200     |
| bottom            | bottom distance                                                     | Number | —               | 40      |

## Events

| Event Name | Description                                      | Parameters  |
| ---------- | ------------------------------------------------ | ----------- |
| click      | triggers when click                              | click event |
| scroll     | Triggered when the scrolling object is scrolling | scrollTop   |
| end        | Triggered at the end of a scrolling object       | —           |
