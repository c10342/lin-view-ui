<style lang="scss" scoped>
.hover-group {
  margin-top: 20px;
  ::v-deep button {
    margin-right: 10px;
  }
}
</style>

# HoverEffect

---

## Neon effect

Set the `theme` property to `neon`

<div class='demo-block'>
<div class="hover-group">
    <lin-hover-effect theme='neon' type="primary" text="hover-effect"></lin-hover-effect>
    <lin-hover-effect theme='neon' type="success" text="hover-effect"></lin-hover-effect>
    <lin-hover-effect theme='neon' type="info" text="hover-effect"></lin-hover-effect>
    <lin-hover-effect theme='neon' type="warning" text="hover-effect"></lin-hover-effect>
    <lin-hover-effect theme='neon' type="danger" text="hover-effect"></lin-hover-effect>
</div>
</div>

:::demo

```html
<lin-hover-effect theme="neon" type="primary" text="hover-effect" />
<lin-hover-effect theme="neon" type="success" text="hover-effect" />
<lin-hover-effect theme="neon" type="info" text="hover-effect" />
<lin-hover-effect theme="neon" type="warning" text="hover-effect" />
<lin-hover-effect theme="neon" type="danger" text="hover-effect" />
```

:::

## Border effect

Set the `theme` property to `border`

<div class='demo-block'>
<div class="hover-group">
      <lin-hover-effect theme="border" type="primary" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="border" type="success" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="border" type="info" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="border" type="warning" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="border" type="danger" text="hover-effect"></lin-hover-effect>
</div>
</div>

:::demo

```html
<lin-hover-effect theme="border" type="primary" text="hover-effect" />
<lin-hover-effect theme="border" type="success" text="hover-effect" />
<lin-hover-effect theme="border" type="info" text="hover-effect" />
<lin-hover-effect theme="border" type="warning" text="hover-effect" />
<lin-hover-effect theme="border" type="danger" text="hover-effect" />
```

:::

## Fillet effect

Set the `theme` property to `fillet`

<div class='demo-block'>
<div class="hover-group">
    <lin-hover-effect theme="fillet" type="primary" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="fillet" type="success" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="fillet" type="info" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="fillet" type="warning" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="fillet" type="danger" text="hover-effect"></lin-hover-effect>
</div>
</div>

:::demo

```html
<lin-hover-effect theme="fillet" type="primary" text="hover-effect" />
<lin-hover-effect theme="fillet" type="success" text="hover-effect" />
<lin-hover-effect theme="fillet" type="info" text="hover-effect" />
<lin-hover-effect theme="fillet" type="warning" text="hover-effect" />
<lin-hover-effect theme="fillet" type="danger" text="hover-effect" />
```

:::

## Cold effect

Set the `theme` property to `frozen`

<div class='demo-block'>
<div class="hover-group">
      <lin-hover-effect theme="frozen" type="primary" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="frozen" type="success" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="frozen" type="info" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="frozen" type="warning" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="frozen" type="danger" text="hover-effect"></lin-hover-effect>
</div>
</div>

:::demo

```html
<lin-hover-effect theme="frozen" type="primary" text="hover-effect" />
<lin-hover-effect theme="frozen" type="success" text="hover-effect" />
<lin-hover-effect theme="frozen" type="info" text="hover-effect" />
<lin-hover-effect theme="frozen" type="warning" text="hover-effect" />
<lin-hover-effect theme="frozen" type="danger" text="hover-effect" />
```

:::

## Shiny effect

Set the `theme` property to `shiny`

<div class='demo-block'>
<div class="hover-group">
      <lin-hover-effect theme="shiny" type="primary" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="shiny" type="success" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="shiny" type="info" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="shiny" type="warning" text="hover-effect"></lin-hover-effect>
      <lin-hover-effect theme="shiny" type="danger" text="hover-effect"></lin-hover-effect>
</div>
</div>

:::demo

```html
<lin-hover-effect theme="shiny" type="primary" text="hover-effect" />
<lin-hover-effect theme="shiny" type="success" text="hover-effect" />
<lin-hover-effect theme="shiny" type="info" text="hover-effect" />
<lin-hover-effect theme="shiny" type="warning" text="hover-effect" />
<lin-hover-effect theme="shiny" type="danger" text="hover-effect" />
```

:::

## Attributes

| Attribute | Description  | Type   | Accepted Values                     | Default |
| --------- | ------------ | ------ | ----------------------------------- | ------- |
| type      | Effect Type  | String | primary,success,warning,danger,info | primary |
| theme     | Effect theme | String | neon, border, fillet, frozen, shiny | false   |
| text      | text         | String | —                                   | —       |

## Events

| Event Name | Description      | Parameters |
| ---------- | ---------------- | ---------- |
| click      | Trigger on Click | —          |

## Slots

| Name | Description                |
| ---- | -------------------------- |
| —    | The content of hovereffect |
