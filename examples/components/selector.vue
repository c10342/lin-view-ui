<template>
  <lin-selector-group
    :renderMore="renderMore"
    :renderLabel="renderLabel"
    label="学科"
    value-key="id"
    v-model="value"
    @onChange="onChange"
  >
    <lin-selector-item value="标签一" label="标签一">标签一</lin-selector-item>
    <lin-selector-item value="标签二" label="标签二">标签二</lin-selector-item>
    <lin-selector-item value="标签三" label="标签三">标签三</lin-selector-item>
    <lin-selector-item value="标签四" label="标签四">标签四</lin-selector-item>
    <lin-selector-item value="标签五" label="标签五">标签五</lin-selector-item>
    <lin-selector-item value="标签六" label="标签六">标签六</lin-selector-item>
    <!-- <lin-selector-item v-for="item in list" :key="item.id" :value="item" :label="item.name"></lin-selector-item> -->
  </lin-selector-group>
</template>

<script>
export default {
  name: "test-selector",
  data() {
    return {
      value: {
        name: "标签一",
        id: 2,
      },
      list: [
        {
          name: "标签一",
          id: 1,
        },
        {
          name: "标签一",
          id: 2,
        },
        {
          name: "标签一",
          id: 3,
        },
        {
          name: "标签一",
          id: 4,
        },
      ],
    };
  },
  methods: {
    onChange(val) {
      console.log(val);
    },
    renderMore(h, status) {
      if (status === 1) {
        return <span>展开</span>;
      } else {
        return <span>收起</span>;
      }
    },
    renderLabel() {
      return <span>标签</span>;
    },
  },
};
</script>