<template>
  <div>
    <div class="lin-table-slot">
      <slot></slot>
    </div>
    <table
      class="lin-table"
      :class="[{ 'lin-table-border': border }, { 'lin-table-stripe': stripe }]"
    >
      <colgroup>
        <col v-for="column in columns" :key="column.id" :width="column.width" />
      </colgroup>
      <lin-table-header ref="linTableHeaderComp"></lin-table-header>
      <lin-table-body ref="linTableBodyComp"></lin-table-body>
    </table>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import LinTableHeader from './TableHeader.js';
import LinTableBody from './TableBody.js';

export default {
  name: 'LinTable',
  components: {
    LinTableHeader,
    LinTableBody
  },
  props: {
    // 数据源
    dataSource: {
      type: Array,
      default: () => [],
      require: true
    },
    // 边框表格
    border: {
      type: Boolean,
      default: false
    },
    // 斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 每一行的类名
    rowClassName: {
      type: [Function, String]
    },
    // 每一行数据的唯一标识key
    valueKey: {
      type: String,
      require: true
    }
  },
  provide() {
    return {
      table: this
    };
  },
  data() {
    return {
      // 存储每一列的孩子信息
      columns: [],
      // 通过checkbox选中的数据
      selectData: []
    };
  },
  methods: {
    // 当选择项发生变化时会触发该事件
    emitSelectChange() {
      const data = cloneDeep(this.selectData);
      this.$emit('selection-change', data);
    },
    // 当用户手动勾选全选 Checkbox 时触发的事件
    emitSelectAll() {
      const data = cloneDeep(this.selectData);
      this.$emit('select-all', data);
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    emitSelect(data) {
      this.$emit('select', cloneDeep(data));
    },
    // 当某一行被点击时会触发该事件
    emitrRowClick(data) {
      this.$emit('row-click', cloneDeep(data));
    },
    // 当某个单元格被点击时会触发该事件
    emitrCellClick(data) {
      this.$emit('cell-click', cloneDeep(data));
    },
    // 用于多选表格，清空用户的选择
    clearSelection() {
      this.selectData = [];
      this.$refs.linTableBodyComp.clearSelection();
      this.emitSelectChange();
    },
    // 用于多选表格，切换所有行的选中状态
    toggleAllSelection() {
      this.$refs.linTableBodyComp.toggleAllSelection();
      this.selectData = this.dataSource.filter((item) => {
        const flag = !!this.selectData.find(
          (data) => data[this.valueKey] === item[this.valueKey]
        );
        return !flag;
      });
      // 改变checkbox选中状态
      this.$refs.linTableHeaderComp.changeCheckboxStatus(this.selectData);
      this.emitSelectChange();
    },
    // 用于多选表格，用来选择中多行
    selectSelection(data) {
      this.selectData = data || [];
      // 修改选中的行
      this.$refs.linTableBodyComp.selectSelection(this.selectData);
      // 改变checkbox选中状态
      this.$refs.linTableHeaderComp.changeCheckboxStatus(this.selectData);
    }
  }
};
</script>
