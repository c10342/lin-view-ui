<template>
  <div>
    <div class="hover-group">
      <lin-hover-effect type="primary" text="text-effect" />
      <lin-hover-effect type="success" text="text-effect" />
      <lin-hover-effect type="info" text="text-effect" />
      <lin-hover-effect type="warning" text="text-effect" />
      <lin-hover-effect type="danger" text="text-effect" />
    </div>
    <div class="hover-group">
      <lin-hover-effect theme="border" type="primary" text="text-effect" />
      <lin-hover-effect theme="border" type="success" text="text-effect" />
      <lin-hover-effect theme="border" type="info" text="text-effect" />
      <lin-hover-effect theme="border" type="warning" text="text-effect" />
      <lin-hover-effect theme="border" type="danger" text="text-effect" />
    </div>
    <div class="hover-group">
      <lin-hover-effect theme="fillet" type="primary" text="text-effect" />
      <lin-hover-effect theme="fillet" type="success" text="text-effect" />
      <lin-hover-effect theme="fillet" type="info" text="text-effect" />
      <lin-hover-effect theme="fillet" type="warning" text="text-effect" />
      <lin-hover-effect theme="fillet" type="danger" text="text-effect" />
    </div>
    <div class="hover-group">
      <lin-hover-effect theme="frozen" type="primary" text="text-effect" />
      <lin-hover-effect theme="frozen" type="success" text="text-effect" />
      <lin-hover-effect theme="frozen" type="info" text="text-effect" />
      <lin-hover-effect theme="frozen" type="warning" text="text-effect" />
      <lin-hover-effect theme="frozen" type="danger" text="text-effect" />
    </div>

    <div class="hover-group">
      <lin-hover-effect theme="shiny" type="primary" text="text-effect" />
      <lin-hover-effect theme="shiny" type="success" text="text-effect" />
      <lin-hover-effect theme="shiny" type="info" text="text-effect" />
      <lin-hover-effect theme="shiny" type="warning" text="text-effect" />
      <lin-hover-effect theme="shiny" type="danger" text="text-effect" />
    </div>
  </div>
</template>


<script>
export default {
  name: "test-hoverEffect",
};
</script>

<style lang="scss" scoped>
.hover-group {
  margin-top: 20px;
  ::v-deep button {
    margin-right: 10px;
  }
}
</style>