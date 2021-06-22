# LoadingBar

[[toc]]

---

A loading progress bar for displaying page loading and asynchronous requests is created globally.
Because of the reusability, the `LoadingBar` only creates one instance globally, and `Vue.prototype` The global object `$loadingBar` is added to the. You can operate instances directly through `this.$loadingBar`

## Basic usage

The global loading progress bar is controlled by calling the three methods provided by \$loadingbar `start()`、`end()`、`error()`

::: demo

```vue
<template>
  <lin-button @click="start">start</lin-button>
  <lin-button @click="end">end</lin-button>
  <lin-button @click="error">error</lin-button>
</template>

<script>
export default {
  methods: {
    start() {
      this.$loadingBar.start();
    },
    end() {
      this.$loadingBar.end();
    },
    error() {
      this.$loadingBar.error();
    },
  },
};
</script>
```

:::

## Conventional arrangement

The global configuration of LoadingBar is provided as follows:

::: demo

```vue
<template>
  <lin-button @click="setSpeed">Set speed</lin-button>
  <lin-button @click="setSpinner">Set spinner</lin-button>
  <lin-button @click="setPercentNum">Set percentNum</lin-button>
  <lin-button @click="setShowSpinner">Set spinner</lin-button>
</template>

<script>
export default {
  methods: {
    setSpeed() {
      this.$loadingBar.config({
        speed: 10,
      });
      this.$loadingBar.start();
    },
    setSpinner() {
      this.$loadingBar.config({
        easing: "ease",
      });
      this.$loadingBar.start();
    },
    setPercentNum() {
      this.$loadingBar.config({
        percentNum: 0.1,
      });
      this.$loadingBar.start();
    },
    setShowSpinner() {
      this.$loadingBar.config({
        showSpinner: false,
      });
      this.$loadingBar.start();
    },
  },
};
</script>
```

:::

## Attributes

| Attribute   | Description                | Type    | Accepted Values               | Default       |
| ----------- | -------------------------- | ------- | ----------------------------- | ------------- |
| speed       | Loading speed              | Number  | 0-100                         | 5             |
| easing      | Spinner loads animation    | String  | linear, ease, cubic-bezier... | linear        |
| percentNum  | Percentage per advance     | Number  | 0-1                           | Math.random() |
| showSpinner | Whether to display spinner | Boolean | —                             | true          |
