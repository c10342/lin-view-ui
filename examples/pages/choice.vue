<template>
  <div>
    <lin-choice-group v-model="value5" placeholder="请选择">
      <lin-choice-item
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left;">{{ item.label }}</span>
        <span style="float: right; font-size: 13px; color: #8492a6;">{{
          item.value
        }}</span>
      </lin-choice-item>
    </lin-choice-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: [
        {
          value: "Beijing",
          label: "北京"
        },
        {
          value: "Shanghai",
          label: "上海"
        },
        {
          value: "Nanjing",
          label: "南京"
        },
        {
          value: "Chengdu",
          label: "成都"
        },
        {
          value: "Shenzhen",
          label: "深圳"
        },
        {
          value: "Guangzhou",
          label: "广州"
        }
      ],
      value5: "Guangzhou"
    };
  },
  mounted() {
    setTimeout(() => {
      console.log(1);
      this.value5 = "";
    }, 3000);
  }
};
</script>
