# Tab 标签页

[[toc]]

---

## 基础用法

基础的、简洁的标签页。`Tab` 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 value 属性来指定当前选中的标签页。

:::demo

```vue
<template>
  <lin-tab-group v-model="activeName" @tab-click="handleClick">
    <lin-tab-item label="用户管理" name="first">用户管理</lin-tab-item>
    <lin-tab-item label="配置管理" name="second">配置管理</lin-tab-item>
    <lin-tab-item label="角色管理" name="third">角色管理</lin-tab-item>
    <lin-tab-item label="定时任务补偿" name="fourth">定时任务补偿</lin-tab-item>
  </lin-tab-group>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(data) {
      console.log(data);
    },
  },
};
</script>
```

:::

## 选项卡样式

选项卡样式的标签页。只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。

:::demo

```vue
<template>
  <lin-tab-group type="card">
    <lin-tab-item label="用户管理" name="first">用户管理</lin-tab-item>
    <lin-tab-item label="配置管理" name="second">配置管理</lin-tab-item>
    <lin-tab-item label="角色管理" name="third">角色管理</lin-tab-item>
    <lin-tab-item label="定时任务补偿" name="fourth">定时任务补偿</lin-tab-item>
  </lin-tab-group>
</template>
```

:::

## 卡片化

卡片化的标签页。将 `type` 设置为 `border-card`。

:::demo

```vue
<template>
  <lin-tab-group type="border-card">
    <lin-tab-item label="用户管理" name="first">用户管理</lin-tab-item>
    <lin-tab-item label="配置管理" name="second">配置管理</lin-tab-item>
    <lin-tab-item label="角色管理" name="third">角色管理</lin-tab-item>
    <lin-tab-item label="定时任务补偿" name="fourth">定时任务补偿</lin-tab-item>
  </lin-tab-group>
</template>
```

:::

## 自定义标签页

可以通过具名 `slot` 来实现自定义标签页的内容

:::demo

```vue
<template>
  <lin-tab-group type="border-card">
    <lin-tab-item label="我的行程" name="first">
      <span slot="label">
        <i class="lin-icon-date"></i>
        <span>我的行程</span>
      </span>
      我的行程
    </lin-tab-item>
    <lin-tab-item label="配置管理" name="second">配置管理</lin-tab-item>
    <lin-tab-item label="角色管理" name="third">角色管理</lin-tab-item>
    <lin-tab-item label="定时任务补偿" name="fourth">定时任务补偿</lin-tab-item>
  </lin-tab-group>
</template>
```

:::

## TabGroup 属性

| 参数            | 说明                      | 类型   | 可选值           | 默认值 |
| --------------- | ------------------------- | ------ | ---------------- | ------ |
| value / v-model | 绑定值，选中选项卡的 name | String | —                | —      |
| type            | 风格类型                  | String | card,border-card | —      |

## TabGroup 事件

| 事件名称  | 说明             | 回调参数           |
| --------- | ---------------- | ------------------ |
| tab-click | tab 被选中时触发 | 被选中 tab 的 name |

## TabItem 属性

| 参数     | 说明                                              | 类型    | 可选值 | 默认值                                                |
| -------- | ------------------------------------------------- | ------- | ------ | ----------------------------------------------------- |
| label    | 选项卡标题                                        | String  | —      | —                                                     |
| name     | 与选项卡绑定值 value 对应的标识符，表示选项卡别名 | String  | —      | 该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1' |
| disabled | 是否禁用                                          | Boolean | —      | false                                                 |

## TabItem 插槽

| 插槽名称 | 说明           |
| -------- | -------------- |
| —        | 选项卡内容     |
| label    | 自定义标签内容 |
