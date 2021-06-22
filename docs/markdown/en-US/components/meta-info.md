# MetaInfo

[[toc]]

---

`meta-info` is based on [vue 2.0](https://vuejs.org) It will let you better manage the meta information in your app. You can directly

Set metalinfo in the component and you can mount it to your page automatically. If you need to automatically update your title, meta and other information as your data changes, use this

The plug-in is perfect.

Of course, sometimes we may encounter a headache SEO problem, so use this plug-in to cooperate with prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) It's just the right thing to do.

> More introduction：[Another way to deal with SEO](https://zhuanlan.zhihu.com/p/29148760?group_id=890298677627879424)

## General usage

::: demo

```vue
<template>
  <p>
    Open the console and see if the title, meta, and link of this page have
    changed
  </p>
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

## Asynchronous loading

::: demo

```vue
<template>
  <p>
    If your title or meta or link is loaded asynchronously, you may need to use
    this
  </p>
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
      this.pageName = "MetaInfo";
    }, 2000);
  },
};
</script>
```

:::
