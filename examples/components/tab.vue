<template>
  <div>
    <div style="margin-top: 100px">
      <lin-tab-group v-model="activeName" @tab-click="handleClick">
        <lin-tab-item  label="用户管理" name="first">用户管理</lin-tab-item>
        <lin-tab-item label="配置管理" name="second">配置管理</lin-tab-item>
        <lin-tab-item label="角色管理" name="third">角色管理</lin-tab-item>
        <lin-tab-item label="定时任务补偿" name="fourth"
          >定时任务补偿</lin-tab-item
        >
      </lin-tab-group>
    </div>

    <div style="margin-top: 100px">
      <lin-tab-group type="card">
        <lin-tab-item label="用户管理" name="first">用户管理</lin-tab-item>
        <lin-tab-item label="配置管理" name="second">配置管理</lin-tab-item>
        <lin-tab-item label="角色管理" name="third">角色管理</lin-tab-item>
        <lin-tab-item label="定时任务补偿" name="fourth">定时任务补偿</lin-tab-item>
      </lin-tab-group>
    </div>

    <div style="margin-top: 100px">
      <lin-tab-group type="border-card">
        <lin-tab-item label="用户管理" name="first">用户管理</lin-tab-item>
        <lin-tab-item label="配置管理" name="second">配置管理</lin-tab-item>
        <lin-tab-item label="角色管理" name="third">角色管理</lin-tab-item>
        <lin-tab-item label="定时任务补偿" name="fourth"
          >定时任务补偿</lin-tab-item
        >
      </lin-tab-group>
    </div>

    <div style="margin-top: 100px">
      <lin-tab-group type="border-card">
        <lin-tab-item label="用户管理" name="first">
          <span slot="label">
            <i class="lin-icon-date"></i>
            <span>用户管理</span>
          </span>
          用户管理
        </lin-tab-item>
        <lin-tab-item label="配置管理" name="second">配置管理</lin-tab-item>
        <lin-tab-item label="角色管理" name="third">角色管理</lin-tab-item>
        <lin-tab-item label="定时任务补偿" name="fourth"
          >定时任务补偿</lin-tab-item
        >
      </lin-tab-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "test-tab",
  data() {
    return {
      activeName: "",
    };
  },
  methods: {
    handleClick(data) {
      //   console.log(data);
    },
  },
};
</script>