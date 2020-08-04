<template>
  <div>
    <div>
      <lin-button @click="click1">点击打开Dialog</lin-button>
      <lin-dialog :visible.sync="visible1" width="30%" title="标题" top="20vh">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <lin-button @click="visible1 = false">取 消</lin-button>
          <lin-button type="primary" @click="visible1 = false">确 定</lin-button>
        </span>
      </lin-dialog>
    </div>
    <div>
      <lin-button @click="click2">点击打开Dialog</lin-button>
      <lin-dialog :visible.sync="visible2" :closeOnClickModa="false">
        <span>这是一段信息</span>
      </lin-dialog>
    </div>
    <div>
      <lin-button @click="click3">点击打开Dialog</lin-button>
      <lin-dialog :visible.sync="visible3" :beforeClose="handleClose">
        <span>这是一段信息</span>
      </lin-dialog>
    </div>
    <div>
      <lin-button @click="click4">点击打开Dialog</lin-button>
      <lin-dialog :visible.sync="visible4">
        <template v-slot:title>
          <span>这是自定义标题</span>
        </template>
        <span>这是一段信息</span>
      </lin-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "test-dialog",
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
    };
  },
  methods: {
    click1() {
      this.visible1 = true;
    },
    click2() {
      this.visible2 = true;
    },
    click3() {
      this.visible3 = true;
    },
    click4() {
      this.visible4 = true;
    },
    handleClose(done) {
      alert("点击了关闭");
      done();
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  .lin-button {
    margin-left: 10px;
  }
}
</style>
