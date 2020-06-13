<script>
export default {
  data() {
    return {
      value1: false,
      value2: [],
      value3: []
    };
  }
};
</script>

# Checkbox 多选框

---

## 基础用法

要使用 Checkbox 组件，只需要设置 `v-model` 绑定变量，选中意味着变量的值为`Boolean`

<div class='demo-block'>
<l-checkbox v-model="value1">男</l-checkbox>
</div>

:::demo

```html
<l-checkbox v-model="value1">男</l-checkbox>

<script>
  export default {
    data() {
      return {
        value1: false,
      };
    },
  };
</script>
```

:::

## 禁用状态

只要在 `l-checkbox` 或者 `l-checkbox-group` 元素中设置 `disabled` 属性即可，它接受一个 `Boolean` ，`true` 为禁用

<div class='demo-block'>
<l-checkbox-group disabled v-model="value2">
      <l-checkbox label="抽烟"></l-checkbox>
      <l-checkbox label="喝酒"></l-checkbox>
      <l-checkbox label="探头"></l-checkbox>
    </l-checkbox-group>
</div>

:::demo

```html
<l-checkbox-group disabled v-model="value2">
  <l-checkbox label="抽烟"></l-checkbox>
  <l-checkbox label="喝酒"></l-checkbox>
  <l-checkbox label="探头"></l-checkbox>
</l-checkbox-group>

<script>
  export default {
    data() {
      return {
        value2: [],
      };
    },
  };
</script>
```

:::

## 多选框组

结合 `l-checkbox-group` 元素和子元素 `l-checkbox` 可以实现多选组，在 `l-checkbox-group` 中绑定 `v-model` ，在 `l-checkbox` 中设置好 `label` 即可，无需再给每一个 `l-checkbox` 绑定变量。

<div class='demo-block'>
    <l-checkbox-group v-model="value3">
      <l-checkbox label="抽烟"></l-checkbox>
      <l-checkbox label="喝酒"></l-checkbox>
      <l-checkbox label="探头"></l-checkbox>
    </l-checkbox-group>
</div>

:::demo

```html
<l-checkbox-group v-model="value3">
  <l-checkbox label="抽烟"></l-checkbox>
  <l-checkbox label="喝酒"></l-checkbox>
  <l-checkbox label="探头"></l-checkbox>
</l-checkbox-group>

<script>
  export default {
    data() {
      return {
        value3: [],
      };
    },
  };
</script>
```

:::

## Checkbox 属性

| 参数            | 说明                                                | 类型                    | 可选值 | 默认值 |
| --------------- | --------------------------------------------------- | ----------------------- | ------ | ------ |
| value / v-model | 绑定值                                              | String, Number, Boolean | —      | —      |
| label           | l-checkbox 的 value，只能结合 l-checkbox-group 使用 | String, Number, Boolean | —      | —      |
| name            | 原生属性 name                                       | String                  | —      | —      |
| disabled        | 是否禁用                                            | Boolean                 | —      | false  |

## CheckboxGroup 属性

| 参数            | 说明     | 类型                    | 可选值 | 默认值 |
| --------------- | -------- | ----------------------- | ------ | ------ |
| value / v-model | 绑定值   | String, Number, Boolean | —      | —      |
| disabled        | 是否禁用 | Boolean                 | —      | false  |
