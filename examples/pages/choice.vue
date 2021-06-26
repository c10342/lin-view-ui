<template>
  <div>
    <lin-choice-group v-model="value1" placeholder="请选择">
      <lin-choice-item
        v-for="item in options1"
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
  data() {
    return {
      options1: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value1: ""
    };
  }
};
</script>
