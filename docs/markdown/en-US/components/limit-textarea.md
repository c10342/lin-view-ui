<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      value4: ""
    };
  }
};
</script>

# LimitTextarea 限制输入域

---

## Basic usage

LimitTextarea 可以控制用户输入的字符数，`placeholder` 指定初始输入的提示文案

<div class="demo-block">
<lin-limit-textarea v-model="value1" :maxLen="10" placeholder="最多输入10个字符"></lin-limit-textarea>
</div>

::: demo

```html
<lin-limit-textarea
  v-model="value1"
  :max-len="10"
  placeholder="最多输入10个字符"
/>

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

## 裁剪超出字符

如果超过了限制的字符数，可以通过设置`isCut`属性对超过部分进行裁剪

<div class="demo-block">
<lin-limit-textarea v-model="value2" :max-len="10" placeholder="最多输入10个字符" is-cut></lin-limit-textarea>
</div>

::: demo

```html
<lin-limit-textarea
  v-model="value2"
  :max-len="10"
  placeholder="最多输入10个字符"
  is-cut
/>

<script>
  export default {
    data() {
      return {
        value2: "",
      };
    },
  };
</script>
```

:::

## 列高

通过 `rows` 属性指定高度

<div class="demo-block">
<lin-limit-textarea v-model='value3' :max-len="10" :rows="3" placeholder="最多输入10个字符" is-cut></lin-limit-textarea>
</div>

:::demo

```html
<lin-limit-textarea
  v-model="value3"
  :max-len="10"
  :rows="3"
  placeholder="最多输入10个字符"
  is-cut
/>

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

## 属性

| 参数            | 说明                     | Type         | Accepted Values | Default         |
| --------------- | ------------------------ | ------------ | ------ | -------------- |
| rows            | 列高                     | Number       | —      | 4              |
| max-len         | Number                   | 最大长度限制 | —      | -1(不限制长度) |
| is-cut          | 超出字符是否裁剪         | Boolean      | —      | false          |
| placeholder     | 输入时需要显示的提示文案 | String       | —      | 请输入内容     |
| value / v-model | 绑定值                   | String       | —      | —              |

## 事件

| Event Name | 说明                                                                                | Parameters |
| -------- | ----------------------------------------------------------------------------------- | -------- |
| overText | 超出限制长度并且 isCut 为 false 时触发                                              | content  |
| change   | 在 Input 值改变时触发，当 isCut 为 true 并且 value 值长度大于最大长度限制时不会触发 | value    |
