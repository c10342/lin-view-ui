<template>
  <div>
    <div>
      <lin-show-more :len="10" text="文本超出显示长度，折叠起来，通过len属性显示从何处开始折叠。"></lin-show-more>
    </div>

    <div>
      <lin-show-more
        allow-fold
        show-text="show"
        hidden-text="hidden"
        :len="10"
        text="文本超出显示长度，折叠起来，展开后，可以通过 allowFold 指定是否需要收起"
      ></lin-show-more>
    </div>
  </div>
</template>

<script>
export default {
  name: "test-show-more",
};
</script>
