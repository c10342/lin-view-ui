# Tooltip

[[toc]]

---

The tooltip component provides a `v-tooltip` instruction. Its effect is similar to the DOM tag's native attribute title, but it beautifies the effect of title and customizes a series of properties

## Basic usage

Here, we provide four display methods in different directions. The binding value of `v-tooltip` is the prompt text, and the default display direction is below

:::demo

```vue
<template>
  <lin-button class="mr-20" v-tooltip.top="'Above'">Above</lin-button>
  <lin-button class="mr-20" v-tooltip.bottom="'Below'">Below</lin-button>
  <lin-button class="mr-20" v-tooltip.left="'Left'">Left</lin-button>
  <lin-button v-tooltip.right="'Right'">Right</lin-button>
</template>
```

:::

## Offset

Add the `lin-tooltip-top` and `lin-tooltip-left` attributes to the element bound with the `v-tooltip` instruction to set the toolip offset

:::demo

```vue
<template>
  <lin-button
    lin-tooltip-top="-10"
    lin-tooltip-left="10"
    class="mr-20"
    v-tooltip.top="'Above'"
    >Above</lin-button
  >
  <lin-button
    lin-tooltip-top="10"
    lin-tooltip-left="10"
    class="mr-20"
    v-tooltip.bottom="'Below'"
    >Below</lin-button
  >
  <lin-button
    lin-tooltip-top="10"
    lin-tooltip-left="10"
    class="mr-20"
    v-tooltip.left="'Left'"
    >Left</lin-button
  >
  <lin-button
    lin-tooltip-top="10"
    lin-tooltip-left="-10"
    v-tooltip.right="'Right'"
    >Right</lin-button
  >
</template>
```

:::

## Exceed display prompt

Add the `auto` modifier to the `v-tooltip` instruction. When the text exceeds the width of the container, the mouse hovers up to display the toolbar prompt text. When the text does not exceed the width of the container, the mouse will not display the toolbar prompt text

:::demo

```vue
<template>
  <p
    class="one-line tooltip-message"
    v-tooltip.top.auto="
      'When the text exceeds the width of the container, the mouse hovers up to display the toolbar prompt text. When the text does not exceed the width of the container, the mouse will not display the toolbar prompt text'
    "
  >
    When the text exceeds the width of the container, the mouse hovers up to
    display the toolbar prompt text. When the text does not exceed the width of
    the container, the mouse will not display the toolbar prompt text
  </p>
  <p class="one-line tooltip-message" v-tooltip.top.auto="'Title Text'">
    Title Text
  </p>
</template>

<style lang="scss" scoped>
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 500px;
  border: 1px solid red;
}

.tooltip-message {
  box-sizing: border-box;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>
```

:::

## Attributes

| Attribute        | Description                                                                                                                                   | Type    | Accepted Values | Default |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------- | ------- |
| top              | The `top` modifier in the `v-tooltip` instruction sets the toolbar display direction to the top                                               | Boolean | —               | false   |
| bottom           | The `bottom` modifier in the `v-tooltip` instruction sets the toolbar display direction to the bottom                                         | Boolean | —               | true    |
| left             | The `left` modifier in the `v-tooltip` instruction sets the toolbar display direction to the left                                             | Boolean | —               | false   |
| right            | The `right` modifier in the `v-tooltip` instruction sets the toolbar display direction to the right                                           | Boolean | —               | false   |
| auto             | The `auto` modifier in the `v-tooltip` instruction. If the text exceeds the value, toolip will be displayed; if not, it will not be displayed | Boolean | —               | false   |
| lin-tooltip-top  | The offset of toolip from the top of the screen. Add this attribute to the element bound with the `v-toolip` instruction                      | String  | —               | —       |
| lin-tooltip-left | The offset of toolip from the left of the screen. Add this attribute to the element bound with the `v-toolip` instruction                     | String  | —               | —       |
