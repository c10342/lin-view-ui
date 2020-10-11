<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      value4: ""
    };
  }
};
</script>

# LimitTextarea

---

## Basic usage

Limittextarea can control the number of characters entered by the user, and `placeholder` specifies the prompt text for initial input

<div class="demo-block">
<lin-limit-textarea v-model="value1" :maxLen="10" placeholder="Enter up to 10 characters"></lin-limit-textarea>
</div>

::: demo

```html
<lin-limit-textarea
  v-model="value1"
  :max-len="10"
  placeholder="Enter up to 10 characters"
/>

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

## Crop out of character

If the number of characters exceeds the limit, you can crop the excess by setting the `isCut` attribute

<div class="demo-block">
<lin-limit-textarea v-model="value2" :max-len="10" placeholder="Enter up to 10 characters" is-cut></lin-limit-textarea>
</div>

::: demo

```html
<lin-limit-textarea
  v-model="value2"
  :max-len="10"
  placeholder="Enter up to 10 characters"
  is-cut
/>

<script>
  export default {
    data() {
      return {
        value2: "",
      };
    },
  };
</script>
```

:::

## Column height

Specify the height through the `rows` attribute

<div class="demo-block">
<lin-limit-textarea v-model='value3' :max-len="10" :rows="3" placeholder="Enter up to 10 characters" is-cut></lin-limit-textarea>
</div>

:::demo

```html
<lin-limit-textarea
  v-model="value3"
  :max-len="10"
  :rows="3"
  placeholder="Enter up to 10 characters"
  is-cut
/>

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

## Attributes

| Attribute       | Description                              | Type    | Accepted Values | Default                  |
| --------------- | ---------------------------------------- | ------- | --------------- | ------------------------ |
| rows            | Column height                            | Number  | —               | 4                        |
| max-len         | Maximum length limit                     | Number  | —               | -1(Unlimited length)     |
| is-cut          | Whether to crop the exceeding characters | Boolean | —               | false                    |
| placeholder     | Prompt copy to be displayed during input | String  | —               | Please enter the content |
| value / v-model | Binding value                            | String  | —               | —                        |

## Events

| Event Name | Description                                                                                                                                              | Parameters |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| overText   | Triggered when the limit length is exceeded and iscut is false                                                                                           | content    |
| change     | It is triggered when the input value changes. It is not triggered when iscut is true and the value value length is greater than the maximum length limit | value      |
