<style lang="scss" scoped>
    .l-input{
        width:250px;
    }

    .input-group{
        display:flex;
        flex-direction: column;
        .l-input+.l-input{
            margin-top:20px;
        }
    }
</style>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: ""
    };
  }
};
</script>

# Input 输入框

---

Input 为受控组件，它总会显示 Vue 绑定值。

通常情况下，应当处理 input 事件，并更新组件的绑定值（或使用 v-model）。否则，输入框内显示的值将不会改变。

不支持 v-model 修饰符。

## 基础用法

使用`v-model`绑定输入框的值

<div class='demo-block'>
<l-input v-model="value1" placeholder="请输入"></l-input>
</div>

:::demo

```html
<l-input v-model="value1" placeholder="请输入"></l-input>

<script>
  export default {
    data() {
      return {
        value1: "",
      };
    },
  };
</script>
```

:::

## 原生属性

目前支持绑定到 input 输入框的原生属性用 3 个，分别是`name`、`maxlength` 、`minlength`

<div class='demo-block input-group'>
<l-input v-model="value2" placeholder="name" name="userName"></l-input>
<l-input v-model="value7" placeholder="maxlength" :maxlength="10"></l-input>
<l-input v-model="value8" placeholder="minlength" :minlength="2"></l-input>
</div>

:::demo

```html
<l-input v-model="value2" placeholder="name" name="userName"></l-input>
<l-input v-model="value7" placeholder="maxlength" :maxlength="10"></l-input>
<l-input v-model="value8" placeholder="minlength" :minlength="2"></l-input>

<script>
  export default {
    data() {
      return {
        value2: "",
        value7: "",
        value8: "",
      };
    },
  };
</script>
```

:::

## 禁用状态

使用 `disabled` 属性指定是否禁用 input 组件

<div class='demo-block'>
<l-input v-model="value3" placeholder="请输入" disabled></l-input>
</div>

:::demo

```html
<l-input v-model="value3" placeholder="请输入" disabled></l-input>

<script>
  export default {
    data() {
      return {
        value3: "",
      };
    },
  };
</script>
```

:::

## 可清空

使用`clearable`属性即可得到一个可清空的输入框

<div class='demo-block'>
<l-input v-model="value4" placeholder="请输入" clearable></l-input>
</div>

:::demo

```html
<l-input v-model="value4" placeholder="请输入" clearable></l-input>

<script>
  export default {
    data() {
      return {
        value4: "",
      };
    },
  };
</script>
```

:::

## 密码框

使用`showPassword`属性即可得到一个可切换显示隐藏的密码框

<div class='demo-block'>
<l-input v-model="value5" placeholder="请输入" show-password></l-input>
</div>

:::demo

```html
<l-input v-model="value5" placeholder="请输入" show-password></l-input>

<script>
  export default {
    data() {
      return {
        value5: "",
      };
    },
  };
</script>
```

:::

## 带 icon 的输入框

通过 slot 来放置图标

<div class='demo-block'>
    <l-input v-model="value6" placeholder="请输入">
      <i class="l-icon-s-promotion"></i>
    </l-input>
</div>

:::demo

```html
<l-input v-model="value6" placeholder="请输入">
  <i class="l-icon-s-promotion"></i>
</l-input>

<script>
  export default {
    data() {
      return {
        value6: "",
      };
    },
  };
</script>
```

:::

## 属性

| 参数         | 说明                 | 类型    | 可选值 | 默认值 |
| ------------ | -------------------- | ------- | ------ | ------ |
| placeholder  | 输入框占位文本       | String  | —      | —      |
| type         | 类型                 | String  | —      | text   |
| name         | 原生属性 name        | String  | —      | —      |
| disabled     | 是否禁用状态         | Boolean | —      | false  |
| value        | 绑定值               | String  | —      | —      |
| clearable    | 是否可清空           | Boolean | —      | false  |
| showPassword | 是否显示切换密码图标 | Boolean | —      | false  |

## 事件

| 事件名称 | 说明                    | 回调参数       |
| -------- | ----------------------- | -------------- |
| blur     | 在 Input 失去焦点时触发 | (event: Event) |
| focus    | 在 Input 获得焦点时触发 | (event: Event) |

## 插槽

| 插槽名称 | 说明           |
| -------- | -------------- |
| —        | 输入框尾部内容 |
