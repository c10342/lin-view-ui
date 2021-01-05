<template>
  <div>
    <div class="lin-dropdown-group-label" v-if="label">{{label}}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LinDropdownGroup',
  props: {
    label: String
  }
};
</script>
