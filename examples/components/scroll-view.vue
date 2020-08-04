<template>
  <div style="width:300px">
    <lin-scroll-view :isEnd="isEnd1" :data="list1" :height="200" @scrollToEnd="scrollToEnd1">
      <div class="item" v-for="(item,index) in list1" :key="index">{{item}}</div>
    </lin-scroll-view>

    <lin-scroll-view :isEnd="isEnd2" :data="list2" :height="200" @scrollToEnd="scrollToEnd2">
      <div class="item" v-for="(item,index) in list2" :key="index">{{item}}</div>

      <template v-slot:loading>
        <p class="tip">正在加载中...</p>
      </template>

      <template v-slot:no-more>
        <p class="tip">加载完毕</p>
      </template>
    </lin-scroll-view>
  </div>
</template>

<script>
export default {
  name: "test-scroll-view",
  data() {
    return {
      list1: [1, 2, 3, 4, 5],
      isEnd1: false,

      list2: [1, 2, 3, 4, 5],
      isEnd2: false,
    };
  },
  methods: {
    scrollToEnd1() {
      const arr = this.list1.slice();
      arr.push(...arr);
      this.list1 = arr;
      if (this.list1.length > 20) {
        this.isEnd1 = true;
        return;
      }
    },
    scrollToEnd2() {
      const arr = this.list2.slice();
      arr.push(...arr);
      this.list2 = arr;
      if (this.list2.length > 20) {
        this.isEnd2 = true;
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  line-height: 60px;
  margin-bottom: 10px;
  background-color: #e8f3fe;
}

.tip {
  text-align: center;
  padding: 0;
  margin: 0;
}
</style>