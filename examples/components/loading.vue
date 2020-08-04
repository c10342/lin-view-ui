<template>
  <div>
    <button class="btn" @click="onClick">click</button>
    <button class="btn" @click="onClick1">click</button>
    <div
      class="box-content"
      lin-loading-text="拼命加载中"
      lin-loading-background="rgba(0, 0, 0, 0.8)"
      lin-loading-textColor="#fff"
      v-loading.lock="isLoading"
    >
      <div class="box"></div>
    </div>
    <div style="height:1700px"></div>
  </div>
</template>


<script>
export default {
  name: "test-loading",
  data() {
    return {
      isLoading: false,
      isLoading1: false,
    };
  },
  methods: {
    onClick() {
      this.isLoading = !this.isLoading;
    },
    onClick1() {
      // if (this.isLoading1) {
      //   this.$loading.close();
      //   this.isLoading1 = false;
      // } else {
      //   this.$loading.open({ fullscreen: false, lock: true });
      //   this.isLoading1 = true;
      // }
      this.$loading.open({ time: 5000 });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  margin-top: 20px;
  width: 600px;
  height: 1300px;
  background-color: rosybrown;
}

.btn {
  position: fixed;
  z-index: 10000;
}

.box-content {
  height: 500px;
  overflow: auto;
}

.btn:nth-child(2) {
  left: 200px;
}
</style>