<style scoped>
  .lin-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .lin-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>

<script>
  export default {
    methods: {
      handleCommand(command) {
        alert('click on item ' + command)
      }
    }
  }
</script>

# Dropdown 下拉菜单

---

## 基础用法

移动到下拉菜单上，展开更多操作。通过组件 `slot` 来设置下拉触发的元素以及需要通过具名 `slot` 为 `dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要 `hover` 即可，无需点击也会显示下拉菜单。 

<div class='demo-block'>
<lin-dropdown>
  <span class="lin-dropdown-link">
    下拉菜单<i class="lin-icon-arrow-down lin-icon-down"></i>
  </span>
  <lin-dropdown-group slot="dropdown">
    <lin-dropdown-item>黄金糕</lin-dropdown-item>
    <lin-dropdown-item>狮子头</lin-dropdown-item>
    <lin-dropdown-item>螺蛳粉</lin-dropdown-item>
    <lin-dropdown-item disabled>双皮奶</lin-dropdown-item>
    <lin-dropdown-item divided>蚵仔煎</lin-dropdown-item>
  </lin-dropdown-group>
</lin-dropdown>
</div>

:::demo
```html
<lin-dropdown>
  <span class="lin-dropdown-link">
    下拉菜单<i class="lin-icon-arrow-down lin-icon-down"></i>
  </span>
  <lin-dropdown-group slot="dropdown">
    <lin-dropdown-item>黄金糕</lin-dropdown-item>
    <lin-dropdown-item>狮子头</lin-dropdown-item>
    <lin-dropdown-item>螺蛳粉</lin-dropdown-item>
    <lin-dropdown-item disabled>双皮奶</lin-dropdown-item>
    <lin-dropdown-item divided>蚵仔煎</lin-dropdown-item>
  </lin-dropdown-group>
</lin-dropdown>

<style>
  .lin-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .lin-icon-arrow-down {
    font-size: 12px;
  }
</style>
```
:::

## 触发方式
可以配置 click 激活或者 hover 激活。

<div class='demo-block'>
<lin-row class="block-col-2">
  <lin-col :span="12">
    <span class="demonstration">hover 激活</span>
    <lin-dropdown>
      <span class="lin-dropdown-link">
        下拉菜单<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
      <lin-dropdown-group slot="dropdown">
        <lin-dropdown-item icon="lin-icon-date">黄金糕</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-thumbsup">狮子头</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-chat">螺蛳粉</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-search">双皮奶</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-upload">蚵仔煎</lin-dropdown-item>
      </lin-dropdown-group>
    </lin-dropdown>
  </lin-col>
  <lin-col :span="12">
    <span class="demonstration">click 激活</span>
    <lin-dropdown trigger="click">
      <span class="lin-dropdown-link">
        下拉菜单<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
      <lin-dropdown-group slot="dropdown">
        <lin-dropdown-item icon="lin-icon-date">黄金糕</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-thumbsup">狮子头</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-chat">螺蛳粉</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-search">双皮奶</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-upload">蚵仔煎</lin-dropdown-item>
      </lin-dropdown-group>
    </lin-dropdown>
  </lin-col>
</lin-row>
</div>

:::demo
```html
<lin-row class="block-col-2">
  <lin-col :span="12">
    <span class="demonstration">hover 激活</span>
    <lin-dropdown>
      <span class="lin-dropdown-link">
        下拉菜单<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
      <lin-dropdown-group slot="dropdown">
        <lin-dropdown-item icon="lin-icon-date">黄金糕</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-thumbsup">狮子头</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-chat">螺蛳粉</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-search">双皮奶</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-upload">蚵仔煎</lin-dropdown-item>
      </lin-dropdown-group>
    </lin-dropdown>
  </lin-col>
  <lin-col :span="12">
    <span class="demonstration">click 激活</span>
    <lin-dropdown trigger="click">
      <span class="lin-dropdown-link">
        下拉菜单<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
      <lin-dropdown-group slot="dropdown">
        <lin-dropdown-item icon="lin-icon-date">黄金糕</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-thumbsup">狮子头</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-chat">螺蛳粉</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-search">双皮奶</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-upload">蚵仔煎</lin-dropdown-item>
      </lin-dropdown-group>
    </lin-dropdown>
  </lin-col>
</lin-row>

<style>
  .lin-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .lin-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>
```
:::

## 菜单隐藏方式
可以 `hide-on-click` 属性来配置。下拉菜单默认在点击菜单项后会被隐藏，将 `hide-on-click` 属性默认为 `false` 可以关闭此功能。

<div class='demo-block'>
<lin-dropdown :hide-on-click="false">
  <span class="lin-dropdown-link">
        下拉菜单<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
  <lin-dropdown-group slot="dropdown">
    <lin-dropdown-item>黄金糕</lin-dropdown-item>
    <lin-dropdown-item>狮子头</lin-dropdown-item>
    <lin-dropdown-item>螺蛳粉</lin-dropdown-item>
    <lin-dropdown-item disabled>双皮奶</lin-dropdown-item>
    <lin-dropdown-item divided>蚵仔煎</lin-dropdown-item>
  </lin-dropdown-group>
</lin-dropdown>
</div>

:::demo
```html
<lin-dropdown :hide-on-click="false">
  <span class="lin-dropdown-link">
        下拉菜单<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
  <lin-dropdown-group slot="dropdown">
    <lin-dropdown-item>黄金糕</lin-dropdown-item>
    <lin-dropdown-item>狮子头</lin-dropdown-item>
    <lin-dropdown-item>螺蛳粉</lin-dropdown-item>
    <lin-dropdown-item disabled>双皮奶</lin-dropdown-item>
    <lin-dropdown-item divided>蚵仔煎</lin-dropdown-item>
  </lin-dropdown-group>
</lin-dropdown>
<style>
  .lin-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .lin-icon-arrow-down {
    font-size: 12px;
  }
</style>
```
:::



## 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作

<div class='demo-block'>
<lin-dropdown @command="handleCommand">
  <span class="lin-dropdown-link">
        下拉菜单<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
  <lin-dropdown-group slot="dropdown">
    <lin-dropdown-item command="a">黄金糕</lin-dropdown-item>
    <lin-dropdown-item command="b">狮子头</lin-dropdown-item>
    <lin-dropdown-item command="c">螺蛳粉</lin-dropdown-item>
    <lin-dropdown-item command="d" disabled>双皮奶</lin-dropdown-item>
    <lin-dropdown-item command="e" divided>蚵仔煎</lin-dropdown-item>
  </lin-dropdown-group>
</lin-dropdown>
</div>

:::demo
```html
<lin-dropdown @command="handleCommand">
  <span class="lin-dropdown-link">
        下拉菜单<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
  <lin-dropdown-group slot="dropdown">
    <lin-dropdown-item command="a">黄金糕</lin-dropdown-item>
    <lin-dropdown-item command="b">狮子头</lin-dropdown-item>
    <lin-dropdown-item command="c">螺蛳粉</lin-dropdown-item>
    <lin-dropdown-item command="d" disabled>双皮奶</lin-dropdown-item>
    <lin-dropdown-item command="e" divided>蚵仔煎</lin-dropdown-item>
  </lin-dropdown-group>
</lin-dropdown>


<script>
  export default {
    methods: {
      handleCommand(command) {
        alert('click on item ' + command)
      }
    }
  }
</script>

<style>
  .lin-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .lin-icon-arrow-down {
    font-size: 12px;
  }
</style>
```
:::

## Dropdown 属性

| 参数       | 说明                                  | 类型   | 可选值 | 默认值 |
| ---------- | ------------------------------------- | ------ | ------ | ------ |
| trigger      | 触发下拉的行为                          | String | click/hover      | hover      |
| hideOnClick | 是否在点击菜单项后隐藏菜单	                      | Boolean | —      | true   |

## Dropdown 事件

| 事件名称 | 说明                   | 回调参数                                                   |
| -------- | ---------------------- | ---------------------------------------------------------- |
| command | 点击菜单项触发的事件回调 | dropdown-item 的指令 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |

## Dropdown 插槽

| 插槽名称 | 说明           |
| -------- | -------------- |
| —        | 触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件 |
| dropdown        | 下拉列表，通常是 <lin-dropdown-group> 组件 |

## DropdownGroup 属性

| 参数       | 说明                                  | 类型   | 可选值 | 默认值 |
| ---------- | ------------------------------------- | ------ | ------ | ------ |
| label      | 分组的组名                          | String | —      | —      |

## DropdownGroup 插槽

| 插槽名称 | 说明           |
| -------- | -------------- |
| —        | 下拉列表显示的元素 |

## DropdownItem 属性

| 参数       | 说明                                  | 类型   | 可选值 | 默认值 |
| ---------- | ------------------------------------- | ------ | ------ | ------ |
| disabled      | 禁用                          | Boolean | —      | false      |
| divided      | 显示分割线	                          | Boolean | —      | false      |
| command      | 指令                          | string/number/object | —      | —      |
| icon      | 图标类名	                          | String | —      | —      |

## DropdownItem 插槽

| 插槽名称 | 说明           |
| -------- | -------------- |
| —        | 下拉列表项显示的内容 |