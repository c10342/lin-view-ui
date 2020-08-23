<script>
export default {
  data() {
    return {
      form: {
        userName: "",
        sex: "",
        hobby: [],
        isPublich: false
      },
      form1: {
        userName: "",
        sex: "",
        hobby: [],
        isPublich: false
      },
      rules: {
        userName: [{ required: true, message: "请输入用户名" }],
        sex: [
          { required: true, message: "请选择性别" },
          { pattern: "3", message: "请选择男性" }
        ],
        hobby: [{ required: true, message: "请选择爱好" }],
        isPublich: [
          { required: true, message: "请选择" },
          { type: "enum", enum: [true], message: "请公开" }
        ]
      }
    };
  },
  methods: {
    validate() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          alert("校验成功！");
        } else {
          alert("校验失败！");
        }
      });
    },
    resetForm() {
      this.$refs.loginForm.clearValidate();
    },
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
    <lin-switch v-model="form.isPublich" />
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

## 表单校验

数据校验内部使用的是 `async-validator`，更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)

<div class='demo-block'>
  <lin-form :model="form1" :rules="rules" ref="loginForm">
      <lin-form-item label="用户名" prop="userName">
        <lin-input v-model="form1.userName" placeholder="请输入用户名" />
      </lin-form-item>
      <lin-form-item label="性别" prop="sex">
        <lin-radio-group v-model="form1.sex">
          <lin-radio label="3">男</lin-radio>
          <lin-radio label="4">女</lin-radio>
        </lin-radio-group>
      </lin-form-item>
      <lin-form-item label="爱好" prop="hobby">
        <lin-checkbox-group v-model="form1.hobby">
          <lin-checkbox label="抽烟"></lin-checkbox>
          <lin-checkbox label="喝酒"></lin-checkbox>
          <lin-checkbox label="探头"></lin-checkbox>
        </lin-checkbox-group>
      </lin-form-item>
      <lin-form-item label="是否公开" prop="isPublich">
        <lin-switch v-model="form1.isPublich" />
      </lin-form-item>
      <lin-form-item>
        <lin-button type="primary" @click="validate">提交</lin-button>
        <lin-button style="margin-left:10px" @click="resetForm">提交</lin-button>
      </lin-form-item>
    </lin-form>
</div>

:::demo

```html
<lin-form :model="form1" :rules="rules" ref="loginForm">
  <lin-form-item label="用户名" prop="userName">
    <lin-input v-model="form1.userName" placeholder="请输入用户名" />
  </lin-form-item>
  <lin-form-item label="性别" prop="sex">
    <lin-radio-group v-model="form1.sex">
      <lin-radio label="3">男</lin-radio>
      <lin-radio label="4">女</lin-radio>
    </lin-radio-group>
  </lin-form-item>
  <lin-form-item label="爱好" prop="hobby">
    <lin-checkbox-group v-model="form1.hobby">
      <lin-checkbox label="抽烟"></lin-checkbox>
      <lin-checkbox label="喝酒"></lin-checkbox>
      <lin-checkbox label="探头"></lin-checkbox>
    </lin-checkbox-group>
  </lin-form-item>
  <lin-form-item label="是否公开" prop="isPublich">
    <lin-switch v-model="form1.isPublich" />
  </lin-form-item>
  <lin-form-item>
    <lin-button type="primary" @click="validate">提交</lin-button>
    <lin-button @click="resetForm">提交</lin-button>
  </lin-form-item>
</lin-form>

<script>
  export default {
    data() {
      return {
        form1: {
          userName: "",
          sex: "",
          hobby: [],
          isPublich: false,
        },
        rules: {
          userName: [{ required: true, message: "请输入用户名" }],
          sex: [
            { required: true, message: "请选择性别" },
            { pattern: "3", message: "请选择男性" },
          ],
          hobby: [{ required: true, message: "请选择爱好" }],
          isPublich: [
            { required: true, message: "请选择" },
            { type: "enum", enum: [true], message: "请公开" },
          ],
        },
      };
    },

    methods: {
      validate() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            alert("校验成功！");
          } else {
            alert("校验失败！");
          }
        });
      },
      resetForm() {
        this.$refs.loginForm.clearValidate();
      },
    },
  };
</script>
```

:::

## Form 属性

| 参数       | 说明                                  | 类型   | 可选值 | 默认值 |
| ---------- | ------------------------------------- | ------ | ------ | ------ |
| model      | 表单数据对象                          | Object | —      | —      |
| labelWidth | 表单域标签的宽度                      | String | —      | 80px   |
| rules      | 表单校验规则，可参考`async-validator` | Object | —      | —      |

## Form 事件

| 事件名称 | 说明                   | 回调参数                                                   |
| -------- | ---------------------- | ---------------------------------------------------------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |

## Form 方法

| 方法名   | 说明                                                                                                         | 参数                                  |
| -------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| validate | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入一个参数：是否校验成功。 | Function(callback: Function(boolean)) |

## FormItem 属性

| 参数  | 说明              | 类型   | 可选值                            | 默认值 |
| ----- | ----------------- | ------ | --------------------------------- | ------ |
| label | 标签文本          | String | —                                 | —      |
| prop  | 表单域 model 字段 | String | 传入 Form 组件的 `model` 中的字段 | —      |
