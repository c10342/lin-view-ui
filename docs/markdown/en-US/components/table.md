<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection();
    },
    selectSelection() {
      this.$refs.table.selectSelection([
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
      ]);
    },
  },
};
</script>

<style lang="scss" scoped>
.button-group{
    margin-top:20px;
    .lin-button{
        margin-right:20px;
    }
}
</style>

<style lang="scss">
.lin-table .warning-row {
  background-color: oldlace;
}

.lin-table .success-row {
  background-color: #f0f9eb;
}
</style>

# Table 表格

---

## Basic usage

当 `lin-table` 元素中注入 `dataSource` 对象数组后，在 `lin-table-column` 中用 `prop` 属性来对应对象中的键名即可填入数据，用 `label` 属性来定义表格的列名。`value-key` 用来做为数据唯一标识

<div class='demo-block'>
<lin-table
      value-key="id"
      :dataSource="tableData"
    >
      <lin-table-column prop="date" label="日期"></lin-table-column>
      <lin-table-column prop="name" label="姓名"></lin-table-column>
      <lin-table-column prop="address" label="地址"></lin-table-column>
    </lin-table>
</div>

:::demo

```html
<lin-table value-key="id" :dataSource="tableData">
  <lin-table-column prop="date" label="日期"></lin-table-column>
  <lin-table-column prop="name" label="姓名"></lin-table-column>
  <lin-table-column prop="address" label="地址"></lin-table-column>
</lin-table>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            id: 2,
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            id: 3,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 4,
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
  };
</script>
```

:::

## 带斑马纹表格

`stripe` 属性可以创建带斑马纹的表格。它接受一个 `Boolean` ，默认为 `false` ，设置为 `true` 即为启用。

<div class='demo-block'>
<lin-table
    stripe
    value-key="id"
    :dataSource="tableData"
>
    <lin-table-column prop="date" label="日期"></lin-table-column>
    <lin-table-column prop="name" label="姓名"></lin-table-column>
    <lin-table-column prop="address" label="地址"></lin-table-column>
</lin-table>
</div>

:::demo

```html
<lin-table stripe value-key="id" :dataSource="tableData">
  <lin-table-column prop="date" label="日期"></lin-table-column>
  <lin-table-column prop="name" label="姓名"></lin-table-column>
  <lin-table-column prop="address" label="地址"></lin-table-column>
</lin-table>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            id: 2,
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            id: 3,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 4,
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
  };
</script>
```

:::

## 带边框表格

默认情况下，`Table` 组件是不具有竖直方向的边框的，如果需要，可以使用 `border` 属性，它接受一个 `Boolean` ，设置为 `true` 即可启用。

<div class='demo-block'>
<lin-table
    border
    value-key="id"
    :dataSource="tableData"
>
    <lin-table-column prop="date" label="日期"></lin-table-column>
    <lin-table-column prop="name" label="姓名"></lin-table-column>
    <lin-table-column prop="address" label="地址"></lin-table-column>
</lin-table>
</div>

:::demo

```html
<lin-table border value-key="id" :dataSource="tableData">
  <lin-table-column prop="date" label="日期"></lin-table-column>
  <lin-table-column prop="name" label="姓名"></lin-table-column>
  <lin-table-column prop="address" label="地址"></lin-table-column>
</lin-table>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            id: 2,
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            id: 3,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 4,
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
  };
</script>
```

:::

## 带状态表格

可以通过指定 `Table` 组件的 `row-class-name` 属性来为 `Table` 中的某一行添加 `class`，表明该行处于某种状态。

<div class='demo-block'>
<lin-table
    :row-class-name="tableRowClassName"
    value-key="id"
    :dataSource="tableData"
>
    <lin-table-column prop="date" label="日期"></lin-table-column>
    <lin-table-column prop="name" label="姓名"></lin-table-column>
    <lin-table-column prop="address" label="地址"></lin-table-column>
</lin-table>
</div>

:::demo

```html
<lin-table
  :row-class-name="tableRowClassName"
  value-key="id"
  :dataSource="tableData"
>
  <lin-table-column prop="date" label="日期"></lin-table-column>
  <lin-table-column prop="name" label="姓名"></lin-table-column>
  <lin-table-column prop="address" label="地址"></lin-table-column>
</lin-table>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            id: 2,
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            id: 3,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 4,
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
    methods: {
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
          return "warning-row";
        } else if (rowIndex === 3) {
          return "success-row";
        }
        return "";
      },
    },
  };
</script>

<style lang="scss">
  .lin-table .warning-row {
    background-color: oldlace;
  }

  .lin-table .success-row {
    background-color: #f0f9eb;
  }
</style>
```

:::

## 多选

实现多选非常简单: 手动添加一个 `lin-table-column`，设 `type` 属性为 `selection` 即可。

<div class='demo-block'>
    <lin-table
      ref="table"
      value-key="id"
      :dataSource="tableData"
    >
      <lin-table-column type="selection"></lin-table-column>
      <lin-table-column prop="date" label="日期"></lin-table-column>
      <lin-table-column prop="name" label="姓名"></lin-table-column>
      <lin-table-column prop="address" label="地址"></lin-table-column>
    </lin-table>
    <div class='button-group'>
    <lin-button @click="clearSelection">clearSelection</lin-button>
    <lin-button @click="toggleAllSelection">toggleAllSelection</lin-button>
    <lin-button @click="selectSelection">selectSelection</lin-button>
    </div>
</div>

:::demo

```html
<lin-table ref="table" value-key="id" :dataSource="tableData">
  <lin-table-column type="selection"></lin-table-column>
  <lin-table-column prop="date" label="日期"></lin-table-column>
  <lin-table-column prop="name" label="姓名"></lin-table-column>
  <lin-table-column prop="address" label="地址"></lin-table-column>
</lin-table>
<div class="button-group">
  <lin-button @click="clearSelection">clearSelection</lin-button>
  <lin-button @click="toggleAllSelection">toggleAllSelection</lin-button>
  <lin-button @click="selectSelection">selectSelection</lin-button>
</div>
<script>
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            id: 2,
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            id: 3,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 4,
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
    methods: {
      clearSelection() {
        this.$refs.table.clearSelection();
      },
      toggleAllSelection() {
        this.$refs.table.toggleAllSelection();
      },
      selectSelection() {
        this.$refs.table.selectSelection([
          {
            id: 2,
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            id: 3,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      },
    },
  };
</script>
```

:::

## 自定义索引

通过给 `type=index` 的列传入 `index` 属性，可以自定义索引。

<div class='demo-block'>
<lin-table
      value-key="id"
      :dataSource="tableData"
    >
      <lin-table-column type="index" label="序号"></lin-table-column>
      <lin-table-column prop="date" label="日期"></lin-table-column>
      <lin-table-column prop="name" label="姓名"></lin-table-column>
      <lin-table-column prop="address" label="地址"></lin-table-column>
    </lin-table>
</div>

:::demo

```html
<lin-table value-key="id" :dataSource="tableData">
  <lin-table-column type="index" label="序号"></lin-table-column>
  <lin-table-column prop="date" label="日期"></lin-table-column>
  <lin-table-column prop="name" label="姓名"></lin-table-column>
  <lin-table-column prop="address" label="地址"></lin-table-column>
</lin-table>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            id: 2,
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            id: 3,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 4,
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
  };
</script>
```

:::

## 自定义列模板

通过 `Scoped slot` 可以获取到 row, column 和 rowIndex。

<div class='demo-block'>
<lin-table
    value-key="id"
    :dataSource="tableData"
>
    <lin-table-column prop="date" label="日期">
        <template slot-scope="scope">
            <div>{{scope.row.date}}</div>
        </template>
    </lin-table-column>
    <lin-table-column prop="name" label="姓名"></lin-table-column>
    <lin-table-column prop="address" label="地址"></lin-table-column>
    <lin-table-column label="操作">
      <template>
        <lin-button>编辑</lin-button>
        <lin-button style='margin-left:20px' type="danger">删除</lin-button>
      </template>
    </lin-table-column>
</lin-table>
</div>

:::demo

```html
<lin-table value-key="id" :dataSource="tableData">
  <lin-table-column prop="date" label="日期">
    <template slot-scope="scope">
      <div>{{scope.row.date}}</div>
    </template>
  </lin-table-column>
  <lin-table-column prop="name" label="姓名"></lin-table-column>
  <lin-table-column prop="address" label="地址"></lin-table-column>
  <lin-table-column label="操作">
    <template>
      <lin-button>编辑</lin-button>
      <lin-button type="danger">删除</lin-button>
    </template>
  </lin-table-column>
</lin-table>
<script>
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            id: 2,
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            id: 3,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 4,
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ],
      };
    },
  };
</script>
```

:::

## Table 属性

| 参数         | 说明                                                                          | Type                             | Accepted Values | Default |
| ------------ | ----------------------------------------------------------------------------- | -------------------------------- | --------------- | ------- |
| dataSource   | 数据源                                                                        | Array                            | —               | —       |
| border       | 是否带有纵向边框                                                              | Boolean                          | —               | false   |
| stripe       | 是否为斑马纹 table                                                            | Boolean                          | —               | false   |
| rowClassName | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。 | Function({row, rowIndex})/String | —               | —       |
| valueKey     | 每一行数据的唯一标识 key                                                      | String                           | —               | —       |

## Table 事件

| Event Name       | 说明                                         | Parameters                       |
| ---------------- | -------------------------------------------- | -------------------------------- |
| selection-change | 当选择项发生变化时会触发该事件               | row                              |
| select-all       | 当用户手动勾选全选 Checkbox 时触发的事件     | row                              |
| select           | 当用户手动勾选数据行的 Checkbox 时触发的事件 | {row, checked, rowIndex}         |
| row-click        | 当某一行被点击时会触发该事件                 | {row, rowIndex}                  |
| cell-click       | 当某个单元格被点击时会触发该事件             | {row, prop, rowIndex, cellIndex} |

## Table 方法

| 方法名             | 说明                               | 参数           |
| ------------------ | ---------------------------------- | -------------- |
| clearSelection     | 用于多选表格，清空用户的选择       | —              |
| toggleAllSelection | 用于多选表格，切换所有行的选中状态 | —              |
| selectSelection    | 用于多选表格，用来选择中多行       | [{[valueKey]}] |

## TableColumn 属性

| 参数  | 说明                                                                                                     | Type   | Accepted Values | Default |
| ----- | -------------------------------------------------------------------------------------------------------- | ------ | --------------- | ------- |
| prop  | 对应列内容的字段名                                                                                       | String | —               | —       |
| label | 显示的标题                                                                                               | String | —               | —       |
| width | 对应列的宽度                                                                                             | String | —               | —       |
| align | 对齐方式                                                                                                 | String | —               | left    |
| type  | 对应列的 Type。如果设置了 `selection` 则显示多选框；如果设置了 `index` 则显示该行的索引（从 1 开始计算） | String | —               | —       |

## TableColumn 插槽

| Name | 说明                                             |
| ---- | ------------------------------------------------ |
| —    | 自定义列的内容，参数为 { row, column, rowIndex } |
