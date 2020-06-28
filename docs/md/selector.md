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
      list3: ['标签一','标签二','标签三','标签四','标签五','标签六','标签七','标签八','标签九','标签十','标签十一']
    };
  },
  methods: {
    renderMore(status) {
      if (status === 1) {
        return <span>展开</span>;
      } else {
        return <span>收起</span>;
      }
    },
    renderLabel() {
      return <span>标签</span>;
    }
  }
};
</script>

# Selector 选择器

---

## 基础用法

`v-model` 的值为当前被选中的 `l-selector-item` 的 value 属性值

<div class='demo-block'>
  <l-selector-group
    label="标签："
    v-model="value1"
  >
    <l-selector-item 
    v-for='(item , index) in list1'
    :key='index'
    :value="item" >
    {{item}}
    </l-selector-item>
  </l-selector-group>
</div>

:::demo

```html
<l-selector-group label="标签：" v-model="value1">
  <l-selector-item v-for="(item , index) in list1" :key="index" :value="item">
    {{item}}
  </l-selector-item>
</l-selector-group>

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
  <l-selector-group
    label="学科："
    value-key="id"
    v-model="value2"
  >
    <l-selector-item 
    v-for="item in list2" 
    :key="item.id" 
    :value="item" 
    :label="item.name"></l-selector-item>
  </l-selector-group>
</div>

:::demo

```html
<l-selector-group label="学科：" value-key="id" v-model="value2">
  <l-selector-item
    v-for="item in list2"
    :key="item.id"
    :value="item"
    :label="item.name"
  ></l-selector-item>
</l-selector-group>

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
  <l-selector-group
  :render-more="renderMore"
    :render-label="renderLabel"
    label="学科："
    value-key="id"
    v-model="value3"
  >
    <l-selector-item 
     v-for="(item , index) in list3" :key="index" :value="item"
     :label='item'
    ></l-selector-item>
  </l-selector-group>
</div>

:::demo

```html
<l-selector-group label="学科：" v-model="value3">
  <l-selector-item v-for="(item , index) in list3" :key="index" :value="item"
    >{{item}}</l-selector-item
  >
</l-selector-group>

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
      renderMore(status) {
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
