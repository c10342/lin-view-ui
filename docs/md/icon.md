# Icon 图标

---

## 图标集合

<template>
  <ul class="icon-list">
    <li v-for="(item ,index) in list" :key="index">
      <i :class="item"></i>
      <span>{{item}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [
        "l-icon-date",
        "l-icon-thumbsup",
        "l-icon-chat",
        "l-icon-down",
        "l-icon-left",
        "l-icon-up",
        "l-icon-upload",
        "l-icon-delete",
        "l-icon-search",
        "l-icon-close",
        "l-icon-right",
        "l-icon-left",
        "l-icon-password",
        "l-icon-right",
        "l-icon-user",
        "l-icon-downarrow",
        "l-icon-uparrow"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.icon-list {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 0;
  > li {
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;

    width: 16.66%;
    height: 120px;
    font-size: 14px;
    color: #666;
        cursor: pointer;
    &:hover {
      color: #1989fa;
    }
    >i{
      font-size:22px;
    }
    > span {
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
</style>