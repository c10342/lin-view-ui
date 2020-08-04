<script>
export default {
  data() {
    return {
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0
    };
  }
};
</script>


# InputNumber 计数器

---

## 基础用法

要使用它，只需要在 `lin-input-number` 元素中使用 `v-model` 绑定变量即可，变量的初始值即为默认值。

<div class='demo-block'>
<lin-input-number v-model="value1" />
</div>

:::demo
```html
<lin-input-number v-model="value1" />

<script>
export default {
  data() {
    return {
      value1: 0
    };
  }
};
</script>

```
:::

## 禁用状态

`disabled` 属性接受一个 `Boolean` ，设置为 `true` 即可禁用整个组件

<div class='demo-block'>
<lin-input-number v-model="value2" disabled />
</div>

:::demo
```html
<lin-input-number v-model="value2" disabled />

<script>
export default {
  data() {
    return {
      value2: 0
    };
  }
};
</script>

```
:::

## 步数

允许定义递增递减的步数控制，设置 `step` 属性可以控制步长，接受一个 `Number` 。

<div class='demo-block'>
<lin-input-number v-model="value3" :step="2" />
</div>

:::demo
```html
<lin-input-number v-model="value3" :step="2" />

<script>
export default {
  data() {
    return {
      value3: 0
    };
  }
};
</script>

```
:::

## 严格步数

`step-strictly` 属性接受一个 `Boolean` 。如果这个属性被设置为 `true` ，则只能输入步数的倍数。

<div class='demo-block'>
<lin-input-number v-model="value4" :step="2" step-strictly />
</div>

:::demo
```html
<lin-input-number v-model="value4" :step="2" step-strictly />

<script>
export default {
  data() {
    return {
      value4: 0
    };
  }
};
</script>

```
:::


## 属性

| 参数            | 说明                     | 类型    | 可选值 | 默认值    |
| --------------- | ------------------------ | ------- | ------ | --------- |
| value / v-model | 绑定值                   | Number  | —      | —         |
| min             | 设置计数器允许的最小值   | Number  | —      | -Infinity |
| max             | 设置计数器允许的最大值   | Number  | —      | Infinity  |
| disabled        | 是否禁用计数器           | Boolean | —      | false     |
| step            | 计数器步长               | Number  | —      | 1         |
| stepStrictly    | 是否只能输入 step 的倍数 | Boolean | —      | false     |
| placeholder     | 输入框默认 placeholder   | String  | —      | —         |

## 事件

| 事件名称 | 说明          | 回调参数     |
| -------- | ------------- | ------------ |
| reduce   | 点击-号时触发 | value:Number |
| plus     | 点击+号时触发 | value:Number |