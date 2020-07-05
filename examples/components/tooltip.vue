<template>
  <div class="toolTip-box">
    <p class="one-line" v-tooltip="text">{{text}}</p>
    <p class="one-line" v-tooltip.top="text">{{text}}</p>
    <p class="one-line" v-tooltip.left="text">{{text}}</p>
    <p class="one-line" v-tooltip.right="text">{{text}}</p>
    <p class="one-line" v-tooltip.auto="text">123132</p>
  </div>
</template>

<script>
export default {
  name: "test-tooltip",
  data() {
    return {
      text:
        "测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题"
    };
  }
};
</script>


<style lang="scss" scoped>
.one-line {
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
  width: 500px; /*需要配合宽度来使用*/
  border: 1px solid red;
}

.message {
  box-sizing: border-box;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
}
</style>