<template>
  <div>
    <div class="link-group">
      <lin-link href="https://www.baidu.com/" target="_blank"
        >默认链接</lin-link
      >
      <lin-link type="primary">主要链接</lin-link>
      <lin-link type="success">成功链接</lin-link>
      <lin-link type="warning">警告链接</lin-link>
      <lin-link type="danger">危险链接</lin-link>
      <lin-link type="info">信息链接</lin-link>
    </div>
    <div class="link-group">
      <lin-link disabled>默认链接</lin-link>
      <lin-link type="primary" disabled>主要链接</lin-link>
      <lin-link type="success" disabled>成功链接</lin-link>
      <lin-link type="warning" disabled>警告链接</lin-link>
      <lin-link type="danger" disabled>危险链接</lin-link>
      <lin-link type="info" disabled>信息链接</lin-link>
    </div>
    <div class="link-group">
      <lin-link :underline="false">无下划线</lin-link>
      <lin-link>有下划线</lin-link>
    </div>
    <div class="link-group">
      <lin-link icon="lin-icon-thumbsup">编辑</lin-link>
      <lin-link>查看<i class="lin-icon-chat"></i> </lin-link>
    </div>
  </div>
</template>


<script>
export default {
  name: "test-link",
};
</script>

<style lang="scss" scoped>
.link-group {
  margin-top: 10px;
  > a {
    margin-right: 10px;
  }
}
</style>