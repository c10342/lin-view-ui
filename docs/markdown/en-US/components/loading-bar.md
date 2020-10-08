<script>
  export default {
    methods: {
      start () {
        this.$loadingBar.start()
      },
      end () {
        this.$loadingBar.end()
      },
      error () {
        this.$loadingBar.error()
      },
      setSpeed () {
        this.$loadingBar.config({
          speed: 10
        })
        this.$loadingBar.start()
      },
      setSpinner () {
        this.$loadingBar.config({
          easing: 'ease'
        })
        this.$loadingBar.start()
      },
      setPercentNum () {
        this.$loadingBar.config({
          percentNum: 0.1
        })
        this.$loadingBar.start()
      },
      setShowSpinner () {
        this.$loadingBar.config({
          showSpinner: false
        })
        this.$loadingBar.start()
      }
    }
  }
</script>

<style lang="scss" scoped>
.lin-button + .lin-button{
  margin-left:10px;
}
</style>

# LoadingBar 加载进度条

---

全局创建了一个用于显示页面加载、异步请求的加载进度条。
因为可复用性的关系，`LoadingBar` 只会全局创建一个实例，而且在 `Vue.prototype` 中添加了全局对象 `$loadingBar`，可以直接通过 `this.$loadingBar` 操作实例

## Basic usage

通过调用 \$loadingBar 提供的三种方法来控制全局的加载进度条 `start()`、`end()`、`error()`

<div class="demo-block">
   <lin-button @click="start">开始</lin-button>
   <lin-button @click="end">结束</lin-button>
   <lin-button @click="error">错误</lin-button>
</div>

::: demo

```html
<lin-button @click="start">开始</lin-button>
<lin-button @click="end">结束</lin-button>
<lin-button @click="error">错误</lin-button>

<script>
  export default {
    methods: {
      start() {
        this.$loadingBar.start();
      },
      end() {
        this.$loadingBar.end();
      },
      error() {
        this.$loadingBar.error();
      },
    },
  };
</script>
```

:::

## 常规配置

提供 LoadingBar 的全局配置，使用方法如下：

<div class="demo-block">
   <lin-button @click="setSpeed">设置speed速度</lin-button>
   <lin-button @click="setSpinner">设置spinner动画效果</lin-button>
   <lin-button @click="setPercentNum">设置percentNum每次加载的比例</lin-button>
   <lin-button @click="setShowSpinner">设置是否显示spinner</lin-button>
</div>

::: demo

```html
<lin-button @click="setSpeed">设置speed速度</lin-button>
<lin-button @click="setSpinner">设置spinner动画效果</lin-button>
<lin-button @click="setPercentNum">设置percentNum每次加载的比例</lin-button>
<lin-button @click="setShowSpinner">设置是否显示spinner</lin-button>

<script>
  export default {
    methods: {
      setSpeed() {
        this.$loadingBar.config({
          speed: 10,
        });
        this.$loadingBar.start();
      },
      setSpinner() {
        this.$loadingBar.config({
          easing: "ease",
        });
        this.$loadingBar.start();
      },
      setPercentNum() {
        this.$loadingBar.config({
          percentNum: 0.1,
        });
        this.$loadingBar.start();
      },
      setShowSpinner() {
        this.$loadingBar.config({
          showSpinner: false,
        });
        this.$loadingBar.start();
      },
    },
  };
</script>
```

:::

## 参数

| 参数        | 说明             | Type    | Accepted Values                        | Default        |
| ----------- | ---------------- | ------- | ----------------------------- | ------------- |
| speed       | 加载速度         | Number  | 0-100                         | 5             |
| easing      | spinner 加载动画 | String  | linear, ease, cubic-bezier... | linear        |
| percentNum  | 每次前进的百分比 | Number  | 0-1                           | Math.random() |
| showSpinner | 是否显示 spinner | Boolean | —                             | true          |
