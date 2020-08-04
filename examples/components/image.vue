<template>
  <div>
    <lin-image :imgUrl="require('../assets/images/video-card.png')" />
    <lin-image :imgUrl="['xxx.png',require('../assets/images/logo.png')]" />
    <lin-image preview :imgUrl="require('../assets/images/video-card.png')" />
  </div>
</template>

<script>
export default {
  name: "test-image",
};
</script>
