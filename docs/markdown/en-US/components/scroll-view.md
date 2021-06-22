# ScrollView

[[toc]]

---

## Basic usage

To use the Scrollview component, you need to set the `height`, `data` and `isEnd` properties, and `height` gives the container a fixed height. `data` the data displayed in the container. When the data changes, the height of the content will be recalculated. `isEnd` all data loaded

:::demo

```vue
<template>
  <lin-scroll-view
    :is-end="isEnd1"
    :data="list1"
    :height="200"
    @scrollToEnd="scrollToEnd1"
  >
    <div class="scroll-view-item" v-for="(item, index) in list1" :key="index">
      {{ item }}
    </div>
  </lin-scroll-view>
</template>

<script>
export default {
  data() {
    return {
      list1: [1, 2, 3, 4, 5],
      isEnd1: false,
    };
  },
  methods: {
    scrollToEnd1() {
      const arr = this.list1.slice();
      arr.push(...arr);
      this.list1 = arr;
      if (this.list1.length > 20) {
        this.isEnd1 = true;
        return;
      }
    },
  },
};
</script>
```

:::

## Custom slot content

Use the `loading` and `no-more` named slots to customize the contents displayed by pull-up loading and the contents displayed after loading

:::demo

```vue
<template>
  <lin-scroll-view
    :is-end="isEnd2"
    :data="list2"
    :height="200"
    @scrollToEnd="scrollToEnd2"
  >
    <div class="scroll-view-item" v-for="(item, index) in list2" :key="index">
      {{ item }}
    </div>
    <template v-slot:loading>
      <p class="scroll-view-tip">Loading...</p>
    </template>
    <template v-slot:no-more>
      <p class="scroll-view-tip">Loading completed</p>
    </template>
  </lin-scroll-view>
</template>

<script>
export default {
  data() {
    return {
      list2: [1, 2, 3, 4, 5],
      isEnd2: false,
    };
  },
  methods: {
    scrollToEnd2() {
      const arr = this.list2.slice();
      arr.push(...arr);
      this.list2 = arr;
      if (this.list2.length > 20) {
        this.isEnd2 = true;
        return;
      }
    },
  },
};
</script>
```

:::

## Attributes

| Attribute       | Description                                                                             | Type          | Accepted Values | Default |
| --------------- | --------------------------------------------------------------------------------------- | ------------- | --------------- | ------- |
| height          | Container height                                                                        | Number        | —               | 700     |
| isThrottle      | Is throttling necessary                                                                 | Boolean       | —               | true    |
| time            | Only when isthrottle is true can the duration of rolling execution interval be valid    | Number        | —               | 500     |
| isEnd           | Whether the data is all loaded, that is, whether the scrolltoend event is not triggered | Boolean       | —               | false   |
| showLoading     | Whether to show loading animation                                                       | Boolean       | —               | true    |
| emitScrollEvent | Whether to dispatch scroll scroll events                                                | Boolean       | —               | true    |
| data            | View data displayed to refresh the height of the content                                | Object, Array | —               | —       |
| loadingTip      | Loading prompt                                                                          | String        | —               | —       |
| noMoreTip       | Prompt after data loading                                                               | String        | —               | —       |

## Slots

| Name    | Description                                             |
| ------- | ------------------------------------------------------- |
| —       | What needs to be scrolled in Scrollview                 |
| loading | Scrollview pull up and load the content to be displayed |
| no-more | Content displayed after Scrollview data loading         |

## Events

| Event Name  | Description                                      | Parameters |
| ----------- | ------------------------------------------------ | ---------- |
| scrollToEnd | Triggered when the container rolls to the bottom | e(Event)   |
| scroll      | Triggered when the container is rolling          | e(Event)   |
