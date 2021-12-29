<template>
  <lin-alert type="success" title="提示文案"></lin-alert>
  <lin-alert type="info" title="提示文案"></lin-alert>
  <lin-alert type="warning" title="提示文案"></lin-alert>
  <lin-alert type="danger" title="提示文案"></lin-alert>

  <lin-alert effect="dark" type="success" title="提示文案"></lin-alert>
  <lin-alert effect="dark" type="info" title="提示文案"></lin-alert>
  <lin-alert effect="dark" type="warning" title="提示文案"></lin-alert>
  <lin-alert effect="dark" type="danger" title="提示文案"></lin-alert>

  <lin-alert closable type="success" title="不可关闭的 alert"></lin-alert>
  <lin-alert closable type="info" title="自定义">
    <template v-slot:close><span>知道了</span></template>
  </lin-alert>

  <lin-alert icon="lin-icon-chat" type="success" title="提示文案"></lin-alert>
  <lin-alert icon="lin-icon-chat" type="info" title="提示文案"></lin-alert>
  <lin-alert icon="lin-icon-chat" type="warning" title="提示文案"></lin-alert>
  <lin-alert icon="lin-icon-chat" type="danger" title="提示文案"></lin-alert>

  <lin-alert
    icon="lin-icon-chat"
    description="文字说明文字说明文字说明"
    type="success"
    title="提示文案"
  ></lin-alert>
  <lin-alert
    icon="lin-icon-chat"
    description="文字说明文字说明文字说明"
    type="info"
    title="提示文案"
  ></lin-alert>
  <lin-alert
    icon="lin-icon-chat"
    description="文字说明文字说明文字说明"
    type="warning"
    title="提示文案"
  ></lin-alert>
  <lin-alert
    icon="lin-icon-chat"
    description="文字说明文字说明文字说明"
    type="danger"
    title="提示文案"
  ></lin-alert>

  <!-- <lin-backtop ></lin-backtop> -->
  <!-- <lin-backtop :bottom="100">
    <div
      style="{
        height: 40px;
        width: 40px;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        cursor: pointer;
      }"
    >
      UP
    </div>
  </lin-backtop> -->

  <lin-badge :value="12" class="badge-item">
    <lin-button>评论</lin-button>
  </lin-badge>
  <lin-badge :value="3" class="badge-item">
    <lin-button>回复</lin-button>
  </lin-badge>
  <lin-badge :value="1" class="badge-item" type="danger">
    <lin-button>评论</lin-button>
  </lin-badge>
  <lin-badge :value="2" class="badge-item" type="warning">
    <lin-button>回复</lin-button>
  </lin-badge>

  <lin-badge value="new" class="badge-item">
    <lin-button>评论</lin-button>
  </lin-badge>
  <lin-badge value="hot" class="badge-item">
    <lin-button>回复</lin-button>
  </lin-badge>

  <lin-badge is-dot class="badge-item">数据查询</lin-badge>
  <lin-badge is-dot class="badge-item">
    <lin-button icon="lin-icon-thumbsup" type="primary"></lin-button>
  </lin-badge>

  <div class="row">
    <lin-button>默认按钮</lin-button>
    <lin-button type="primary">主要按钮</lin-button>
    <lin-button type="success">成功按钮</lin-button>
    <lin-button type="info">信息按钮</lin-button>
    <lin-button type="warning">警告按钮</lin-button>
    <lin-button type="danger">危险按钮</lin-button>
  </div>
  <div class="row">
    <lin-button :plain="true" type="default">朴素按钮</lin-button>
    <lin-button :plain="true" type="primary">主要按钮</lin-button>
    <lin-button :plain="true" type="success">成功按钮</lin-button>
    <lin-button :plain="true" type="info">信息按钮</lin-button>
    <lin-button :plain="true" type="warning">警告按钮</lin-button>
    <lin-button :plain="true" type="danger">危险按钮</lin-button>
  </div>
  <div class="row">
    <lin-button :round="true" type="default">圆角按钮</lin-button>
    <lin-button :round="true" type="primary">主要按钮</lin-button>
    <lin-button :round="true" type="success">成功按钮</lin-button>
    <lin-button :round="true" type="info">信息按钮</lin-button>
    <lin-button :round="true" type="warning">警告按钮</lin-button>
    <lin-button :round="true" type="danger">危险按钮</lin-button>
  </div>
  <div class="row">
    <lin-button icon="lin-icon-date" :circle="true" type="default"></lin-button>
    <lin-button
      icon="lin-icon-thumbsup"
      :circle="true"
      type="primary"
    ></lin-button>
    <lin-button icon="lin-icon-chat" :circle="true" type="success"></lin-button>
    <lin-button icon="lin-icon-upload" :circle="true" type="info"></lin-button>
    <lin-button
      icon="lin-icon-search"
      :circle="true"
      type="warning"
    ></lin-button>
    <lin-button
      icon="lin-icon-delete"
      :circle="true"
      type="danger"
    ></lin-button>
  </div>

    <div class="row">
    <lin-button :disabled="true" type="default">按钮</lin-button>
    <lin-button :disabled="true" type="primary">按钮</lin-button>
    <lin-button :disabled="true" type="success">按钮</lin-button>
    <lin-button :disabled="true" type="info">按钮</lin-button>
    <lin-button :disabled="true" type="warning">按钮</lin-button>
    <lin-button :disabled="true" type="danger">按钮</lin-button>
  </div>

    <div class="row">
    <lin-button icon="lin-icon-date" type="default"></lin-button>
    <lin-button icon="lin-icon-thumbsup" type="primary"></lin-button>
    <lin-button icon="lin-icon-chat" type="success"></lin-button>
    <lin-button icon="lin-icon-upload" type="info">下载</lin-button>
    <lin-button icon="lin-icon-search" type="warning">上传</lin-button>
    <lin-button icon="lin-icon-delete" type="danger">搜索</lin-button>
  </div>

    <div class="row">
    <lin-button size="default">默认尺寸</lin-button>
    <lin-button size="medium">中等按钮</lin-button>
    <lin-button size="small">小型按钮</lin-button>
  </div>

    <div class="row">
    <lin-button loading type="primary">主要</lin-button>
    <lin-button loading type="success">成功</lin-button>
    <lin-button loading type="info">信息</lin-button>
    <lin-button loading type="warning">警告</lin-button>
    <lin-button loading type="danger">危险</lin-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "demo-block",
  setup() {},
});
</script>
