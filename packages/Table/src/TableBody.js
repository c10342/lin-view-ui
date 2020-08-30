export default {
  name: "LinTableBody",
  computed: {
    dataSource() {
      if (this.table) {
        return this.table.dataSource;
      }
      return [];
    },
    columns() {
      if (this.table) {
        return this.table.columns;
      }
      return [];
    },
    valueKey() {
      if (this.table) {
        return this.table.valueKey;
      }
      return "";
    },
  },
  inject: {
    table: {
      default: null,
    },
  },
  mounted() {
    if (this.table) {
      this.table.$on("select-all", this.selectAll);
    }
  },
  methods: {
    trClassName(row, rowIndex) {
      const classArr = ["lin-table-tr"];
      if (this.table && typeof this.table.rowClassName === "function") {
        const result = this.table.rowClassName({ row, rowIndex });
        if (result) {
          classArr.push(result);
        }
      }
      return classArr;
    },
    selectAll(data) {
      const linTableTbody = this.$refs.linTableTbody;
      const checkboxs = linTableTbody.getElementsByClassName(
        "lin-table-checkbox"
      );
      for (let i = 0; i < checkboxs.length; i++) {
        const element = checkboxs[i];
        if (data.length === 0) {
          element.checked = false;
        } else {
          element.checked = true;
        }
      }
    },
    rowClick(row, rowIndex) {
      this.table?.emitrRowClick({ row, rowIndex });
    },
  },
  render(h) {
    const { dataSource, columns, trClassName, valueKey, rowClick } = this;
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
              {columns.map((column, idx) => {
                return (
                  <td
                    class={["lin-table-td", `lin-table-align-${column.align}`]}
                    key={`${rowKey}-${idx}`}
                  >
                    {column.renderCell(h, {
                      row,
                      column,
                      rowIndex,
                    })}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  },
};
