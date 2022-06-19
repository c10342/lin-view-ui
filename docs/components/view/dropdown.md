# Dropdown 下拉菜单

[[toc]]

---

## 基础用法

移动到下拉菜单上，展开更多操作。通过组件 `slot` 来设置下拉触发的元素以及需要通过具名 `slot` 为 `dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要 `hover` 即可，无需点击也会显示下拉菜单。

:::demo
dropdown/base
:::

## 触发方式

可以配置 click 激活或者 hover 激活。

:::demo
dropdown/trigger
:::

## 菜单隐藏方式

可以 `hide-on-click` 属性来配置。下拉菜单默认在点击菜单项后会被隐藏，将 `hide-on-click` 属性默认为 `false` 可以关闭此功能。

:::demo
dropdown/hide-on-click
:::

## 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作

:::demo
dropdown/command
:::

## Dropdown 属性

| 参数        | 说明                       | 类型    | 可选值      | 默认值 |
| ----------- | -------------------------- | ------- | ----------- | ------ |
| trigger     | 触发下拉的行为             | string  | click,hover | hover  |
| hideOnClick | 是否在点击菜单项后隐藏菜单 | boolean | —           | true   |

## Dropdown 事件

| 事件名称       | 说明                     | 回调参数                      |
| -------------- | ------------------------ | ----------------------------- |
| command        | 点击菜单项触发的事件回调 | dropdown-item 的指令          |
| visible-change | 下拉框出现/隐藏时触发    | 出现则为 true，隐藏则为 false |

## Dropdown 插槽

| 插槽名称 | 说明                                                       |
| -------- | ---------------------------------------------------------- |
| —        | 触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件 |
| dropdown | 下拉列表，通常是 &lt;lin-dropdown-group&gt; 组件           |

## DropdownGroup 属性

| 参数  | 说明       | 类型   | 可选值 | 默认值 |
| ----- | ---------- | ------ | ------ | ------ |
| label | 分组的组名 | string | —      | —      |

## DropdownGroup 插槽

| 插槽名称 | 说明               |
| -------- | ------------------ |
| —        | 下拉列表显示的元素 |

## DropdownItem 属性

| 参数     | 说明       | 类型                 | 可选值 | 默认值 |
| -------- | ---------- | -------------------- | ------ | ------ |
| disabled | 禁用       | boolean              | —      | false  |
| divided  | 显示分割线 | boolean              | —      | false  |
| command  | 指令       | string,number,Object | —      | —      |
| icon     | 图标类名   | string               | —      | —      |

## DropdownItem 插槽

| 插槽名称 | 说明                 |
| -------- | -------------------- |
| —        | 下拉列表项显示的内容 |
