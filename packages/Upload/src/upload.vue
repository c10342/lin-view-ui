<template>
  <div>
    <input
      @change="onFileChange"
      style="display: none"
      type="file"
      ref="linUploadInput"
    />
    <lin-button @click="onBtnClick" type="primary">{{ text }}</lin-button>
  </div>
</template>

<script>
import LinButton from "packages/Button/index.js";
import splitFileChunk from "src/utils/splitFileChunk.js";
import caculateFileHash from "src/utils/caculateFileHash.js";
import request from "src/js/request.js";
export default {
  name: "LinUpload",
  components: {
    "lin-button": LinButton,
  },
  props: {
    text: {
      type: String,
      default: "",
    },
    fileChunkSize: {
      type: Number,
      default: 10 * 1024 * 1024,
    },
    uploadUrl: {
      type: String,
      required: true,
    },
    mergeUrl: {
      type: String,
    },
    // 是否切片上传
    isSlice: {
      type: Boolean,
      default: false,
    },
    // 开启断点续传功能
    breakpoint: {
      type: Boolean,
      default: false,
    },
    beforeUpload: {
      type: Function,
    },
    splitFileChunk: {
      type: Function,
    },
    caculateFileHash: {
      type: Function,
    },
    requestMergeFileFn: {
      type: Function,
    },
  },
  mounted() {
    // 文件
    this.selectedFile = null;
    // 文件切片数据
    this.fileChunkListData = [];
    // 请求列表
    this.requestList = [];
    // 文件hash值
    this.fileHash = null;
    this.fileChunkList = [];
  },
  methods: {
    onFileChange(e) {
      // 获取文件
      this.selectedFile = e.target.files[0];
      this.$refs.linUploadInput.value = "";
      if (typeof this.beforeUpload === "function") {
        const res = this.beforeUpload(this.selectedFile);
        if (res instanceof Promise) {
          res
            .then(() => {
              this.handleUpload();
            })
            .catch(() => {});
        } else if (!res) {
          this.handleUpload();
        }
      } else {
        this.handleUpload();
      }
    },
    onBtnClick() {
      this.$refs.linUploadInput.click();
    },
    handleUpload() {
      // 或者切片上传
      if (this.breakpoint) {
        // 开启断点续传
        this.uploadFileByBreakpoint();
      } else if (this.isSlice) {
        // 切片上传
        this.uploadFileBySlice();
      } else {
        this.uploadFile();
      }
    },

    // 切片上传逻辑
    uploadFileBySlice() {
      this.createFileChunkList();
      this.fileChunkListData = this.fileChunkList.map((file, index) => {
        return {
          // 切片
          chunk: file,
          hash: this.selectedFile.name + "-" + index,
        };
      });
      this.uploadChunksBySlice();
    },

    // 断点上传逻辑
    async uploadFileByBreakpoint() {
      this.createFileChunkList();
      try {
        // 计算出文件hash值
        if (typeof this.caculateFileHash === "function") {
          this.fileHash = await this.caculateFileHash(this.selectedFile);
        } else {
          this.fileHash = await caculateFileHash(this.selectedFile);
        }
        this.$emit("caculateFileHashSuccess", this.fileHash);
      } catch (error) {
        this.$emit("caculateFileHashFail", error);
      }

      // 读取localStorage中是否已经有上传过的切片
      let uploadedChunkList = [];
      if (window.localStorage.getItem(this.fileHash)) {
        try {
          uploadedChunkList = JSON.parse(
            window.localStorage.getItem(this.fileHash)
          );
        } catch (error) {}
      }

      // 存储每个切片相应的信息
      this.fileChunkListData = this.fileChunkList.map((file, index) => {
        return {
          chunk: file,
          hash: `${this.fileHash}-${index}`,
          fileHash: this.fileHash,
        };
      });

      // 上传切片
      this.uploadChunksByBreakpoint(uploadedChunkList);
    },

    // 普通上传
    async uploadFile() {
      try {
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        const res = await request({
          url: this.uploadUrl,
          data: formData,
        });
        this.$emit("uploadSuccess", res);
      } catch (error) {
        this.$emit("uploadFail", error);
      }
    },

    // 切片上传切片
    async uploadChunksBySlice() {
      if (!this.uploadUrl) {
        throw new TypeError("uploadUrl is not define");
        return;
      }
      const requestList = this.fileChunkListData
        .map(({ chunk, hash, index }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", this.selectedFile.name);
          return { formData, index };
        })
        .map(({ formData, index }) => {
          return request({
            url: this.uploadUrl,
            data: formData,
          });
        });
      try {
        const res = await Promise.all(requestList);
        this.$emit("uploadChunkSuccess", res);
      } catch (error) {
        this.$emit("uploadChunkFail", error);
      }

      this.requestMergeFile();
    },

    // 断点续传上传切片
    async uploadChunksByBreakpoint(uploadedChunkList) {
      if (!this.uploadUrl) {
        throw new TypeError("uploadUrl is not define");
        return;
      }
      // 过滤掉已经上传过得切片
      const requestPromiseList = this.fileChunkListData
        .filter(({ hash }) => !uploadedChunkList.includes(hash))
        .map(({ chunk, hash, fileHash }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", this.selectedFile.name);
          formData.append("fileHash", fileHash);
          return { formData, hash, fileHash };
        })
        .map(({ formData, hash, fileHash }) => {
          return request({
            url: this.uploadUrl,
            data: formData,
            requestList: this.requestList,
            hash,
            fileHash,
          });
        });

      // 上传切片
      if (requestPromiseList.length > 0) {
        try {
          const res = await Promise.all(requestPromiseList);
          this.$emit("uploadChunkSuccess", res);
        } catch (error) {
          this.$emit("uploadChunkFail", error);
        }
      }

      if (
        uploadedChunkList.length + requestPromiseList.length ===
        this.fileChunkListData.length
      ) {
        // 请求合并切片
        this.requestMergeFile();
      }
    },

    // 创建chuank
    createFileChunkList() {
      // 将文件进行切片
      try {
        if (typeof this.splitFileChunk === "function") {
          this.fileChunkList = this.splitFileChunk(
            this.selectedFile,
            this.fileChunkSize
          );
        } else {
          this.fileChunkList = splitFileChunk(
            this.selectedFile,
            this.fileChunkSize
          );
        }
        this.$emit("createChunkListSuccess", this.fileChunkList);
      } catch (error) {
        this.$emit("createChunkListFail", error);
      }
    },

    // 请求合并切片
    async requestMergeFile() {
      try {
        if (!this.mergeUrl) {
          throw new TypeError("mergeUrl is not define");
          return;
        }
        let res;
        const parmas = {
          filename: this.selectedFile.name,
          size: this.fileChunkSize,
        };
        if (this.breakpoint) {
          parmas.fileHash = this.fileHash;
        }
        if (typeof this.requestMergeFileFn === "function") {
          res = await this.requestMergeFileFn(parmas);
        } else {
          res = await request({
            url: this.mergeUrl,
            headers: {
              "content-type": "application/json",
            },
            data: JSON.stringify(parmas),
          });
        }
        this.$emit("mergeFileSuccess", res);
        window.localStorage.removeItem(this.fileHash);
      } catch (error) {
        this.$emit("mergeFileFail", error);
      }
    },
  },
};
</script>