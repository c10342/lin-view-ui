# Magnifier

[[toc]]

---

## Basic usage

You need to set the attributes `smallPic` and `bigPic` image paths. And the width and height of the attributes `smallStyle` and `bigStyle`.

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

## Slots

`Magnifier` magnifier provides three named slots, namely `small`, `move` and `big`

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

## Attributes

| Attribute  | Description                                                                          | Type   | Accepted Values | Default |
| ---------- | ------------------------------------------------------------------------------------ | ------ | --------------- | ------- |
| smallPic   | Small picture path address                                                           | String | —               | —       |
| bigPic     | Big picture path address                                                             | String | —               | —       |
| smallStyle | Small picture style (width and height must be set, otherwise width and height are 0) | Object | —               | —       |
| bigStyle   | Large picture style (width and height must be set, otherwise width and height are 0) | Object | —               | —       |
| maskColor  | Background color of mask layer for mouse movement                                    | String | —               | —       |

## Slots

| Name  | Description                        |
| ----- | ---------------------------------- |
| small | Content of small pictures          |
| move  | Content followed by mouse movement |
| big   | Content of big picture             |

## Events

| Event Name | Description                           | Parameters         |
| ---------- | ------------------------------------- | ------------------ |
| show       | Trigger when large image is displayed | —                  |
| hide       | Triggered when large image is hidden  | —                  |
| move       | Triggered when the mouse moves        | Event event object |
