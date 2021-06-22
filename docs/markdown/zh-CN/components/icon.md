# Icon 图标

---

## 图标集合

:::demo

```vue
<template>
  <ul class="icon-list">
    <li v-for="(item, index) in list" :key="index">
      <i :class="item"></i>
      <span>{{ item }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [
        "lin-icon-date",
        "lin-icon-thumbsup",
        "lin-icon-chat",
        "lin-icon-down",
        "lin-icon-left",
        "lin-icon-up",
        "lin-icon-upload",
        "lin-icon-delete",
        "lin-icon-search",
        "lin-icon-close",
        "lin-icon-right",
        "lin-icon-leftarrow",
        "lin-icon-password",
        "lin-icon-rightarrow",
        "lin-icon-user",
        "lin-icon-downarrow",
        "lin-icon-play",
        "lin-icon-volume",
        "lin-icon-mute",
        "lin-icon-pause",
        "lin-icon-fullscreen",
        "lin-icon-full-screen",
        "lin-icon-loading",
        "lin-icon-back",
        "lin-icon-warning",
        "lin-icon-success",
        "lin-icon-error",
        "lin-icon-info",
      ],
    };
  },
};
</script>
```

:::
