<template>
  <div>
    <div class="item">
      <l-limit-textarea @overText="overText" v-model="value1" :maxLen="10" placeholder="最多输入10个字符"></l-limit-textarea>
    </div>

    <div class="item">
      <l-limit-textarea
        @overText="overText"
        v-model="value2"
        :max-len="10"
        placeholder="最多输入10个字符"
        isCut
      ></l-limit-textarea>
    </div>
    <div class="item">
      <l-limit-textarea
        @overText="overText"
        v-model="value3"
        :max-len="10"
        :rows="3"
        placeholder="最多输入10个字符"
        is-cut
      ></l-limit-textarea>
    </div>
    <div class="item">
      <l-limit-textarea @overText="overText" v-model="value4" placeholder="最多输入10个字符" is-cut></l-limit-textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      value4: ""
    };
  },
  methods: {
    overText(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 30px;
}
</style>
