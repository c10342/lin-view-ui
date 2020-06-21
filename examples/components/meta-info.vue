<template>
  <div>meta-info</div>
</template>


<script>
export default {
  name: "test-meta-info",
  metaInfo() {
    return {
      title: this.pageName
    };
  },
  data() {
    return {
      pageName: "loading"
    };
  },
  mounted() {
    setTimeout(() => {
      this.pageName = "async";
    }, 2000);
  }
};
</script>