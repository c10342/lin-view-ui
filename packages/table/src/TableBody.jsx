import { isFunction, isString } from "@lin-view-ui/utils";

export default {
  name: "LinTableBody",
  computed: {
    // 数据源
    dataSource() {
      if (this.table) {
        return this.table.dataSource;
      }
      return [];
    },
    // 列数组
    columns() {
      if (this.table) {
        return this.table.columns;
      }
      return [];
    },
    // 每一行数据的唯一标识 key
    valueKey() {
      if (this.table) {
        return this.table.valueKey;
      }
      return "";
    }
  },
  inject: {
    table: {
      default: null
    }
  },
  mounted() {
    if (this.table) {
      this.table.$on("select-all", this.selectAll);
    }
  },
  methods: {
    // 每一行的类名
    trClassName(row, rowIndex) {
      const classArr = ["lin-table-tr"];
      if (this.table) {
        // 传入了类名
        const rowClassName = this.table.rowClassName;
        if (isFunction(rowClassName)) {
          const result = rowClassName({ row, rowIndex });
          if (result) {
            classArr.push(result);
          }
        } else if (isString(rowClassName)) {
          classArr.push(rowClassName);
        }
      }
      return classArr;
    },
    // 选择所有数据
    selectAll(data) {
      const linTableTbody = this.$refs.linTableTbody;
      // 获取所欲checkbox
      const checkboxs = linTableTbody.getElementsByClassName(
        "lin-table-checkbox"
      );
      for (let i = 0; i < checkboxs.length; i++) {
        const element = checkboxs[i];
        // 切换checkbox选中状态
        if (data.length === 0) {
          element.checked = false;
        } else {
          element.checked = true;
        }
      }
    },
    // 清空选中状态
    clearSelection() {
      const linTableTbody = this.$refs.linTableTbody;
      const checkboxs = linTableTbody.getElementsByClassName(
        "lin-table-checkbox"
      );
      for (let i = 0; i < checkboxs.length; i++) {
        const element = checkboxs[i];
        element.checked = false;
      }
    },
    // 切换选中状态
    toggleAllSelection() {
      const linTableTbody = this.$refs.linTableTbody;
      const checkboxs = linTableTbody.getElementsByClassName(
        "lin-table-checkbox"
      );
      for (let i = 0; i < checkboxs.length; i++) {
        const element = checkboxs[i];
        element.checked = !element.checked;
      }
    },
    // 选中具体某一行或者多行
    selectSelection(data) {
      const linTableTbody = this.$refs.linTableTbody;
      const checkboxs = linTableTbody.getElementsByClassName(
        "lin-table-checkbox"
      );
      const len = this.dataSource.length;
      for (let i = 0; i < len; i++) {
        const element = this.dataSource[i];
        // 查找是否已经被选中了
        const flag = data.find(
          item => item[this.valueKey] === element[this.valueKey]
        );
        checkboxs[i].checked = flag;
      }
    },
    // 点击每一行
    rowClick(row, rowIndex) {
      this.table?.emitrRowClick({ row, rowIndex });
    },
    // 点击单元格
    cellClick(row, prop, rowIndex, idx) {
      this.table?.emitrCellClick({
        row,
        prop,
        rowIndex,
        cellIndex: idx
      });
    }
  },
  render(h) {
    const {
      dataSource,
      columns,
      trClassName,
      valueKey,
      rowClick,
      cellClick
    } = this;
    return (
      <tbody class="lin-table-tbody" ref="linTableTbody">
        {dataSource.map((row, rowIndex) => {
          const rowKey = row[valueKey] || rowIndex;
          return (
            <tr
              key={rowKey}
              class={trClassName(row, rowIndex)}
              onClick={() => rowClick(row, rowIndex)}
            >
              {columns.map((column, idx) => (
                <td
                  onClick={() => {
                    cellClick(row, column.prop, rowIndex, idx);
                  }}
                  class={["lin-table-td", `lin-table-align-${column.align}`]}
                  key={`${rowKey}-${idx}`}
                >
                  {column.renderCell(h, {
                    row,
                    column,
                    rowIndex
                  })}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }
};
