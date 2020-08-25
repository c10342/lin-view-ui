<template>
  <div>
    <div class="text-group">
      <lin-text-effect type="primary" text="text-effect" />
      <lin-text-effect type="success" text="text-effect" />
      <lin-text-effect type="info" text="text-effect" />
      <lin-text-effect type="warning" text="text-effect" />
      <lin-text-effect type="danger" text="text-effect" />
    </div>
    <div class="text-group">
      <lin-text-effect theme="border" type="primary" text="text-effect" />
      <lin-text-effect theme="border" type="success" text="text-effect" />
      <lin-text-effect theme="border" type="info" text="text-effect" />
      <lin-text-effect theme="border" type="warning" text="text-effect" />
      <lin-text-effect theme="border" type="danger" text="text-effect" />
    </div>
    <div class="text-group">
      <lin-text-effect theme="fillet" type="primary" text="text-effect" />
      <lin-text-effect theme="fillet" type="success" text="text-effect" />
      <lin-text-effect theme="fillet" type="info" text="text-effect" />
      <lin-text-effect theme="fillet" type="warning" text="text-effect" />
      <lin-text-effect theme="fillet" type="danger" text="text-effect" />
    </div>
    <div class="text-group">
      <lin-text-effect theme="frozen" type="primary" text="text-effect" />
      <lin-text-effect theme="frozen" type="success" text="text-effect" />
      <lin-text-effect theme="frozen" type="info" text="text-effect" />
      <lin-text-effect theme="frozen" type="warning" text="text-effect" />
      <lin-text-effect theme="frozen" type="danger" text="text-effect" />
    </div>

    <div class="text-group">
      <lin-text-effect theme="shiny" type="primary" text="text-effect" />
      <lin-text-effect theme="shiny" type="success" text="text-effect" />
      <lin-text-effect theme="shiny" type="info" text="text-effect" />
      <lin-text-effect theme="shiny" type="warning" text="text-effect" />
      <lin-text-effect theme="shiny" type="danger" text="text-effect" />
    </div>
  </div>
</template>


<script>
export default {
  name: "test-textEffect",
};
</script>

<style lang="scss" scoped>
.text-group {
  margin-top: 20px;
  ::v-deep button {
    margin-right: 10px;
  }
}
</style>