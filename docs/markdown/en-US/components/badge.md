<style lang="scss" scoped>
.badge-item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>

# Badge

---

## Basic usage

Displays the amount of new messages.The amount is defined with `value` which accepts `Number` or `String`.

<div class='demo-block'>
<lin-badge :value="12" class="badge-item">
    <lin-button>comments</lin-button>
    </lin-badge>
    <lin-badge :value="3" class="badge-item">
    <lin-button>replies</lin-button>
    </lin-badge>
    <lin-badge :value="1" class="badge-item" type="danger">
    <lin-button>comments</lin-button>
    </lin-badge>
    <lin-badge :value="2" class="badge-item" type="warning">
    <lin-button>replies</lin-button>
    </lin-badge>
</div>

:::demo

```html
<lin-badge :value="12" class="badge-item">
  <lin-button>comments</lin-button>
</lin-badge>
<lin-badge :value="3" class="badge-item">
  <lin-button>replies</lin-button>
</lin-badge>
<lin-badge :value="1" class="badge-item" type="danger">
  <lin-button>comments</lin-button>
</lin-badge>
<lin-badge :value="2" class="badge-item" type="warning">
  <lin-button>replies</lin-button>
</lin-badge>
```

:::

## Max value

You can customize the max value.The max value is defined by property `max` which is a `Number`. Note that it only works when `value` is also a `Number`.

<div class='demo-block'>
      <lin-badge :value="200" :max="99" class="badge-item">
        <lin-button>comments</lin-button>
      </lin-badge>
      <lin-badge :value="100" :max="10" class="badge-item">
        <lin-button>replies</lin-button>
      </lin-badge>
</div>

:::demo

```html
<lin-badge :value="200" :max="99" class="badge-item">
  <lin-button>comments</lin-button>
</lin-badge>
<lin-badge :value="100" :max="10" class="badge-item">
  <lin-button>replies</lin-button>
</lin-badge>
```

:::

## Customizations

Displays text content other than numbers.When `value` is a `String`, it can display customized text.

<div class='demo-block'>
      <lin-badge value="new" class="badge-item">
        <lin-button>comments</lin-button>
      </lin-badge>
      <lin-badge value="hot" class="badge-item">
        <lin-button>replies</lin-button>
      </lin-badge>
</div>

:::demo

```html
<lin-badge value="new" class="badge-item">
  <lin-button>comments</lin-button>
</lin-badge>
<lin-badge value="hot" class="badge-item">
  <lin-button>replies</lin-button>
</lin-badge>
```

:::

## Little red dot

Use a red dot to mark content that needs to be noticed.Use the attribute `is-dot`. It is a `Boolean`.

<div class='demo-block'>
      <lin-badge is-dot class="badge-item">query</lin-badge>
      <lin-badge is-dot class="badge-item">
        <lin-button icon="lin-icon-thumbsup" type="primary"></lin-button>
      </lin-badge>
</div>

:::demo

```html
<lin-badge is-dot class="badge-item">query</lin-badge>
<lin-badge is-dot class="badge-item">
  <lin-button icon="lin-icon-thumbsup" type="primary"></lin-button>
</lin-badge>
```

:::

## Attributes

| Attribute | Description                                                                      | Type           | Accepted Values                                 | Default |
| --------- | -------------------------------------------------------------------------------- | -------------- | ----------------------------------------------- | ------- |
| value     | display value                                                                    | String，Number | —                                               | —       |
| max       | maximum value, shows '{max}+' when exceeded. Only works if `value` is a `Number` | Number         | —                                               | —       |
| is-dot    | if a little dot is displayed                                                     | Boolean        | —                                               | false   |
| type      | button type                                                                      | String         | primary ， success ， warning ， danger ， info | primary |
