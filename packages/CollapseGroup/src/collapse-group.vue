<template>
  <div :class="[{'lin-collapse-group-simple':simple},'lin-collapse-group']">
    <slot></slot>
  </div>
</template>


<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "LinCollapseGroup",
  props: {
    value: {
      type: [Array, String],
    },
    accordion: {
      type: Boolean,
      default: false,
    },
    simple: {
      type: Boolean,
      default: false,
    }
  },
  computed:{
    collapseValue:{
      get(){
        if(typeof this.value === 'string' || Array.isArray(this.value)){
          return this.value
        }
        return this.valueData
      },
      set(val){
        if(typeof this.value === 'string' || Array.isArray(this.value)){
          this.$emit("input", this.handleData(val));
        }else{
          this.valueData = this.handleData(val)
        }
        this.$emit('onChange',val)
      }
    }
  },
  provide() {
    return {
      collapseGroup: this,
    };
  },
  data(){
    return {
      valueData:''
    }
  },
  methods: {
    handleData(data){
      let da;
      if (this.accordion) {
        if(data.length>0){
          da =  data[0]
        }else{
          da = ''
        }
      } else {
        da = data
      }
      return cloneDeep(da)
    },
  },
};
</script>
