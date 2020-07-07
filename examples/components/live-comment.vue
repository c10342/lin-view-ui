<template>
  <div>
    <l-live-comment
      :fixComment="fixComment"
      width="320px"
      height="500px"
      :arrowComment="true"
      :commentList="commentList"
      @sendBtnClick="sendBtnClick"
      @toBottom="toBottom"
    >
      <!-- <template v-slot='slotProps'>
        <p>{{slotProps.item.username}}</p>
      </template>-->
    </l-live-comment>
  </div>
</template>

<script>
export default {
  name: "test-live-comment",
  data() {
    return {
      commentList: [],
      fixComment: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.commentList = [
        {
          username: "张三",
          createTimeTip: "11:34:52",
          content: "哈哈"
        },
        {
          username: "李四",
          createTimeTip: "11:34:52",
          content: "你好"
        },
        {
          username: "李四",
          createTimeTip: "11:34:52",
          content: "你好"
        }
      ];
    }, 500);
  },
  methods: {
    sendBtnClick() {
      const content = {
        username: "李四",
        createTimeTip: "11:34:52",
        content: Math.random()
          .toString(16)
          .slice(-6)
      };
      this.commentList.push(content);
      this.fixComment = content;
    },
    toBottom() {
      console.log("toBottom");
      this.fixComment = null;
    }
  }
};
</script>