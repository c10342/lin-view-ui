import './style.scss';

let columnId = 0;

export default {
  name: 'LinTableColumn',
  props: {
    prop: String,
    label: String,
    width: String,
    align: {
      type: String,
      default: 'left',
    },
    type: String,
  },
  inject: {
    table: {
      default: null,
    },
  },
  computed: {
    valueKey() {
      if (this.table) {
        return this.table.valueKey;
      }
      return '';
    },
  },
  watch: {
    prop(val) {
      this.column.prop = val;
    },
    label(val) {
      this.column.label = val;
    },
  },
  beforeCreate() {
    this.colums = {};
  },
  created() {
    const column = {
      ...this.$props,
      id: `col-${columnId++}`,
    };
    column.renderCell = (h, rowData) => {
      // eslint-disable-next-line
      let render = (h, data) => {
        if (data.column.type === 'selection') {
          return (
            <input
              class="lin-table-checkbox"
              onClick={(e) => this.onClick(e, data)}
              type="checkbox"
            />
          );
        } if (data.column.type === 'index') {
          return data.rowIndex + 1;
        }
        return data.row[column.prop];
      };
      if (this.$scopedSlots.default && rowData.column.type !== 'selection') {
        // eslint-disable-next-line
        render = (h, data) => this.$scopedSlots.default(data);
      }

      return render(h, rowData);
    };
    this.column = column;
  },
  mounted() {
    if (this.table) {
      this.table.columns.push(this.column);
    }
  },
  destroyed() {
    if (this.table) {
      const index = this.table.columns.findIndex(
        (column) => column.id === this.column.id,
      );
      if (index > -1) {
        this.table.columns.splice(index, 1);
      }
    }
  },
  methods: {
    onClick(e, data) {
      e.stopPropagation();
      if (this.table) {
        const index = this.table.selectData.findIndex(
          (item) => item[this.valueKey] === data.row[this.valueKey],
        );
        const checked = e.target.checked;
        if (checked) {
          if (index === -1) {
            this.table.selectData.push(data.row);
          }
          this.table.emitSelectChange();
        } else if (index > -1) {
          this.table.selectData.splice(index, 1);
          this.table.emitSelectChange();
        }
        this.table.emitSelect({
          row: data.row,
          checked,
          rowIndex: data.rowIndex,
        });
      }
    },
  },
  render() {
    return null;
  },
};
