# Pagination

[[toc]]

---

## Basic usage

Set `layout` to indicate the content to be displayed. Separated by commas, layout elements will be displayed in turn. `prev` represents the previous page, `next` represents the next page, and `pager` represents the page number list. In addition, it also provides `jumper` and `total`,`jumper` represents page skipping elements, `total` represents the total number of entries, and `pageSize` is used to set the number of page numbers displayed on each page.

:::demo

```vue
<template>
  <p>Effect of fewer pages</p>
  <lin-pagination layout="prev, pager, next" :total="50"></lin-pagination>
  <p>Effect greater than 7 pages</p>
  <lin-pagination layout="prev, pager, next" :total="1000"> </lin-pagination>
</template>
```

:::

## Set the maximum number of page number buttons

By default, pagination collapses the extra page number buttons when the total number of pages exceeds 7. The maximum number of page buttons can be set through the `pageCount` property.

:::demo

```vue
<template>
  <lin-pagination
    :page-size="20"
    :pager-count="11"
    layout="prev, pager, next"
    :total="1000"
  >
  </lin-pagination>
</template>
```

:::

## Pagination with background color

Set the `background` property to add a background color to the paging button.

:::demo

```vue
<template>
  <lin-pagination background layout="prev, pager, next" :total="1000">
  </lin-pagination>
</template>
```

:::

## Additional features

:::demo

```vue
<template>
  <div>
    <p>Displays the total number</p>
    <lin-pagination background layout="total,prev, pager, next" :total="1000">
    </lin-pagination>
  </div>
  <div>
    <p>Go straight to</p>
    <lin-pagination background layout="prev, pager, next,jumper" :total="1000">
    </lin-pagination>
  </div>
  <div>
    <p>Full functionality</p>
    <lin-pagination
      background
      layout="total,prev, pager, next,jumper"
      :total="1000"
    >
    </lin-pagination>
  </div>
</template>
```

:::

## Attributes

| Attribute  | Description                                                                                       | Type    | Accepted Values                           | Default                         |
| ---------- | ------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------- | ------------------------------- |
| pageCount  | The number of page number buttons that collapse when the total number of pages exceeds this value | Number  | —                                         | 7                               |
| pageSize   | Number of entries per page                                                                        | Number  | —                                         | 10                              |
| total      | Total items                                                                                       | Number  | —                                         | 0                               |
| pageIndex  | Current number of pages .sync modifier is supported                                               | Number  | —                                         | —                               |
| background | Do you want to add a background color to the paging button                                        | Boolean | —                                         | false                           |
| layout     | Component layout with sub component names separated by commas                                     | String  | `prev`, `pager`, `next`, `jumper`,`total` | prev, pager, next, jumper,total |

## Events

| Event Name    | Description                                                       | Parameters           |
| ------------- | ----------------------------------------------------------------- | -------------------- |
| currentChange | triggers when `pageIndex` changes                                 | the new current page |
| prevClick     | triggers when the prev button is clicked and current page changes | the new current page |
| nextClick     | triggers when the next button is clicked and current page changes | the new current page |
