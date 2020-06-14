<script>
export default {
  data() {
    return {
      form: {
        userName: "",
        sex: "",
        hobby: [],
        isPublich: false
      }
    };
  }
};
</script>

# Form 表单

---

## 基础用法

在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Checkbox、Radio、Switch

<div class='demo-block'>
     <l-form :model="form">
      <l-form-item label="用户名">
        <l-input v-model="form.userName" placeholder="请输入用户名" />
      </l-form-item>
      <l-form-item label="性别">
        <l-radio-group v-model="form.sex">
          <l-radio label="3">男</l-radio>
          <l-radio label="4">女</l-radio>
        </l-radio-group>
      </l-form-item>
      <l-form-item label="爱好">
        <l-checkbox-group v-model="form.hobby">
          <l-checkbox label="抽烟"></l-checkbox>
          <l-checkbox label="喝酒"></l-checkbox>
          <l-checkbox label="探头"></l-checkbox>
        </l-checkbox-group>
      </l-form-item>
      <l-form-item label="是否公开">
        <l-switch v-model="form.sPublich" />
      </l-form-item>
      <l-form-item>
        <l-button type="primary">提交</l-button>
      </l-form-item>
    </l-form>
</div>

:::demo

```html
<l-form :model="form">
  <l-form-item label="用户名">
    <l-input v-model="form.userName" placeholder="请输入用户名" />
  </l-form-item>
  <l-form-item label="性别">
    <l-radio-group v-model="form.sex">
      <l-radio label="3">男</l-radio>
      <l-radio label="4">女</l-radio>
    </l-radio-group>
  </l-form-item>
  <l-form-item label="爱好">
    <l-checkbox-group v-model="form.hobby">
      <l-checkbox label="抽烟"></l-checkbox>
      <l-checkbox label="喝酒"></l-checkbox>
      <l-checkbox label="探头"></l-checkbox>
    </l-checkbox-group>
  </l-form-item>
  <l-form-item label="是否公开">
    <l-switch v-model="form.sPublich" />
  </l-form-item>
  <l-form-item>
    <l-button type="primary">提交</l-button>
  </l-form-item>
</l-form>

<script>
  export default {
    data() {
      return {
        form: {
          userName: "",
          sex: "",
          hobby: [],
          isPublich: false,
        },
      };
    },
  };
</script>
```

:::

## Form 属性

| 参数       | 说明             | 类型   | 可选值 | 默认值 |
| ---------- | ---------------- | ------ | ------ | ------ |
| model      | 表单数据对象     | Object | —      | —      |
| labelWidth | 表单域标签的宽度 | String | —      | 80px   |

## FormItem 属性

| 参数  | 说明     | 类型   | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ | ------ |
| label | 标签文本 | String | —      | —      |
