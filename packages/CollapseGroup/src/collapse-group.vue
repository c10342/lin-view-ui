<template>
  <div class="lin-collapse-group">
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: "LinCollapseGroup",
};
</script>

<style lang="scss">
.lin-collapse-group {
  position: relative;
  border: 1px solid #dcdee2;
}
</style>