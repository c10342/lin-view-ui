<template>
  <div>
    <lin-table
      ref="table"
      value-key="id"
      :row-class-name="tableRowClassName"
      align="center"
      :dataSource="tableData"
      border
      @selection-change="selectionChange"
      @select-all="selectAll"
      @select="select"
      @row-click="rowClick"
      @cell-click="cellClick"
    >
      <lin-table-column type="selection" align="center"></lin-table-column>
      <lin-table-column type="index" label="序号"></lin-table-column>
      <lin-table-column prop="date" label="日期" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.date}}</div>
        </template>
      </lin-table-column>
      <lin-table-column prop="name" label="姓名"></lin-table-column>
      <lin-table-column prop="address" label="地址"></lin-table-column>
    </lin-table>
    <button @click="clearSelection">clearSelection</button>
    <button @click="toggleAllSelection">toggleAllSelection</button>
    <button @click="selectSelection">selectSelection</button>
  </div>
</template>

<script>
export default {
  name: "test-table",
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    selectionChange(data) {
      console.log("selectionChange", data);
    },
    selectAll(data) {
      console.log("selectAll", data);
    },
    select(data) {
      console.log("select", data);
    },
    rowClick(data) {
      console.log("rowClick", data);
    },
    cellClick(data) {
      console.log("cellClick", data);
    },
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection();
    },
    selectSelection() {
      this.$refs.table.selectSelection([
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
      ]);
    },
  },
};
</script>

<style lang="scss">
.lin-table .warning-row {
  background-color: oldlace;
}

.lin-table .success-row {
  background-color: #f0f9eb;
}
</style>