<style lang="scss" scoped>
.demo-block {
  ::v-deep .lin-alert {
    margin-bottom: 10px;
  }
}
</style>

# Alert

---

## Basic usage

Non floating elements in the page will not disappear automatically.

<div class='demo-block'>
<lin-alert type="success" title="Prompt copy"></lin-alert>
<lin-alert type="info" title="Prompt copy"></lin-alert>
<lin-alert type="warning" title="Prompt copy"></lin-alert>
<lin-alert type="danger" title="Prompt copy"></lin-alert>
</div>

:::demo

```html
<lin-alert type="success" title="Prompt copy"></lin-alert>
<lin-alert type="info" title="Prompt copy"></lin-alert>
<lin-alert type="warning" title="Prompt copy"></lin-alert>
<lin-alert type="danger" title="Prompt copy"></lin-alert>
```

:::

## Theme

The alert component provides two different themes: `light` and `dark`.

<div class='demo-block'>
<lin-alert effect="dark" type="success" title="Prompt copy"></lin-alert>
<lin-alert effect="dark" type="info" title="Prompt copy"></lin-alert>
<lin-alert effect="dark" type="warning" title="Prompt copy"></lin-alert>
<lin-alert effect="dark" type="danger" title="Prompt copy"></lin-alert>
</div>

:::demo

```html
<lin-alert effect="dark" type="success" title="Prompt copy"></lin-alert>
<lin-alert effect="dark" type="info" title="Prompt copy"></lin-alert>
<lin-alert effect="dark" type="warning" title="Prompt copy"></lin-alert>
<lin-alert effect="dark" type="danger" title="Prompt copy"></lin-alert>
```

:::

## Custom close button

In the alert component, you can set whether it can be closed, the text of the close button, and the callback function when closing. The `closable` attribute determines whether it can be closed. It accepts `boolean`. The default value is `true`. You can use the `close` slot instead of the close icon on the right.

<div class='demo-block'>
<lin-alert closable type="success" title="Uncloseable alert"></lin-alert>
<lin-alert closable type="info" title="custom">
<template slot='close'><span>got it</span></template>
</lin-alert>
</div>

:::demo

```html
<lin-alert closable type="success" title="Uncloseable alert"></lin-alert>
<lin-alert closable type="info" title="custom">
  <template slot="close"><span>got it</span></template>
</lin-alert>
```

:::

## With Icon

Improves readability when representing a state. By setting the `icon` property to display alert's icon, this can more effectively show the user your display intention.

<div class='demo-block'>
<lin-alert icon="lin-icon-chat" type="success" title="Prompt copy"></lin-alert>
<lin-alert icon="lin-icon-chat" type="info" title="Prompt copy"></lin-alert>
<lin-alert icon="lin-icon-chat" type="warning" title="Prompt copy"></lin-alert>
<lin-alert icon="lin-icon-chat" type="danger" title="Prompt copy"></lin-alert>
</div>

:::demo

```html
<lin-alert icon="lin-icon-chat" type="success" title="Prompt copy"></lin-alert>
<lin-alert icon="lin-icon-chat" type="info" title="Prompt copy"></lin-alert>
<lin-alert icon="lin-icon-chat" type="warning" title="Prompt copy"></lin-alert>
<lin-alert icon="lin-icon-chat" type="danger" title="Prompt copy"></lin-alert>
```

:::

## Text centered

Use the `center` property to center the text horizontally.

<div class='demo-block'>
<lin-alert center icon="lin-icon-chat" type="success" title="Prompt copy"></lin-alert>
<lin-alert center icon="lin-icon-chat" type="info" title="Prompt copy"></lin-alert>
<lin-alert center icon="lin-icon-chat" type="warning" title="Prompt copy"></lin-alert>
<lin-alert center icon="lin-icon-chat" type="danger" title="Prompt copy"></lin-alert>
</div>

:::demo

```html
<lin-alert
  center
  icon="lin-icon-chat"
  type="success"
  title="Prompt copy"
></lin-alert>
<lin-alert
  center
  icon="lin-icon-chat"
  type="info"
  title="Prompt copy"
></lin-alert>
<lin-alert
  center
  icon="lin-icon-chat"
  type="warning"
  title="Prompt copy"
></lin-alert>
<lin-alert
  center
  icon="lin-icon-chat"
  type="danger"
  title="Prompt copy"
></lin-alert>
```

:::

## With supplementary text introduction

In addition to the required `title` attribute, you can set the `description` attribute to help you better introduce it. We call it auxiliary text.

<div class='demo-block'>
      <lin-alert description="Text description" type="success" title="Prompt copy"></lin-alert>
      <lin-alert description="Text description" type="info" title="Prompt copy"></lin-alert>
      <lin-alert description="Text description" type="warning" title="Prompt copy"></lin-alert>
      <lin-alert description="Text description" type="danger" title="Prompt copy"></lin-alert>
</div>

:::demo

```html
<lin-alert
  description="Text description"
  type="success"
  title="Prompt copy"
></lin-alert>
<lin-alert
  description="Text description"
  type="info"
  title="Prompt copy"
></lin-alert>
<lin-alert
  description="Text description"
  type="warning"
  title="Prompt copy"
></lin-alert>
<lin-alert
  description="Text description"
  type="danger"
  title="Prompt copy"
></lin-alert>
```

:::

## With icon and auxiliary text introduction

This is an example of both icon and auxiliary text.

<div class='demo-block'>
            <lin-alert
        icon="lin-icon-chat"
        description="Text description"
        type="success"
        title="Prompt copy"
      ></lin-alert>
      <lin-alert
        icon="lin-icon-chat"
        description="Text description"
        type="info"
        title="Prompt copy"
      ></lin-alert>
      <lin-alert
        icon="lin-icon-chat"
        description="Text description"
        type="warning"
        title="Prompt copy"
      ></lin-alert>
      <lin-alert
        icon="lin-icon-chat"
        description="Text description"
        type="danger"
        title="Prompt copy"
      ></lin-alert>
</div>

:::demo

```html
<lin-alert
  icon="lin-icon-chat"
  description="Text description"
  type="success"
  title="Prompt copy"
></lin-alert>
<lin-alert
  icon="lin-icon-chat"
  description="Text description"
  type="info"
  title="Prompt copy"
></lin-alert>
<lin-alert
  icon="lin-icon-chat"
  description="Text description"
  type="warning"
  title="Prompt copy"
></lin-alert>
<lin-alert
  icon="lin-icon-chat"
  description="Text description"
  type="danger"
  title="Prompt copy"
></lin-alert>
```

:::

## Attributes

| Attribute   | Description               | Type    | Accepted Values             | Default |
| ----------- | ------------------------- | ------- | --------------------------- | ------- |
| title       | title                     | String  | —                           | —       |
| description | Auxiliary text            | String  | —                           | —       |
| icon        | Icon                      | String  | —                           | —       |
| closable    | Can I close it            | Boolean | —                           | false   |
| type        | theme                     | String  | success/warning/info/danger | success |
| effect      | Select the theme provided | String  | light/dark                  | light   |
| center      | Is the text centered      | Boolean | —                           | false   |

## Slots

| Name        | Description                        |
| ----------- | ---------------------------------- |
| icon        | Content of alert icon area         |
| title       | Content of alert title area        |
| description | Content of alert description area  |
| close       | Contents of the alert close button |

## Events

| Event Name | Description                              | Parameters |
| ---------- | ---------------------------------------- | ---------- |
| close      | Event triggered when alert is turned off | —          |
