# Choice 选择器

[[toc]]

---

## 基础用法

适用广泛的基础单选；`v-model` 的值为当前被选中的 `lin-choice-item` 的 value 属性值

:::demo

```vue
<template>
  <lin-choice-group v-model="value1" placeholder="请选择">
    <lin-choice-item
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </lin-choice-item>
  </lin-choice-group>
</template>

<script>
export default {
  data() {
    return {
      options1: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: "",
    };
  },
};
</script>
```

:::

## 有禁用选项

在 `lin-choice-item` 中，设定 `disabled` 值为 true，即可禁用该选项

:::demo

```vue
<template>
  <lin-choice-group v-model="value2" placeholder="请选择">
    <lin-choice-item
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    >
    </lin-choice-item>
  </lin-choice-group>
</template>

<script>
export default {
  data() {
    return {
      options2: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true,
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value2: "",
    };
  },
};
</script>
```

:::

## 禁用状态

选择器不可用状态；为 `lin-choice-group` 设置 `disabled` 属性，则整个选择器不可用

:::demo

```vue
<template>
  <lin-choice-group v-model="value3" disabled placeholder="请选择">
    <lin-choice-item
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </lin-choice-item>
  </lin-choice-group>
</template>

<script>
export default {
  data() {
    return {
      options1: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value3: "",
    };
  },
};
</script>
```

:::

## 可清空单选

包含清空按钮，可将选择器清空为初始状态；为 `lin-choice-group` 设置 `clearable` 属性，则可将选择器清空。需要注意的是， `clearable` 属性仅适用于单选。

:::demo

```vue
<template>
  <lin-choice-group v-model="value4" clearable placeholder="请选择">
    <lin-choice-item
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </lin-choice-item>
  </lin-choice-group>
</template>

<script>
export default {
  data() {
    return {
      options1: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value4: "",
    };
  },
};
</script>
```

:::

## 自定义模板

可以自定义备选项；将自定义的 vue 模板插入 `lin-choice-item` 的 slot 中即可。

:::demo

```vue
<template>
  <lin-choice-group v-model="value5" placeholder="请选择">
    <lin-choice-item
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{
        item.value
      }}</span>
    </lin-choice-item>
  </lin-choice-group>
</template>

<script>
export default {
  data() {
    return {
      cities: [
        {
          value: "Beijing",
          label: "北京",
        },
        {
          value: "Shanghai",
          label: "上海",
        },
        {
          value: "Nanjing",
          label: "南京",
        },
        {
          value: "Chengdu",
          label: "成都",
        },
        {
          value: "Shenzhen",
          label: "深圳",
        },
        {
          value: "Guangzhou",
          label: "广州",
        },
      ],
      value5: "",
    };
  },
};
</script>
```

:::

## 分组

备选项进行分组展示；使用 `lin-choice-option` 对备选项进行分组，它的 `label` 属性为分组名

:::demo

```vue
<template>
  <lin-choice-group v-model="value6" placeholder="请选择">
    <lin-choice-option
      v-for="group in options3"
      :key="group.label"
      :label="group.label"
    >
      <lin-choice-item
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </lin-choice-item>
    </lin-choice-option>
  </lin-choice-group>
</template>

<script>
export default {
  data() {
    return {
      options3: [
        {
          label: "热门城市",
          options: [
            {
              value: "Shanghai",
              label: "上海",
            },
            {
              value: "Beijing",
              label: "北京",
            },
          ],
        },
        {
          label: "城市名",
          options: [
            {
              value: "Chengdu",
              label: "成都",
            },
            {
              value: "Shenzhen",
              label: "深圳",
            },
            {
              value: "Guangzhou",
              label: "广州",
            },
            {
              value: "Dalian",
              label: "大连",
            },
          ],
        },
      ],
      value6: "",
    };
  },
};
</script>
```

:::

## 下拉加载

为 `lin-choice-group` 设置 `scroll` 属性，则可实现下拉加载。设置 `loading` 可现实加载动画。

:::demo

```vue
<template>
  <lin-choice-group
    :loading="loading"
    scroll
    @scrollToBottom="scrollToBottom"
    v-model="value7"
    placeholder="请选择"
  >
    <lin-choice-item
      v-for="item in options4"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </lin-choice-item>
  </lin-choice-group>
</template>

<script>
export default {
  data() {
    return {
      options4: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
        {
          value: "选项56",
          label: "北京烤鸭",
        },
        {
          value: "选项57",
          label: "北京烤鸭",
        },
        {
          value: "选项58",
          label: "北京烤鸭",
        },
      ],
      value7: "",

      loading: false,
    };
  },
  mounted() {
    this.count = 0;
  },
  methods: {
    scrollToBottom() {
      if (this.count > 5) {
        return;
      }
      this.loading = true;
      setTimeout(() => {
        const options = [
          {
            value: Math.random()
              .toString(16)
              .slice(-9),
            label: "黄金糕",
          },
          {
            value: Math.random()
              .toString(16)
              .slice(-9),
            label: "双皮奶",
          },
          {
            value: Math.random()
              .toString(16)
              .slice(-9),
            label: "蚵仔煎",
          },
          {
            value: Math.random()
              .toString(16)
              .slice(-9),
            label: "龙须面",
          },
          {
            value: Math.random()
              .toString(16)
              .slice(-9),
            label: "北京烤鸭",
          },
        ];
        this.options4.push(...options);
        this.loading = false;
        this.count++;
      }, 3000);
    },
  },
};
</script>
```

:::

## ChoiceGroup 属性

| 参数            | 说明                                              | 类型                 | 可选值 | 默认值   |
| --------------- | ------------------------------------------------- | -------------------- | ------ | -------- |
| value / v-model | 绑定值                                            | Object/String/Number | —      | —        |
| placeholder     | 占位符                                            | String               | —      | 请选择   |
| valueKey        | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | String               | —      | —        |
| clearable       | 是否可以清空选项                                  | Boolean              | —      | false    |
| disabled        | 是否禁用                                          | Boolean              | —      | false    |
| isThrottle      | 开启下拉加载时是否进行防抖                        | Boolean              | —      | true     |
| scroll          | 是否开启下拉加载                                  | Boolean              | —      | false    |
| time            | 防抖间隔时间                                      | Number               | —      | 500ms    |
| loading         | 是否开启加载动画效果                              | Boolean              | —      | false    |
| loadingTip      | 加载提示语                                        | String               | —      | —        |
| emptyTip        | 数据为空时显示的提示语                            | String               | —      | 暂无数据 |

## ChoiceGroup 事件

| 事件名称       | 说明                                     | 回调参数                      |
| -------------- | ---------------------------------------- | ----------------------------- |
| scrollToBottom | 滚动到底部时触发触发                     | (event: Event)                |
| blur           | 当 input 失去焦点时触发                  | (event: Event)                |
| focus          | 当 input 获得焦点时触发                  | (event: Event)                |
| visible-change | 下拉框出现/隐藏时触发                    | 出现则为 true，隐藏则为 false |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                             |
| change         | 选中值发生变化时触发                     | 目前的选中值                  |

## ChoiceGroup 插槽

| 插槽名称 | 说明                                           |
| -------- | ---------------------------------------------- |
| —        | ChoiceItem 组件列表 或者 ChoiceOption 组件列表 |
| empty    | 数据为空时的内容                               |
| loading  | 自定义加载动画                                 |

## ChoiceItem 属性

| 参数     | 说明                                      | 类型                 | 可选值 | 默认值 |
| -------- | ----------------------------------------- | -------------------- | ------ | ------ |
| label    | 选项的标签，若不设置则默认与 `value` 相同 | String               | —      | —      |
| value    | 选项的值                                  | Object/String/Number | —      | —      |
| disabled | 是否禁用该选项                            | Boolean              | —      | false  |

## ChoiceItem 插槽

| 插槽名称 | 说明     |
| -------- | -------- |
| —        | 标签内容 |

## ChoiceOption 属性

| 参数     | 说明                           | 类型    | 可选值 | 默认值 |
| -------- | ------------------------------ | ------- | ------ | ------ |
| label    | 分组的组名                     | String  | —      | —      |
| disabled | 是否将该分组下所有选项置为禁用 | Boolean | —      | false  |

## ChoiceItem 插槽

| 插槽名称 | 说明                |
| -------- | ------------------- |
| —        | ChoiceItem 组件列表 |
| label    | 分组标签内容        |
