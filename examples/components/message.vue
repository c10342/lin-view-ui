<template>
  <div>
    <!-- <lin-message message='消息' showClose type='success'/>
        <lin-message message='消息' showClose type='info'/>
        <lin-message message='消息' showClose type='error'/>
        <lin-message message='消息' showClose type='warning'/> -->
    <!-- <lin-button @click="onClick">消息</lin-button> -->
    <lin-button :plain="true" @click="open2">成功</lin-button>
    <lin-button :plain="true" @click="open3">警告</lin-button>
    <lin-button :plain="true" @click="open1">消息</lin-button>
    <lin-button :plain="true" @click="open4">错误</lin-button>
    <lin-button :plain="true" @click="closeAll">关闭所有</lin-button>
  </div>
</template>

<script>
export default {
  name: "test-message",
  methods: {
    // onClick() {
    //   this.$Message({ message: "12313", showClose: true });
    // },
    open1() {
      this.$Message.info({message:"消息"});
    },
    open2() {
      this.$Message.success({message:"成功"});
    },
    open3() {
      this.$Message.warning("警告");
    },
    open4() {
      this.$Message.error("错误");
    },
    closeAll(){
      this.$Message.closeAll();
    }
  },
};
</script>