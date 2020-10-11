<style lang="scss" scoped>
::v-deep .lin-progress {
  margin-bottom: 10px;
}
.demo-in-tip {
  color: #fff;
  font-size: 12px;
}
.demo-out-tip {
  color: #333;
  font-size: 12px;
  margin-left: 10px;
}
</style>

# Progress

---

## Linear progress bar

The progress component can set the `percent` property, which indicates the percentage corresponding to the progress bar. It must be 0-1.

<div class='demo-block'>
<lin-progress type="primary" :percent="0.5"></lin-progress>
<lin-progress type="success" :percent="0.5"></lin-progress>
<lin-progress type="warning" :percent="0.5"></lin-progress>
<lin-progress type="danger" :percent="0.5"></lin-progress>
</div>

:::demo

```html
<lin-progress type="primary" :percent="0.5" />
<lin-progress type="success" :percent="0.5" />
<lin-progress type="warning" :percent="0.5" />
<lin-progress type="danger" :percent="0.5" />
```

:::

## Display internal and external text

Percentage does not take up additional controls, which is applicable to scenarios such as file upload

<div class='demo-block'>
<lin-progress text-outside="85 mark" text-inside="50%" :height="20" type="primary" :percent="0.5"></lin-progress>
<lin-progress text-outside="85 mark" text-inside="50%" :height="20" type="success" :percent="0.5"></lin-progress>
<lin-progress text-outside="85 mark" text-inside="50%" :height="20" type="warning" :percent="0.5"></lin-progress>
<lin-progress text-outside="85 mark" text-inside="50%" :height="20" type="danger" :percent="0.5"></lin-progress>
</div>

:::demo

```html
<lin-progress
  text-outside="85 mark"
  text-inside="50%"
  :height="20"
  type="primary"
  :percent="0.5"
/>
<lin-progress
  text-outside="85 mark"
  text-inside="50%"
  :height="20"
  type="success"
  :percent="0.5"
/>
<lin-progress
  text-outside="85 mark"
  text-inside="50%"
  :height="20"
  type="warning"
  :percent="0.5"
/>
<lin-progress
  text-outside="85 mark"
  text-inside="50%"
  :height="20"
  type="danger"
  :percent="0.5"
/>
```

:::

## Custom color

You can set the color of the progress bar through the `outColor` and `innerColor` properties

<div class='demo-block'>
<lin-progress
  out-color="rgb(144, 147, 153)"
  inner-color="rgb(111, 122, 211)"
  :height="20"
  :percent="0.5"
/>
</div>

:::demo

```html
<lin-progress
  out-color="rgb(144, 147, 153)"
  inner-color="rgb(111, 122, 211)"
  :height="20"
  :percent="0.5"
/>
```

:::

## Custom prompt text

Customize the text effect you want through the named slot `text` and the default slot `default`

<div class='demo-block'>
<lin-progress :height="20" type="danger" :percent="0.5">
        <template>
          <p class="demo-out-tip">fifty percent</p>
        </template>
        <template v-slot:text>
          <p class="demo-in-tip">fifty percent</p>
        </template>
      </lin-progress>
</div>

:::demo

```html
<lin-progress :height="20" type="danger" :percent="0.5">
  <template>
    <p class="demo-out-tip">fifty percent</p>
  </template>
  <template v-slot:text>
    <p class="demo-in-tip">fifty percent</p>
  </template>
</lin-progress>
```

:::

## Attributes

| Attribute   | Description                          | Type    | Accepted Values                | Default |
| ----------- | ------------------------------------ | ------- | ------------------------------ | ------- |
| percent     | Percentage (required)                | Number  | 0-1                            | 0       |
| innerColor  | Bottom color of progress bar         | String  | —                              | —       |
| outColor    | Top color of progress bar            | String  | —                              | —       |
| height      | Height of progress bar, in PX        | Number  |                                | 10      |
| radius      | Is fillet required                   | Boolean | —                              | true    |
| textOutside | Prompt text outside the progress bar | String  | —                              | —       |
| textInside  | Prompt text in progress bar          | String  | —                              | —       |
| type        | Progress bar type                    | String  | primary,success,warning,danger | primary |

## Slots

| Name | Description                       |
| ---- | --------------------------------- |
| —    | What is prompted outside progress |
| text | What is prompted in progress      |
