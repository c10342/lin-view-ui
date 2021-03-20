# showMore

[[toc]]

---

## Basic usage

When the text exceeds the display length, it is folded, and the len property shows where to start folding.

::: demo

```vue
<template>
  <lin-show-more
    :len="10"
    text="When the text exceeds the display length, it is folded, and the len property shows where to start folding."
  >
  </lin-show-more>
</template>
```

:::

## Advanced Usage

If the text exceeds the display length, it can be folded. After unfolding, you can specify whether it needs to be folded by `allow-fold`. You can also set the folded copy by `show-text` and set the folded copy by `hidden-text`

::: demo

```vue
<template>
  <lin-show-more
    allow-fold
    show-text="show"
    hidden-text="hidden"
    :len="10"
    text="If the text exceeds the display length, it will be folded. After expansion, you can specify whether it needs to be folded by allowfold"
  >
  </lin-show-more>
</template>
```

:::

## Attributes

| Attribute   | Description                                 | Type   | Accepted Values | Default         |
| ----------- | ------------------------------------------- | ------ | --------------- | --------------- |
| len         | Displays the length of the text             | Number | —               | -1(Do not fold) |
| text        | text                                        | String | —               | —               |
| show-text   | The copy needs to be displayed when folding | String | —               | Show            |
| hidden-text | You need to show the copy when hiding       | String | —               | Hide            |
| allowFold | whether to put it away  | Boolean | —      | false           |
