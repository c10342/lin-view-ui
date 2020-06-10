<script>
export default {
  data() {
    return {
      value1: "1",
      value2: "2",
      value3: "3",
    };
  }
};
</script>

# Radio 单选框

---

## 基础用法

要使用 Radio 组件，只需要设置 `v-model` 绑定变量，选中意味着变量的值为相应 Radio `label` 属性的值，label 可以是 `String` 、 `Number` 或 `Boolean`

<div class='demo-block'>
<l-radio label="1" v-model="value1">男</l-radio>
<l-radio label="2" v-model="value1">女</l-radio>
</div>

:::demo

```html
<l-radio label="1" v-model="value1">男</l-radio>
<l-radio label="2" v-model="value1">女</l-radio>

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

## 禁用状态

只要在 `l-radio` 元素中设置 `disabled` 属性即可，它接受一个 `Boolean` ，`true` 为禁用

<div class='demo-block'>
<l-radio disabled label="1" v-model="value2">男</l-radio>
<l-radio disabled label="2" v-model="value2">女</l-radio>
</div>

:::demo

```html
<l-radio disabled label="1" v-model="value2">男</l-radio>
<l-radio disabled label="2" v-model="value2">女</l-radio>

<script>
  export default {
    data() {
      return {
        value2: "2",
      };
    },
  };
</script>
```

:::

## 单选框组

结合 `l-radio-group` 元素和子元素 `l-radio` 可以实现单选组，在 `l-radio-group` 中绑定 `v-model` ，在 `l-radio` 中设置好 `label` 即可，无需再给每一个 `l-radio` 绑定变量。

<div class='demo-block'>
    <l-radio-group v-model="value3">
      <l-radio label="3">男</l-radio>
      <l-radio label="4">女</l-radio>
    </l-radio-group>
</div>

:::demo

```html
<l-radio-group v-model="value3">
  <l-radio label="3">男</l-radio>
  <l-radio label="4">女</l-radio>
</l-radio-group>

<script>
  export default {
    data() {
      return {
        value3: "3",
      };
    },
  };
</script>
```

:::

## Radio 属性

| 参数            | 说明           | 类型                    | 可选值 | 默认值 |
| --------------- | -------------- | ----------------------- | ------ | ------ |
| value / v-model | 绑定值         | String, Number, Boolean | —      | —      |
| label           | Radio 的 value | String, Number, Boolean | —      | —      |
| name            | 原生属性 name  | String                  | —      | —      |
| disabled        | 是否禁用       | Boolean                 | —      | false  |

## RadioGroup 属性

| 参数            | 说明     | 类型                    | 可选值 | 默认值 |
| --------------- | -------- | ----------------------- | ------ | ------ |
| value / v-model | 绑定值   | String, Number, Boolean | —      | —      |
| disabled        | 是否禁用 | Boolean                 | —      | false  |
