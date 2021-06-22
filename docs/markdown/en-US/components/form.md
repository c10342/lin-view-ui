# Form

[[toc]]

---

## Basic usage

In the Form component, each form field is composed of a Form-Item component. Various types of form controls can be placed in the form field, including Input, Checkbox, Radio, Switch

:::demo

```vue
<template>
  <lin-form :model="form">
    <lin-form-item label="UserName">
      <lin-input v-model="form.userName" placeholder="Please enter user name" />
    </lin-form-item>
    <lin-form-item label="Gender">
      <lin-radio-group v-model="form.sex">
        <lin-radio label="3">man</lin-radio>
        <lin-radio label="4">woman</lin-radio>
      </lin-radio-group>
    </lin-form-item>
    <lin-form-item label="hobby">
      <lin-checkbox-group v-model="form.hobby">
        <lin-checkbox label="smoking"></lin-checkbox>
        <lin-checkbox label="drink"></lin-checkbox>
        <lin-checkbox label="probe"></lin-checkbox>
      </lin-checkbox-group>
    </lin-form-item>
    <lin-form-item label="Public">
      <lin-switch v-model="form.sPublich" />
    </lin-form-item>
    <lin-form-item style="text-align:center;">
      <lin-button type="primary">Submit</lin-button>
    </lin-form-item>
  </lin-form>
</template>

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

## Form verification

Data validation internally uses `async-validator`. For more advanced usage, please refer to [async-validator](https://github.com/yiminghe/async-validator)

:::demo

```vue
<template>
  <lin-form :model="form1" :rules="rules" ref="loginForm">
    <lin-form-item label="UserName" prop="userName">
      <lin-input
        v-model="form1.userName"
        placeholder="Please enter user name"
      />
    </lin-form-item>
    <lin-form-item label="Gender" prop="sex">
      <lin-radio-group v-model="form1.sex">
        <lin-radio label="3">man</lin-radio>
        <lin-radio label="4">woman</lin-radio>
      </lin-radio-group>
    </lin-form-item>
    <lin-form-item label="hobby" prop="hobby">
      <lin-checkbox-group v-model="form1.hobby">
        <lin-checkbox label="smoking"></lin-checkbox>
        <lin-checkbox label="drink"></lin-checkbox>
        <lin-checkbox label="probe"></lin-checkbox>
      </lin-checkbox-group>
    </lin-form-item>
    <lin-form-item label="Public" prop="isPublich">
      <lin-switch v-model="form1.isPublich" />
    </lin-form-item>
    <lin-form-item>
      <lin-button type="primary" @click="validate">Submit</lin-button>
      <lin-button style="margin-left:10px" @click="resetForm">Reset</lin-button>
    </lin-form-item>
  </lin-form>
</template>

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
        userName: [{ required: true, message: "Please enter user name" }],
        sex: [
          { required: true, message: "Please select gender" },
          { pattern: "3", message: "Please select male" },
        ],
        hobby: [{ required: true, message: "Please choose a hobby" }],
        isPublich: [
          { required: true, message: "Please select" },
          { type: "enum", enum: [true], message: "Please make it public" },
        ],
      },
    };
  },

  methods: {
    validate() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          alert("dVerification successful!");
        } else {
          alert("Verification failed!");
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

## Form Attributes

| Attribute  | Description                                            | Type   | Accepted Values | Default |
| ---------- | ------------------------------------------------------ | ------ | --------------- | ------- |
| model      | data of form component                                 | Object | —               | —       |
| labelWidth | The width of the form field label                      | String | —               | 80px    |
| rules      | validation rules of form,reference to`async-validator` | Object | —               | —       |

## Form Events

| Event Name | Description                               | Parameters                                                                                                       |
| ---------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| validate   | Triggered after any table item is checked | The prop value of the verified form item, whether the verification passed or not, and the error message (if any) |

## Form Methods

| Method        | Description                                                                                                                                                                                                               | Parameters                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| validate      | The method for verifying the whole form. The parameter is a callback function. The callback function will be called after the end of verification, and pass in a parameter: whether the verification is successful or not | Function(callback: Function(boolean)) |
| clearValidate | remove validation status of the field                                                                                                                                                                                     | —                                     |

## FormItem Attributes

| Attribute  | Description                                                                              | Type   | Accepted Values                     | Default |
| ---------- | ---------------------------------------------------------------------------------------- | ------ | ----------------------------------- | ------- |
| label      | label                                                                                    | String | —                                   | —       |
| prop       | a key of model. In the use of validate and resetFields method, the attribute is required | String | keys of `model` that passed to form | —       |
| labelWidth | The width of the form field label                                                        | String | —                                   | —       |

## FormItem Slot

| Name | Description          |
| ---- | -------------------- |
| —    | content of Form Item |
