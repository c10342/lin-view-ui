/* eslint no-restricted-globals: "off" */
/* eslint no-undef: "off" */

// 引入脚本
self.importScripts('https://cdn.bootcss.com/spark-md5/3.0.0/spark-md5.js');

self.onmessage = (e) => {
  const { fileChunkList } = e.data;

  const spark = new SparkMD5.ArrayBuffer();

  let percentage = 0;

  let count = 0;

  const loadNext = (index) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(fileChunkList[index].file);

    reader.onload = (e) => {
      count++;

      spark.append(e.target.result);

      if (count === fileChunkList.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end(),
        });
        // 关闭自己
        self.close();
      } else {
        percentage += 100 / fileChunkList.length;
        self.postMessage({
          percentage,
        });
        // 递归计算下一个切片
        loadNext(count);
      }
    };
  };

  loadNext(0);
};
