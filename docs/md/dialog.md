<style lang="scss" scoped>
.dialog-footer {
  .l-button {
    margin-left: 10px;
  }
}
</style>

<script>
export default {
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
    },
    onClose(){
        alert('关闭了弹框')
    }
  }
};
</script>

# Dialog 对话框

---

## 基础用法

需要设置`visible`属性，它接收`Boolean`，当为`true`时显示 Dialog。Dialog 分为两个部分：body 和 footer，footer 需要具名为 footer 的 slot。title 属性用于定义标题，它是可选的，默认值为提示。width 属性用于定义 Dialog 的宽度，默认值是 50%。top 属性用于定义 Dialog 距离浏览器顶部的距离，默认值是 15vh。

<div class='demo-block'>
<l-button @click="click1">点击打开Dialog</l-button>
<l-dialog 
    :visible.sync="visible1" 
    width="30%" 
    title="标题" 
    top="20vh">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
        <l-button @click="visible1 = false">取 消</l-button>
        <l-button type="primary" @click="visible1 = false">确 定</l-button>
    </span>
</l-dialog>
</div>

:::demo

```html
<l-button @click="click1">点击打开Dialog</l-button>
<l-dialog :visible.sync="visible1" width="30%" title="标题" top="20vh">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <l-button @click="visible1 = false">取 消</l-button>
    <l-button type="primary" @click="visible1 = false">确 定</l-button>
  </span>
</l-dialog>

<script>
  export default {
    data() {
      return {
        visible1: false,
      };
    },
    methods: {
      click1() {
        this.visible1 = true;
      },
    },
  };
</script>
```

:::

## 遮罩层不可点击

使用`close-onClick-moda`属性来设置遮罩层为不可点击状态

<div class='demo-block'>
<l-button @click="click2">点击打开Dialog</l-button>
<l-dialog 
    :visible.sync="visible2" 
    :close-onClick-moda="false">
    <span>这是一段信息</span>
</l-dialog>
</div>

:::demo

```html
<l-button @click="click2">点击打开Dialog</l-button>
<l-dialog :visible.sync="visible2" :close-onClick-moda="false">
  <span>这是一段信息</span>
</l-dialog>

<script>
  export default {
    data() {
      return {
        visible2: false,
      };
    },
    methods: {
      click2() {
        this.visible2 = true;
      },
    },
  };
</script>
```

:::

## 判断是否需要关闭

使用`before-close`属性在 Dialog 关闭前判断是否需要关闭，`before-close`会传入一个函数作为参数，当调用该函数后， Dialog 会被关闭，否则不会被关闭掉。

<div class='demo-block'>
    <l-button @click="click3">点击打开Dialog</l-button>
    <l-dialog :visible.sync="visible3" :before-close="handleClose">
    <span>这是一段信息</span>
    </l-dialog>
</div>

:::demo

```html
<l-button @click="click3">点击打开Dialog</l-button>
<l-dialog :visible.sync="visible3" :before-close="handleClose">
  <span>这是一段信息</span>
</l-dialog>

<script>
  export default {
    data() {
      return {
        visible3: false,
      };
    },
    methods: {
      click3() {
        this.visible3 = true;
      },
      handleClose(done) {
        alert("点击了关闭");
        done();
      },
    },
  };
</script>
```

:::

## 自定义标题

使用 slot 具名插槽，插槽名为 title

<div class='demo-block'>
    <l-button @click="click4">点击打开Dialog</l-button>
      <l-dialog :visible.sync="visible4" @close='onClose'>
        <template v-slot:title>
          <span>这是自定义标题</span>
        </template>
        <span>这是一段信息</span>
    </l-dialog>
</div>

:::demo

```html
<l-button @click="click4">点击打开Dialog</l-button>
<l-dialog :visible.sync="visible4">
  <template v-slot:title>
    <span>这是自定义标题</span>
  </template>
  <span>这是一段信息</span>
</l-dialog>

<script>
  export default {
    data() {
      return {
        visible4: false,
      };
    },
    methods: {
      click4() {
        this.visible4 = true;
      },
      onClose() {
        alert("关闭了弹框");
      },
    },
  };
</script>
```

:::

## 属性

| 参数             | 说明                                            | 类型                                 | 可选值 | 默认值 |
| ---------------- | ----------------------------------------------- | ------------------------------------ | ------ | ------ |
| title            | Dialog 的标题，也可通过具名 slot （见下表）传入 | String                               | —      | 提示   |
| width            | Dialog 的宽度                                   | String                               | —      | 50%    |
| top              | Dialog CSS 中的 margin-top 值                   | String                               | —      | 15vh   |
| visible          | 是否显示 Dialog，支持 .sync 修饰符              | Boolean                              | —      | false  |
| beforeClose      | 关闭前的回调，会暂停 Dialog 的关闭              | function(done)，done 用于关闭 Dialog | —      | —      |
| closeOnClickModa | 是否可以通过点击 modal 关闭 Dialog              | Boolean                              | —      | true   |

## 插槽

| 插槽名称 | 说明                    |
| -------- | ----------------------- |
| —        | Dialog 的内容           |
| title    | Dialog 标题区的内容     |
| footer   | Dialog 按钮操作区的内容 |

## 事件

| 事件名称 | 说明              | 回调参数 |
| -------- | ----------------- | -------- |
| close    | Dialog 关闭的回调 | —        |
