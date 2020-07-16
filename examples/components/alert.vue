<template>
  <div>
    <div class="alert-row">
      <l-alert closable type="success" title="提示文案"></l-alert>
      <l-alert closable type="info" title="提示文案"></l-alert>
      <l-alert closable type="warning" title="提示文案"></l-alert>
      <l-alert closable type="danger" title="提示文案"></l-alert>
    </div>
    <div class="alert-row">
      <l-alert center effect="dark" closable type="success" title="提示文案"></l-alert>
      <l-alert center effect="dark" closable type="info" title="提示文案"></l-alert>
      <l-alert center effect="dark" closable type="warning" title="提示文案"></l-alert>
      <l-alert center effect="dark" closable type="danger" title="提示文案"></l-alert>
    </div>
    <div class="alert-row">
      <l-alert icon="l-icon-chat" description="文字说明文字说明文字说明" closable type="success" title="提示文案"></l-alert>
      <l-alert icon="l-icon-chat" description="文字说明文字说明文字说明" closable type="info" title="提示文案"></l-alert>
      <l-alert icon="l-icon-chat" description="文字说明文字说明文字说明" closable type="warning" title="提示文案"></l-alert>
      <l-alert icon="l-icon-chat" description="文字说明文字说明文字说明" closable type="danger" title="提示文案"></l-alert>
    </div>
    <div class="alert-row">
      <l-alert
        icon="l-icon-chat"
        description="文字说明文字说明文字说明"
        effect="dark"
        closable
        type="success"
        title="提示文案"
      ></l-alert>
      <l-alert
        icon="l-icon-chat"
        description="文字说明文字说明文字说明"
        effect="dark"
        closable
        type="info"
        title="提示文案"
      ></l-alert>
      <l-alert
        icon="l-icon-chat"
        description="文字说明文字说明文字说明"
        effect="dark"
        closable
        type="warning"
        title="提示文案"
      ></l-alert>
      <l-alert
        icon="l-icon-chat"
        description="文字说明文字说明文字说明"
        effect="dark"
        closable
        type="danger"
        title="提示文案"
      ></l-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: "test-alert"
};
</script>

<style lang="scss" scoped>
.alert-row {
  ::v-deep .l-alert {
    margin-bottom: 10px;
  }
}
</style>