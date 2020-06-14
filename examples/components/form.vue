<template>
  <div>
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
        isPublich: false
      }
    };
  }
};
</script>

