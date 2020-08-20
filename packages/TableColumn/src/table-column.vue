<template>
  <td>rowData</td>
</template>

<script>
export default {
  name: "LinTableColumn",
  props: {
    prop: {
      type: String,
    },
    label: {
      type: String,
      require: true,
    },
    type: {
      type: String,
    },
    rowData: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    console.log(this.rowData);
  },
};
</script>