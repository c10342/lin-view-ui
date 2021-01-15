# Skeleton

---

## Introduction to skeleton screen

The main function of the skeleton screen is to provide the basic occupation when the network request is slow, and restore the data display when the data loading is completed. This gives the user a very natural transition, will not cause the page long time white screen or flicker and so on.
There are two common implementation schemes of skeleton screen, which are `ssr` server-side rendering and `prerender`. The component here is just a simple style.

## Skeleton screen style components

When the text is not loaded, the default bitmap for the text is displayed.

<div class="demo-block">
    <lin-row>
      <lin-col :span="4">
        <lin-skeleton></lin-skeleton>
      </lin-col>
      <lin-col :span="4" class="ml-10">
        <lin-row>
          <lin-col :span="12">
            <lin-skeleton :proportion="0.2"></lin-skeleton>
          </lin-col>
          <lin-col :span="24" class="mt-10">
            <lin-skeleton :proportion="0.1"></lin-skeleton>
          </lin-col>
          <lin-col :span="24" class="mt-10">
            <lin-skeleton :proportion="0.1"></lin-skeleton>
          </lin-col>
        </lin-row>
      </lin-col>
    </lin-row>
</div>

::: demo

```html
<lin-row>
  <lin-col :span="4">
    <lin-skeleton></lin-skeleton>
  </lin-col>
  <lin-col :span="4" class="ml-10">
    <lin-row>
      <lin-col :span="12">
        <lin-skeleton :proportion="0.2"></lin-skeleton>
      </lin-col>
      <lin-col :span="24" class="mt-10">
        <lin-skeleton :proportion="0.1"></lin-skeleton>
      </lin-col>
      <lin-col :span="24" class="mt-10">
        <lin-skeleton :proportion="0.1"></lin-skeleton>
      </lin-col>
    </lin-row>
  </lin-col>
</lin-row>
```

:::

## Attributes

| Attribute  | Description        | Type   | Accepted Values | Default |
| ---------- | ------------------ | ------ | --------------- | ------- |
| width      | Occupation length  | String | —               | 100%    |
| height     | Occupation width   | String | —               | —       |
| proportion | Height width ratio | Number | —               | 1       |
| bgColor    | Background color   | String | —               | #b4bccc |
