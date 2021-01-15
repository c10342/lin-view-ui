# LiveComment

[[toc]]

---

## Basic usage

:::demo

```vue
<template>
  <lin-live-comment
    v-model="content1"
    :fixComment="fixComment1"
    :arrowComment="true"
    :commentList="commentList1"
    @sendBtnClick="sendBtnClick1"
    @toBottom="toBottom1"
  >
  </lin-live-comment>
</template>

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
        alert("Comment content cannot be empty");
        return;
      }
      const content = {
        _username: "lisi",
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

## Custom slot

The component provides four custom slots, which are `title`, `view-count`, `default`, and `mask`

:::demo

```vue
<template>
  <lin-live-comment
    v-model="content2"
    :fixComment="fixComment2"
    :arrowComment="true"
    :commentList="commentList2"
    @sendBtnClick="sendBtnClick2"
    @toBottom="toBottom2"
  >
    <template v-slot="slotProps">
      <p>{{ slotProps.item._content }}</p>
    </template>
  </lin-live-comment>
</template>

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
        alert("Comment content cannot be empty");
        return;
      }
      const content = {
        _username: "lisi",
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

## Attributes

| Attribute     | Description                                                                                                                             | Type    | Accepted Values | Default         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------- | --------------- |
| commentList   | Comment list,format:[{_username:'',_createTimeTip:'',_content:'',_avatorUrl:''}]                                                        | Array   | —               | []              |
| fixComment    | Floating comments,format:{\_username:'',\_content:''},Displayed when fixcomment is not empty and the list does not scroll to the bottom | Object  |                 | null            |
| value/v-model | Bound value                                                                                                                             | String  | —               | —               |
| btnText       | Button text                                                                                                                             | String  | —               | Send            |
| arrowComment  | Are comments allowed                                                                                                                    | Boolean | —               | false           |
| placeholder   | Input box prompt text                                                                                                                   | String  | —               | Please enter    |
| maxlength     | The maximum length of the text input box                                                                                                | Number  | —               | -1              |
| throttle      | Is rolling event throttling                                                                                                             | Boolean | —               | true            |
| title         | title                                                                                                                                   | String  | —               | Live commentary |
| viewCount     | Number of viewers                                                                                                                       | Number  | —               | 0               |
| defaultAvator | Default user Avatar                                                                                                                     | String  | —               | —               |
| isLoading     | Whether it is loading or not can prevent users from clicking the button multiple times                                                  | Boolean | —               | false           |

## Slots

| Name       | Description                                     |
| ---------- | ----------------------------------------------- |
| —          | Comment list item content                       |
| title      | Content of the title area                       |
| view-count | Content of subheading area                      |
| mask       | Content displayed when comments are not allowed |

## Events

| Event Name    | Description                                   | Parameters |
| ------------- | --------------------------------------------- | ---------- |
| toBottom      | Triggered when the list scrolls to the bottom | —          |
| scroll        | Triggered when the list scrolls               | e(Event)   |
| sendBtnClick  | Triggered when the button is pressed          | —          |
| loginBtnClick | Triggered when clicking login                 | —          |
