# showMore

---

## Basic usage

When the text exceeds the display length, it is folded, and the len property shows where to start folding.

<div class="demo-block">
  <lin-show-more :len='10' text='When the text exceeds the display length, it is folded, and the len property shows where to start folding.'>
  </lin-show-more>
</div>

::: demo

```html
<lin-show-more
  :len="10"
  text="When the text exceeds the display length, it is folded, and the len property shows where to start folding."
>
</lin-show-more>
```

:::

## Advanced Usage

If the text exceeds the display length, it can be folded. After unfolding, you can specify whether it needs to be folded by `allow-fold`. You can also set the folded copy by `show-text` and set the folded copy by `hidden-text`

<div class="demo-block">
  <lin-show-more 
    allow-fold 
    show-text='show'
    hidden-text='hidden'
    :len='10' 
    text='If the text exceeds the display length, it will be folded. After expansion, you can specify whether it needs to be folded by allowfold'>
  </lin-show-more>
</div>

::: demo

```html
<lin-show-more
  allow-fold
  :len="10"
  show-text="show"
  hidden-text="hidden"
  text="If the text exceeds the display length, it will be folded. After expansion, you can specify whether it needs to be folded by allowfold"
>
</lin-show-more>
```

:::

## Attributes

| Attribute   | Description                                 | Type   | Accepted Values | Default         |
| ----------- | ------------------------------------------- | ------ | --------------- | --------------- |
| len         | Displays the length of the text             | Number | —               | -1(Do not fold) |
| text        | text                                        | String | —               | —               |
| show-text   | The copy needs to be displayed when folding | String | —               | Show            |
| hidden-text | You need to show the copy when hiding       | String | —               | Hide            |
