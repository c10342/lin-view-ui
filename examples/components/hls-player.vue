<template>
  <div class="hls-player">
    <lin-hls-player />
    <!-- <div class="test-demo"></div> -->
  </div>
</template>

<script>
export default {
  name: "test-hls-player",
};
</script>

<style lang="scss" scoped>
.hls-player {
  padding-left: 100px;
}

.test-demo {
  border: 1px solid red;
  height: 600px;
  width: 400px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==)
    repeat-x bottom;
  // background-position: 0 300px;
}
</style>