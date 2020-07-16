<template>
  <div>
    <div class="tag-row">
      <l-tag text="标签1" />
      <l-tag text="标签2" type="success" />
      <l-tag text="标签3" type="info" />
      <l-tag text="标签4" type="warning" />
      <l-tag text="标签5" type="danger" />
    </div>
    <div class="tag-row">
      <l-tag effect="dark" closable text="标签1" />
      <l-tag effect="dark" closable text="标签2" type="success" />
      <l-tag effect="dark" closable text="标签3" type="info" />
      <l-tag effect="dark" closable text="标签4" type="warning" />
      <l-tag effect="dark" closable text="标签5" type="danger" />
    </div>

    <div class="tag-row">
      <l-tag effect="plain" closable text="标签1" />
      <l-tag effect="plain" closable text="标签2" type="success" />
      <l-tag effect="plain" closable text="标签3" type="info" />
      <l-tag effect="plain" closable text="标签4" type="warning" />
      <l-tag effect="plain" closable text="标签5" type="danger" />
    </div>
  </div>
</template>

<script>
export default {
  name: "test-tag"
};
</script>

<style lang="scss" scoped>
.tag-row {
  ::v-deep .l-tag {
    margin-right: 10px;
  }
}
</style>