<template>
  <div>
    <lin-pagination :total="100" />
    <lin-pagination :total="100" :pageIndex.sync="currentPage" background />
  </div>
</template>

<script>
export default {
  name: "test-pagination",
  data() {
    return {
      currentPage: 6,
    };
  },
};
</script>