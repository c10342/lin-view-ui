<template>
  <lin-button
    lin-tooltip-top="-10"
    lin-tooltip-left="10"
    class="mr-20"
    v-tooltip.top="'上边 文字提示'"
    >上边</lin-button
  >
  <lin-button
    lin-tooltip-top="10"
    lin-tooltip-left="10"
    class="mr-20"
    v-tooltip.bottom="'下边 文字提示'"
    >下边</lin-button
  >
  <lin-button
    lin-tooltip-top="10"
    lin-tooltip-left="10"
    class="mr-20"
    v-tooltip.left="'左边 文字提示'"
    >左边</lin-button
  >
  <lin-button
    lin-tooltip-top="10"
    lin-tooltip-left="-10"
    v-tooltip.right="'右边 文字提示'"
    >右边</lin-button
  >
</template>
