<style lang="scss" scoped>
.dialog-footer {
  .lin-button {
    margin-left: 10px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false
    };
  },
  methods: {
    click1() {
      this.visible1 = true;
    },
    click2() {
      this.visible2 = true;
    },
    click3() {
      this.visible3 = true;
    },
    click4() {
      this.visible4 = true;
    },
    handleClose(done) {
      alert("Click close");
      done();
    },
    onClose(){
        alert('关闭了弹框')
    }
  }
};
</script>

# Dialog

---

## Basic usage

You need to set the `visible` property, which receives `Boolean` and displays dialog when it is `true`. The dialog is divided into two parts: body and footer. The footer needs to have a slot named footer. The title property is used to define the title, which is optional and has a default value of prompt. The width property is used to define the width of the dialog. The default value is 50%. The top property is used to define the distance between the dialog and the top of the browser. The default value is 15vh.


<div class='demo-block'>
<lin-button @click="click1">click to open the Dialog</lin-button>
<lin-dialog 
    :visible.sync="visible1" 
    width="30%" 
    title="title" 
    top="20vh">
    <span>This is a message</span>
    <span slot="footer" class="dialog-footer">
        <lin-button @click="visible1 = false">Cancel</lin-button>
        <lin-button type="primary" @click="visible1 = false">Confirm</lin-button>
    </span>
</lin-dialog>
</div>

:::demo

```html
<lin-button @click="click1">click to open the Dialog</lin-button>
<lin-dialog :visible.sync="visible1" width="30%" title="title" top="20vh">
  <span>This is a message</span>
  <span slot="footer" class="dialog-footer">
    <lin-button @click="visible1 = false">Cancel</lin-button>
    <lin-button type="primary" @click="visible1 = false">Confirm</lin-button>
  </span>
</lin-dialog>

<script>
  export default {
    data() {
      return {
        visible1: false,
      };
    },
    methods: {
      click1() {
        this.visible1 = true;
      },
    },
  };
</script>
```

:::

## The mask layer is not clickable

Use the `closeOnClickModa` property to set the mask layer to a non clickable state

<div class='demo-block'>
<lin-button @click="click2">click to open the Dialog</lin-button>
<lin-dialog 
    :visible.sync="visible2" 
    :closeOnClickModa="false">
    <span>This is a message</span>
</lin-dialog>
</div>

:::demo

```html
<lin-button @click="click2">click to open the Dialog</lin-button>
<lin-dialog :visible.sync="visible2" :closeOnClickModa="false">
  <span>This is a message</span>
</lin-dialog>

<script>
  export default {
    data() {
      return {
        visible2: false,
      };
    },
    methods: {
      click2() {
        this.visible2 = true;
      },
    },
  };
</script>
```

:::

## Determine whether it needs to be closed

Use the `before-close` attribute to determine whether the dialog needs to be closed before it is closed. A function will be passed in as a parameter. After the function is called, the dialog will be closed, otherwise it will not be closed.

<div class='demo-block'>
    <lin-button @click="click3">click to open the Dialog</lin-button>
    <lin-dialog :visible.sync="visible3" :before-close="handleClose">
    <span>This is a message</span>
    </lin-dialog>
</div>

:::demo

```html
<lin-button @click="click3">click to open the Dialog</lin-button>
<lin-dialog :visible.sync="visible3" :before-close="handleClose">
  <span>This is a message</span>
</lin-dialog>

<script>
  export default {
    data() {
      return {
        visible3: false,
      };
    },
    methods: {
      click3() {
        this.visible3 = true;
      },
      handleClose(done) {
        alert("Click close");
        done();
      },
    },
  };
</script>
```

:::

## Custom title

Use slot to name the slot, and the slot name is title

<div class='demo-block'>
    <lin-button @click="click4">click to open the Dialog</lin-button>
      <lin-dialog :visible.sync="visible4" @close='onClose'>
        <template v-slot:title>
          <span>This is a custom title</span>
        </template>
        <span>This is a message</span>
    </lin-dialog>
</div>

:::demo

```html
<lin-button @click="click4">click to open the Dialog</lin-button>
<lin-dialog :visible.sync="visible4">
  <template v-slot:title>
    <span>This is a custom title</span>
  </template>
  <span>This is a message</span>
</lin-dialog>

<script>
  export default {
    data() {
      return {
        visible4: false,
      };
    },
    methods: {
      click4() {
        this.visible4 = true;
      },
      onClose() {
        alert("The pop-up is closed");
      },
    },
  };
</script>
```

:::

## Attributes

| Attribute             | Description                                            | Type                                 | Accepted Values | Default |
| ---------------- | ----------------------------------------------- | ------------------------------------ | ------ | ------ |
| title            | title of Dialog. Can also be passed with a named slot (see the following table) | String                               | —      | Title   |
| width            | width of Dialog                                   | String                               | —      | 50%    |
| top              | value for `margin-top` of Dialog CSS                   | String                               | —      | 15vh   |
| visible          | visibility of Dialog, supports the .sync modifier              | Boolean                              | —      | false  |
| beforeClose      | callback before Dialog closes, and it will prevent Dialog from closing            | function(done)，done is used to close the Dialog | —      | —      |
| closeOnClickModa | whether the Dialog can be closed by clicking the mask              | Boolean                              | —      | true   |

## Slot

| Name | Name                    |
| -------- | ----------------------- |
| —        | content of Dialog           |
| title    | content of the Dialog title     |
| footer   | content of the Dialog footer |

## Events

| Event Name | Description              | Parameters |
| -------- | ----------------- | -------- |
| close    | triggers when the Dialog closes | —        |
