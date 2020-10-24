<style lang="scss" scoped>
.scroll-bar {
  height: 200px;
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

<script>
let id = 1;
export default {
  data() {
    return {
      list1: [],
      list2: [],
      loading:false
    };
  },
  mounted() {
    this.count = 1;
  },
  created(){
    this.initData1()
    this.initData2()
  },
  methods: {
    initData1() {
      const list = [];
      for (let i = 0; i < 6; i++) {
        list.push("这是内容" + id);
        id++;
      }
      this.list1 = list;
    },
    initData2() {
      const list = [];
      for (let i = 0; i < 6; i++) {
        list.push("这是内容" + id);
        id++;
      }
      this.list2 = list;
    },
    scrollToBottom() {
      if (this.count > 3 || this.loading) {
        return;
      }
      this.loading = true;
      setTimeout(() => {
        const list = [];
        for (let i = 0; i < 6; i++) {
          list.push("这是内容" + id);
          id++;
        }
        this.list2.push(...list);
        this.count++;
        this.loading = false;
      }, 2000);
    },
  },
};
</script>

# ScrollBar 滚动条

---

`ScrollBar` 组件为 `ScrollView` 组件的优化版，目的是为了优化滚动条的样式，使滚动条在各个浏览器中表现出一致性。

## 基础用法

`ScrollBar` 组件需要一个固定的高度。你可以在最外层容器设置高度，`ScrollBar` 组件内部高度默认是 `100%`，当然你也可以给 `ScrollBar` 组件设置一个 `height` 属性，这样 `ScrollBar` 组件就不会依赖于外层容器的高度。如果你需要使用到 `min-height` 或者 `max-height` 来设置高度，那么你只能在 `ScrollBar` 组件中通过 `maxHeight` 或者 `minHeight` 属性来设置

<div class='demo-block'>
<div class='scroll-bar'>
<lin-scroll-bar>
      <div class="scroll-item" v-for="(item, index) in list1" :key="index">
        {{ item }}
      </div>
    </lin-scroll-bar>
</div>
</div>

:::demo

```html
<div class="scroll-bar">
  <lin-scroll-bar>
    <div class="scroll-item" v-for="(item, index) in list1" :key="index">
      {{ item }}
    </div>
  </lin-scroll-bar>
</div>

<script>
  let id = 1;
  export default {
    data() {
      return {
        list1: [],
      };
    },
    created() {
      this.initData1();
    },
    methods: {
      initData1() {
        const list = [];
        for (let i = 0; i < 10; i++) {
          list.push("这是内容" + id);
          id++;
        }
        this.list1 = list;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .scroll-bar {
    height: 200px;
    width: 300px;
    border: 1px solid #cccccc;
  }
  .scroll-item {
    height: 100px;
    line-height: 100px;
  }
</style>
```

:::

## 滚动加载

添加 `scrollToBottom` 事件监听即可

<div class='demo-block'>
<div class='scroll-bar'>
<lin-scroll-bar :loading='loading' @scrollToBottom="scrollToBottom" >
      <div class="scroll-item" v-for="(item, index) in list2" :key="index">
        {{ item }}
      </div>
    </lin-scroll-bar>
</div>
</div>

:::demo

```html
<div class="scroll-bar">
  <lin-scroll-bar :loading="loading" @scrollToBottom="scrollToBottom">
    <div class="scroll-item" v-for="(item, index) in list2" :key="index">
      {{ item }}
    </div>
  </lin-scroll-bar>
</div>

<script>
  let id = 1;
  export default {
    data() {
      return {
        list2: [],
        loading: false,
      };
    },
    mounted() {
      this.count = 1;
    },
    created() {
      this.initData2();
    },
    methods: {
      initData2() {
        const list = [];
        for (let i = 0; i < 6; i++) {
          list.push("这是内容" + id);
          id++;
        }
        this.list2 = list;
      },
      scrollToBottom() {
        if (this.count > 3 || this.loading) {
          return;
        }
        this.loading = true;
        setTimeout(() => {
          const list = [];
          for (let i = 0; i < 6; i++) {
            list.push("这是内容" + id);
            id++;
          }
          this.list2.push(...list);
          this.count++;
          this.loading = false;
        }, 2000);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .scroll-bar {
    height: 200px;
    width: 300px;
    border: 1px solid #cccccc;
  }
  .scroll-item {
    height: 100px;
    line-height: 100px;
  }
</style>
```

:::

## 属性

| 参数        | 说明                       | 类型    | 可选值 | 默认值 |
| ----------- | -------------------------- | ------- | ------ | ------ |
| hover       | 是否一直显示滚动条         | Boolean | —      | false  |
| height      | 高度                       | String  | —      | 100%   |
| width       | 宽度                       | String  | —      | 100%   |
| maxHeight   | 最大高度                   | String  | —      | —      |
| minHeight   | 最小高度                   | String  | —      | —      |
| loading     | 是否正在加载，显示加载动画 | Boolean | —      | false  |
| loadingText | 加载文案                   | String  | —      | —      |
| loadingSize | 加载器大小                 | String  | —      | —      |

## 插槽

| 插槽名称 | 说明               |
| -------- | ------------------ |
| —        | 滚动的内容         |
| loading  | 加载动画显示的内容 |

## 事件

| 事件名称       | 说明                 | 回调参数 |
| -------------- | -------------------- | -------- |
| scroll         | 容器正在滚动时触发   | e(Event) |
| scrollToBottom | 容器滚动到底部时触发 | e(Event) |
