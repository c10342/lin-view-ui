<script>
export default {
  data() {
    return {
      commentList1: [],
      fixComment1: null,
      content1: "",
      commentList2: [],
      fixComment2: null,
      content2: ""
    };
  },
  methods: {
    sendBtnClick1() {
      if (!this.content1) {
        alert("评论内容不能为空");
        return;
      }
      const content = {
        _username: "李四",
        _createTimeTip: "11:34:52",
        _content: this.content1
      };
      this.commentList1.push(content);
      this.fixComment1 = content;
      this.content1 = "";
    },
    toBottom1() {
      this.fixComment1 = null;
    },
    sendBtnClick2() {
      if (!this.content2) {
        alert("评论内容不能为空");
        return;
      }
      const content = {
        _username: "李四",
        _createTimeTip: "11:34:52",
        _content: this.content2
      };
      this.commentList2.push(content);
      this.fixComment2 = content;
      this.content2 = "";
    },
    toBottom2() {
      this.fixComment2 = null;
    }
  }
};
</script>

# LiveComment 直播评论

---

## 基础用法

<div class='demo-block'>
    <lin-live-comment
      v-model="content1"
      :fixComment="fixComment1"
      :arrowComment="true"
      :commentList="commentList1"
      @sendBtnClick="sendBtnClick1"
      @toBottom="toBottom1"
    >
    </lin-live-comment>
</div>

:::demo

```html
<lin-live-comment
  v-model="content1"
  :fixComment="fixComment1"
  :arrowComment="true"
  :commentList="commentList1"
  @sendBtnClick="sendBtnClick1"
  @toBottom="toBottom1"
>
</lin-live-comment>

<script>
  export default {
    data() {
      return {
        commentList1: [],
        fixComment1: null,
        content1: "",
      };
    },
    methods: {
      sendBtnClick1() {
        if (!this.content1) {
          alert("评论内容不能为空");
          return;
        }
        const content = {
          _username: "李四",
          _createTimeTip: "11:34:52",
          _content: this.content1,
        };
        this.commentList1.push(content);
        this.fixComment1 = content;
        this.content1 = "";
      },
      toBottom1() {
        this.fixComment1 = null;
      },
    },
  };
</script>
```

:::

## 自定义插槽

组件提供了 4 个自定义插槽，分别是 `title` , `view-count` , `default` , `mask`

<div class='demo-block'>
    <lin-live-comment
      v-model="content2"
      :fixComment="fixComment2"
      :arrowComment="true"
      :commentList="commentList2"
      @sendBtnClick="sendBtnClick2"
      @toBottom="toBottom2"
    >
      <template v-slot='slotProps'>
        <p>{{slotProps.item._content}}</p>
      </template>
    </lin-live-comment>
</div>

:::demo

```html
<lin-live-comment
  v-model="content2"
  :fixComment="fixComment2"
  :arrowComment="true"
  :commentList="commentList2"
  @sendBtnClick="sendBtnClick2"
  @toBottom="toBottom2"
>
  <template v-slot="slotProps">
    <p>{{slotProps.item._content}}</p>
  </template>
</lin-live-comment>

<script>
  export default {
    data() {
      return {
        commentList2: [],
        fixComment2: null,
        content2: "",
      };
    },
    methods: {
      sendBtnClick2() {
        if (!this.content2) {
          alert("评论内容不能为空");
          return;
        }
        const content = {
          _username: "李四",
          _createTimeTip: "11:34:52",
          _content: this.content2,
        };
        this.commentList2.push(content);
        this.fixComment2 = content;
        this.content2 = "";
      },
      toBottom2() {
        this.fixComment2 = null;
      },
    },
  };
</script>
```

:::

## 属性

| 参数          | 说明                                                                                             | 类型    | 可选值 | 默认值   |
| ------------- | ------------------------------------------------------------------------------------------------ | ------- | ------ | -------- |
| commentList   | 评论列表，格式[{_username:'',_createTimeTip:'',_content:'',_avatorUrl:''}]                       | Array   | —      | []       |
| fixComment    | 悬浮的评论，格式{\_username:'',\_content:''}，当 fixComment 不为空并且列表没有滚动到最底部时显示 | Object  |        | null     |
| value/v-model | 绑定的值                                                                                         | String  | —      | —        |
| btnText       | 按钮文字                                                                                         | String  | —      | 发送     |
| arrowComment  | 是否允许发表评论                                                                                 | Boolean | —      | false    |
| placeholder   | 输入框提示文本                                                                                   | String  | —      | 请输入   |
| maxlength     | 文本输入框的最长长度                                                                             | Number  | —      | -1       |
| throttle      | 滚动事件是否节流                                                                                 | Boolean | —      | true     |
| title         | 标题                                                                                             | String  | —      | 直播评论 |
| viewCount     | 观看人数                                                                                         | Number  | —      | 0        |
| defaultAvator | 默认的用户头像                                                                                   | String  | —      | —        |
| isLoading     | 是否正在加载，可防止用户多次点击按钮                                                             | Boolean | —      | false    |

## 插槽

| 插槽名称   | 说明                       |
| ---------- | -------------------------- |
| —          | 评论列表项内容             |
| title      | 标题区的内容               |
| view-count | 副标题区内容               |
| mask       | 不允许发表评论时显示的内容 |

## 事件

| 事件名称      | 说明                 | 回调参数 |
| ------------- | -------------------- | -------- |
| toBottom      | 列表滚动到底部时触发 | —        |
| scroll        | 列表滚动时触发       | e(Event) |
| sendBtnClick  | 点击按钮时触发       | —        |
| loginBtnClick | 点击登录时触发       | —        |
