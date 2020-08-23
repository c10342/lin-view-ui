<template>
  <div>
    <lin-table align='center' interlace :tableData="tableData" :tableProps='tableProps' border>
        <lin-table-column prop="date" label="日期" align='left' width='100px'>
          <template>
            <div>1231313</div>
          </template>
        </lin-table-column>
        <lin-table-column prop="name" label="姓名"></lin-table-column>
        <lin-table-column prop="address" label="地址"></lin-table-column>
    </lin-table>
  </div>
</template>

<script>
export default {
  name: "test-table",
  data() {
    return {
      tableProps:[
        {label:'日期',prop:'date',align:'left',width:'100px'},
        {label:'姓名',prop:'name'},
        {label:'地址',prop:'address'},
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        // {
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1517 弄"
        // },
        // {
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1519 弄"
        // },
        // {
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1516 弄"
        // }
      ]
    };
  }
};
</script>