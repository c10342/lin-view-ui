<script>
export default {
  data() {
    return {
      value1:'标签一',
      list1:['标签一','标签二','标签三','标签四','标签五','标签六','标签七','标签八','标签九','标签十','标签十一'],
      value2:{
          name: "标签一",
          id: 1
        },
      list2: [
        {
          name: "标签一",
          id: 1
        },
        {
          name: "标签二",
          id: 2
        },
        {
          name: "标签三",
          id: 3
        },
        {
          name: "标签四",
          id: 4
        }
      ],
      value3:"标签一",
      list3: ['标签一','标签二','标签三','标签四','标签五','标签六','标签七','标签八','标签九','标签十','标签十一'],
      value4:"标签三",
    };
  },
  methods: {
    renderMore(h,status) {
      if (status === 1) {
        return <span>展开</span>;
      } else {
        return <span>收起</span>;
      }
    },
    renderLabel() {
      return <span>标签：</span>;
    }
  }
};
</script>

# Selector 选择器

---

## 基础用法

`v-model` 的值为当前被选中的 `lin-selector-item` 的 value 属性值

<div class='demo-block'>
  <lin-selector-group
    label="标签："
    v-model="value1"
  >
    <lin-selector-item 
    v-for='(item , index) in list1'
    :key='index'
    :value="item" >
    {{item}}
    </lin-selector-item>
  </lin-selector-group>
</div>

:::demo

```html
<lin-selector-group label="标签：" v-model="value1">
  <lin-selector-item v-for="(item , index) in list1" :key="index" :value="item">
    {{item}}
  </lin-selector-item>
</lin-selector-group>

<script>
  export default {
    data() {
      return {
        value1: "标签一",
        list1: [
          "标签一",
          "标签二",
          "标签三",
          "标签四",
          "标签五",
          "标签六",
          "标签七",
          "标签八",
          "标签九",
          "标签十",
          "标签十一",
        ],
      };
    },
  };
</script>
```

:::

## 绑定值为对象

当绑定值为对象时，需要设置 `valueKey` 属性，作为 value 唯一标识的键名

<div class='demo-block'>
  <lin-selector-group
    label="学科："
    value-key="id"
    v-model="value2"
  >
    <lin-selector-item 
    v-for="item in list2" 
    :key="item.id" 
    :value="item" 
    :label="item.name"></lin-selector-item>
  </lin-selector-group>
</div>

:::demo

```html
<lin-selector-group label="学科：" value-key="id" v-model="value2">
  <lin-selector-item
    v-for="item in list2"
    :key="item.id"
    :value="item"
    :label="item.name"
  ></lin-selector-item>
</lin-selector-group>

<script>
  export default {
    data() {
      return {
        value2: {
          name: "标签一",
          id: 1,
        },
        list2: [
          {
            name: "标签一",
            id: 1,
          },
          {
            name: "标签二",
            id: 2,
          },
          {
            name: "标签三",
            id: 3,
          },
          {
            name: "标签四",
            id: 4,
          },
        ],
      };
    },
  };
</script>
```

:::

## 使用 jsx

当你需要自定义标签栏和更多的样式和结构时，你可以设置 `renderMore` 和 `renderLabel` 属性，并返回一个 jsx

<div class='demo-block'>
  <lin-selector-group
  :render-more="renderMore"
    :render-label="renderLabel"
    label="学科："
    value-key="id"
    v-model="value3"
  >
    <lin-selector-item 
     v-for="(item , index) in list3" :key="index" :value="item"
     :label='item'
    ></lin-selector-item>
  </lin-selector-group>
</div>

:::demo

```html
<lin-selector-group label="学科：" v-model="value3">
  <lin-selector-item v-for="(item , index) in list3" :key="index" :value="item"
    >{{item}}</lin-selector-item
  >
</lin-selector-group>

<script>
  export default {
    data() {
      return {
        value3: "标签一",
        list3: [
          "标签一",
          "标签二",
          "标签三",
          "标签四",
          "标签五",
          "标签六",
          "标签七",
          "标签八",
          "标签九",
          "标签十",
          "标签十一",
        ],
      };
    },
    methods: {
      renderMore(h, status) {
        if (status === 1) {
          return <span>展开</span>;
        } else {
          return <span>收起</span>;
        }
      },
      renderLabel() {
        return <span>标签</span>;
      },
    },
  };
</script>
```

:::

## 禁用状态

为 `lin-selector-group` 设置 `disabled` 属性，则整个选择器不可用

<div class='demo-block'>
  <lin-selector-group
    label="学科："
    v-model="value4"
  >
    <lin-selector-item value="标签一" label="标签一" disabled>标签一</lin-selector-item>
    <lin-selector-item value="标签二" label="标签二">标签二</lin-selector-item>
    <lin-selector-item value="标签三" label="标签三">标签三</lin-selector-item>
    <lin-selector-item value="标签四" label="标签四" disabled>标签四</lin-selector-item>
    <lin-selector-item value="标签五" label="标签五">标签五</lin-selector-item>
    <lin-selector-item value="标签六" label="标签六">标签六</lin-selector-item>
  </lin-selector-group>
</div>

:::demo

```html
<lin-selector-group label="学科：" v-model="value4">
  <lin-selector-item value="标签一" label="标签一" disabled
    >标签一</lin-selector-item
  >
  <lin-selector-item value="标签二" label="标签二">标签二</lin-selector-item>
  <lin-selector-item value="标签三" label="标签三">标签三</lin-selector-item>
  <lin-selector-item value="标签四" label="标签四" disabled
    >标签四</lin-selector-item
  >
  <lin-selector-item value="标签五" label="标签五">标签五</lin-selector-item>
  <lin-selector-item value="标签六" label="标签六">标签六</lin-selector-item>
</lin-selector-group>

<script>
  export default {
    data() {
      return {
        value4: "标签三",
      };
    },
  };
</script>
```

:::

## SelectorGroup 属性

| 参数            | 说明                                                                                                                  | 类型                               | 可选值 | 默认值 |
| --------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------ | ------ |
| width           | 选择器宽度                                                                                                            | String                             | —      | —      |
| labelWidth      | 标签宽度                                                                                                              | String                             | —      | 40px   |
| value / v-model | 绑定值                                                                                                                | Boolean / String / Number / Object | —      | —      |
| valueKey        | 作为 value 唯一标识的键名，绑定值为对象类型时必填                                                                     | String                             | —      | value  |
| renderMore      | 自定义渲染更多标签内容，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个是否展开或收起的状态值。可以使用 jsx | Function                           | —      | —      |
| renderLabel     | 自定义渲染头部标签内容，使用 Vue 的 Render 函数，参数是 h，可以使用 jsx                                               | Function                           | —      | —      |
| label           | 头部标签内容                                                                                                          | String                             | —      | —      |
| disabled        | 是否禁用                                                                                                              | Boolean                            | —      | false  |

## SelectorGroup 事件

| 事件名称 | 说明                   | 回调参数     |
| -------- | ---------------------- | ------------ |
| show     | 标签全部显示时触发     | —            |
| hide     | 标签超出部分隐藏时触发 | —            |
| onChange | 选中值发生变化时触发   | 目前的选中值 |

## SelectorItem 属性

| 参数     | 说明     | 类型            | 可选值 | 默认值 |
| -------- | -------- | --------------- | ------ | ------ |
| label    | 标签内容 | String          | —      | —      |
| value    | 选项的值 | String / Number | —      | —      |
| disabled | 是否禁用 | Boolean         | —      | false  |

## SelectorItem 插槽

| 插槽名称 | 说明           |
| -------- | -------------- |
| —        | 自定义标签内容 |
