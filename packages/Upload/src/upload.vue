<template>
  <div>
    <input
      @change="onFileChange"
      style="display: none;"
      type="file"
      ref="linUploadInput"
    />
    <lin-button @click="onBtnClick" type="primary">{{ text }}</lin-button>
  </div>
</template>

<script>
import LinButton from 'packages/Button/index.js';
import splitFileChunk from 'src/utils/splitFileChunk.js';
import caculateFileHash from 'src/utils/caculateFileHash.js';
import request from 'src/js/request.js';

export default {
  name: 'LinUpload',
  components: {
    'lin-button': LinButton
  },
  props: {
    // 文本
    text: {
      type: String,
      default: ''
    },
    // 切片大小
    fileChunkSize: {
      type: Number,
      default: 10 * 1024 * 1024
    },
    // 上传地址
    uploadUrl: {
      type: String,
      required: true
    },
    // 请求合并切片地址
    mergeUrl: {
      type: String
    },
    // 是否切片上传
    isSlice: {
      type: Boolean,
      default: false
    },
    // 开启断点续传功能
    breakpoint: {
      type: Boolean,
      default: false
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload: {
      type: Function
    },
    // 对文件进行切片的处理方法
    splitFileChunk: {
      type: Function
    },
    // 计算文件 hash 值的方法，需返回一个 Promise
    caculateFileHash: {
      type: Function
    },
    // 请求合并切片的方法 ，需返回一个 Promise
    requestMergeFileFn: {
      type: Function
    }
  },
  mounted () {
    // 文件
    this.selectedFile = null;
    // 文件切片数据（经过处理的）
    this.fileChunkListData = [];
    // 请求列表
    this.requestList = [];
    // 文件hash值
    this.fileHash = null;
    // 文件切片数据（未经过处理的）
    this.fileChunkList = [];
  },
  methods: {
    onFileChange (e) {
      // 获取文件
      this.selectedFile = e.target.files[0];
      // 清空值
      this.$refs.linUploadInput.value = '';
      if (typeof this.beforeUpload === 'function') {
        // 存在beforeUpload函数
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
    // 点击按钮
    onBtnClick () {
      this.$refs.linUploadInput.click();
    },
    handleUpload () {
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
    uploadFileBySlice () {
      // 对文件进行切片
      this.createFileChunkList();
      // 给切片出来的数据添加额外信息
      this.fileChunkListData = this.fileChunkList.map((file, index) => ({
        // 切片文件
        chunk: file,
        // 切片hash，给个索引是为了，全部上传完之后，后台可以知道每个切片所在的位置
        hash: `${this.selectedFile.name}-${index}`
      }));
      // 上传切片
      this.uploadChunksBySlice();
    },

    // 断点上传逻辑
    async uploadFileByBreakpoint () {
      // 对文件进行切片
      this.createFileChunkList();
      try {
        // 计算出文件hash值
        if (typeof this.caculateFileHash === 'function') {
          // 自定义计算文件hash值
          this.fileHash = await this.caculateFileHash(this.selectedFile);
        } else {
          this.fileHash = await caculateFileHash(this.selectedFile);
        }
        this.$emit('caculateFileHashSuccess', this.fileHash);
      } catch (error) {
        this.$emit('caculateFileHashFail', error);
      }

      // 读取localStorage中是否已经有上传过的切片
      let uploadedChunkList = [];
      if (window.localStorage.getItem(this.fileHash)) {
        try {
          uploadedChunkList = JSON.parse(
            window.localStorage.getItem(this.fileHash)
          );
        } catch (error) {
          // todo
        }
      }

      // 存储每个切片相应的信息
      this.fileChunkListData = this.fileChunkList.map((file, index) => ({
        // 切片文件
        chunk: file,
        // 切片hash值
        hash: `${this.fileHash}-${index}`,
        // 整个文件的hash值
        fileHash: this.fileHash
      }));

      // 上传切片
      this.uploadChunksByBreakpoint(uploadedChunkList);
    },

    // 普通上传
    async uploadFile () {
      try {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        const res = await request({
          url: this.uploadUrl,
          data: formData
        });
        this.$emit('uploadSuccess', res);
      } catch (error) {
        this.$emit('uploadFail', error);
      }
    },

    // 切片上传切片
    async uploadChunksBySlice () {
      if (!this.uploadUrl) {
        throw new TypeError('uploadUrl is not define');
      }
      // 创建请求列表
      const requestList = this.fileChunkListData
        .map(({ chunk, hash, index }) => {
          const formData = new FormData();
          // 切片文件
          formData.append('chunk', chunk);
          // 切片hash值
          formData.append('hash', hash);
          // 文件名（不是切片的文件名，而是整个大文件的文件名）
          formData.append('filename', this.selectedFile.name);
          return { formData, index };
        })
        .map(({ formData }) => request({
          url: this.uploadUrl,
          data: formData
        }));
      try {
        // 等待所有切片上传完毕
        const res = await Promise.all(requestList);
        this.$emit('uploadChunkSuccess', res);
      } catch (error) {
        this.$emit('uploadChunkFail', error);
      }
      // 请求合并切片
      this.requestMergeFile();
    },

    // 断点续传上传切片
    async uploadChunksByBreakpoint (uploadedChunkList) {
      if (!this.uploadUrl) {
        throw new TypeError('uploadUrl is not define');
      }
      // 过滤掉已经上传过得切片
      const requestPromiseList = this.fileChunkListData
        .filter(({ hash }) => !uploadedChunkList.includes(hash))
        .map(({ chunk, hash, fileHash }) => {
          const formData = new FormData();
          // 切片文件
          formData.append('chunk', chunk);
          // 切片文件hash值
          formData.append('hash', hash);
          // 文件名
          formData.append('filename', this.selectedFile.name);
          // 文件hash
          formData.append('fileHash', fileHash);
          return { formData, hash, fileHash };
        })
        .map(({ formData, hash, fileHash }) => request({
          url: this.uploadUrl,
          data: formData,
          requestList: this.requestList,
          hash,
          fileHash
        }));

      // 上传切片
      if (requestPromiseList.length > 0) {
        try {
          const res = await Promise.all(requestPromiseList);
          this.$emit('uploadChunkSuccess', res);
        } catch (error) {
          this.$emit('uploadChunkFail', error);
        }
      }

      if (
        uploadedChunkList.length + requestPromiseList.length ===
        this.fileChunkListData.length
      ) {
        // 已经上传的切片数量加上+请求上传的列表数量=总的切片数量
        // 请求合并切片
        this.requestMergeFile();
      }
    },

    // 创建chuank
    createFileChunkList () {
      // 将文件进行切片
      try {
        if (typeof this.splitFileChunk === 'function') {
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
        this.$emit('createChunkListSuccess', this.fileChunkList);
      } catch (error) {
        this.$emit('createChunkListFail', error);
      }
    },

    // 请求合并切片
    async requestMergeFile () {
      try {
        if (!this.mergeUrl) {
          throw new TypeError('mergeUrl is not define');
        }
        let res;
        const parmas = {
          // 文件名
          filename: this.selectedFile.name,
          // 切片大小
          size: this.fileChunkSize
        };
        if (this.breakpoint) {
          // 断点续传，需要带上文件的hash值
          parmas.fileHash = this.fileHash;
        }
        if (typeof this.requestMergeFileFn === 'function') {
          // 自定义合并请求接口
          res = await this.requestMergeFileFn(parmas);
        } else {
          res = await request({
            url: this.mergeUrl,
            headers: {
              'content-type': 'application/json'
            },
            data: JSON.stringify(parmas)
          });
        }
        this.$emit('mergeFileSuccess', res);
        // 移除断点续传的文件hash
        window.localStorage.removeItem(this.fileHash);
      } catch (error) {
        this.$emit('mergeFileFail', error);
      }
    }
  }
};
</script>
