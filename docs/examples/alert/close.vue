<template>
  <lin-alert closable type="success" title="不可关闭的 alert"></lin-alert>
  <lin-alert class="mt-20" closable type="info" title="自定义">
    <template v-slot:close><span>知道了</span></template>
  </lin-alert>
</template>
