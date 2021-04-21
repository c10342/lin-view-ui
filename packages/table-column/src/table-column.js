import 'packages/table-column/src/style.scss';

let columnId = 0;

export default {
  name: 'LinTableColumn',
  props: {
    // 对应列内容的字段名
    prop: String,
    // 显示的标题
    label: String,
    // 对应列的宽度
    width: String,
    // 对齐方式
    align: {
      type: String,
      default: 'left'
    },
    // 对应列的类型
    type: String
  },
  inject: {
    table: {
      default: null
    }
  },
  computed: {
    valueKey() {
      if (this.table) {
        return this.table.valueKey;
      }
      return '';
    }
  },
  watch: {
    prop(val) {
      this.column.prop = val;
    },
    label(val) {
      this.column.label = val;
    }
  },
  beforeCreate() {
    // 存储该列的信息对象
    this.colums = {};
  },
  created() {
    // 把该组件的props属性都存储起来
    const column = {
      ...this.$props,
      id: `col-${columnId++}`
    };
    // 默认提供一个渲染单元格的render函数
    column.renderCell = (h, rowData) => {
      // eslint-disable-next-line
      let render = (h, data) => {
        if (data.column.type === 'selection') {
          // 多选单元格
          return (
            <input
              class="lin-table-checkbox"
              onClick={(e) => this.onClick(e, data)}
              type="checkbox"
            />
          );
        }
        if (data.column.type === 'index') {
          // 序号单元格
          return data.rowIndex + 1;
        }
        // 普通单元格
        return data.row[column.prop];
      };
      if (this.$scopedSlots.default && rowData.column.type !== 'selection') {
        // 如果使用了插槽
        // eslint-disable-next-line
        render = (h, data) => this.$scopedSlots.default(data);
      }

      return render(h, rowData);
    };
    this.column = column;
  },
  mounted() {
    if (this.table) {
      // 把列信息方法父组件中，交给父组件渲染每一列，还组件不做渲染，只做数据收集
      this.table.columns.push(this.column);
    }
  },
  destroyed() {
    if (this.table) {
      // 销毁的时候需要把对应的列移除掉
      const index = this.table.columns.findIndex(
        (column) => column.id === this.column.id
      );
      if (index > -1) {
        this.table.columns.splice(index, 1);
      }
    }
  },
  methods: {
    // 点击checkbox
    onClick(e, data) {
      e.stopPropagation();
      if (this.table) {
        // 判断是否已经被选中了
        const index = this.table.selectData.findIndex(
          (item) => item[this.valueKey] === data.row[this.valueKey]
        );
        const checked = e.target.checked;
        if (checked) {
          if (index === -1) {
            // 原本没有被选中，需要push进去
            this.table.selectData.push(data.row);
          }
          this.table.emitSelectChange();
        } else if (index > -1) {
          // 原本已经被选中，但是要取消选中
          this.table.selectData.splice(index, 1);
          this.table.emitSelectChange();
        }
        this.table.emitSelect({
          row: data.row,
          checked,
          rowIndex: data.rowIndex
        });
      }
    }
  },
  render() {
    return null;
  }
};
