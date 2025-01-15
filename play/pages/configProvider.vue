<template>
    <div>
      <z-config-provider :locale="currentLang">
        <z-button size="small" type="primary">1</z-button>
      </z-config-provider>
  
      <button @click="onClick">切换语言</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { zhCN, enUS } from '@packages/locale';
  import { computed, ref } from 'vue';
  
  const isEnglish = ref(false)

  const currentLang = computed(()=>{
    if(isEnglish.value){
        return enUS
    }
    return zhCN
  })
  const onClick = () => {
    isEnglish.value = !isEnglish.value
  }
  </script>
  
  <style lang="scss" scoped>
  // todo
  </style>
  