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
     <lin-form :model="form">
      <lin-form-item label="用户名">
        <lin-input v-model="form.userName" placeholder="请输入用户名" />
      </lin-form-item>
      <lin-form-item label="性别">
        <lin-radio-group v-model="form.sex">
          <lin-radio label="3">男</lin-radio>
          <lin-radio label="4">女</lin-radio>
        </lin-radio-group>
      </lin-form-item>
      <lin-form-item label="爱好">
        <lin-checkbox-group v-model="form.hobby">
          <lin-checkbox label="抽烟"></lin-checkbox>
          <lin-checkbox label="喝酒"></lin-checkbox>
          <lin-checkbox label="探头"></lin-checkbox>
        </lin-checkbox-group>
      </lin-form-item>
      <lin-form-item label="是否公开">
        <lin-switch v-model="form.sPublich" />
      </lin-form-item>
      <lin-form-item style='text-align:center;'>
        <lin-button type="primary">提交</lin-button>
      </lin-form-item>
    </lin-form>
</div>

:::demo

```html
<lin-form :model="form">
  <lin-form-item label="用户名">
    <lin-input v-model="form.userName" placeholder="请输入用户名" />
  </lin-form-item>
  <lin-form-item label="性别">
    <lin-radio-group v-model="form.sex">
      <lin-radio label="3">男</lin-radio>
      <lin-radio label="4">女</lin-radio>
    </lin-radio-group>
  </lin-form-item>
  <lin-form-item label="爱好">
    <lin-checkbox-group v-model="form.hobby">
      <lin-checkbox label="抽烟"></lin-checkbox>
      <lin-checkbox label="喝酒"></lin-checkbox>
      <lin-checkbox label="探头"></lin-checkbox>
    </lin-checkbox-group>
  </lin-form-item>
  <lin-form-item label="是否公开">
    <lin-switch v-model="form.sPublich" />
  </lin-form-item>
  <lin-form-item style="text-align:center;">
    <lin-button type="primary">提交</lin-button>
  </lin-form-item>
</lin-form>

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
