<style lang="scss" scoped>
    .lin-input{
        width:250px;
    }

    .input-group{
        display:flex;
        flex-direction: column;
        .lin-input+.lin-input{
            margin-top:20px;
        }
    }
</style>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: ""
    };
  }
};
</script>

# Input

---

Input is a controlled component, it always shows Vue binding value.

Under normal circumstances, `input` event should be handled. Its handler should update component's binding value (or use `v-model`). Otherwise, input box's value will not change.

Do not support `v-model` modifiers.

## Basic usage

Use `v-model` to bind the value of the input

<div class='demo-block'>
<lin-input v-model="value1" placeholder="Please input"></lin-input>
</div>

:::demo

```html
<lin-input v-model="value1" placeholder="Please input"></lin-input>

<script>
  export default {
    data() {
      return {
        value1: "",
      };
    },
  };
</script>
```

:::

## Essential attribute

Currently, three native attributes bound to the input field are supported, which are `name`,`maxlength`,`minlength`

<div class='demo-block input-group'>
<lin-input v-model="value2" placeholder="name" name="userName"></lin-input>
<lin-input v-model="value7" placeholder="maxlength" :maxlength="10"></lin-input>
<lin-input v-model="value8" placeholder="minlength" :minlength="2"></lin-input>
</div>

:::demo

```html
<lin-input v-model="value2" placeholder="name" name="userName"></lin-input>
<lin-input v-model="value7" placeholder="maxlength" :maxlength="10"></lin-input>
<lin-input v-model="value8" placeholder="minlength" :minlength="2"></lin-input>

<script>
  export default {
    data() {
      return {
        value2: "",
        value7: "",
        value8: "",
      };
    },
  };
</script>
```

:::

## Disabled

Disable the Input with the `disabled` attribute.

<div class='demo-block'>
<lin-input v-model="value3" placeholder="Please input" disabled></lin-input>
</div>

:::demo

```html
<lin-input v-model="value3" placeholder="Please input" disabled></lin-input>

<script>
  export default {
    data() {
      return {
        value3: "",
      };
    },
  };
</script>
```

:::

## Clearable

Make the Input `clearable` with the clearable attribute.

<div class='demo-block'>
<lin-input v-model="value4" placeholder="Please input" clearable></lin-input>
</div>

:::demo

```html
<lin-input v-model="value4" placeholder="Please input" clearable></lin-input>

<script>
  export default {
    data() {
      return {
        value4: "",
      };
    },
  };
</script>
```

:::

## Password box

Make a toggleable password Input with the `showPassword` attribute.

<div class='demo-block'>
<lin-input v-model="value5" placeholder="Please input" show-password></lin-input>
</div>

:::demo

```html
<lin-input
  v-model="value5"
  placeholder="Please input"
  show-password
></lin-input>

<script>
  export default {
    data() {
      return {
        value5: "",
      };
    },
  };
</script>
```

:::

## Input with icon

Place icons through slots

<div class='demo-block'>
    <lin-input v-model="value6" placeholder="Please input">
      <i class="lin-icon-user"></i>
    </lin-input>
</div>

:::demo

```html
<lin-input v-model="value6" placeholder="Please input">
  <i class="lin-icon-user"></i>
</lin-input>

<script>
  export default {
    data() {
      return {
        value6: "",
      };
    },
  };
</script>
```

:::

## Attributes

| Attribute       | Description                               | Type    | Accepted Values | Default |
| --------------- | ----------------------------------------- | ------- | --------------- | ------- |
| placeholder     | placeholder of Input                      | String  | —               | —       |
| type            | type of input                             | String  | —               | text    |
| name            | same as `name` in native input            | String  | —               | —       |
| disabled        | whether Input is disabled                 | Boolean | —               | false   |
| value / v-model | binding value                             | String  | —               | —       |
| clearable       | whether to show clear button              | Boolean | —               | false   |
| showPassword    | whether to show toggleable password input | Boolean | —               | false   |

## Events

| Event Name | Description                 | Parameters     |
| ---------- | --------------------------- | -------------- |
| blur       | triggers when Input blurs   | (event: Event) |
| focus      | triggers when Input focuses | (event: Event) |

## Slots

| Name | Description                      |
| ---- | -------------------------------- |
| —    | Contents at the end of the input |
