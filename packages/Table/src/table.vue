<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(item,index) in $slots.default"
          :key="index"
        >{{item.componentOptions.propsData.label}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in data" :key="index">
        <!-- <slot :rowData="item"></slot> -->
        <td
          v-for="(sl,idx) in $slots.default"
          :key="idx"
        >{{item[sl.componentOptions.propsData.prop]}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "LinTable",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    // console.log(this.$slots.default);
  },
};
</script>