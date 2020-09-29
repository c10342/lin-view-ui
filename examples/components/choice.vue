<template>
  <div>
    <lin-choice-group
      :loading="loading"
      scroll
      @scrollToBottom="scrollToBottom"
      v-model="value"
      placeholder="请选择"
    >
      <lin-choice-item
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </lin-choice-item>
    </lin-choice-group>

    <lin-choice-group v-model="value1" placeholder="请选择">
      <lin-choice-option
        v-for="group in options1"
        :key="group.label"
        :label="group.label"
      >
        <lin-choice-item
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </lin-choice-item>
      </lin-choice-option>
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
        {
          value: "选项11",
          label: "黄金糕",
        },
        {
          value: "选项21",
          label: "双皮奶",
        },
        {
          value: "选项13",
          label: "蚵仔煎",
        },
        {
          value: "选项14",
          label: "龙须面",
        },
        {
          value: "选项51",
          label: "北京烤鸭",
        },
      ],
      value: "",
      loading: false,

      options1: [
        {
          label: "热门城市",
          options: [
            {
              value: "Shanghai",
              label: "上海",
            },
            {
              value: "Beijing",
              label: "北京",
            },
          ],
        },
        {
          label: "城市名",
          options: [
            {
              value: "Chengdu",
              label: "成都",
            },
            {
              value: "Shenzhen",
              label: "深圳",
            },
            {
              value: "Guangzhou",
              label: "广州",
            },
            {
              value: "Dalian",
              label: "大连",
            },
          ],
        },
      ],
      value1: "",
    };
  },
  mounted() {
    this.count = 0;
  },
  methods: {
    scrollToBottom() {
      if (this.count === 1) {
        return;
      }
      this.loading = true;
      return;
      setTimeout(() => {
        const options = [
          {
            value: "选项133",
            label: "黄金糕",
          },
          {
            value: "选项233",
            label: "双皮奶",
          },
          {
            value: "选项333",
            label: "蚵仔煎",
          },
          {
            value: "选项433",
            label: "龙须面",
          },
          {
            value: "选项533",
            label: "北京烤鸭",
          },
        ];
        this.options.push(...options);
        this.loading = false;
        this.count++;
      }, 3000);
    },
  },
};
</script>