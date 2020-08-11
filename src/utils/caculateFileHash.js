import SparkMD5 from "spark-md5";

/**
 * 根据文件内容计算出hash值
 * @param {File} file
 */
const caculateFileHash = (file) => {
  return new Promise((resolve, reject) => {
    const blobSlice =
      File.prototype.slice ||
      File.prototype.mozSlice ||
      File.prototype.webkitSlice;
    const chunkSize = 2097152; // Read in chunks of 2MB
    const chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    fileReader.onload = function(e) {
      spark.append(e.target.result);
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        resolve(spark.end());
      }
    };

    fileReader.onerror = function(e) {
      reject(e);
    };

    function loadNext() {
      const start = currentChunk * chunkSize;
      const end =
        start + chunkSize >= file.size ? file.size : start + chunkSize;

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
  });
};

export default caculateFileHash;
