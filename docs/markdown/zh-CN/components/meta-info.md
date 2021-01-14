# MetaInfo 三要素

[[toc]]

---

`meta-info` 是一个基于[vue 2.0](https://vuejs.org)的插件，它会让你更好的管理你的 app 里面的 meta 信息。你可以直接
在组件内设置 metaInfo 便可以自动挂载到你的页面中。如果你需要随着数据的变化，自动更新你的 title、meta 等信息，那么用此
插件也是再合适不过了。
当然，有时候我们也可能会遇到让人头疼的 SEO 问题，那么使用此插件配合 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) 也是再合适不过了。

> 更多使用介绍：[处理 seo 的另一种思路](https://zhuanlan.zhihu.com/p/29148760?group_id=890298677627879424)

## 常规用法

::: demo

```vue
<template>
  <p>打开控制台，看看这个页面的 title, meta, 和 link 哦，是不是发生了变化</p>
</template>

<script>
export default {
  metaInfo: {
    title: "metaInfo", // set a title
    meta: [
      {
        // set meta
        name: "keyWords",
        content: "metaInfo",
      },
    ],
    link: [
      {
        // set link
        rel: "asstes",
        href: "https://github.com/c10342/lin-view-ui",
      },
    ],
  },
};
</script>
```

:::

## async 异步加载

<div class="demo-block">
  <p>如果你的title或者meta或者link是异步加载的，那么你可能需要这样使用</p>
</div>

::: demo

```vue
<template>
  <p>如果你的title或者meta或者link是异步加载的，那么你可能需要这样使用</p>
</template>

<script>
export default {
  name: "async",
  metaInfo() {
    return {
      title: this.pageName,
    };
  },
  data() {
    return {
      pageName: "loading",
    };
  },
  mounted() {
    setTimeout(() => {
      this.pageName = "MetaInfo 三要素";
    }, 2000);
  },
};
</script>
```

:::
