<template>
  <div>
    <lin-upload
      @mergeFileSuccess="mergeFileSuccess"
      breakpoint
      text="断电续传"
      uploadUrl="http://localhost:3000/uploadFileByBreakpoint"
      mergeUrl="http://localhost:3000/mergeByBreakpoint"
    />
    <lin-upload
      @mergeFileSuccess="mergeFileSuccess"
      isSlice
      text="切片上传"
      uploadUrl="http://localhost:3000/uploadFileBySlice"
      mergeUrl="http://localhost:3000/mergeBySlice"
    />
    <lin-upload
      @uploadSuccess="mergeFileSuccess"
      text="普通上传"
      uploadUrl="http://localhost:3000/uploadFile"
    />
  </div>
</template>

<script>
export default {
  name: "test-upload",
  methods: {
    mergeFileSuccess(e) {
      console.log(e);
    },
  },
};
</script>