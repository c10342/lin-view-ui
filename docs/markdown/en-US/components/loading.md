<script>
export default {
  data() {
    return {
      loading1: true,
      loading2: true,
      loading3: false,
    };
  },
  methods: {
    onClick1() {
      this.loading3 = true;
        setTimeout(() => {
          this.loading3 = false;
        }, 2000);
    },
    onClick2() {
      const loading = this.$loading.open({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
          textColor:'#fff'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.loading-box{
    height:200px;
}
.ml-20{
  margin-left:20px
}
</style>

# Loading 加载

---

## 区域加载

在表格等容器中加载数据时显示。Loading 组件提供了两种调用 Loading 的方法：指令和服务。对于自定义指令 v-loading，只需要绑定 Boolean 即可。默认状况下，Loading 遮罩会插入到绑定元素的子节点，通过添加 body 修饰符，可以使遮罩插入至 DOM 中的 body 上。

<div class='demo-block'>
<div class='loading-box' v-loading="loading1"></div>
</div>

:::demo

```html
<div class="loading-box" v-loading="loading1"></div>

<script>
  export default {
    data() {
      return {
        loading1: true,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .loading-box {
    height: 200px;
  }
</style>
```

:::

## 自定义

在绑定了 v-loading 指令的元素上添加 lin-loading-text 属性，其值会被渲染为加载文案，并显示在加载图标的下方。类似地，lin-loading-textColor 和 lin-loading-background 属性分别用来设定加载文案颜色和背景色值。

<div class='demo-block'>
<div 
class="loading-box" 
lin-loading-text="拼命加载中"
lin-loading-background="rgba(0, 0, 0, 0.8)"
lin-loading-textColor="#fff"
v-loading="loading2"></div>
</div>

:::demo

```html
<div
  class="loading-box"
  lin-loading-text="拼命加载中"
  lin-loading-background="rgba(0, 0, 0, 0.8)"
  lin-loading-textColor="#fff"
  v-loading="loading2"
></div>

<script>
  export default {
    data() {
      return {
        loading2: true,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .loading-box {
    height: 200px;
  }
</style>
```

:::

## 整页加载

页面数据加载时显示。当使用指令方式时，全屏遮罩需要添加 `fullscreen` 修饰符（遮罩会插入至 body 上），此时若需要锁定屏幕的滚动，可以使用 `lock` 修饰符；当使用服务方式时，遮罩默认即为全屏，无需额外设置。

<div class='demo-block'>
<lin-button
    type="primary"
    @click="onClick1"
    v-loading.fullscreen.lock="loading3">
    指令方式
  </lin-button>
  <lin-button
  class='ml-20'
    type="primary"
    @click="onClick2">
    服务方式
  </lin-button>
</div>

:::demo

```html
<template>
  <lin-button
    type="primary"
    @click="onClick1"
    v-loading.fullscreen.lock="loading3"
  >
    指令方式
  </lin-button>
  <lin-button class="ml-20" type="primary" @click="onClick2">
    服务方式
  </lin-button>
</template>

<script>
  export default {
    data() {
      return {
        loading3: false,
      };
    },
    methods: {
      onClick1() {
        this.loading3 = true;
        setTimeout(() => {
          this.loading3 = false;
        }, 2000);
      },
      onClick2() {
        const loading = this.$loading.open({
          lock: true,
          text: "Loading",
          background: "rgba(0, 0, 0, 0.7)",
          textColor: "#fff",
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      },
    },
  };
</script>
```

:::

## 服务

Loading 还可以以服务的方式调用。引入 Loading 服务：

```javascript
import { Loading } from "lin-view-ui";
```

在需要调用时：

```javascript
Loading.service.open(options);
```

其中 `options` 参数为 Loading 的配置项，具体见下表。`LoadingService` 会返回一个 Loading 实例，可通过调用该实例的 `close` 方法来关闭它：

```javascript
let loadingInstance = Loading.service.open(options);
this.$nextTick(() => {
  // 以服务的方式调用的 Loading 需要异步关闭
  loadingInstance.close();
});
```

需要注意的是，以服务的方式调用的全屏 Loading 是单例的：若在前一个全屏 Loading 关闭前再次调用全屏 Loading，并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例：

```javascript
let loadingInstance1 = Loading.service.open({ fullscreen: true });
let loadingInstance2 = Loading.service.open({ fullscreen: true });
console.log(loadingInstance1 === loadingInstance2); // true
```

此时调用它们中任意一个的 close 方法都能关闭这个全屏 Loading。

如果完整引入了 lin-view-ui，那么 Vue.prototype 上会有一个全局方法 $loading，它的调用方式为：this.$loading.open(options)，同样会返回一个 Loading 实例。

## 属性

| 参数       | 说明                                             | Type    | Accepted Values | Default        |
| ---------- | ------------------------------------------------ | ------- | ------ | ------------- |
| target     | Loading 需要覆盖的 DOM 节点。需传入一个 DOM 对象 | object  | —      | document.body |
| body       | 同 `v-loading` 指令中的 `body` 修饰符            | Boolean | —      | false         |
| fullscreen | 同 `v-loading` 指令中的 `fullscreen` 修饰符      | Boolean | —      | true          |
| lock       | 同 `v-loading` 指令中的 `lock` 修饰符            | Boolean | —      | false         |
| text       | 显示在加载图标下方的加载文案                     | String  | —      | —             |
| textColor  | 加载文案颜色                                     | String  | —      | —             |
| background | 遮罩背景色                                       | String  | —      | —             |
| iconColor  | loading 颜色                                     | String  | —      | —             |
