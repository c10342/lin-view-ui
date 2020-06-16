<template>
  <div>
    <l-image :imgUrl="require('../assets/images/video-card.png')" />
    <l-image :imgUrl="['xxx.png',require('../assets/images/logo.png')]" />
    <l-image preview :imgUrl="require('../assets/images/video-card.png')" />
  </div>
</template>

<script>
export default {
  name: "test-image"
};
</script>
