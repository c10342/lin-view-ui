<template>
  <lin-button
    v-tooltip.top="'上边 文字提示'"
    lin-tooltip-top="-10"
    lin-tooltip-left="10"
    class="mr-20"
  >
    上边
  </lin-button>
  <lin-button
    v-tooltip.bottom="'下边 文字提示'"
    lin-tooltip-top="10"
    lin-tooltip-left="10"
    class="mr-20"
  >
    下边
  </lin-button>
  <lin-button
    v-tooltip.left="'左边 文字提示'"
    lin-tooltip-top="10"
    lin-tooltip-left="10"
    class="mr-20"
  >
    左边
  </lin-button>
  <lin-button
    v-tooltip.right="'右边 文字提示'"
    lin-tooltip-top="10"
    lin-tooltip-left="-10"
  >
    右边
  </lin-button>
</template>
