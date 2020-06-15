<template>
  <div>
    <div class="mb-30">
      <l-row class="mb-10">
        <l-col :span="24">
          <div class="grid-content bg-purple-dark"></div>
        </l-col>
      </l-row>
      <l-row class="mb-10">
        <l-col :span="8">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="8">
          <div class="grid-content bg-purple-light"></div>
        </l-col>
        <l-col :span="8">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
      <l-row>
        <l-col :span="4">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="4">
          <div class="grid-content bg-purple-light"></div>
        </l-col>
        <l-col :span="4">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="4">
          <div class="grid-content bg-purple-light"></div>
        </l-col>
        <l-col :span="4">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="4">
          <div class="grid-content bg-purple-light"></div>
        </l-col>
      </l-row>
    </div>
    <div class="mb-30">
      <l-row :gutter="20">
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
    </div>
    <div class="mb-30">
      <l-row :gutter="20" class="mb-10">
        <l-col :span="16">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="8">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
      <l-row :gutter="20" class="mb-10">
        <l-col :span="8">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="8">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="4">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="4">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
      <l-row :gutter="20" class="mb-10">
        <l-col :span="4">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="16">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="4">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
    </div>

    <div class="mb-30">
      <l-row :gutter="20" class="mb-10">
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="6" :offset="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
      <l-row :gutter="20" class="mb-10">
        <l-col :span="6" :offset="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="6" :offset="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
      <l-row :gutter="20" class="mb-10">
        <l-col :span="12" :offset="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
    </div>

    <div class="mb-30">
      <l-row type="flex" class="mb-10">
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
      <l-row type="flex" class="mb-10" justify="center">
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
      <l-row type="flex" class="mb-10" justify="end">
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
      <l-row type="flex" class="mb-10" justify="between">
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
      <l-row type="flex" class="mb-10" justify="around">
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </l-col>
        <l-col :span="6">
          <div class="grid-content bg-purple"></div>
        </l-col>
      </l-row>
    </div>

    <div class="mb-30">
      <l-row :gutter="10">
        <l-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <div class="grid-content bg-purple-light"></div>
        </l-col>
        <l-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <div class="grid-content bg-purple"></div>
        </l-col>
        <l-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content bg-purple-light"></div>
        </l-col>
      </l-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "test-layout"
};
</script>

<style lang="scss" scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}

.mb-10 {
  margin-bottom: 10px;
}

.mb-30 {
  margin-bottom: 30px;
}
</style>