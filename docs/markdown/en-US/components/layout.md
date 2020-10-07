<style lang="scss" scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

.mb-10 {
  margin-bottom: 10px;
}

.mb-30 {
  margin-bottom: 30px;
}
</style>

# Layout

---

## Summary

Rasterization design is to divide the page into the same width according to certain rules, and then list the possibility of various combinations, so as to facilitate the rapid layout when the page is presented. Generally, 12 grid system is used in the market, and 8-grid system is also used. However, with the increasing size of device screen, the traditional 12 grid system can not solve the problem of element layout well in some business scenarios, so we use the 24 grid system. That is to divide the page area 24 equally.

## Basic layout

Create basic grid layout using columns.
With `row` and `col`, we can easily manipulate the layout using the `span` attribute.

<div class="demo-block">
    <lin-row class="mb-10">
    <lin-col :span="24">
      <div class="grid-content bg-purple-dark"></div>
    </lin-col>
  </lin-row>
  <lin-row class="mb-10">
    <lin-col :span="8">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="8">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="8">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row>
    <lin-col :span="4">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="4">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="4">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="4">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="4">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="4">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
  </lin-row>
</div>

::: demo

```html
<lin-row class="mb-10">
  <lin-col :span="24">
    <div class="grid-content bg-purple-dark"></div>
  </lin-col>
</lin-row>
<lin-row class="mb-10">
  <lin-col :span="8">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="8">
    <div class="grid-content bg-purple-light"></div>
  </lin-col>
  <lin-col :span="8">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
<lin-row>
  <lin-col :span="4">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="4">
    <div class="grid-content bg-purple-light"></div>
  </lin-col>
  <lin-col :span="4">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="4">
    <div class="grid-content bg-purple-light"></div>
  </lin-col>
  <lin-col :span="4">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="4">
    <div class="grid-content bg-purple-light"></div>
  </lin-col>
</lin-row>
```

:::

## Column spacing

Column spacing is supported.
Row provides `gutter` attribute to specify spacings between columns, and its default value is 0.

<div class="demo-block">
<lin-row :gutter="20">
    <lin-col :span="6">
        <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
        <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
        <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
        <div class="grid-content bg-purple"></div>
    </lin-col>
    </lin-row>
</div>

::: demo

```html
<lin-row :gutter="20">
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
```

:::

## Hybrid layout

Form a more complex hybrid layout by combining the basic 1/24 columns.

<div class="demo-block">
  <lin-row :gutter="20" class="mb-10">
    <lin-col :span="16">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="8">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row :gutter="20" class="mb-10">
    <lin-col :span="8">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="8">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="4">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="4">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row :gutter="20" class="mb-10">
    <lin-col :span="4">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="16">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="4">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
</div>

::: demo

```html
<lin-row :gutter="20" class="mb-10">
  <lin-col :span="16">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="8">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
<lin-row :gutter="20" class="mb-10">
  <lin-col :span="8">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="8">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="4">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="4">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
<lin-row :gutter="20" class="mb-10">
  <lin-col :span="4">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="16">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="4">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
```

:::

## Column offset

You can specify column offsets.
You can specify the number of column offset by setting the value of `offset` attribute of Col.

<div class="demo-block">
  <lin-row :gutter="20" class="mb-10">
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6" :offset="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row :gutter="20" class="mb-10">
    <lin-col :span="6" :offset="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6" :offset="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row :gutter="20" class="mb-10">
    <lin-col :span="12" :offset="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
</div>

::: demo

```html
<lin-row :gutter="20" class="mb-10">
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="6" :offset="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
<lin-row :gutter="20" class="mb-10">
  <lin-col :span="6" :offset="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="6" :offset="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
<lin-row :gutter="20" class="mb-10">
  <lin-col :span="12" :offset="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
```

:::

## Flex Layout

Use the flex layout to make flexible alignment of columns.
You can enable flex layout by setting `type` attribute to 'flex', and define the layout of child elements by setting `justify` attribute with start, center, end, space-between or space-around.

<div class="demo-block">
  <lin-row type="flex" class="mb-10">
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row type="flex" class="mb-10" justify="center">
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row type="flex" class="mb-10" justify="end">
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row type="flex" class="mb-10" justify="between">
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
  <lin-row type="flex" class="mb-10" justify="around">
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple-light"></div>
    </lin-col>
    <lin-col :span="6">
      <div class="grid-content bg-purple"></div>
    </lin-col>
  </lin-row>
</div>

::: demo

```html
<lin-row type="flex" class="mb-10">
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple-light"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
<lin-row type="flex" class="mb-10" justify="center">
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple-light"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
<lin-row type="flex" class="mb-10" justify="end">
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple-light"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
<lin-row type="flex" class="mb-10" justify="between">
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple-light"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
<lin-row type="flex" class="mb-10" justify="around">
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple-light"></div>
  </lin-col>
  <lin-col :span="6">
    <div class="grid-content bg-purple"></div>
  </lin-col>
</lin-row>
```

:::

## Responsive Layout

Taking example by Bootstrap's responsive design, five breakpoints are preset: `xs`, `sm`, `md`, `lg` and `xl`.

<div class="demo-block">
<lin-row :gutter="10">
<lin-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
    <div class="grid-content bg-purple"></div>
</lin-col>
<lin-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
    <div class="grid-content bg-purple-light"></div>
</lin-col>
<lin-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
    <div class="grid-content bg-purple"></div>
</lin-col>
<lin-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
    <div class="grid-content bg-purple-light"></div>
</lin-col>
</lin-row>
</div>

::: demo

```html
<lin-row :gutter="10">
  <lin-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
    <div class="grid-content bg-purple-light"></div>
  </lin-col>
  <lin-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
    <div class="grid-content bg-purple"></div>
  </lin-col>
  <lin-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
    <div class="grid-content bg-purple-light"></div>
  </lin-col>
</lin-row>
```

:::

## Row Attributes

| 参数    | 说明                                  | 类型   | 可选值                            | 默认值 |
| ------- | ------------------------------------- | ------ | --------------------------------- | ------ |
| gutter  | grid spacing                              | Number | —                                 | 0      |
| type    | layout mode, you can use flex, works in modern browsers | String | —                                 | —      |
| justify |horizontal alignment of flex layout            | String | start/end/center/around/between   | —      |
| align   | vertical alignment of flex layout            | String | end/start/baseline/stretch/center | —      |
| tag     | custom element tag                      | String | \*                                | div    |

## Col Attributes

| 参数   | 说明                                  | 类型                                        | 可选值 | 默认值 |
| ------ | ------------------------------------- | ------------------------------------------- | ------ | ------ |
| span   | number of column the grid spans                        | Number                                      | —      | 24     |
| offset | number of spacing on the left side of the grid                    | Number                                      | —      | 0      |
| push   | number of columns that grid moves to the right                      | Number                                      | —      | 0      |
| pull   | number of columns that grid moves to the left                      | Number                                      | —      | 0      |
| xs     | `<768px` Responsive columns or column props object | Number/Object (e.g. {span: 4, offset: 4}) | —      | —      |
| sm     | `≥768px` Responsive columns or column props object | Number/Object (e.g. {span: 4, offset: 4}) | —      | —      |
| md     | `≥992` Responsive columns or column props object   | Number/Object (e.g. {span: 4, offset: 4}) | —      | —      |
| lg     | `≥1200` Responsive columns or column props object  | Number/Object (e.g. {span: 4, offset: 4}) | —      | —      |
| tag    | custom element tag                        | String                                      | \*     | div    |
