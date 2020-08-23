<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "test-form",
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

