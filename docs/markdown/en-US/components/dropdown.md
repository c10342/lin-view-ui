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

# Dropdown

---

## Basic usage

Hover on the dropdown menu to unfold it for more actions.The triggering element is rendered by the default `slot`, and the dropdown part is rendered by the `slot` named `dropdown`. By default, dropdown list shows when you `hover` on the triggering element without having to click it.

<div class='demo-block'>
<lin-dropdown>
  <span class="lin-dropdown-link">
    Dropdown List<i class="lin-icon-arrow-down lin-icon-down"></i>
  </span>
  <lin-dropdown-group slot="dropdown">
    <lin-dropdown-item>Action 1</lin-dropdown-item>
    <lin-dropdown-item>Action 2</lin-dropdown-item>
    <lin-dropdown-item>Action 3</lin-dropdown-item>
    <lin-dropdown-item disabled>Action 4</lin-dropdown-item>
    <lin-dropdown-item divided>Action 5</lin-dropdown-item>
  </lin-dropdown-group>
</lin-dropdown>
</div>

:::demo

```html
<lin-dropdown>
  <span class="lin-dropdown-link">
    Dropdown List<i class="lin-icon-arrow-down lin-icon-down"></i>
  </span>
  <lin-dropdown-group slot="dropdown">
    <lin-dropdown-item>Action 1</lin-dropdown-item>
    <lin-dropdown-item>Action 2</lin-dropdown-item>
    <lin-dropdown-item>Action 3</lin-dropdown-item>
    <lin-dropdown-item disabled>Action 4</lin-dropdown-item>
    <lin-dropdown-item divided>Action 5</lin-dropdown-item>
  </lin-dropdown-group>
</lin-dropdown>

<style>
  .lin-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .lin-icon-arrow-down {
    font-size: 12px;
  }
</style>
```

:::

## How to trigger

Use the attribute trigger. By default, it is hover.

<div class='demo-block'>
<lin-row class="block-col-2">
  <lin-col :span="12">
    <span class="demonstration">hover to trigger</span>
    <lin-dropdown>
      <span class="lin-dropdown-link">
        Dropdown List<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
      <lin-dropdown-group slot="dropdown">
        <lin-dropdown-item icon="lin-icon-date">Action 1</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-thumbsup">Action 2</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-chat">Action 3</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-search">Action 4</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-upload">Action 5</lin-dropdown-item>
      </lin-dropdown-group>
    </lin-dropdown>
  </lin-col>
  <lin-col :span="12">
    <span class="demonstration">click to trigger</span>
    <lin-dropdown trigger="click">
      <span class="lin-dropdown-link">
        Dropdown List<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
      <lin-dropdown-group slot="dropdown">
        <lin-dropdown-item icon="lin-icon-date">Action 1</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-thumbsup">Action 2</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-chat">Action 3</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-search">Action 4</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-upload">Action 5</lin-dropdown-item>
      </lin-dropdown-group>
    </lin-dropdown>
  </lin-col>
</lin-row>
</div>

:::demo

```html
<lin-row class="block-col-2">
  <lin-col :span="12">
    <span class="demonstration">hover to trigger</span>
    <lin-dropdown>
      <span class="lin-dropdown-link">
        Dropdown List<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
      <lin-dropdown-group slot="dropdown">
        <lin-dropdown-item icon="lin-icon-date">Action 1</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-thumbsup">Action 2</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-chat">Action 3</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-search">Action 4</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-upload">Action 5</lin-dropdown-item>
      </lin-dropdown-group>
    </lin-dropdown>
  </lin-col>
  <lin-col :span="12">
    <span class="demonstration">click to trigger</span>
    <lin-dropdown trigger="click">
      <span class="lin-dropdown-link">
        Dropdown List<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
      <lin-dropdown-group slot="dropdown">
        <lin-dropdown-item icon="lin-icon-date">Action 1</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-thumbsup">Action 2</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-chat">Action 3</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-search">Action 4</lin-dropdown-item>
        <lin-dropdown-item icon="lin-icon-upload">Action 5</lin-dropdown-item>
      </lin-dropdown-group>
    </lin-dropdown>
  </lin-col>
</lin-row>

<style>
  .lin-dropdown-link {
    cursor: pointer;
    color: #409eff;
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

## Menu hiding behavior

Use `hide-on-click` to define if menu closes on clicking.By default menu will close when you click on menu items, and it can be turned off by setting `hide-on-click` to `false`.

<div class='demo-block'>
<lin-dropdown :hide-on-click="false">
  <span class="lin-dropdown-link">
        Dropdown List<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
  <lin-dropdown-group slot="dropdown">
    <lin-dropdown-item>Action 1</lin-dropdown-item>
    <lin-dropdown-item>Action 2</lin-dropdown-item>
    <lin-dropdown-item>Action 3</lin-dropdown-item>
    <lin-dropdown-item disabled>Action 4</lin-dropdown-item>
    <lin-dropdown-item divided>Action 5</lin-dropdown-item>
  </lin-dropdown-group>
</lin-dropdown>
</div>

:::demo

```html
<lin-dropdown :hide-on-click="false">
  <span class="lin-dropdown-link">
    Dropdown List<i class="lin-icon-arrow-down lin-icon-down"></i>
  </span>
  <lin-dropdown-group slot="dropdown">
    <lin-dropdown-item>Action 1</lin-dropdown-item>
    <lin-dropdown-item>Action 2</lin-dropdown-item>
    <lin-dropdown-item>Action 3</lin-dropdown-item>
    <lin-dropdown-item disabled>Action 4</lin-dropdown-item>
    <lin-dropdown-item divided>Action 5</lin-dropdown-item>
  </lin-dropdown-group>
</lin-dropdown>
<style>
  .lin-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .lin-icon-arrow-down {
    font-size: 12px;
  }
</style>
```

:::

## Command event

Clicking each dropdown item fires an event whose parameter is assigned by each item.

<div class='demo-block'>
<lin-dropdown @command="handleCommand">
  <span class="lin-dropdown-link">
        Dropdown List<i class="lin-icon-arrow-down lin-icon-down"></i>
      </span>
  <lin-dropdown-group slot="dropdown">
    <lin-dropdown-item command="a">Action 1</lin-dropdown-item>
    <lin-dropdown-item command="b">Action 2</lin-dropdown-item>
    <lin-dropdown-item command="c">Action 3</lin-dropdown-item>
    <lin-dropdown-item command="d" disabled>Action 4</lin-dropdown-item>
    <lin-dropdown-item command="e" divided>Action 5</lin-dropdown-item>
  </lin-dropdown-group>
</lin-dropdown>
</div>

:::demo

```html
<lin-dropdown @command="handleCommand">
  <span class="lin-dropdown-link">
    Dropdown List<i class="lin-icon-arrow-down lin-icon-down"></i>
  </span>
  <lin-dropdown-group slot="dropdown">
    <lin-dropdown-item command="a">Action 1</lin-dropdown-item>
    <lin-dropdown-item command="b">Action 2</lin-dropdown-item>
    <lin-dropdown-item command="c">Action 3</lin-dropdown-item>
    <lin-dropdown-item command="d" disabled>Action 4</lin-dropdown-item>
    <lin-dropdown-item command="e" divided>Action 5</lin-dropdown-item>
  </lin-dropdown-group>
</lin-dropdown>

<script>
  export default {
    methods: {
      handleCommand(command) {
        alert("click on item " + command);
      },
    },
  };
</script>

<style>
  .lin-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .lin-icon-arrow-down {
    font-size: 12px;
  }
</style>
```

:::

## Dropdown Attributes

| Attribute   | Description                                   | Type    | Accepted Values | Default |
| ----------- | --------------------------------------------- | ------- | --------------- | ------- |
| trigger     | how to trigger                                | String  | click/hover     | hover   |
| hideOnClick | whether to hide menu after clicking menu-item | Boolean | —               | true    |

## Dropdown Events

| Event Name     | Description                                   | Parameters                                    |
| -------------- | --------------------------------------------- | --------------------------------------------- |
| command        | triggers when a dropdown item is clicked      | the command dispatched from the dropdown item |
| visible-change | triggers when the dropdown appears/disappears | true when it appears, and false otherwise     |

## Dropdown Slots

| Name     | Description                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| —        | content of Dropdown. Notice: Must be a valid html dom element or el-component, to attach the trigger listener |
| dropdown | content of the Dropdown Menu, usually a &lt;lin-dropdown-group&gt; element                                    |

## DropdownGroup Attributes

| Attribute | Description             | Type   | Accepted Values | Default |
| --------- | ----------------------- | ------ | --------------- | ------- |
| label     | Group name of the group | String | —               | —       |

## DropdownGroup Slots

| Name | Description                  |
| ---- | ---------------------------- |
| —    | content of the Dropdown Menu |

## DropdownItem Attributes

| Attribute | Description                                               | Type                 | Accepted Values | Default |
| --------- | --------------------------------------------------------- | -------------------- | --------------- | ------- |
| disabled  | whether the item is disabled                              | Boolean              | —               | false   |
| divided   | whether a divider is displayed                            | Boolean              | —               | false   |
| command   | a command to be dispatched to Dropdown's command callback | string/number/object | —               | —       |
| icon      | icon class name                                           | String               | —               | —       |

## DropdownItem Slots

| Name | Description                  |
| ---- | ---------------------------- |
| —    | content of the Dropdown Menu |
