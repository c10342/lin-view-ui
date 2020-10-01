<template>
  <div>
    <div class="lin-dropdown-group-label">12313</div>
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: "LinDropdownGroup",
};
</script>

<style lang="scss">
.lin-dropdown-group-label {
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: default;
  padding: 0 20px;
  border-bottom: 1px solid #dcdfe6;
  font-size: 12px;
  color: #909399;
}
</style>