<script>
export default {
  data() {
    return {
      options1: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        }
      ],
      value1: "",

      options2: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2',
          disabled: true
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value2: '',

        value3: '',
        value4: '',

        cities: [{
          value: 'Beijing',
          label: 'Beijing'
        }, {
          value: 'Shanghai',
          label: 'Shanghai'
        }, {
          value: 'Nanjing',
          label: 'Nanjing'
        }, {
          value: 'Chengdu',
          label: 'Chengdu'
        }, {
          value: 'Shenzhen',
          label: 'Shenzhen'
        }, {
          value: 'Guangzhou',
          label: 'Guangzhou'
        }],
        value5: '',

        options3: [
            {
          label: 'Popular cities',
          options: [{
            value: 'Shanghai',
            label: 'Shanghai'
          }, {
            value: 'Beijing',
            label: 'Beijing'
          }]
        }, 
        {
          label: 'City name',
          options: [{
            value: 'Chengdu',
            label: 'Chengdu'
          }, {
            value: 'Shenzhen',
            label: 'Shenzhen'
          }, {
            value: 'Guangzhou',
            label: 'Guangzhou'
          }, {
            value: 'Dalian',
            label: 'Dalian'
          }]
        }],
        value6: '',

        options4: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
        {
          value: "Option6",
          label: "Option6",
        },
        {
          value: "Option7",
          label: "Option7",
        },
      ],
        value7: '',

        loading:false
    };
  },
  mounted() {
    this.count = 0;
  },
  methods: {
    scrollToBottom() {
      if(this.count >5){
          return
      }
      this.loading = true;
      setTimeout(() => {
        const options = [
          {
            value: Math.random().toString(16).slice(-9),
            label: "Option1",
          },
          {
            value: Math.random().toString(16).slice(-9),
            label: "Option2",
          },
          {
            value: Math.random().toString(16).slice(-9),
            label: "Option3",
          },
          {
            value: Math.random().toString(16).slice(-9),
            label: "Option4",
          },
          {
            value: Math.random().toString(16).slice(-9),
            label: "Option5",
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

# Choice

---

## Basic usage

`v-model` is the value of `lin-choice-item` that is currently selected.

<div class='demo-block'>
    <lin-choice-group
      v-model="value1"
      placeholder="Select"
    >
      <lin-choice-item
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </lin-choice-item>
    </lin-choice-group>
</div>

:::demo

```html
<lin-choice-group v-model="value1" placeholder="Select">
  <lin-choice-item
    v-for="item in options1"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  >
  </lin-choice-item>
</lin-choice-group>

<script>
  export default {
    data() {
      return {
        options1: [
          {
            value: "Option1",
            label: "Option1",
          },
          {
            value: "Option2",
            label: "Option2",
          },
          {
            value: "Option3",
            label: "Option3",
          },
          {
            value: "Option4",
            label: "Option4",
          },
          {
            value: "Option5",
            label: "Option5",
          },
        ],
        value1: "",
      };
    },
  };
</script>
```

:::

## Disabled option

Set the value of `disabled` in `lin-choice-item` to true to disable this option.

<div class='demo-block'>
<lin-choice-group v-model="value2" placeholder="Select">
    <lin-choice-item
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled">
    </lin-choice-item>
  </lin-choice-group>
</div>

:::demo

```html
<lin-choice-group v-model="value2" placeholder="Select">
  <lin-choice-item
    v-for="item in options2"
    :key="item.value"
    :label="item.label"
    :value="item.value"
    :disabled="item.disabled"
  >
  </lin-choice-item>
</lin-choice-group>

<script>
  export default {
    data() {
      return {
        options2: [
          {
            value: "Option1",
            label: "Option1",
          },
          {
            value: "Option2",
            label: "Option2",
            disabled: true,
          },
          {
            value: "Option3",
            label: "Option3",
          },
          {
            value: "Option4",
            label: "Option4",
          },
          {
            value: "Option5",
            label: "Option5",
          },
        ],
        value2: "",
      };
    },
  };
</script>
```

:::

## Disabled select

Set `disabled` of `lin-choice-group` to make it disabled.

<div class='demo-block'>
<lin-choice-group v-model="value3" disabled placeholder="Select">
    <lin-choice-item
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </lin-choice-item>
  </lin-choice-group>
</div>

:::demo

```html
<lin-choice-group v-model="value3" disabled placeholder="Select">
  <lin-choice-item
    v-for="item in options1"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  >
  </lin-choice-item>
</lin-choice-group>

<script>
  export default {
    data() {
      return {
        options1: [
          {
            value: "Option1",
            label: "Option1",
          },
          {
            value: "Option2",
            label: "Option2",
          },
          {
            value: "Option3",
            label: "Option3",
          },
          {
            value: "Option4",
            label: "Option4",
          },
          {
            value: "Option5",
            label: "Option5",
          },
        ],
        value3: "",
      };
    },
  };
</script>
```

:::

## Clearable select

Set `clearable` attribute for `lin-choice-group` and a clear icon will appear.

<div class='demo-block'>
<lin-choice-group v-model="value4" clearable placeholder="Select">
    <lin-choice-item
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </lin-choice-item>
  </lin-choice-group>
</div>

:::demo

```html
<lin-choice-group v-model="value4" clearable placeholder="Select">
  <lin-choice-item
    v-for="item in options1"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  >
  </lin-choice-item>
</lin-choice-group>
<script>
  export default {
    data() {
      return {
        options1: [
          {
            value: "Option1",
            label: "Option1",
          },
          {
            value: "Option2",
            label: "Option2",
          },
          {
            value: "Option3",
            label: "Option3",
          },
          {
            value: "Option4",
            label: "Option4",
          },
          {
            value: "Option5",
            label: "Option5",
          },
        ],
        value4: "",
      };
    },
  };
</script>
```

:::

## Custom template

Insert customized HTML templates into the slot of `lin-choice-item`.

<div class='demo-block'>
  <lin-choice-group v-model="value5" placeholder="Select">
    <lin-choice-item
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </lin-choice-item>
  </lin-choice-group>
</div>

:::demo

```html
<lin-choice-group v-model="value5" placeholder="Select">
  <lin-choice-item
    v-for="item in cities"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  >
    <span style="float: left">{{ item.label }}</span>
    <span style="float: right; color: #8492a6; font-size: 13px"
      >{{ item.value }}</span
    >
  </lin-choice-item>
</lin-choice-group>

<script>
  export default {
    data() {
      return {
        cities: [
          {
            value: "Beijing",
            label: "Beijing",
          },
          {
            value: "Shanghai",
            label: "Shanghai",
          },
          {
            value: "Nanjing",
            label: "Nanjing",
          },
          {
            value: "Chengdu",
            label: "Chengdu",
          },
          {
            value: "Shenzhen",
            label: "Shenzhen",
          },
          {
            value: "Guangzhou",
            label: "Guangzhou",
          },
        ],
        value5: "",
      };
    },
  };
</script>
```

:::

## Grouping

Use `lin-choice-option` to group the options, and its `label` attribute stands for the name of the group.

<div class='demo-block'>
<lin-choice-group v-model="value6" placeholder="Select">
    <lin-choice-option
      v-for="group in options3"
      :key="group.label"
      :label="group.label">
      <lin-choice-item
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </lin-choice-item>
    </lin-choice-option>
  </lin-choice-group>
</div>

:::demo

```html
<lin-choice-group v-model="value6" placeholder="Select">
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

<script>
  export default {
    data() {
      return {
        options3: [
          {
            label: "Popular cities",
            options: [
              {
                value: "Shanghai",
                label: "Shanghai",
              },
              {
                value: "Beijing",
                label: "Beijing",
              },
            ],
          },
          {
            label: "City name",
            options: [
              {
                value: "Chengdu",
                label: "Chengdu",
              },
              {
                value: "Shenzhen",
                label: "Shenzhen",
              },
              {
                value: "Guangzhou",
                label: "Guangzhou",
              },
              {
                value: "Dalian",
                label: "Dalian",
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

## Drop down loading

Set the `scroll` property for the `lin-choice-group` to implement drop-down loading. Set `loading` to load animation.

<div class='demo-block'>
    <lin-choice-group
      :loading="loading"
      scroll
      @scrollToBottom="scrollToBottom"
      v-model="value7"
      placeholder="Select"
    >
      <lin-choice-item
        v-for="item in options4"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </lin-choice-item>
    </lin-choice-group>
</div>

:::demo

```html
<lin-choice-group
  :loading="loading"
  scroll
  @scrollToBottom="scrollToBottom"
  v-model="value7"
  placeholder="Select"
>
  <lin-choice-item
    v-for="item in options4"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  >
  </lin-choice-item>
</lin-choice-group>

<script>
  export default {
    data() {
      return {
        options4: [
          {
            value: "Option1",
            label: "Option1",
          },
          {
            value: "Option2",
            label: "Option2",
          },
          {
            value: "Option3",
            label: "Option3",
          },
          {
            value: "Option4",
            label: "Option4",
          },
          {
            value: "Option5",
            label: "Option5",
          },
          {
            value: "Option6",
            label: "Option6",
          },
          {
            value: "Option7",
            label: "Option7",
          },
          {
            value: "Option8",
            label: "Option8",
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
              label: "Option1",
            },
            {
              value: Math.random()
                .toString(16)
                .slice(-9),
              label: "Option2",
            },
            {
              value: Math.random()
                .toString(16)
                .slice(-9),
              label: "Option3",
            },
            {
              value: Math.random()
                .toString(16)
                .slice(-9),
              label: "Option4",
            },
            {
              value: Math.random()
                .toString(16)
                .slice(-9),
              label: "Option5",
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

## ChoiceGroup Attributes

| Attribute            | Description                                              | Type                 | Accepted Values | Default   |
| --------------- | ------------------------------------------------- | -------------------- | ------ | -------- |
| value / v-model | binding value                                            | Object/String/Number | —      | —        |
| placeholder     | placeholder                                            | String               | —      | Select   |
| valueKey        | unique identity key name for value, required when value is an object | String               | —      | —        |
| clearable       | whether select can be cleared                                  | Boolean              | —      | false    |
| disabled        | whether Select is disabled                                          | Boolean              | —      | false    |
| isThrottle      | Whether to perform anti shake when starting pull-down loading                        | Boolean              | —      | true     |
| scroll          | Whether to enable pull-down loading                                  | Boolean              | —      | false    |
| time            | Buffeting interval                                      | Number               | —      | 500ms    |
| loading         | Whether to turn on loading animation                              | Boolean              | —      | false    |
| loadingTip      | Loading prompt                                        | String               | —      | —        |
| emptyTip        | Prompt when data is empty                            | String               | —      | No data available |

## ChoiceGroup Events

| Event Name       | Description                                     | Parameters                      |
| -------------- | ---------------------------------------- | ----------------------------- |
| scrollToBottom | Triggered when scrolling to the bottom                     | (event: Event)                |
| blur           | Triggered when input loses focus                  | (event: Event)                |
| focus          | Triggered when input gets focus                  | (event: Event)                |
| visible-change | Triggered when drop-down box appears / hidden                    | True if it appears and false if it is hidden |
| clear          | Triggered when the user clicks the clear button in radio mode that can be cleared | —                             |
| change         | triggers when the selected value changes                     | current selected value                  |

## ChoiceGroup Slots

| Name | Description                                           |
| -------- | ---------------------------------------------- |
| —        | Choiceitem component list or choiceoption component list |
| empty    | Content when data is empty                               |
| loading  | Custom loading animation                                 |

## ChoiceItem Attributes

| Attribute     | Description                                      | Type                 | Accepted Values | Default |
| -------- | ----------------------------------------- | -------------------- | ------ | ------ |
| label    | label of option, same as `value` if omitted | String               | —      | —      |
| value    | value of option                                  | Object/String/Number | —      | —      |
| disabled | whether option is disabled                            | Boolean              | —      | false  |

## ChoiceItem Slots

| Name | Description     |
| -------- | -------- |
| —        | content of label |

## ChoiceOption Attributes

| Attribute     | Description                           | Type    | Accepted Values | Default |
| -------- | ------------------------------ | ------- | ------ | ------ |
| label    | name of the group                     | String  | —      | —      |
| disabled | whether to disable all options in this group | Boolean | —      | false  |

## ChoiceItem Slots

| Name | Description                |
| -------- | ------------------- |
| —        | ChoiceItem component list |
| label    | Group label content        |
