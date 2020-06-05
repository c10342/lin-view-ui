<template>
  <div id="app">
    <div class="row">
      <l-button>按钮</l-button>
      <l-button type="primary">按钮</l-button>
      <l-button type="success">按钮</l-button>
      <l-button type="info">按钮</l-button>
      <l-button type="warning">按钮</l-button>
      <l-button type="danger">按钮</l-button>
    </div>
    <div class="row">
      <l-button :plain="true" type="default">按钮</l-button>
      <l-button :plain="true" type="primary">按钮</l-button>
      <l-button :plain="true" type="success">按钮</l-button>
      <l-button :plain="true" type="info">按钮</l-button>
      <l-button :plain="true" type="warning">按钮</l-button>
      <l-button :plain="true" type="danger">按钮</l-button>
    </div>
    <div class="row">
      <l-button icon="l-icon-ice-cream-square" :round="true" type="default">按钮</l-button>
      <l-button icon="l-icon-ice-cream-square" :round="true" type="primary">按钮</l-button>
      <l-button icon="l-icon-ice-cream-square" :round="true" type="success">按钮</l-button>
      <l-button icon="l-icon-ice-cream-square" :round="true" type="info">按钮</l-button>
      <l-button icon="l-icon-ice-cream-square" :round="true" type="warning">按钮</l-button>
      <l-button icon="l-icon-ice-cream-square" :round="true" type="danger">按钮</l-button>
    </div>
    <div class="row">
      <l-button :circle="true" type="default">按钮</l-button>
      <l-button :circle="true" type="primary">按钮</l-button>
      <l-button :circle="true" type="success">按钮</l-button>
      <l-button :circle="true" type="info">按钮</l-button>
      <l-button :circle="true" type="warning">按钮</l-button>
      <l-button :circle="true" type="danger">按钮</l-button>
    </div>
    <div class="row">
      <l-button :disabled="true" type="default">按钮</l-button>
      <l-button :disabled="true" type="primary">按钮</l-button>
      <l-button :disabled="true" type="success">按钮</l-button>
      <l-button :disabled="true" type="info">按钮</l-button>
      <l-button :disabled="true" type="warning">按钮</l-button>
      <l-button :disabled="true" type="danger">按钮</l-button>
    </div>
    <div class="row">
      <l-button icon="l-icon-ice-cream-square" :circle="true" type="default"></l-button>
      <l-button icon="l-icon-ice-cream-square" :circle="true" type="primary"></l-button>
      <l-button icon="l-icon-ice-cream-square" :circle="true" type="success"></l-button>
      <l-button icon="l-icon-ice-cream-square" :circle="true" type="info"></l-button>
      <l-button icon="l-icon-ice-cream-square" :circle="true" type="warning"></l-button>
      <l-button icon="l-icon-ice-cream-square" :circle="true" type="danger"></l-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
.row {
  margin-top: 20px;
  .l-button {
    margin-right: 10px;
  }
}
</style>
