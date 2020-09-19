<template>
  <div>
    <lin-collapse-group v-model="value" @onChange='onChange'>
      <lin-collapse-item name="1">
        史蒂夫·乔布斯
        <div slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</div>
      </lin-collapse-item>
      <lin-collapse-item name="2">
        史蒂夫·乔布斯
        <div slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</div>
      </lin-collapse-item>
    </lin-collapse-group>
    <lin-collapse-group accordion @onChange='onChange'>
      <lin-collapse-item name="1">
        史蒂夫·乔布斯
        <div slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</div>
      </lin-collapse-item>
      <lin-collapse-item name="2">
        史蒂夫·乔布斯
        <div slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</div>
      </lin-collapse-item>
    </lin-collapse-group>
  </div>
</template>


<script>
export default {
  name: "test-collapse",
  data(){
    return {
      value:''
    }
  },
  methods:{
    onChange(data){
      console.log(data);
    }
  }
};
</script>