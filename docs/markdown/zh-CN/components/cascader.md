# Cascader 级联选择器

[[toc]]

---

## 基础用法

只需为 Cascader 的 `options` 属性指定选项数组即可渲染出一个级联选择器。

:::demo

```vue
<template>
  <lin-cascader v-model="value" :options="options"> </lin-cascader>
</template>

<script>
let id = 0;
const options = [
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        children: [
          {
            value: "yizhi",
            label: "一致",
          },
          {
            value: "fankui",
            label: "反馈",
          },
          {
            value: "xiaolv",
            label: "效率",
          },
          {
            value: "kekong",
            label: "可控",
          },
        ],
      },
      {
        value: "daohang",
        label: "导航",
        children: [
          {
            value: "cexiangdaohang",
            label: "侧向导航",
          },
          {
            value: "dingbudaohang",
            label: "顶部导航",
          },
        ],
      },
    ],
  },
  {
    value: "zujian",
    label: "组件",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          {
            value: "layout",
            label: "Layout 布局",
          },
          {
            value: "color",
            label: "Color 色彩",
          },
          {
            value: "typography",
            label: "Typography 字体",
          },
          {
            value: "icon",
            label: "Icon 图标",
          },
          {
            value: "button",
            label: "Button 按钮",
          },
        ],
      },
      {
        value: "form",
        label: "Form",
        children: [
          {
            value: "radio",
            label: "Radio 单选框",
          },
          {
            value: "checkbox",
            label: "Checkbox 多选框",
          },
          {
            value: "input",
            label: "Input 输入框",
          },
          {
            value: "input-number",
            label: "InputNumber 计数器",
          },
          {
            value: "select",
            label: "Select 选择器",
          },
          {
            value: "cascader",
            label: "Cascader 级联选择器",
          },
          {
            value: "switch",
            label: "Switch 开关",
          },
          {
            value: "slider",
            label: "Slider 滑块",
          },
          {
            value: "time-picker",
            label: "TimePicker 时间选择器",
          },
          {
            value: "date-picker",
            label: "DatePicker 日期选择器",
          },
          {
            value: "datetime-picker",
            label: "DateTimePicker 日期时间选择器",
          },
          {
            value: "upload",
            label: "Upload 上传",
          },
          {
            value: "rate",
            label: "Rate 评分",
          },
          {
            value: "form",
            label: "Form 表单",
          },
        ],
      },
      {
        value: "data",
        label: "Data",
        children: [
          {
            value: "table",
            label: "Table 表格",
          },
          {
            value: "tag",
            label: "Tag 标签",
          },
          {
            value: "progress",
            label: "Progress 进度条",
          },
          {
            value: "tree",
            label: "Tree 树形控件",
          },
          {
            value: "pagination",
            label: "Pagination 分页",
          },
          {
            value: "badge",
            label: "Badge 标记",
          },
        ],
      },
      {
        value: "notice",
        label: "Notice",
        children: [
          {
            value: "alert",
            label: "Alert 警告",
          },
          {
            value: "loading",
            label: "Loading 加载",
          },
          {
            value: "message",
            label: "Message 消息提示",
          },
          {
            value: "message-box",
            label: "MessageBox 弹框",
          },
          {
            value: "notification",
            label: "Notification 通知",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "menu",
            label: "NavMenu 导航菜单",
          },
          {
            value: "tabs",
            label: "Tabs 标签页",
          },
          {
            value: "breadcrumb",
            label: "Breadcrumb 面包屑",
          },
          {
            value: "dropdown",
            label: "Dropdown 下拉菜单",
          },
          {
            value: "steps",
            label: "Steps 步骤条",
          },
        ],
      },
      {
        value: "others",
        label: "Others",
        children: [
          {
            value: "dialog",
            label: "Dialog 对话框",
          },
          {
            value: "tooltip",
            label: "Tooltip 文字提示",
          },
          {
            value: "popover",
            label: "Popover 弹出框",
          },
          {
            value: "card",
            label: "Card 卡片",
          },
          {
            value: "carousel",
            label: "Carousel 走马灯",
          },
          {
            value: "collapse",
            label: "Collapse 折叠面板",
          },
        ],
      },
    ],
  },
  {
    value: "ziyuan",
    label: "资源",
    children: [
      {
        value: "axure",
        label: "Axure Components",
      },
      {
        value: "sketch",
        label: "Sketch Templates",
      },
      {
        value: "jiaohu",
        label: "组件交互文档",
      },
    ],
  },
];
export default {
  data() {
    return {
      value: [],
      options: [],
    };
  },
  created() {
    let opts1 = options;
    this.handleData(opts1);
    this.options = opts1;
  },
  methods: {
    handleData(data) {
      data.forEach((item) => {
        item.id = Math.random()
          .toString(16)
          .slice(-7);
        if (item.children && item.children.length !== 0) {
          this.handleData(item.children);
        }
      });
    },
  },
};
</script>
```

:::

## 禁用选项

通过在数据源中设置 `disabled` 字段来声明该选项是禁用的。本例中，`options` 指定的数组中的第一个元素含有 `disabled: true` 键值对，因此是禁用的。在默认情况下，`Cascader` 会检查数据中每一项的 `disabled` 字段是否为 `true`，如果你的数据中表示禁用含义的字段名不为 `disabled`，可以通过 `disabled` 属性来指定（详见下方 API 表格）。当然，`leaf`、`label` 和 `children` 这三个字段名也可以通过同样的方式指定。

:::demo

```vue
<template>
  <lin-cascader :options="options1"> </lin-cascader>
</template>

<script>
let id = 0;
const options = [
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        children: [
          {
            value: "yizhi",
            label: "一致",
          },
          {
            value: "fankui",
            label: "反馈",
          },
          {
            value: "xiaolv",
            label: "效率",
          },
          {
            value: "kekong",
            label: "可控",
          },
        ],
      },
      {
        value: "daohang",
        label: "导航",
        children: [
          {
            value: "cexiangdaohang",
            label: "侧向导航",
          },
          {
            value: "dingbudaohang",
            label: "顶部导航",
          },
        ],
      },
    ],
  },
  {
    value: "zujian",
    label: "组件",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          {
            value: "layout",
            label: "Layout 布局",
          },
          {
            value: "color",
            label: "Color 色彩",
          },
          {
            value: "typography",
            label: "Typography 字体",
          },
          {
            value: "icon",
            label: "Icon 图标",
          },
          {
            value: "button",
            label: "Button 按钮",
          },
        ],
      },
      {
        value: "form",
        label: "Form",
        children: [
          {
            value: "radio",
            label: "Radio 单选框",
          },
          {
            value: "checkbox",
            label: "Checkbox 多选框",
          },
          {
            value: "input",
            label: "Input 输入框",
          },
          {
            value: "input-number",
            label: "InputNumber 计数器",
          },
          {
            value: "select",
            label: "Select 选择器",
          },
          {
            value: "cascader",
            label: "Cascader 级联选择器",
          },
          {
            value: "switch",
            label: "Switch 开关",
          },
          {
            value: "slider",
            label: "Slider 滑块",
          },
          {
            value: "time-picker",
            label: "TimePicker 时间选择器",
          },
          {
            value: "date-picker",
            label: "DatePicker 日期选择器",
          },
          {
            value: "datetime-picker",
            label: "DateTimePicker 日期时间选择器",
          },
          {
            value: "upload",
            label: "Upload 上传",
          },
          {
            value: "rate",
            label: "Rate 评分",
          },
          {
            value: "form",
            label: "Form 表单",
          },
        ],
      },
      {
        value: "data",
        label: "Data",
        children: [
          {
            value: "table",
            label: "Table 表格",
          },
          {
            value: "tag",
            label: "Tag 标签",
          },
          {
            value: "progress",
            label: "Progress 进度条",
          },
          {
            value: "tree",
            label: "Tree 树形控件",
          },
          {
            value: "pagination",
            label: "Pagination 分页",
          },
          {
            value: "badge",
            label: "Badge 标记",
          },
        ],
      },
      {
        value: "notice",
        label: "Notice",
        children: [
          {
            value: "alert",
            label: "Alert 警告",
          },
          {
            value: "loading",
            label: "Loading 加载",
          },
          {
            value: "message",
            label: "Message 消息提示",
          },
          {
            value: "message-box",
            label: "MessageBox 弹框",
          },
          {
            value: "notification",
            label: "Notification 通知",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "menu",
            label: "NavMenu 导航菜单",
          },
          {
            value: "tabs",
            label: "Tabs 标签页",
          },
          {
            value: "breadcrumb",
            label: "Breadcrumb 面包屑",
          },
          {
            value: "dropdown",
            label: "Dropdown 下拉菜单",
          },
          {
            value: "steps",
            label: "Steps 步骤条",
          },
        ],
      },
      {
        value: "others",
        label: "Others",
        children: [
          {
            value: "dialog",
            label: "Dialog 对话框",
          },
          {
            value: "tooltip",
            label: "Tooltip 文字提示",
          },
          {
            value: "popover",
            label: "Popover 弹出框",
          },
          {
            value: "card",
            label: "Card 卡片",
          },
          {
            value: "carousel",
            label: "Carousel 走马灯",
          },
          {
            value: "collapse",
            label: "Collapse 折叠面板",
          },
        ],
      },
    ],
  },
  {
    value: "ziyuan",
    label: "资源",
    children: [
      {
        value: "axure",
        label: "Axure Components",
      },
      {
        value: "sketch",
        label: "Sketch Templates",
      },
      {
        value: "jiaohu",
        label: "组件交互文档",
      },
    ],
  },
];
export default {
  data() {
    return {
      options1: [],
    };
  },
  created() {
    let opts2 = options;
    opts2[0].disabled = true;
    this.handleData(opts2);
    this.options1 = opts2;
  },
  methods: {
    handleData(data) {
      data.forEach((item) => {
        item.id = Math.random()
          .toString(16)
          .slice(-7);
        if (item.children && item.children.length !== 0) {
          this.handleData(item.children);
        }
      });
    },
  },
};
</script>
```

:::

## 可清空

通过 `clearable` 设置输入框可清空

:::demo

```vue
<template>
  <lin-cascader :options="options" clearable></lin-cascader>
</template>

<script>
let id = 0;
const options = [
  {
    value: "zhinan",
    label: "指南",
    children: [
      {
        value: "shejiyuanze",
        label: "设计原则",
        children: [
          {
            value: "yizhi",
            label: "一致",
          },
          {
            value: "fankui",
            label: "反馈",
          },
          {
            value: "xiaolv",
            label: "效率",
          },
          {
            value: "kekong",
            label: "可控",
          },
        ],
      },
      {
        value: "daohang",
        label: "导航",
        children: [
          {
            value: "cexiangdaohang",
            label: "侧向导航",
          },
          {
            value: "dingbudaohang",
            label: "顶部导航",
          },
        ],
      },
    ],
  },
  {
    value: "zujian",
    label: "组件",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          {
            value: "layout",
            label: "Layout 布局",
          },
          {
            value: "color",
            label: "Color 色彩",
          },
          {
            value: "typography",
            label: "Typography 字体",
          },
          {
            value: "icon",
            label: "Icon 图标",
          },
          {
            value: "button",
            label: "Button 按钮",
          },
        ],
      },
      {
        value: "form",
        label: "Form",
        children: [
          {
            value: "radio",
            label: "Radio 单选框",
          },
          {
            value: "checkbox",
            label: "Checkbox 多选框",
          },
          {
            value: "input",
            label: "Input 输入框",
          },
          {
            value: "input-number",
            label: "InputNumber 计数器",
          },
          {
            value: "select",
            label: "Select 选择器",
          },
          {
            value: "cascader",
            label: "Cascader 级联选择器",
          },
          {
            value: "switch",
            label: "Switch 开关",
          },
          {
            value: "slider",
            label: "Slider 滑块",
          },
          {
            value: "time-picker",
            label: "TimePicker 时间选择器",
          },
          {
            value: "date-picker",
            label: "DatePicker 日期选择器",
          },
          {
            value: "datetime-picker",
            label: "DateTimePicker 日期时间选择器",
          },
          {
            value: "upload",
            label: "Upload 上传",
          },
          {
            value: "rate",
            label: "Rate 评分",
          },
          {
            value: "form",
            label: "Form 表单",
          },
        ],
      },
      {
        value: "data",
        label: "Data",
        children: [
          {
            value: "table",
            label: "Table 表格",
          },
          {
            value: "tag",
            label: "Tag 标签",
          },
          {
            value: "progress",
            label: "Progress 进度条",
          },
          {
            value: "tree",
            label: "Tree 树形控件",
          },
          {
            value: "pagination",
            label: "Pagination 分页",
          },
          {
            value: "badge",
            label: "Badge 标记",
          },
        ],
      },
      {
        value: "notice",
        label: "Notice",
        children: [
          {
            value: "alert",
            label: "Alert 警告",
          },
          {
            value: "loading",
            label: "Loading 加载",
          },
          {
            value: "message",
            label: "Message 消息提示",
          },
          {
            value: "message-box",
            label: "MessageBox 弹框",
          },
          {
            value: "notification",
            label: "Notification 通知",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "menu",
            label: "NavMenu 导航菜单",
          },
          {
            value: "tabs",
            label: "Tabs 标签页",
          },
          {
            value: "breadcrumb",
            label: "Breadcrumb 面包屑",
          },
          {
            value: "dropdown",
            label: "Dropdown 下拉菜单",
          },
          {
            value: "steps",
            label: "Steps 步骤条",
          },
        ],
      },
      {
        value: "others",
        label: "Others",
        children: [
          {
            value: "dialog",
            label: "Dialog 对话框",
          },
          {
            value: "tooltip",
            label: "Tooltip 文字提示",
          },
          {
            value: "popover",
            label: "Popover 弹出框",
          },
          {
            value: "card",
            label: "Card 卡片",
          },
          {
            value: "carousel",
            label: "Carousel 走马灯",
          },
          {
            value: "collapse",
            label: "Collapse 折叠面板",
          },
        ],
      },
    ],
  },
  {
    value: "ziyuan",
    label: "资源",
    children: [
      {
        value: "axure",
        label: "Axure Components",
      },
      {
        value: "sketch",
        label: "Sketch Templates",
      },
      {
        value: "jiaohu",
        label: "组件交互文档",
      },
    ],
  },
];
export default {
  data() {
    return {
      options: [],
    };
  },
  created() {
    let opts1 = options;
    this.handleData(opts1);
    this.options = opts1;
  },
  methods: {
    handleData(data) {
      data.forEach((item) => {
        item.id = Math.random()
          .toString(16)
          .slice(-7);
        if (item.children && item.children.length !== 0) {
          this.handleData(item.children);
        }
      });
    },
  },
};
</script>
```

:::

## 动态加载

当选中某一级时，动态加载该级下的选项。通过 `lazy` 开启动态加载，并通过 `lazyload` 来设置加载数据源的方法。`lazyload` 方法有两个参数，第一个参数 `data` 为当前点击的节点，第二个 `level` 为点击节点所在层数。为了更准确的显示节点的状态，必须对节点数据添加是否为叶子节点的标志位 (默认字段为 leaf，可通过 leaf 修改)。

:::demo

```vue
<template>
  <lin-cascader v-model="value1" lazy :lazyLoad="lazyLoad"> </lin-cascader>
</template>

<script>
let id = 0;
export default {
  data() {
    return {
      value1: [],
    };
  },
  methods: {
    lazyLoad(node) {
      return new Promise((resolve) => {
        const { level } = node;
        setTimeout(() => {
          const nodes = Array.from({ length: level + 1 }).map((item) => ({
            value: ++id,
            label: `选项${id}`,
            leaf: level >= 2,
            id: id,
          }));
          resolve(nodes);
        }, 1000);
      });
    },
  },
};
</script>
```

:::

## 属性

| 参数            | 说明                                                                                                                | 类型     | 可选值 | 默认值   |
| --------------- | ------------------------------------------------------------------------------------------------------------------- | -------- | ------ | -------- |
| options         | 可选项数据源，数据源中的每个对象必须包含 `label` 和 `id` 这 2 个字段。可通过 `label` 和 `valueKey` 来改变他们的别名 | Array    | —      | —        |
| showFormat      | 自定义数据显示方法                                                                                                  | Function | —      | —        |
| value / v-model | 选中项绑定值                                                                                                        | —        | —      | —        |
| clearable       | 是否支持清空选项                                                                                                    | Boolean  | —      | false    |
| placeholder     | 输入框占位文本                                                                                                      | String   | —      | 请选择   |
| lazy            | 是否动态加载子节点，需与 lazyLoad 方法结合使用                                                                      | Boolean  | —      | false    |
| lazyLoad        | 加载动态数据的方法，仅在 lazy 为 true 时有效                                                                        | Function | —      | —        |
| separator       | 选项分隔符                                                                                                          | String   | —      | 斜杠'/'  |
| label           | 指定选项标签为选项对象的某个属性值                                                                                  | String   | —      | label    |
| children        | 指定选项的子选项为选项对象的某个属性值                                                                              | String   | —      | children |
| leaf            | 指定选项的叶子节点的标志位为选项对象的某个属性值                                                                    | String   | —      | leaf     |
| disabled        | 指定选项的禁用为选项对象的某个属性值                                                                                | String   | —      | disabled |
| valueKey        | 指定选项的唯一值为选项对象的某个属性值                                                                              | String   | —      | id       |
| emptyTip        | 暂无数据提示语                                                                                                      | String   | —      | 暂无数据 |

## 事件

| 事件名称       | 说明                  | 回调参数                       |
| -------------- | --------------------- | ------------------------------ |
| blur           | 当失去焦点时触发      | (event: Event)                 |
| focus          | 当获得焦点时触发      | (event: Event)                 |
| change         | 当选中节点变化时触发  | 选中节点的值以及节点所在的层级 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false  |

## 插槽

| 插槽名称 | 说明                   |
| -------- | ---------------------- |
| empty    | 无数据的时候显示的内容 |
