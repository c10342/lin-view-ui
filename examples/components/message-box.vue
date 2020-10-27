<template>
  <div>
    <!-- <lin-message-box title="标题" message='内容' /> -->
    <lin-button @click="open1">打开</lin-button>
    <lin-button @click="open2">alert</lin-button>
    <lin-button @click="open3">confirm</lin-button>
    <lin-button @click="open4">点击打开 Message Box</lin-button>
    <lin-button @click="open5">点击打开 Message Box</lin-button>
    <lin-button @click="open6">提交内容</lin-button>
  </div>
</template>


<script>
export default {
  name: "test-message-box",
  methods: {
    open1() {
      this.$MessageBox({ title: "标题", message: "内容" })
        .then((data) => {})
        .catch((error) => {});
    },
    open2() {
      this.$MessageBox
        .alert({ title: "标题", message: "内容" })
        .then((data) => {})
        .catch((error) => {});
    },
    open3() {
      this.$MessageBox
        .confirm({
          title: "提示",
          message: "此操作将永久删除该文件, 是否继续?",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.$Message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$Message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    open4() {
      this.$MessageBox
        .alert({
          title: "HTML 片段",
          message: "<strong>这是 <i>HTML</i> 片段</strong>",
          dangerouslyUseHTMLString: true,
        })
        .then(() => {})
        .catch(() => {});
    },
    open5() {
      this.$MessageBox({
        title: "消息",
        message: "我是内容",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // beforeClose: (data, instance, done) => {
        //   setTimeout(() => {
        //     done();
        //   }, 5000);
        // },
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    open6() {
      this.$MessageBox
        .prompt({
          title: "提示",
          message: "请输入邮箱",
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: "邮箱格式不正确",
        })
        .then((data) => {
          console.log(data);
          // this.$message({
          //   type: "success",
          //   message: "你的邮箱是: " + value,
          // });
        })
        .catch((error) => {
          console.log(error);
          // this.$message({
          //   type: "info",
          //   message: "取消输入",
          // });
        });
    },
  },
};
</script>