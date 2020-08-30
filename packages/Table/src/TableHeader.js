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
      this.changeCheckboxStatus(val);
    },
  },
  methods: {
    renderTh(column) {
      let th = null;
      switch (column.type) {
        case "selection":
          th = (
            <input
              class="lin-table-checkbox"
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
    switchCheckboxStatus(status) {
      const linTableHeaderCheckbox = this.$refs.linTableHeaderCheckbox;
      switch (status) {
        case 1:
          // 半选
          linTableHeaderCheckbox.indeterminate = true;
          linTableHeaderCheckbox.checked = false;
          break;
        case 2:
          // 全选
          linTableHeaderCheckbox.indeterminate = false;
          linTableHeaderCheckbox.checked = true;
          break;
        case 3:
          // 不选
          linTableHeaderCheckbox.indeterminate = false;
          linTableHeaderCheckbox.checked = false;
          break;
      }
    },
    changeCheckboxStatus(data) {
      if (data.length > 0) {
        if (data.length < this.dataSource.length) {
          this.switchCheckboxStatus(1);
        } else if (data.length === this.dataSource.length) {
          this.switchCheckboxStatus(2);
        }
      } else {
        this.switchCheckboxStatus(3);
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
