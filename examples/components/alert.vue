<template>
  <div>
    <div class="alert-row">
      <lin-alert closable type="success" title="提示文案"></lin-alert>
      <lin-alert closable type="info" title="提示文案"></lin-alert>
      <lin-alert closable type="warning" title="提示文案"></lin-alert>
      <lin-alert closable type="danger" title="提示文案"></lin-alert>
    </div>
    <div class="alert-row">
      <lin-alert center effect="dark" closable type="success" title="提示文案"></lin-alert>
      <lin-alert center effect="dark" closable type="info" title="提示文案"></lin-alert>
      <lin-alert center effect="dark" closable type="warning" title="提示文案"></lin-alert>
      <lin-alert center effect="dark" closable type="danger" title="提示文案"></lin-alert>
    </div>
    <div class="alert-row">
      <lin-alert
        icon="lin-icon-chat"
        description="文字说明文字说明文字说明"
        closable
        type="success"
        title="提示文案"
      ></lin-alert>
      <lin-alert icon="lin-icon-chat" description="文字说明文字说明文字说明" closable type="info" title="提示文案"></lin-alert>
      <lin-alert
        icon="lin-icon-chat"
        description="文字说明文字说明文字说明"
        closable
        type="warning"
        title="提示文案"
      ></lin-alert>
      <lin-alert
        icon="lin-icon-chat"
        description="文字说明文字说明文字说明"
        closable
        type="danger"
        title="提示文案"
      ></lin-alert>
    </div>
    <div class="alert-row">
      <lin-alert
        icon="lin-icon-chat"
        description="文字说明文字说明文字说明"
        effect="dark"
        closable
        type="success"
        title="提示文案"
      ></lin-alert>
      <lin-alert
        icon="lin-icon-chat"
        description="文字说明文字说明文字说明"
        effect="dark"
        closable
        type="info"
        title="提示文案"
      ></lin-alert>
      <lin-alert
        icon="lin-icon-chat"
        description="文字说明文字说明文字说明"
        effect="dark"
        closable
        type="warning"
        title="提示文案"
      ></lin-alert>
      <lin-alert
        icon="lin-icon-chat"
        description="文字说明文字说明文字说明"
        effect="dark"
        closable
        type="danger"
        title="提示文案"
      ></lin-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: "test-alert",
};
</script>

<style lang="scss" scoped>
.alert-row {
  ::v-deep .lin-alert {
    margin-bottom: 10px;
  }
}
</style>