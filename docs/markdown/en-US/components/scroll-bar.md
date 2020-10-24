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
        list.push("this is content" + id);
        id++;
      }
      this.list1 = list;
    },
    initData2() {
      const list = [];
      for (let i = 0; i < 6; i++) {
        list.push("this is content" + id);
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
          list.push("this is content" + id);
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

# ScrollBar

---

The `scrollbar` component is an optimized version of the `Scrollview` component. Its purpose is to optimize the style of the scrollbar and make the scrollbar consistent in each browser.

## Basic usage

The `scrollbar` component requires a fixed height. You can set the height of the outermost container. The internal height of the `scrollbar` component is `100%`. Of course, you can also set a `height` attribute for the `scrollbar` component, so that the `scrollbar` component will not depend on the height of the outer container. If you need to use `min-height` or `max-height` to set the height, you can only set the height through the `maxheight` or `minheight` properties in the `scrollbar` component

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
          list.push("this is content" + id);
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

## Rolling load

Add `scrolltobottom` event monitoring

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
          list.push("this is content" + id);
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
            list.push("this is content" + id);
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

## Attributes

| Attribute        | Description                       | Type    | Accepted Values | Default |
| ----------- | -------------------------- | ------- | ------ | ------ |
| hover       | Is the scroll bar always displayed         | Boolean | —      | false  |
| height      | height                       | String  | —      | 100%   |
| width       | width                       | String  | —      | 100%   |
| maxHeight   | Maximum height                   | String  | —      | —      |
| minHeight   | Minimum height                   | String  | —      | —      |
| loading     | Loading, is animation loading | Boolean | —      | false  |
| loadingText | Load copy                   | String  | —      | —      |
| loadingSize | Loader size                 | String  | —      | —      |

## Slots

| Name | Description               |
| -------- | ------------------ |
| —        | Scrolling content         |
| loading  | Load the content of the animation display |

## Events

| Event Name       | Description                 | Parameters |
| -------------- | -------------------- | -------- |
| scroll         | Triggered when the container is rolling      | e(Event) |
| scrollToBottom | Triggered when the container rolls to the bottom  | e(Event) |
