<template>
  <p
    class="one-line tooltip-message"
    v-tooltip.top.auto="
      '测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题'
    "
  >
    测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题
  </p>
  <p class="one-line tooltip-message" v-tooltip.top.auto="'标题文字'">
    标题文字
  </p>
</template>

<style lang="scss" scoped>
.one-line {
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
  width: 500px; /*需要配合宽度来使用*/
  border: 1px solid red;
}

.tooltip-message {
  box-sizing: border-box;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>
