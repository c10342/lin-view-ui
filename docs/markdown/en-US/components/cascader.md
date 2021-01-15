# Cascader

[[toc]]

---

## Basic usage

Assigning the `options` attribute to an array of options renders a Cascader.

:::demo

```vue
<template>
  <lin-cascader v-model="value" :options="options"> </lin-cascader>
</template>

<script>
let id = 0;
const options = [
  {
    value: "guide",
    label: "Guide",
    children: [
      {
        value: "disciplines",
        label: "Disciplines",
        children: [
          {
            value: "consistency",
            label: "Consistency",
          },
          {
            value: "feedback",
            label: "Feedback",
          },
          {
            value: "efficiency",
            label: "Efficiency",
          },
          {
            value: "controllability",
            label: "Controllability",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "side nav",
            label: "Side Navigation",
          },
          {
            value: "top nav",
            label: "Top Navigation",
          },
        ],
      },
    ],
  },
  {
    value: "component",
    label: "Component",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          {
            value: "layout",
            label: "Layout",
          },
          {
            value: "color",
            label: "Color",
          },
          {
            value: "typography",
            label: "Typography",
          },
          {
            value: "icon",
            label: "Icon",
          },
          {
            value: "button",
            label: "Button",
          },
        ],
      },
      {
        value: "form",
        label: "Form",
        children: [
          {
            value: "radio",
            label: "Radio",
          },
          {
            value: "checkbox",
            label: "Checkbox",
          },
          {
            value: "input",
            label: "Input",
          },
          {
            value: "input-number",
            label: "InputNumber",
          },
          {
            value: "select",
            label: "Select",
          },
          {
            value: "cascader",
            label: "Cascader",
          },
          {
            value: "switch",
            label: "Switch",
          },
          {
            value: "slider",
            label: "Slider",
          },
          {
            value: "time-picker",
            label: "TimePicker",
          },
          {
            value: "date-picker",
            label: "DatePicker",
          },
          {
            value: "datetime-picker",
            label: "DateTimePicker",
          },
          {
            value: "upload",
            label: "Upload",
          },
          {
            value: "rate",
            label: "Rate",
          },
          {
            value: "form",
            label: "Form",
          },
        ],
      },
      {
        value: "data",
        label: "Data",
        children: [
          {
            value: "table",
            label: "Table",
          },
          {
            value: "tag",
            label: "Tag",
          },
          {
            value: "progress",
            label: "Progress",
          },
          {
            value: "tree",
            label: "Tree",
          },
          {
            value: "pagination",
            label: "Pagination",
          },
          {
            value: "badge",
            label: "Badge",
          },
        ],
      },
      {
        value: "notice",
        label: "Notice",
        children: [
          {
            value: "alert",
            label: "Alert",
          },
          {
            value: "loading",
            label: "Loading",
          },
          {
            value: "message",
            label: "Message",
          },
          {
            value: "message-box",
            label: "MessageBox",
          },
          {
            value: "notification",
            label: "Notification",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "menu",
            label: "NavMenu",
          },
          {
            value: "tabs",
            label: "Tabs",
          },
          {
            value: "breadcrumb",
            label: "Breadcrumb",
          },
          {
            value: "dropdown",
            label: "Dropdown",
          },
          {
            value: "steps",
            label: "Steps",
          },
        ],
      },
      {
        value: "others",
        label: "Others",
        children: [
          {
            value: "dialog",
            label: "Dialog",
          },
          {
            value: "tooltip",
            label: "Tooltip",
          },
          {
            value: "popover",
            label: "Popover",
          },
          {
            value: "card",
            label: "Card",
          },
          {
            value: "carousel",
            label: "Carousel",
          },
          {
            value: "collapse",
            label: "Collapse",
          },
        ],
      },
    ],
  },
  {
    value: "resource",
    label: "Resource",
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
        value: "docs",
        label: "Design Documentation",
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

## Disabled option

Disable an option by setting a `disabled` field in the option object.
In this example, the first item in `options` array has a `disabled: true` field, so it is disabled. By default, `Cascader` checks the `disabled` field in each option object; if you are using another field name to indicate whether an option is `disabled`, you can assign it in the `disabled` attribute (see the API table below for details). And of course, field name leaf, label and children can also be customized in the same way.

:::demo

```vue
<template>
  <lin-cascader :options="options1"> </lin-cascader>
</template>

<script>
let id = 0;
const options = [
  {
    value: "guide",
    label: "Guide",
    children: [
      {
        value: "disciplines",
        label: "Disciplines",
        children: [
          {
            value: "consistency",
            label: "Consistency",
          },
          {
            value: "feedback",
            label: "Feedback",
          },
          {
            value: "efficiency",
            label: "Efficiency",
          },
          {
            value: "controllability",
            label: "Controllability",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "side nav",
            label: "Side Navigation",
          },
          {
            value: "top nav",
            label: "Top Navigation",
          },
        ],
      },
    ],
  },
  {
    value: "component",
    label: "Component",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          {
            value: "layout",
            label: "Layout",
          },
          {
            value: "color",
            label: "Color",
          },
          {
            value: "typography",
            label: "Typography",
          },
          {
            value: "icon",
            label: "Icon",
          },
          {
            value: "button",
            label: "Button",
          },
        ],
      },
      {
        value: "form",
        label: "Form",
        children: [
          {
            value: "radio",
            label: "Radio",
          },
          {
            value: "checkbox",
            label: "Checkbox",
          },
          {
            value: "input",
            label: "Input",
          },
          {
            value: "input-number",
            label: "InputNumber",
          },
          {
            value: "select",
            label: "Select",
          },
          {
            value: "cascader",
            label: "Cascader",
          },
          {
            value: "switch",
            label: "Switch",
          },
          {
            value: "slider",
            label: "Slider",
          },
          {
            value: "time-picker",
            label: "TimePicker",
          },
          {
            value: "date-picker",
            label: "DatePicker",
          },
          {
            value: "datetime-picker",
            label: "DateTimePicker",
          },
          {
            value: "upload",
            label: "Upload",
          },
          {
            value: "rate",
            label: "Rate",
          },
          {
            value: "form",
            label: "Form",
          },
        ],
      },
      {
        value: "data",
        label: "Data",
        children: [
          {
            value: "table",
            label: "Table",
          },
          {
            value: "tag",
            label: "Tag",
          },
          {
            value: "progress",
            label: "Progress",
          },
          {
            value: "tree",
            label: "Tree",
          },
          {
            value: "pagination",
            label: "Pagination",
          },
          {
            value: "badge",
            label: "Badge",
          },
        ],
      },
      {
        value: "notice",
        label: "Notice",
        children: [
          {
            value: "alert",
            label: "Alert",
          },
          {
            value: "loading",
            label: "Loading",
          },
          {
            value: "message",
            label: "Message",
          },
          {
            value: "message-box",
            label: "MessageBox",
          },
          {
            value: "notification",
            label: "Notification",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "menu",
            label: "NavMenu",
          },
          {
            value: "tabs",
            label: "Tabs",
          },
          {
            value: "breadcrumb",
            label: "Breadcrumb",
          },
          {
            value: "dropdown",
            label: "Dropdown",
          },
          {
            value: "steps",
            label: "Steps",
          },
        ],
      },
      {
        value: "others",
        label: "Others",
        children: [
          {
            value: "dialog",
            label: "Dialog",
          },
          {
            value: "tooltip",
            label: "Tooltip",
          },
          {
            value: "popover",
            label: "Popover",
          },
          {
            value: "card",
            label: "Card",
          },
          {
            value: "carousel",
            label: "Carousel",
          },
          {
            value: "collapse",
            label: "Collapse",
          },
        ],
      },
    ],
  },
  {
    value: "resource",
    label: "Resource",
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
        value: "docs",
        label: "Design Documentation",
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

## Clearable

Set `clearable` attribute for lin-cascader and a clear icon will appear when selected and hovered

:::demo

```vue
<template>
  <lin-cascader :options="options" clearable></lin-cascader>
</template>

<script>
let id = 0;
const options = [
  {
    value: "guide",
    label: "Guide",
    children: [
      {
        value: "disciplines",
        label: "Disciplines",
        children: [
          {
            value: "consistency",
            label: "Consistency",
          },
          {
            value: "feedback",
            label: "Feedback",
          },
          {
            value: "efficiency",
            label: "Efficiency",
          },
          {
            value: "controllability",
            label: "Controllability",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "side nav",
            label: "Side Navigation",
          },
          {
            value: "top nav",
            label: "Top Navigation",
          },
        ],
      },
    ],
  },
  {
    value: "component",
    label: "Component",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          {
            value: "layout",
            label: "Layout",
          },
          {
            value: "color",
            label: "Color",
          },
          {
            value: "typography",
            label: "Typography",
          },
          {
            value: "icon",
            label: "Icon",
          },
          {
            value: "button",
            label: "Button",
          },
        ],
      },
      {
        value: "form",
        label: "Form",
        children: [
          {
            value: "radio",
            label: "Radio",
          },
          {
            value: "checkbox",
            label: "Checkbox",
          },
          {
            value: "input",
            label: "Input",
          },
          {
            value: "input-number",
            label: "InputNumber",
          },
          {
            value: "select",
            label: "Select",
          },
          {
            value: "cascader",
            label: "Cascader",
          },
          {
            value: "switch",
            label: "Switch",
          },
          {
            value: "slider",
            label: "Slider",
          },
          {
            value: "time-picker",
            label: "TimePicker",
          },
          {
            value: "date-picker",
            label: "DatePicker",
          },
          {
            value: "datetime-picker",
            label: "DateTimePicker",
          },
          {
            value: "upload",
            label: "Upload",
          },
          {
            value: "rate",
            label: "Rate",
          },
          {
            value: "form",
            label: "Form",
          },
        ],
      },
      {
        value: "data",
        label: "Data",
        children: [
          {
            value: "table",
            label: "Table",
          },
          {
            value: "tag",
            label: "Tag",
          },
          {
            value: "progress",
            label: "Progress",
          },
          {
            value: "tree",
            label: "Tree",
          },
          {
            value: "pagination",
            label: "Pagination",
          },
          {
            value: "badge",
            label: "Badge",
          },
        ],
      },
      {
        value: "notice",
        label: "Notice",
        children: [
          {
            value: "alert",
            label: "Alert",
          },
          {
            value: "loading",
            label: "Loading",
          },
          {
            value: "message",
            label: "Message",
          },
          {
            value: "message-box",
            label: "MessageBox",
          },
          {
            value: "notification",
            label: "Notification",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "menu",
            label: "NavMenu",
          },
          {
            value: "tabs",
            label: "Tabs",
          },
          {
            value: "breadcrumb",
            label: "Breadcrumb",
          },
          {
            value: "dropdown",
            label: "Dropdown",
          },
          {
            value: "steps",
            label: "Steps",
          },
        ],
      },
      {
        value: "others",
        label: "Others",
        children: [
          {
            value: "dialog",
            label: "Dialog",
          },
          {
            value: "tooltip",
            label: "Tooltip",
          },
          {
            value: "popover",
            label: "Popover",
          },
          {
            value: "card",
            label: "Card",
          },
          {
            value: "carousel",
            label: "Carousel",
          },
          {
            value: "collapse",
            label: "Collapse",
          },
        ],
      },
    ],
  },
  {
    value: "resource",
    label: "Resource",
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
        value: "docs",
        label: "Design Documentation",
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

## Dynamic loading

When a level is selected, the options under that level are loaded dynamically. Enable dynamic loading through `lazy` and set the method of loading data source through `lazy`. The `lazyload` method has two parameters. The first parameter `data` is the node currently clicked, and the second parameter `level` is the number of layers of the node to be clicked. In order to display the status of the node more accurately, the flag bit of whether the node is a leaf node must be added to the node data (the default field is leaf, which can be modified by leaf).

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
            label: `Option - ${id}`,
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

## Attributes

| Attribute       | Description                                                                                                                                                 | Type     | Accepted Values | Default       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- | ------------- |
| options         | Optional data source. Each object in the data source must contain the fields `label` and `id` . You can change their aliases through `label` and `valuekey` | Array    | —               | —             |
| showFormat      | Custom data display method                                                                                                                                  | Function | —               | —             |
| value / v-model | Selected item binding value                                                                                                                                 | —        | —               | —             |
| clearable       | Is the empty option supported                                                                                                                               | Boolean  | —               | false         |
| placeholder     | Input box placeholder text                                                                                                                                  | String   | —               | Please select |
| lazy            | Whether to load child nodes dynamically needs to be combined with lazyload method                                                                           | Boolean  | —               | false         |
| lazyLoad        | The method of loading dynamic data is valid only when lazy is true                                                                                          | Function | —               | —             |
| separator       | Option separator                                                                                                                                            | String   | —               | Slash '/'     |
| label           | Specifies that the option label is a property value of the option object                                                                                    | String   | —               | label         |
| children        | Specifies that the sub option of an option is a property value of the option object                                                                         | String   | —               | children      |
| leaf            | Specifies that the flag bit of the leaf node of the option is an attribute value of the option object                                                       | String   | —               | leaf          |
| disabled        | Specifies that the disable of an option is a property value of the option object                                                                            | String   | —               | disabled      |
| valueKey        | Specifies that the unique value of an option is a property value of the option object                                                                       | String   | —               | id            |
| emptyTip        | No data prompt                                                                                                                                              | String   | —               | No Data       |

## Events

| Event Name     | Description                                   | Parameters                                               |
| -------------- | --------------------------------------------- | -------------------------------------------------------- |
| blur           | Triggered when focus is lost                  | (event: Event)                                           |
| focus          | Triggered when focus is obtained              | (event: Event)                                           |
| change         | Triggered when the selected node changes      | The value of the selected node and the level of the node |
| visible-change | Triggered when drop-down box appears / hidden | True if it appears and false if it is hidden             |

## Slots

| Name  | Description                           |
| ----- | ------------------------------------- |
| empty | What to display when there is no data |
