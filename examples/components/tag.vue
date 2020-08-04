<template>
  <div>
    <div class="tag-row">
      <lin-tag text="标签1" />
      <lin-tag text="标签2" type="success" />
      <lin-tag text="标签3" type="info" />
      <lin-tag text="标签4" type="warning" />
      <lin-tag text="标签5" type="danger" />
    </div>
    <div class="tag-row">
      <lin-tag effect="dark" closable text="标签1" />
      <lin-tag effect="dark" closable text="标签2" type="success" />
      <lin-tag effect="dark" closable text="标签3" type="info" />
      <lin-tag effect="dark" closable text="标签4" type="warning" />
      <lin-tag effect="dark" closable text="标签5" type="danger" />
    </div>

    <div class="tag-row">
      <lin-tag effect="plain" closable text="标签1" />
      <lin-tag effect="plain" closable text="标签2" type="success" />
      <lin-tag effect="plain" closable text="标签3" type="info" />
      <lin-tag effect="plain" closable text="标签4" type="warning" />
      <lin-tag effect="plain" closable text="标签5" type="danger" />
    </div>
  </div>
</template>

<script>
export default {
  name: "test-tag",
};
</script>

<style lang="scss" scoped>
.tag-row {
  ::v-deep .lin-tag {
    margin-right: 10px;
  }
}
</style>