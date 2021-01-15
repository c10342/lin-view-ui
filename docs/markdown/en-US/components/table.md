# Table

[[toc]]

---

## Basic usage

After the `dataSource` object array is injected into the `lin-table` element, the `prop` attribute is used to correspond to the key name of the object in the `lin-table-column` to fill in the data, and the `label` attribute is used to define the column name of the table. `value-key` is used as the unique identifier of data

:::demo

```vue
<template>
  <lin-table value-key="id" :dataSource="tableData">
    <lin-table-column prop="date" label="Date"></lin-table-column>
    <lin-table-column prop="name" label="Name"></lin-table-column>
    <lin-table-column prop="address" label="Address"></lin-table-column>
  </lin-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
};
</script>
```

:::

## Striped Table

Attribute `stripe` accepts a `Boolean`. If `true`, table will be striped.

:::demo

```vue
<template>
  <lin-table stripe value-key="id" :dataSource="tableData">
    <lin-table-column prop="date" label="Date"></lin-table-column>
    <lin-table-column prop="name" label="Name"></lin-table-column>
    <lin-table-column prop="address" label="Address"></lin-table-column>
  </lin-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
};
</script>
```

:::

## Table with border

By default, `Table` has no vertical border. If you need it, you can set attribute `border` to `true`.

:::demo

```vue
<template>
  <lin-table border value-key="id" :dataSource="tableData">
    <lin-table-column prop="date" label="Date"></lin-table-column>
    <lin-table-column prop="name" label="Name"></lin-table-column>
    <lin-table-column prop="address" label="Address"></lin-table-column>
  </lin-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
};
</script>
```

:::

## Table with status

Use `row-class-name` in `lin-table` to add custom classes to a certain row. Then you can style it with custom classes.

:::demo

```vue
<template>
  <lin-table
    :row-class-name="tableRowClassName"
    value-key="id"
    :dataSource="tableData"
  >
    <lin-table-column prop="date" label="Date"></lin-table-column>
    <lin-table-column prop="name" label="Name"></lin-table-column>
    <lin-table-column prop="address" label="Address"></lin-table-column>
  </lin-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
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

## Multiple select

It is very simple to implement multiple selection: manually add a `lin-table-column` and set the `type` attribute to `selection`.

:::demo

```vue
<template>
  <lin-table ref="table" value-key="id" :dataSource="tableData">
    <lin-table-column type="selection"></lin-table-column>
    <lin-table-column prop="date" label="Date"></lin-table-column>
    <lin-table-column prop="name" label="Name"></lin-table-column>
    <lin-table-column prop="address" label="Address"></lin-table-column>
  </lin-table>
  <div class="button-group">
    <lin-button @click="clearSelection">clearSelection</lin-button>
    <lin-button @click="toggleAllSelection">toggleAllSelection</lin-button>
    <lin-button @click="selectSelection">selectSelection</lin-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
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
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ]);
    },
  },
};
</script>
```

:::

## Custom index

You can customize the index by passing the `index` attribute to the column with `type=index`.

:::demo

```vue
<template>
  <lin-table value-key="id" :dataSource="tableData">
    <lin-table-column type="index" label="index"></lin-table-column>
    <lin-table-column prop="date" label="Date"></lin-table-column>
    <lin-table-column prop="name" label="Name"></lin-table-column>
    <lin-table-column prop="address" label="Address"></lin-table-column>
  </lin-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
};
</script>
```

:::

## Custom column template

The row, column and rowindex can be obtained through the `Scoped slot`.

:::demo

```vue
<template>
  <lin-table value-key="id" :dataSource="tableData">
    <lin-table-column prop="date" label="Date">
      <template slot-scope="scope">
        <div>{{ scope.row.date }}</div>
      </template>
    </lin-table-column>
    <lin-table-column prop="name" label="Name"></lin-table-column>
    <lin-table-column prop="address" label="Address"></lin-table-column>
    <lin-table-column label="operation">
      <template>
        <lin-button>edit</lin-button>
        <lin-button style="margin-left:20px" type="danger">delete</lin-button>
      </template>
    </lin-table-column>
  </lin-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
};
</script>
```

:::

## Table Attributes

| Attribute    | Description                                                                                         | Type                             | Accepted Values | Default |
| ------------ | --------------------------------------------------------------------------------------------------- | -------------------------------- | --------------- | ------- |
| dataSource   | Table data                                                                                          | Array                            | —               | —       |
| border       | whether Table has vertical border                                                                   | Boolean                          | —               | false   |
| stripe       | whether Table is striped                                                                            | Boolean                          | —               | false   |
| rowClassName | function that returns custom class names for a row, or a string assigning class names for every row | Function({row, rowIndex})/String | —               | —       |
| valueKey     | The unique identifier key of each row of data                                                       | String                           | —               | —       |

## Table Events

| Event Name       | Description                                            | Parameters                       |
| ---------------- | ------------------------------------------------------ | -------------------------------- |
| selection-change | triggers when selection changes                        | row                              |
| select-all       | triggers when user clicks the checkbox in table header | row                              |
| select           | triggers when user clicks the checkbox in a row        | {row, checked, rowIndex}         |
| row-click        | triggers when clicking a row                           | {row, rowIndex}                  |
| cell-click       | triggers when clicking a cell                          | {row, prop, rowIndex, cellIndex} |

## Table Methods

| Method             | Description                                                             | Parameters     |
| ------------------ | ----------------------------------------------------------------------- | -------------- |
| clearSelection     | used in multiple selection Table, clear user selection                  | —              |
| toggleAllSelection | used in multiple selection Table, toggle the selected state of all rows | —              |
| selectSelection    | Used to select multiple tables and select multiple rows in              | [{[valueKey]}] |

## TableColumn Attributes

| Attribute | Description                                                                                                                                                                        | Type   | Accepted Values | Default |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------- | ------- |
| prop      | field name                                                                                                                                                                         | String | —               | —       |
| label     | column label                                                                                                                                                                       | String | —               | —       |
| width     | column width                                                                                                                                                                       | String | —               | —       |
| align     | alignment                                                                                                                                                                          | String | —               | left    |
| type      | The type of the corresponding column. If `selection` is set, multiple check boxes will be displayed; if `index` is set, the index of the row will be displayed (calculated from 1) | String | —               | —       |

## TableColumn Slot

| Name | Description                                                                        |
| ---- | ---------------------------------------------------------------------------------- |
| —    | Custom content for table columns. The scope parameter is { row, column, rowIndex } |
