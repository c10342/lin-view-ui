<template>
  <div>
    <div class="row">
      <lin-button>按钮</lin-button>
      <lin-button type="primary">按钮</lin-button>
      <lin-button type="success">按钮</lin-button>
      <lin-button type="info">按钮</lin-button>
      <lin-button type="warning">按钮</lin-button>
      <lin-button type="danger">按钮</lin-button>
    </div>
    <div class="row">
      <lin-button :plain="true" type="default">按钮</lin-button>
      <lin-button :plain="true" type="primary">按钮</lin-button>
      <lin-button :plain="true" type="success">按钮</lin-button>
      <lin-button :plain="true" type="info">按钮</lin-button>
      <lin-button :plain="true" type="warning">按钮</lin-button>
      <lin-button :plain="true" type="danger">按钮</lin-button>
    </div>
    <div class="row">
      <lin-button icon="lin-icon-ice-cream-square" :round="true" type="default">按钮</lin-button>
      <lin-button icon="lin-icon-ice-cream-square" :round="true" type="primary">按钮</lin-button>
      <lin-button icon="lin-icon-ice-cream-square" :round="true" type="success">按钮</lin-button>
      <lin-button icon="lin-icon-ice-cream-square" :round="true" type="info">按钮</lin-button>
      <lin-button icon="lin-icon-ice-cream-square" :round="true" type="warning">按钮</lin-button>
      <lin-button icon="lin-icon-ice-cream-square" :round="true" type="danger">按钮</lin-button>
    </div>
    <div class="row">
      <lin-button :circle="true" type="default">按钮</lin-button>
      <lin-button :circle="true" type="primary">按钮</lin-button>
      <lin-button :circle="true" type="success">按钮</lin-button>
      <lin-button :circle="true" type="info">按钮</lin-button>
      <lin-button :circle="true" type="warning">按钮</lin-button>
      <lin-button :circle="true" type="danger">按钮</lin-button>
    </div>
    <div class="row">
      <lin-button :disabled="true" type="default">按钮</lin-button>
      <lin-button :disabled="true" type="primary">按钮</lin-button>
      <lin-button :disabled="true" type="success">按钮</lin-button>
      <lin-button :disabled="true" type="info">按钮</lin-button>
      <lin-button :disabled="true" type="warning">按钮</lin-button>
      <lin-button :disabled="true" type="danger">按钮</lin-button>
    </div>
    <div class="row">
      <lin-button icon="lin-icon-ice-cream-square" :circle="true" type="default"></lin-button>
      <lin-button icon="lin-icon-ice-cream-square" :circle="true" type="primary"></lin-button>
      <lin-button icon="lin-icon-ice-cream-square" :circle="true" type="success"></lin-button>
      <lin-button icon="lin-icon-ice-cream-square" :circle="true" type="info"></lin-button>
      <lin-button icon="lin-icon-ice-cream-square" :circle="true" type="warning"></lin-button>
      <lin-button icon="lin-icon-ice-cream-square" :circle="true" type="danger"></lin-button>
    </div>
    <div class="row">
      <lin-button size="default">按钮</lin-button>
      <lin-button size="medium">按钮</lin-button>
      <lin-button size="small">按钮</lin-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "test-button",
};
</script>

<style lang="scss" scoped>
.row {
  margin-top: 20px;
  .lin-button {
    margin-right: 10px;
  }
}
</style>