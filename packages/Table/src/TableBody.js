export default {
  name: 'LinTableBody',
  computed: {
    dataSource () {
      if (this.table) {
        return this.table.dataSource;
      }
      return [];
    },
    columns () {
      if (this.table) {
        return this.table.columns;
      }
      return [];
    },
    valueKey () {
      if (this.table) {
        return this.table.valueKey;
      }
      return '';
    }
  },
  inject: {
    table: {
      default: null
    }
  },
  mounted () {
    if (this.table) {
      this.table.$on('select-all', this.selectAll);
    }
  },
  methods: {
    trClassName (row, rowIndex) {
      const classArr = ['lin-table-tr'];
      if (this.table) {
        const rowClassName = this.table.rowClassName;
        if (typeof rowClassName === 'function') {
          const result = rowClassName({ row, rowIndex });
          if (result) {
            classArr.push(result);
          }
        } else if (typeof rowClassName === 'string') {
          classArr.push(rowClassName);
        }
      }
      return classArr;
    },
    selectAll (data) {
      const linTableTbody = this.$refs.linTableTbody;
      const checkboxs = linTableTbody.getElementsByClassName(
        'lin-table-checkbox'
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
    clearSelection () {
      const linTableTbody = this.$refs.linTableTbody;
      const checkboxs = linTableTbody.getElementsByClassName(
        'lin-table-checkbox'
      );
      for (let i = 0; i < checkboxs.length; i++) {
        const element = checkboxs[i];
        element.checked = false;
      }
    },
    toggleAllSelection () {
      const linTableTbody = this.$refs.linTableTbody;
      const checkboxs = linTableTbody.getElementsByClassName(
        'lin-table-checkbox'
      );
      for (let i = 0; i < checkboxs.length; i++) {
        const element = checkboxs[i];
        element.checked = !element.checked;
      }
    },
    selectSelection (data) {
      const linTableTbody = this.$refs.linTableTbody;
      const checkboxs = linTableTbody.getElementsByClassName(
        'lin-table-checkbox'
      );
      const len = this.dataSource.length;
      for (let i = 0; i < len; i++) {
        const element = this.dataSource[i];
        const flag = data.find(
          (item) => item[this.valueKey] === element[this.valueKey]
        );
        checkboxs[i].checked = flag;
      }
    },
    rowClick (row, rowIndex) {
      this.table?.emitrRowClick({ row, rowIndex });
    },
    cellClick (row, prop, rowIndex, idx) {
      this.table?.emitrCellClick({
        row, prop, rowIndex, cellIndex: idx
      });
    }
  },
  render (h) {
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
                    class={['lin-table-td', `lin-table-align-${column.align}`]}
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
