# Collapse

[[toc]]

---

## Basic usage

By default, multiple panels can be expanded at the same time, and the default expansion order can be set.

:::demo

```vue
<template>
  <lin-collapse-group v-model="value1">
    <lin-collapse-item name="1">
      Steve Jobs
      <div slot="content">
        Steve Jobs (Steve Jobs), born in San Francisco, California, USA on
        February 24, 1955, is an American inventor, entrepreneur and co-founder
        of apple.
      </div>
    </lin-collapse-item>
    <lin-collapse-item name="2">
      Steve Jobs
      <div slot="content">
        Steve Jobs (Steve Jobs), born in San Francisco, California, USA on
        February 24, 1955, is an American inventor, entrepreneur and co-founder
        of apple.
      </div>
    </lin-collapse-item>
  </lin-collapse-group>
</template>

<script>
export default {
  data() {
    return {
      value1: "1",
    };
  },
};
</script>
```

:::

## Accordion mode

You can only open one panel at a time by setting the attribute `accordion`.

:::demo

```vue
<template>
  <lin-collapse-group accordion v-model="value2">
    <lin-collapse-item name="1">
      Steve Jobs
      <div slot="content">
        Steve Jobs (Steve Jobs), born in San Francisco, California, USA on
        February 24, 1955, is an American inventor, entrepreneur and co-founder
        of apple.
      </div>
    </lin-collapse-item>
    <lin-collapse-item name="2">
      Steve Jobs
      <div slot="content">
        Steve Jobs (Steve Jobs), born in San Francisco, California, USA on
        February 24, 1955, is an American inventor, entrepreneur and co-founder
        of apple.
      </div>
    </lin-collapse-item>
  </lin-collapse-group>
</template>

<script>
export default {
  data() {
    return {
      value2: "1",
    };
  },
};
</script>
```

:::

## Concise model

Setting the property `simple` can be displayed as a concise mode without borders and background colors.

:::demo

```vue
<template>
  <lin-collapse-group simple v-model="value3">
    <lin-collapse-item name="1">
      Steve Jobs
      <div slot="content">
        Steve Jobs (Steve Jobs), born in San Francisco, California, USA on
        February 24, 1955, is an American inventor, entrepreneur and co-founder
        of apple.
      </div>
    </lin-collapse-item>
    <lin-collapse-item name="2">
      Steve Jobs
      <div slot="content">
        Steve Jobs (Steve Jobs), born in San Francisco, California, USA on
        February 24, 1955, is an American inventor, entrepreneur and co-founder
        of apple.
      </div>
    </lin-collapse-item>
  </lin-collapse-group>
</template>

<script>
export default {
  data() {
    return {
      value3: "1",
    };
  },
};
</script>
```

:::

## CollapseGroup Attributes

| Attribute | Description                                                                       | Type            | Accepted Values | Default |
| --------- | --------------------------------------------------------------------------------- | --------------- | --------------- | ------- |
| value     | The name of the currently active panel can be bound Bi directionally with v-model | Array , String | —               | —       |
| accordion | Whether to turn on accordion mode, and expand one panel at a time                 | Boolean         | —               | false   |
| simple    | Do you want to turn on concise mode                                               | Boolean         | —               | false   |

## CollapseGroup Events

| Event Name | Description                                                                                          | Parameters |
| ---------- | ---------------------------------------------------------------------------------------------------- | ---------- |
| onChange   | Triggered when panel switching. Returns the key of the currently expanded panel in the form of array | []         |

## CollapseItem Attributes

| Attribute  | Description                                                                      | Type           | Accepted Values | Default |
| ---------- | -------------------------------------------------------------------------------- | -------------- | --------------- | ------- |
| name       | Name of the current panel, corresponding to the value of collapsegroup, required | Array ,String | —               | —       |
| hide-arrow | Hide arrow                                                                       | Boolean        | —               | false   |

## CollapseItem Slots

| Name    | Description          |
| ------- | -------------------- |
| —       | Panel header content |
| content | Description content  |
