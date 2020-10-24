<template>
  <div>
    <button @click="onBtnClick">初始化</button>
    <button @click="onAddClick">添加</button>
    <div class="scroll-bar">
      <lin-scroll-bar :loading='loading' @scrollToBottom="scrollToBottom" max-height='400px'>
      <div class="scroll-item" v-for="(item, index) in list" :key="index">
        {{ item }}
      </div>
    </lin-scroll-bar>
    </div>
    <!-- <div class="demo-test" @scroll="onScroll">
      <div class="scroll-item" v-for="(item, index) in list" :key="index">
        {{ item }}
      </div>
    </div> -->
  </div>
</template>


<script>
let id = 1;
export default {
  name: "test-scroll-bar",
  data() {
    return {
      list: [],
      loading:false
    };
  },
  mounted() {
    this.count = 1;
  },
  created(){
    this.onBtnClick()
  },
  methods: {
    onBtnClick() {
      const list = [];
      for (let i = 0; i < 10; i++) {
        list.push("这是内容" + id);
        id++;
      }
      this.list = list;
    },
    onAddClick() {
      const list = [];
      for (let i = 0; i < 10; i++) {
        list.push("这是内容" + id);
        id++;
      }
      this.list.push(...list);
    },
    scrollToBottom() {
      if (this.count > 3 || this.loading) {
        return;
      }
      this.loading = true;
      setTimeout(() => {
        const list = [];
        for (let i = 0; i < 10; i++) {
          list.push("这是内容" + id);
          id++;
        }
        this.list.push(...list);
        this.count++;
        this.loading = false;
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-bar {
  max-height: 400px;
  width: 300px;
  border: 1px solid #cccccc;
}
.scroll-item {
  height: 100px;
  line-height: 100px;
}

.demo-test {
  height: 400px;
  overflow: auto;
  border: 1px solid #cccccc;
}
</style>