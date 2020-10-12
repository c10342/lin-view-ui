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

# Loading

---

## Area loading

Displays when data is loaded in containers such as tables. The loading component provides two ways to call loading: instruction and service. For the custom instruction v-loading, you only need to bind Boolean. By default, the loading mask is inserted into the child node of the binding element. By adding the body modifier, the mask can be inserted into the body in the dom.

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

## Custom

Add the Lin loading text attribute to the element bound to the v-loading instruction, and its value will be rendered as a load copy and displayed below the load icon. Similarly, the Lin loading textcolor and Lin loading background attributes are used to set the loading copy color and background color values, respectively.

<div class='demo-block'>
<div 
class="loading-box" 
lin-loading-text="Trying to load"
lin-loading-background="rgba(0, 0, 0, 0.8)"
lin-loading-textColor="#fff"
v-loading="loading2"></div>
</div>

:::demo

```html
<div
  class="loading-box"
  lin-loading-text="Trying to load"
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

## Full page load

Display when page data is loaded. When using command mode, the `fullscreen` modifier needs to be added to the full screen mask (the mask will be inserted into the body). In this case, if you need to lock the scrolling of the screen, you can use the `lock` modifier; when using the service mode, the mask is full screen by default, and no additional settings are required.

<div class='demo-block'>
<lin-button
    type="primary"
    @click="onClick1"
    v-loading.fullscreen.lock="loading3">
    Instruction mode
  </lin-button>
  <lin-button
  class='ml-20'
    type="primary"
    @click="onClick2">
    Service mode
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
    Instruction mode
  </lin-button>
  <lin-button class="ml-20" type="primary" @click="onClick2">
    Service mode
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

## Service

Loading can also be called as a service. Introducing loading service:

```javascript
import { Loading } from "lin-view-ui";
```

When you need to call:

```javascript
Loading.service.open(options);
```

The `options` parameter is the configuration item of loading. See the table below for details. `LoadingService` will return a loading instance, which can be closed by calling the `close` method of the instance

```javascript
let loadingInstance = Loading.service.open(options);
this.$nextTick(() => {
  // Loading called as a service needs to be closed asynchronously
  loadingInstance.close();
});
```

It should be noted that the full screen loading called as a service is a single instance: if you call full screen loading again before the previous full screen loading is closed, a new loading instance will not be created, but the existing full screen loading instance will be returned

```javascript
let loadingInstance1 = Loading.service.open({ fullscreen: true });
let loadingInstance2 = Loading.service.open({ fullscreen: true });
console.log(loadingInstance1 === loadingInstance2); // true
```

At this point, calling the close method of any of them can close the full screen loading.

If Lin view UI is fully introduced, then Vue.prototype There will be a global method $loading on, which is called in this$ loading.open (options), a loading instance will also be returned.

## Attributes

| Attribute  | Description                                                             | Type    | Accepted Values | Default       |
| ---------- | ----------------------------------------------------------------------- | ------- | --------------- | ------------- |
| target     | The DOM node to be covered by loading. You need to pass in a DOM object | object  | —               | document.body |
| body       | The same as the `body` modifier in the `v-loading` instruction          | Boolean | —               | false         |
| fullscreen | The same as the `fullscreen` modifier in the `v-loading` instruction    | Boolean | —               | true          |
| lock       | The same as the `lock` modifier in the `v-loading` instruction          | Boolean | —               | false         |
| text       | Load copy displayed below the load Icon                                 | String  | —               | —             |
| textColor  | Load copy color                                                         | String  | —               | —             |
| background | Mask background color                                                   | String  | —               | —             |
| iconColor  | Loading color                                                           | String  | —               | —             |
