<template>
  <div>
    <lin-choice-group v-model="value" placeholder="请选择">
      <lin-choice-item
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </lin-choice-item>
    </lin-choice-group>
  </div>
</template>


<script>
export default {
  name: "test-choice",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
};
</script>