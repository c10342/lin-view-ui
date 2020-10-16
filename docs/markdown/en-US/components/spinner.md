<style lang="scss" scoped>
.spinner-group{
    >div{
        margin-right: 40px;
    }
}
.spinner-block{
    display:flex;
    flex-direction:row;
    >div{
        margin-right: 40px;
        display:flex;
        flex-direction: column;
        align-items: center;
        >p{
            margin-bottom:10px;
        }
    }
}
</style>

# Spinner

---

## Basic usage

Use the `type` attribute to define the theme

<div class='demo-block'>
<div class="spinner-group">
    <lin-spinner type="primary"></lin-spinner>
    <lin-spinner type="success"></lin-spinner>
    <lin-spinner type="info"></lin-spinner>
    <lin-spinner type="warning"></lin-spinner>
    <lin-spinner type="danger"></lin-spinner>
</div>
</div>

:::demo

```html
<lin-spinner type="primary"></lin-spinner>
<lin-spinner type="success"></lin-spinner>
<lin-spinner type="info"></lin-spinner>
<lin-spinner type="warning"></lin-spinner>
<lin-spinner type="danger"></lin-spinner>
```

:::

## Show different radians

Different radians can be set for the `proportion` attribute. `1` stands for three quarters of a radian, `2` represents two quarters of a radian, `3` represents a quarter of a radian

<div class='demo-block'>
<div class="spinner-group">
      <lin-spinner proportion='1'></lin-spinner>
      <lin-spinner proportion='2'></lin-spinner>
      <lin-spinner proportion='3'></lin-spinner>
    </div>
</div>

:::demo

```html
<lin-spinner proportion="1"></lin-spinner>
<lin-spinner proportion="2"></lin-spinner>
<lin-spinner proportion="3"></lin-spinner>
```

:::

## Show load copy

The `text` property sets the loading copy, and the `vertical` property sets the alignment direction

<div class='demo-block'>
<div class='spinner-block'>
    <div>
      <p>Horizontal alignment</p>
      <lin-spinner text='loading' vertical='row'></lin-spinner>
    </div>
    <div>
      <p>Vertical alignment</p>
      <lin-spinner text='loading' vertical='col'></lin-spinner>
    </div>
</div>
</div>

:::demo

```html
<div class="spinner-block">
  <div>
    <p>horizontal alignment</p>
    <lin-spinner text="loading" vertical="row"></lin-spinner>
  </div>
  <div>
    <p>Vertical alignment</p>
    <lin-spinner text="loading" vertical="col"></lin-spinner>
  </div>
</div>
```

:::

## Other

You can set the style of Spinner through the properties of `loadingColor`,`size`,`strokeWidth`,`lineStyle`

<div class='demo-block'>
<div class='spinner-block'>
<div>
<p>loadingColor</p>
<lin-spinner loadingColor='red'></lin-spinner>
</div>
<div>
<p>size</p>
<lin-spinner size='30px'></lin-spinner>
</div>
<div>
<p>strokeWidth</p>
<lin-spinner strokeWidth='2px'></lin-spinner>
</div>
<div>
<p>lineStyle</p>
<lin-spinner lineStyle='dotted'></lin-spinner>
</div>
<div>
<p>animationDuration</p>
<lin-spinner animationDuration='300ms'></lin-spinner>
</div>
</div>
</div>

:::demo

```html
<div class="spinner-block">
  <div>
    <p>loadingColor</p>
    <lin-spinner loadingColor="red"></lin-spinner>
  </div>
  <div>
    <p>size</p>
    <lin-spinner size="30px"></lin-spinner>
  </div>
  <div>
    <p>strokeWidth</p>
    <lin-spinner strokeWidth="2px"></lin-spinner>
  </div>
  <div>
    <p>lineStyle</p>
    <lin-spinner lineStyle="dotted"></lin-spinner>
  </div>
  <div>
    <p>animationDuration</p>
    <lin-spinner animationDuration="300ms"></lin-spinner>
  </div>
</div>
```

:::

## Attributes

| Attribute         | Description              | Type           | Accepted Values                                                     | Default |
| ----------------- | ------------------------ | -------------- | ------------------------------------------------------------------- | ------- |
| type              | Topic type               | String         | primary，success，info，warning， danger                            | primary |
| vertical          | Copy alignment direction | String         | col，row                                                            | row     |
| proportion        | radian                   | String         | 1,2,3                                                               | 1       |
| loadingColor      | Display color            | String         | —                                                                   | —       |
| strokeWidth       | Ring width               | String         | —                                                                   | —       |
| lineStyle         | Line style               | String         | dotted，dashed，solid，，double，groove，ridge，inset，outset       | —       |
| animationName     | CSS3 animation name      | String         | —                                                                   | —       |
| animationDuration | Exercise duration        | String         | —                                                                   | —       |
| timingFunction    | Exercise mode            | String         | linear，ease，ease-in，ease-out，ease-in-out，cubic-bezier(n,n,n,n) | —       |
| iterationCount    | Number of exercises      | String，Number | —                                                                   | —       |
| text              | Load copy                | String         | —                                                                   | —       |
| textSize          | Load copy font size      | String         | —                                                                   | —       |
| textColor         | Load copy font color     | String         | —                                                                   | —       |
