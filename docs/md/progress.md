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

# Progress 进度条

---

## 线形进度条

Progress 组件设置 `percent` 属性即可，表示进度条对应的百分比，必填，必须在 0-1。

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

## 显示内外文字

百分比不占用额外控件，适用于文件上传等场景

<div class='demo-block'>
<lin-progress text-outside="85分" text-inside="50%" :height="20" type="primary" :percent="0.5"></lin-progress>
<lin-progress text-outside="85分" text-inside="50%" :height="20" type="success" :percent="0.5"></lin-progress>
<lin-progress text-outside="85分" text-inside="50%" :height="20" type="warning" :percent="0.5"></lin-progress>
<lin-progress text-outside="85分" text-inside="50%" :height="20" type="danger" :percent="0.5"></lin-progress>
</div>

:::demo

```html
<lin-progress
  text-outside="85分"
  text-inside="50%"
  :height="20"
  type="primary"
  :percent="0.5"
/>
<lin-progress
  text-outside="85分"
  text-inside="50%"
  :height="20"
  type="success"
  :percent="0.5"
/>
<lin-progress
  text-outside="85分"
  text-inside="50%"
  :height="20"
  type="warning"
  :percent="0.5"
/>
<lin-progress
  text-outside="85分"
  text-inside="50%"
  :height="20"
  type="danger"
  :percent="0.5"
/>
```

:::

## 自定义颜色

可通过 `outColor` 和 `innerColor` 属性来设置进度条的颜色

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

## 自定义提示文字

通过具名插槽 `text` 和 默认插槽 `default` 来自定义你想要的文字效果

<div class='demo-block'>
<lin-progress :height="20" type="danger" :percent="0.5">
        <template>
          <p class="demo-out-tip">百分之五十</p>
        </template>
        <template v-slot:text>
          <p class="demo-in-tip">百分之五十</p>
        </template>
      </lin-progress>
</div>

:::demo

```html
<lin-progress :height="20" type="danger" :percent="0.5">
  <template>
    <p class="demo-out-tip">百分之五十</p>
  </template>
  <template v-slot:text>
    <p class="demo-in-tip">百分之五十</p>
  </template>
</lin-progress>
```

:::

## Progress 属性

| 参数        | 说明                  | 类型    | 可选值                         | 默认值  |
| ----------- | --------------------- | ------- | ------------------------------ | ------- |
| percent     | 百分比（必填）        | Number  | 0-1                            | 0       |
| innerColor  | 进度条底层颜色        | String  | —                              | —       |
| outColor    | 进度条上层颜色        | String  | —                              | —       |
| height      | 进度条的高度，单位 px | Number  |                                | 10      |
| radius      | 是否需要圆角          | Boolean | —                              | true    |
| textOutside | 进度条外面的提示文字  | String  | —                              | —       |
| textInside  | 进度条里面的提示文字  | String  | —                              | —       |
| type        | 进度条类型            | String  | primary,success,warning,danger | primary |

## 插槽

| 插槽名称 | 说明                    |
| -------- | ----------------------- |
| —        | Progress 外面提示的内容 |
| text     | Progress 里面提示的内容 |
