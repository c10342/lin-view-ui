<template>
  <div>
    <div class="lin-table-slot">
      <slot></slot>
    </div>
    <table class="lin-table" :class="[{'lin-table-border':border},{'lin-table-stripe':stripe}]">
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
    LinTableBody,
  },
  props: {
    // 数据源
    dataSource: {
      type: Array,
      default: () => [],
      require: true,
    },
    // 边框表格
    border: {
      type: Boolean,
      default: false,
    },
    // 斑马纹
    stripe: {
      type: Boolean,
      default: false,
    },
    // 每一行的类名
    rowClassName: {
      type: Function,
    },
    // 每一行数据的唯一标识key
    valueKey: {
      type: String,
      require: true,
    },
  },
  provide() {
    return {
      table: this,
    };
  },
  data() {
    return {
      columns: [],
      selectData: [],
    };
  },
  methods: {
    emitSelectChange() {
      const data = cloneDeep(this.selectData);
      this.$emit('selection-change', data);
    },
    emitSelectAll() {
      const data = cloneDeep(this.selectData);
      this.$emit('select-all', data);
    },
    emitSelect(data) {
      this.$emit('select', cloneDeep(data));
    },
    emitrRowClick(data) {
      this.$emit('row-click', cloneDeep(data));
    },
    emitrCellClick(data) {
      this.$emit('cell-click', cloneDeep(data));
    },
    clearSelection() {
      this.selectData = [];
      this.$refs.linTableBodyComp.clearSelection();
      this.emitSelectChange();
    },
    toggleAllSelection() {
      this.$refs.linTableBodyComp.toggleAllSelection();
      this.selectData = this.dataSource.filter((item) => {
        const flag = !!this.selectData.find(
          (data) => data[this.valueKey] === item[this.valueKey],
        );
        return !flag;
      });
      this.$refs.linTableHeaderComp.changeCheckboxStatus(this.selectData);
      this.emitSelectChange();
    },
    selectSelection(data) {
      this.selectData = data || [];
      this.$refs.linTableBodyComp.selectSelection(this.selectData);
      this.$refs.linTableHeaderComp.changeCheckboxStatus(this.selectData);
    },
  },
};
</script>
