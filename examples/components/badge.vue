<template>
  <div>
    <div>
      <lin-badge :value="12" class="badge-item">
        <lin-button>评论</lin-button>
      </lin-badge>
      <lin-badge :value="3" class="badge-item">
        <lin-button>回复</lin-button>
      </lin-badge>
      <lin-badge :value="1" class="badge-item" type="danger">
        <lin-button>评论</lin-button>
      </lin-badge>
      <lin-badge :value="2" class="badge-item" type="warning">
        <lin-button>回复</lin-button>
      </lin-badge>
    </div>

    <div>
      <lin-badge :value="200" :max="99" class="badge-item">
        <lin-button>评论</lin-button>
      </lin-badge>
      <lin-badge :value="100" :max="10" class="badge-item">
        <lin-button>回复</lin-button>
      </lin-badge>
    </div>
    <div>
      <lin-badge value="new" class="badge-item">
        <lin-button>评论</lin-button>
      </lin-badge>
      <lin-badge value="hot" class="badge-item">
        <lin-button>回复</lin-button>
      </lin-badge>
    </div>
    <div>
      <lin-badge is-dot class="badge-item">数据查询</lin-badge>
      <lin-badge is-dot class="badge-item">
        <lin-button icon="lin-icon-thumbsup" type="primary"></lin-button>
      </lin-badge>
    </div>
  </div>
</template>

<script>
export default {
  name: "test-badge",
};
</script>

<style lang="scss" scoped>
.badge-item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>