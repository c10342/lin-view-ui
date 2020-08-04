<template>
  <div>
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
      <lin-form-item>
        <lin-button type="primary">提交</lin-button>
      </lin-form-item>
    </lin-form>
  </div>
</template>

<script>
export default {
  name: "test-form",
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

