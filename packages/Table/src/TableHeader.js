import { cloneDeep } from 'lodash';

export default {
  name: 'LinTableHeader',

  inject: {
    table: {
      default: null
    }
  },
  computed: {
    // 选中的数据
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
      }
    },
    // 数据源
    dataSource() {
      if (this.table) {
        return this.table.dataSource;
      }
      return [];
    }
  },
  watch: {
    selectData(val) {
      // 修改checkbox选中状态
      this.changeCheckboxStatus(val);
    }
  },
  methods: {
    // 渲染头部单元格，有三中类型，普通的，checkbox，index
    renderTh(h, column) {
      let th = null;
      switch (column.type) {
        case 'selection':
          th = (
            <input
              class="lin-table-checkbox"
              onClick={this.onClick}
              type="checkbox"
              ref="linTableHeaderCheckbox"
            />
          );
          break;
        case 'index':
          th = column.label;
          break;
        default:
          th = column.label;
      }
      return th;
    },
    // 点击checkbox
    onClick(e) {
      if (this.table) {
        const checked = e.target.checked;
        if (checked) {
          // 全选
          this.selectData = cloneDeep(this.dataSource);
        } else {
          // 反选
          this.selectData = [];
        }
        // 触发全选事件和，选项变化事件
        this.table.emitSelectChange();
        this.table.emitSelectAll();
      }
    },
    // 改变checkbox状态
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
        default:
          break;
      }
    },
    changeCheckboxStatus(data) {
      if (data.length > 0) {
        if (data.length < this.dataSource.length) {
          // 半选状态
          this.switchCheckboxStatus(1);
        } else if (data.length === this.dataSource.length) {
          // 全选
          this.switchCheckboxStatus(2);
        }
      } else {
        // 不选
        this.switchCheckboxStatus(3);
      }
    }
  },
  render(h) {
    const { renderTh } = this;
    const { columns = [] } = this.table;
    return (
      <thead>
        <tr class="lin-table-tr">
          {columns.map((column, index) => (
            <th
              class={['lin-table-th', `lin-table-align-${column.align}`]}
              key={index}
            >
              {renderTh(h, column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
};
