<template>
  <p>打开控制台，看看这个页面的 title, meta, 和 link 哦，是不是发生了变化</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  metaInfo: {
    title: "metaInfo", // set a title
    meta: [
      {
        // set meta
        name: "keyWords",
        content: "metaInfo"
      }
    ],
    link: [
      {
        // set link
        rel: "asstes",
        href: "https://github.com/c10342/lin-view-ui"
      }
    ]
  }
});
</script>
