<template>
  <div>
    <div class="lin-table-slot">
      <slot></slot>
    </div>
    <table class="lin-table" :class="[{'lin-table-border':border},{'lin-table-stripe':stripe}]">
      <colgroup>
        <col v-for="column in columns" :key="column.id" :width="column.width" />
      </colgroup>
      <lin-table-header></lin-table-header>
      <lin-table-body></lin-table-body>
    </table>
  </div>
</template>

<script>
import LinTableHeader from "./TableHeader.js";
import LinTableBody from "./TableBody.js";
import { cloneDeep } from "lodash";
export default {
  name: "LinTable",
  components: {
    LinTableHeader,
    LinTableBody,
  },
  props: {
    dataSource: {
      type: Array,
      default: () => [],
      require: true,
    },
    border: {
      type: Boolean,
      default: false,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    rowClassName: {
      type: Function,
    },
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
      this.$emit("selection-change", data);
    },
    emitSelectAll() {
      const data = cloneDeep(this.selectData);
      this.$emit("select-all", data);
    },
    emitSelect(data) {
      this.$emit("select", cloneDeep(data));
    },
    emitrRowClick(data) {
      this.$emit("row-click", data);
    },
  },
};
</script>