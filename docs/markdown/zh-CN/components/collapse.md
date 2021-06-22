# Collapse 折叠面板

[[toc]]

---

## 基础用法

默认可以同时展开多个面板，可以设置默认展开第几个。

:::demo

```vue
<template>
  <lin-collapse-group v-model="value1">
    <lin-collapse-item name="1">
      史蒂夫·乔布斯
      <div slot="content">
        史蒂夫·乔布斯（Steve
        Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
      </div>
    </lin-collapse-item>
    <lin-collapse-item name="2">
      史蒂夫·乔布斯
      <div slot="content">
        史蒂夫·乔布斯（Steve
        Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
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

## 手风琴模式

通过设置属性 `accordion` 开启手风琴模式，每次只能打开一个面板。

:::demo

```vue
<template>
  <lin-collapse-group accordion v-model="value2">
    <lin-collapse-item name="1">
      史蒂夫·乔布斯
      <div slot="content">
        史蒂夫·乔布斯（Steve
        Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
      </div>
    </lin-collapse-item>
    <lin-collapse-item name="2">
      史蒂夫·乔布斯
      <div slot="content">
        史蒂夫·乔布斯（Steve
        Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
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

## 简洁模式

设置属性 `simple` 可以显示为不带边框和背景色的简洁模式。

:::demo

```vue
<template>
  <lin-collapse-group simple v-model="value3">
    <lin-collapse-item name="1">
      史蒂夫·乔布斯
      <div slot="content">
        史蒂夫·乔布斯（Steve
        Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
      </div>
    </lin-collapse-item>
    <lin-collapse-item name="2">
      史蒂夫·乔布斯
      <div slot="content">
        史蒂夫·乔布斯（Steve
        Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
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

## CollapseGroup 属性

| 参数      | 说明                                             | 类型            | 可选值 | 默认值 |
| --------- | ------------------------------------------------ | --------------- | ------ | ------ |
| value     | 当前激活的面板的 name，可以使用 v-model 双向绑定 | Array , String,Number | —      | —      |
| accordion | 是否开启手风琴模式，开启后每次至多展开一个面板   | Boolean         | —      | false  |
| simple    | 是否开启简洁模式                                 | Boolean         | —      | false  |

## CollapseGroup 事件

| 事件名称 | 说明                                                   | 回调参数 |
| -------- | ------------------------------------------------------ | -------- |
| onChange | 切换面板时触发，返回当前已展开的面板的 key，格式为数组 | []       |

## CollapseItem 属性

| 参数       | 说明                                                    | 类型           | 可选值 | 默认值 |
| ---------- | ------------------------------------------------------- | -------------- | ------ | ------ |
| name       | 当前面板的 name，与 CollapseGroup 的 value 对应，必填项 | Number ,String | —      | —      |
| hide-arrow | 隐藏箭头                                                | Boolean        | —      | false  |

## CollapseItem 插槽

| 插槽名称 | 说明       |
| -------- | ---------- |
| 无       | 面板头内容 |
| content  | 描述内容   |
