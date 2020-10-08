<script>
export default {
  data() {
    return { 
      value1: false,
      value2: false,
      value3: true,
      value4: false
    };
  }
};
</script>

# Switch

---

## Basic usage

Bi directional data binding using `v-model`

<div class='demo-block'>
<lin-switch v-model="value1" />
</div>

:::demo

```html
<lin-switch v-model="value1" />

<script>
  export default {
    data() {
      return {
        value1: false,
      };
    },
  };
</script>
```

:::

## Background color

Use the `activeColor` and `inactiveColor` properties to set the background color of the switch

<div class='demo-block'>
<lin-switch v-model="value2" active-color="green" inactive-color="red" />
</div>

:::demo

```html
<lin-switch v-model="value2" active-color="green" inactive-color="red" />

<script>
  export default {
    data() {
      return {
        value2: false,
      };
    },
  };
</script>
```

:::

## Disabled

Adding the disabled attribute `disabled` Switch.

<div class='demo-block'>
<lin-switch v-model="value3" disabled/>
</div>

:::demo

```html
<lin-switch v-model="value3" disabled />

<script>
  export default {
    data() {
      return {
        value3: false,
      };
    },
  };
</script>
```

:::

## Essential attribute

Currently, only `name` can be bound to native properties

<div class='demo-block'>
<lin-switch v-model="value4" name='userName'/>
</div>

:::demo

```html
<lin-switch v-model="value4" name="userName" />

<script>
  export default {
    data() {
      return {
        value4: false,
      };
    },
  };
</script>
```

:::

## Attributes

| Attribute | Description  | Type  | Accepted Values | Default|
| --------------- | --------------------- | ------- | ------ | ------ |
| value / v-model | binding value                | Boolean | —      | false  |
| activeColor     | Background color when switch is on | String  | —      | —      |
| inactiveColor   | Background color when switch is off | String  | —      | —      |
| name            | input name of Switch         | String  | —      | —      |
| disabled        | whether Switch is disabled              | Boolean | —      | false  |
