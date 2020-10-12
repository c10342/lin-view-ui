<style lang="scss" scoped>
.row {
  margin-top: 20px;
  .lin-button {
    margin-right: 10px;
  }
}
</style>

# Button

---

## Basic usage

Use `type`,`plain` and `round`to define Button's style.

<div class="demo-block">
    <div class="row">
      <lin-button>Default</lin-button>
      <lin-button type="primary">Primary</lin-button>
      <lin-button type="success">Success</lin-button>
      <lin-button type="info">Info</lin-button>
      <lin-button type="warning">Warning</lin-button>
      <lin-button type="danger">Danger</lin-button>
    </div>
    <div class="row">
      <lin-button :plain="true" type="default">Plain</lin-button>
      <lin-button :plain="true" type="primary">Primary</lin-button>
      <lin-button :plain="true" type="success">Success</lin-button>
      <lin-button :plain="true" type="info">Info</lin-button>
      <lin-button :plain="true" type="warning">Warning</lin-button>
      <lin-button :plain="true" type="danger">Danger</lin-button>
    </div>
    <div class="row">
      <lin-button :round="true" type="default">Round</lin-button>
      <lin-button :round="true" type="primary">Primary</lin-button>
      <lin-button :round="true" type="success">Success</lin-button>
      <lin-button :round="true" type="info">Info</lin-button>
      <lin-button :round="true" type="warning">Warning</lin-button>
      <lin-button :round="true" type="danger">Danger</lin-button>
    </div>
    <div class="row">
      <lin-button icon="lin-icon-date" :circle="true" type="default"></lin-button>
      <lin-button icon="lin-icon-thumbsup" :circle="true" type="primary"></lin-button>
      <lin-button icon="lin-icon-chat" :circle="true" type="success"></lin-button>
      <lin-button icon="lin-icon-upload" :circle="true" type="info"></lin-button>
      <lin-button icon="lin-icon-search" :circle="true" type="warning"></lin-button>
      <lin-button icon="lin-icon-delete" :circle="true" type="danger"></lin-button>
    </div>
</div>

::: demo

```html
<div>
  <lin-button>Default</lin-button>
  <lin-button type="primary">Primary</lin-button>
  <lin-button type="success">Success</lin-button>
  <lin-button type="info">Info</lin-button>
  <lin-button type="warning">Warning</lin-button>
  <lin-button type="danger">Danger</lin-button>
</div>
<div>
  <lin-button :plain="true" type="default">Plain</lin-button>
  <lin-button :plain="true" type="primary">Primary</lin-button>
  <lin-button :plain="true" type="success">Success</lin-button>
  <lin-button :plain="true" type="info">Info</lin-button>
  <lin-button :plain="true" type="warning">Warning</lin-button>
  <lin-button :plain="true" type="danger">Danger</lin-button>
</div>
<div>
  <lin-button :round="true" type="default">round</lin-button>
  <lin-button :round="true" type="primary">Primary</lin-button>
  <lin-button :round="true" type="success">Success</lin-button>
  <lin-button :round="true" type="info">Info</lin-button>
  <lin-button :round="true" type="warning">Warning</lin-button>
  <lin-button :round="true" type="danger">Danger</lin-button>
</div>
<div>
  <lin-button icon="lin-icon-date" :circle="true" type="default"></lin-button>
  <lin-button
    icon="lin-icon-thumbsup"
    :circle="true"
    type="primary"
  ></lin-button>
  <lin-button icon="lin-icon-chat" :circle="true" type="success"></lin-button>
  <lin-button icon="lin-icon-upload" :circle="true" type="info"></lin-button>
  <lin-button icon="lin-icon-search" :circle="true" type="warning"></lin-button>
  <lin-button icon="lin-icon-delete" :circle="true" type="danger"></lin-button>
</div>
```

:::

## Disabled Button

The `disabled` attribute determines if the button is disabled.

<div class="demo-block row">
      <lin-button :disabled="true" type="default">default</lin-button>
      <lin-button :disabled="true" type="primary">primary</lin-button>
      <lin-button :disabled="true" type="success">success</lin-button>
      <lin-button :disabled="true" type="info">info</lin-button>
      <lin-button :disabled="true" type="warning">warning</lin-button>
      <lin-button :disabled="true" type="danger">danger</lin-button>
</div>

::: demo

```html
<lin-button :disabled="true" type="default">default</lin-button>
<lin-button :disabled="true" type="primary">primary</lin-button>
<lin-button :disabled="true" type="success">success</lin-button>
<lin-button :disabled="true" type="info">info</lin-button>
<lin-button :disabled="true" type="warning">warning</lin-button>
<lin-button :disabled="true" type="danger">danger</lin-button>
```

:::

## Icon Button

Use icons to add more meaning to Button. You can use icon alone to save some space, or use it with text.
Use the `icon` attribute to add icon. You can find the icon list in lin-view-ui icon component

<div class="demo-block row">
  <lin-button icon="lin-icon-date" type="default"></lin-button>
  <lin-button icon="lin-icon-thumbsup" type="primary"></lin-button>
  <lin-button icon="lin-icon-chat" type="success"></lin-button>
  <lin-button icon="lin-icon-upload" type="info">download</lin-button>
  <lin-button icon="lin-icon-search" type="warning">upload</lin-button>
  <lin-button icon="lin-icon-delete" type="danger">search</lin-button>
</div>

::: demo

```html
<lin-button icon="lin-icon-date" type="default"></lin-button>
<lin-button icon="lin-icon-thumbsup" type="primary"></lin-button>
<lin-button icon="lin-icon-chat" type="success"></lin-button>
<lin-button icon="lin-icon-upload" type="info">download</lin-button>
<lin-button icon="lin-icon-search" type="warning">upload</lin-button>
<lin-button icon="lin-icon-delete" type="danger">search</lin-button>
```

:::

## Sizes

Besides default size, Button component provides three additional sizes for you to choose among different scenarios.
Use attribute size to set additional sizes with `medium`, `small` or `size`.

<div class="demo-block row">
  <lin-button size="default">default</lin-button>
  <lin-button size="medium">medium</lin-button>
  <lin-button size="small">small</lin-button>
</div>

::: demo

```html
<lin-button size="default">default</lin-button>
<lin-button size="medium">medium</lin-button>
<lin-button size="small">small</lin-button>
```

:::

## Attributes

| Attribute | Description                            | Type    | Accepted Values                             | Default |
| --------- | -------------------------------------- | ------- | ------------------------------------------- | ------- |
| size      | button size                            | String  | default,medium,small                        | default |
| type      | button type                            | String  | default,primary,success,warning,danger,info | default |
| plain     | determine whether it's a plain button  | Boolean | —                                           | false   |
| disabled  | disable the button                     | Boolean | —                                           | false   |
| icon      | icon class name                        | String  | —                                           | —       |
| round     | determine whether it's a round button  | Boolean | —                                           | false   |
| circle    | determine whether it's a circle button | Boolean | —                                           | false   |

## Events

| Event Name | Description                          | Parameters |
| ---------- | ------------------------------------ | ---------- |
| click      | Triggered when the button is pressed | —          |

## Slots

| Name | Description       |
| ---- | ----------------- |
| —    | Content of button |
