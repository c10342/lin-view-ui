<template>
  <div>
    <div>
      <l-button @click="click1">点击打开Dialog</l-button>
      <l-dialog :visible.sync="visible1" width="30%" title="标题" top="20vh">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <l-button @click="visible1 = false">取 消</l-button>
          <l-button type="primary" @click="visible1 = false">确 定</l-button>
        </span>
      </l-dialog>
    </div>
    <div>
      <l-button @click="click2">点击打开Dialog</l-button>
      <l-dialog :visible.sync="visible2" :closeOnClickModa="false">
        <span>这是一段信息</span>
      </l-dialog>
    </div>
    <div>
      <l-button @click="click3">点击打开Dialog</l-button>
      <l-dialog :visible.sync="visible3" :beforeClose="handleClose">
        <span>这是一段信息</span>
      </l-dialog>
    </div>
    <div>
      <l-button @click="click4">点击打开Dialog</l-button>
      <l-dialog :visible.sync="visible4">
        <template v-slot:title>
          <span>这是自定义标题</span>
        </template>
        <span>这是一段信息</span>
      </l-dialog>
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
      visible4: false
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
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  .l-button {
    margin-left: 10px;
  }
}
</style>
