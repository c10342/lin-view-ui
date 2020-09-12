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
        "lin-icon-date",
        "lin-icon-thumbsup",
        "lin-icon-chat",
        "lin-icon-down",
        "lin-icon-left",
        "lin-icon-up",
        "lin-icon-upload",
        "lin-icon-delete",
        "lin-icon-search",
        "lin-icon-close",
        "lin-icon-right",
        "lin-icon-leftarrow",
        "lin-icon-password",
        "lin-icon-rightarrow",
        "lin-icon-user",
        "lin-icon-downarrow",
        "lin-icon-play",
        "lin-icon-volume",
        "lin-icon-mute",
        "lin-icon-pause",
        "lin-icon-fullscreen",
        "lin-icon-full-screen"
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
