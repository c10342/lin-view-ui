<script>
export default {
  data() {
    return {
      value1:'label-one',
      list1:['label-one','label-two','label-three','label-four','label-five','label-six','label-seven','label-eight','label-nine','label-ten','label-eleven'],
      value2:{
          name: "label-one",
          id: 1
        },
      list2: [
        {
          name: "label-one",
          id: 1
        },
        {
          name: "label-two",
          id: 2
        },
        {
          name: "label-three",
          id: 3
        },
        {
          name: "label-four",
          id: 4
        }
      ],
      value3:"label-one",
      list3: ['label-one','label-two','label-three','label-four','label-five','label-six','label-seven','label-eight','label-nine','label-ten','label-eleven'],
      value4:"label-three",
    };
  },
  methods: {
    renderMore(h,status) {
      if (status === 1) {
        return <span>open</span>;
      } else {
        return <span>close</span>;
      }
    },
    renderLabel() {
      return <span>label：</span>;
    }
  }
};
</script>

# Selector

---

## Basic usage

The value of `v-model` is the value of the currently selected `lin-selector-item`

<div class='demo-block'>
  <lin-selector-group
    label="label："
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
<lin-selector-group label="label：" v-model="value1">
  <lin-selector-item v-for="(item , index) in list1" :key="index" :value="item">
    {{item}}
  </lin-selector-item>
</lin-selector-group>

<script>
  export default {
    data() {
      return {
        value1: "label-one",
        list1: [
          "label-one",
          "label-two",
          "label-three",
          "label-four",
          "label-five",
          "label-six",
          "label-seven",
          "label-eight",
          "label-nine",
          "label-ten",
          "label-eleven",
        ],
      };
    },
  };
</script>
```

:::

## Binding values to objects

When the binding value is an object, you need to set the `valueKey` attribute as the key name that uniquely identifies the value

<div class='demo-block'>
  <lin-selector-group
    label="subject："
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
<lin-selector-group label="subject：" value-key="id" v-model="value2">
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
          name: "label-one",
          id: 1,
        },
        list2: [
          {
            name: "label-one",
            id: 1,
          },
          {
            name: "label-two",
            id: 2,
          },
          {
            name: "label-three",
            id: 3,
          },
          {
            name: "label-four",
            id: 4,
          },
        ],
      };
    },
  };
</script>
```

:::

## Use jsx

When you need to customize the label column and more styles and structures, you can set the `renderMore` and `renderLabel` properties and return a JSX

<div class='demo-block'>
  <lin-selector-group
  :render-more="renderMore"
    :render-label="renderLabel"
    label="subject："
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
<lin-selector-group label="subject：" v-model="value3">
  <lin-selector-item v-for="(item , index) in list3" :key="index" :value="item"
    >{{item}}</lin-selector-item
  >
</lin-selector-group>

<script>
  export default {
    data() {
      return {
        value3: "label-one",
        list3: [
          "label-one",
          "label-two",
          "label-three",
          "label-four",
          "label-five",
          "label-six",
          "label-seven",
          "label-eight",
          "label-nine",
          "label-ten",
          "label-eleven",
        ],
      };
    },
    methods: {
      renderMore(h, status) {
        if (status === 1) {
          return <span>open</span>;
        } else {
          return <span>close</span>;
        }
      },
      renderLabel() {
        return <span>label</span>;
      },
    },
  };
</script>
```

:::

## Disabled state

If the `lin-selector-group` property is set for the `disabled`, the entire selector is not available

<div class='demo-block'>
  <lin-selector-group
    label="subject："
    v-model="value4"
  >
    <lin-selector-item value="label-one" label="label-one" disabled>label-one</lin-selector-item>
    <lin-selector-item value="label-two" label="label-two">label-two</lin-selector-item>
    <lin-selector-item value="label-three" label="label-three">label-three</lin-selector-item>
    <lin-selector-item value="label-four" label="label-four" disabled>label-four</lin-selector-item>
    <lin-selector-item value="label-five" label="label-five">label-five</lin-selector-item>
    <lin-selector-item value="label-six" label="label-six">label-six</lin-selector-item>
  </lin-selector-group>
</div>

:::demo

```html
<lin-selector-group label="subject：" v-model="value4">
  <lin-selector-item value="label-one" label="label-one" disabled
    >label-one</lin-selector-item
  >
  <lin-selector-item value="label-two" label="label-two"
    >label-two</lin-selector-item
  >
  <lin-selector-item value="label-three" label="label-three"
    >label-three</lin-selector-item
  >
  <lin-selector-item value="label-four" label="label-four" disabled
    >label-four</lin-selector-item
  >
  <lin-selector-item value="label-five" label="label-five"
    >label-five</lin-selector-item
  >
  <lin-selector-item value="label-six" label="label-six"
    >label-six</lin-selector-item
  >
</lin-selector-group>

<script>
  export default {
    data() {
      return {
        value4: "label-three",
      };
    },
  };
</script>
```

:::

## SelectorGroup Attributes

| Attribute       | Description                                                                                                                                                                           | Type                               | Accepted Values | Default |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | --------------- | ------- |
| width           | width of SelectorGroup                                                                                                                                                                | String                             | —               | —       |
| labelWidth      | width of label                                                                                                                                                                        | String                             | —               | 40px    |
| value / v-model | binding value                                                                                                                                                                         | Boolean / String / Number / Object | —               | —       |
| valueKey        | unique identity key name for value, required when value is an object                                                                                                                  | String                             | —               | value   |
| renderMore      | Custom render more label content, use Vue's render function. Pass in two parameters, the first is h, and the second is whether to expand or collapse the state value. You can use JSX | Function                           | —               | —       |
| renderLabel     | Custom render header label content, use Vue's render function, parameter is h, you can use jsx                                                                                        | Function                           | —               | —       |
| label           | content of label                                                                                                                                                                      | String                             | —               | —       |
| disabled        | Disable                                                                                                                                                                               | Boolean                            | —               | false   |

## SelectorGroup Events

| Event Name | Description                               | Parameters             |
| ---------- | ----------------------------------------- | ---------------------- |
| show       | Triggered when all labels are displayed   | —                      |
| hide       | Triggered when label exceeds part hidden  | —                      |
| onChange   | Triggered when the selected value changes | Current selected value |

## SelectorItem Attributes

| Attribute | Description             | Type            | Accepted Values | Default |
| --------- | ----------------------- | --------------- | --------------- | ------- |
| label     | content of label        | String          | —               | —       |
| value     | The value of the option | String / Number | —               | —       |
| disabled  | Disable                 | Boolean         | —               | false   |

## SelectorItem Slots

| Name | Description          |
| ---- | -------------------- |
| —    | Custom label content |
