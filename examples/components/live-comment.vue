<template>
  <div>
    <l-live-comment
      v-model="content"
      :fixComment="fixComment"
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
      fixComment: null,
      content: ""
    };
  },
  mounted() {
    setTimeout(() => {
      this.commentList = [
        {
          _username: "张三",
          _createTimeTip: "11:34:52",
          _content: "哈哈"
        },
        {
          _username: "李四",
          _createTimeTip: "11:34:52",
          _content: "你好"
        },
        {
          _username: "李四",
          _createTimeTip: "11:34:52",
          _content: "你好"
        }
      ];
    }, 500);
  },
  methods: {
    sendBtnClick() {
      if (!this.content) {
        alert("评论内容不能为空");
        return;
      }
      const content = {
        _username: "李四",
        _createTimeTip: "11:34:52",
        _content: this.content
      };
      this.commentList.push(content);
      this.fixComment = content;
      this.content = "";
    },
    toBottom() {
      this.fixComment = null;
    }
  }
};
</script>