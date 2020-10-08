<script>
export default {
  data() {
    return {
      list1: [1, 2, 3, 4, 5],
      isEnd1: false,

      list2: [1, 2, 3, 4, 5],
      isEnd2: false
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
    }
  }
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

# ScrollView 滚动加载

---

## Basic usage

要使用 ScrollView 组件，需要设置 `height` 、 `data` 和 `isEnd` 属性 , `height` 给容器一个固定的高度。`data` 容器内显示的数据，数据发生变化时会重新计算内容的高度。`isEnd` 数据是否全部加载完毕

<div class='demo-block'>
<lin-scroll-view :is-end="isEnd1" :data="list1" :height="200" @scrollToEnd="scrollToEnd1">
    <div class="item" v-for="(item,index) in list1" :key="index">{{item}}</div>
</lin-scroll-view>
</div>

:::demo

```html
<lin-scroll-view
  :is-end="isEnd1"
  :data="list1"
  :height="200"
  @scrollToEnd="scrollToEnd1"
>
  <div class="item" v-for="(item,index) in list1" :key="index">
    {{item}}
  </div>
</lin-scroll-view>

<script>
  export default {
    data() {
      return {
        list1: [1, 2, 3, 4, 5],
        isEnd1: false,
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
    },
  };
</script>
```

:::

## 自定义插槽内容

使用 `loading` 和 `no-more` 具名插槽可自定义上拉加载显示的内容和加载完毕显示的内容

<div class='demo-block'>
    <lin-scroll-view :is-end="isEnd2" :data="list2" :height="200" @scrollToEnd="scrollToEnd2">
      <div 
        class="item"
        v-for="(item,index) in list2" 
        :key="index">
        {{item}}
       </div>
      <template v-slot:loading>
        <p class="tip">正在加载中...</p>
      </template>
      <template v-slot:no-more>
        <p class="tip">加载完毕</p>
      </template>
    </lin-scroll-view>
</div>

:::demo

```html
<lin-scroll-view
  :is-end="isEnd2"
  :data="list2"
  :height="200"
  @scrollToEnd="scrollToEnd2"
>
  <div class="item" v-for="(item,index) in list2" :key="index">
    {{item}}
  </div>
  <template v-slot:loading>
    <p class="tip">正在加载中...</p>
  </template>
  <template v-slot:no-more>
    <p class="tip">加载完毕</p>
  </template>
</lin-scroll-view>

<script>
  export default {
    data() {
      return {
        list2: [1, 2, 3, 4, 5],
        isEnd2: false,
      };
    },
    methods: {
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
```

:::

## 属性

| 参数            | 说明                                                  | Type          | Accepted Values | Default |
| --------------- | ----------------------------------------------------- | ------------- | ------ | ------ |
| height          | 容器高度                                              | Number        | —      | 700    |
| isThrottle      | 是否需要节流                                          | Boolean       | —      | true   |
| time            | 滚动执行间隔时长，isThrottle 为 true 才有效           | Number        | —      | 500    |
| isEnd           | 数据是否全部加载完毕，即是否不在触发 scrollToEnd 事件 | Boolean       | —      | false  |
| showLoading     | 是否显示正在加载动画                                  | Boolean       | —      | true   |
| emitScrollEvent | 是否需要派发 scroll 滚动事件                          | Boolean       | —      | true   |
| data            | 显示的视图数据，用于刷新内容的高度                    | Object, Array | —      | —      |
| loadingTip      | 正在加载的提示语                                      | String        | —      | —      |
| noMoreTip       | 数据加载完毕时候的提示语                              | String        | —      | —      |

## 插槽

| Name | 说明                              |
| -------- | --------------------------------- |
| —        | ScrollView 中需要进行滚动的内容   |
| loading  | ScrollView 上拉加载需要显示的内容 |
| no-more  | ScrollView 数据加载完毕显示的内容 |

## 事件

| Event Name    | 说明                 | Parameters |
| ----------- | -------------------- | -------- |
| scrollToEnd | 容器滚动到底部时触发 | e(Event) |
| scroll      | 容器正在滚动时触发   | e(Event) |
