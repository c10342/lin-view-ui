import { cloneDeep } from "lodash";

export default {
  name: "LinTableHeader",

  inject: {
    table: {
      default: null,
    },
  },
  computed: {
    selectData: {
      set(val) {
        if (this.table) {
          this.table.selectData = val;
        }
      },
      get() {
        if (this.table) {
          return this.table.selectData;
        }
        return [];
      },
    },
    dataSource() {
      if (this.table) {
        return this.table.dataSource;
      }
      return [];
    },
  },
  watch: {
    selectData(val) {
      const linTableHeaderCheckbox = this.$refs.linTableHeaderCheckbox;
      if (val.length > 0) {
        if (val.length < this.dataSource.length) {
          linTableHeaderCheckbox.checked = false;
          linTableHeaderCheckbox.indeterminate = true;
        } else if (val.length === this.dataSource.length) {
          linTableHeaderCheckbox.indeterminate = false;
          linTableHeaderCheckbox.checked = true;
        }
      } else {
        linTableHeaderCheckbox.indeterminate = false;
        linTableHeaderCheckbox.checked = false;
      }
    },
  },
  methods: {
    renderTh(column) {
      let th = null;
      switch (column.type) {
        case "selection":
          th = (
            <input
              onClick={this.onClick}
              type="checkbox"
              ref="linTableHeaderCheckbox"
            />
          );
          break;
        case "index":
          th = column.label;
          break;
        default:
          th = column.label;
      }
      return th;
    },
    onClick(e) {
      if (this.table) {
        const checked = e.target.checked;
        if (checked) {
          this.selectData = cloneDeep(this.dataSource);
        } else {
          this.selectData = [];
        }
        this.table.emitSelectChange();
        this.table.emitSelectAll();
      }
    },
  },
  render() {
    let { renderTh } = this;
    const { columns = [] } = this.table;
    return (
      <thead>
        <tr class="lin-table-tr">
          {columns.map((column, index) => {
            return (
              <th
                class={["lin-table-th", `lin-table-align-${column.align}`]}
                key={index}
              >
                {renderTh(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  },
};
