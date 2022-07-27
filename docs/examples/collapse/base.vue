<template>
  <lin-collapse-group v-model:value="value">
    <lin-collapse-item name="1">
      史蒂夫·乔布斯
      <template #content>
        <div>
          史蒂夫·乔布斯（Steve
          Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
        </div>
      </template>
    </lin-collapse-item>
    <lin-collapse-item name="2">
      史蒂夫·乔布斯
      <template #content>
        <div>
          史蒂夫·乔布斯（Steve
          Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
        </div>
      </template>
    </lin-collapse-item>
  </lin-collapse-group>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const value = ref("1");
    return {
      value
    };
  }
});
</script>
