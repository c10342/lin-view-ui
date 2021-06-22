# Upload 上传

[[toc]]

---

## 基础用法

使用 `uploadUrl` 属性指定上传地址即可

:::demo

```vue
<template>
  <lin-upload
    @uploadSuccess="mergeFileSuccess"
    text="普通上传"
    uploadUrl="http://120.79.209.208:3000/uploadFile"
  ></lin-upload>
</template>

<script>
export default {
  methods: {
    mergeFileSuccess(e) {
      alert(e);
    },
  },
};
</script>
```

:::

## 切片上传

设置 `isSlice` 属性为 `true`,以及指定属性 `mergeUrl` 合并切片地址即可实现文件切片上传

:::demo

```vue
<template>
  <lin-upload
    @mergeFileSuccess="mergeFileSuccess"
    isSlice
    text="切片上传"
    uploadUrl="http://120.79.209.208:3000/uploadFileBySlice"
    mergeUrl="http://120.79.209.208:3000/mergeBySlice"
  ></lin-upload>
</template>

<script>
export default {
  methods: {
    mergeFileSuccess(e) {
      alert(e);
    },
  },
};
</script>
```

:::

## 断点续传

设置 `breakpoint` 属性为 `true`,以及指定属性 `mergeUrl` 合并切片地址即可实现文件断点切片

:::demo

```vue
<template>
  <lin-upload
    @mergeFileSuccess="mergeFileSuccess"
    breakpoint
    text="断点续传"
    uploadUrl="http://120.79.209.208:3000/uploadFileByBreakpoint"
    mergeUrl="http://120.79.209.208:3000/mergeByBreakpoint"
  ></lin-upload>
</template>

<script>
export default {
  methods: {
    mergeFileSuccess(e) {
      alert(e);
    },
  },
};
</script>
```

:::

## 后台

由于该组件需要配合后台使用，相关参数需要符合规范，所以给出后台代码给大家参考

:::demo

```javascript
const http = require("http");

const path = require("path");

const multiparty = require("multiparty");

const fse = require("fs-extra");

const server = http.createServer();

const UPLOAD_DIR = path.resolve(__dirname, "./files");

// 解析post请求体
const resolvePost = (req) => {
  return new Promise((resolve, reject) => {
    let chunk = "";
    req.on("data", (data) => {
      chunk += data;
    });
    req.on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });
};

const pipeStream = (pathStr, writeStream) => {
  return new Promise((resolve) => {
    const readStream = fse.createReadStream(pathStr);
    readStream.on("end", () => {
      // 删除文件
      fse.unlinkSync(pathStr);
      resolve();
    });
    readStream.pipe(writeStream);
  });
};

// 断点续传合并切片
const mergeFileChunkBreakpoint = async (filename, fileHash, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash);

  const chunkPaths = await fse.readdir(chunkDir);
  // 根据切片下标进行排序
  chunkPaths.sort((a, b) => {
    const aa = a.split("-");
    const bb = b.split("-");
    return aa[aa.length - 1] - bb[bb.length - 1];
  });
  await Promise.all(
    chunkPaths.map((chunkpath, index) => {
      return pipeStream(
        path.resolve(chunkDir, chunkpath),
        // 指定位置创建可写流
        fse.createWriteStream(path.resolve(UPLOAD_DIR, filename), {
          start: index * size,
          end: (index + 1) * size,
        })
      );
    })
  );
  // 删除文件夹
  fse.rmdirSync(chunkDir);
};

// 只有切片合并切片
const mergeFileChunkBySlice = async (filePath, filename, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, "chunk-" + filename);
  const chunkPaths = await fse.readdir(chunkDir);
  // 根据切片下标进行排序
  chunkPaths.sort((a, b) => {
    const aa = a.split("-");
    const bb = b.split("-");
    return aa[aa.length - 1] - bb[bb.length - 1];
  });
  await Promise.all(
    chunkPaths.map((chunkpath, index) => {
      return pipeStream(
        path.resolve(chunkDir, chunkpath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size,
        })
      );
    })
  );
  // 删除文件夹
  fse.rmdirSync(chunkDir);
};

server.on("request", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.status = 200;
    res.end();
    return;
  }
  // 上传切片
  if (req.url === "/uploadFileByBreakpoint") {
    const multipart = new multiparty.Form({
      uploadDir: path.join(__dirname, "./chunks"),
    });

    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        console.log("err");
        return;
      }
      // 获取上传的文件
      const chunk = files.chunk[0];
      // 获取前端传过来的切片hash
      const hash = fields.hash[0];
      // 获取前端传过来的文件名
      //   const filename = fields.filename[0];
      // 文件hash值
      const fileHash = fields.fileHash[0];

      const chunkDir = path.resolve(UPLOAD_DIR, fileHash);

      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirSync(chunkDir);
      }

      // 修改文件名
      await fse.move(chunk.path, `${chunkDir}/${hash}`);
      res.end("received file chunk");
    });
  }
  if (req.url === "/uploadFileBySlice") {
    const multipart = new multiparty.Form({
      uploadDir: path.join(__dirname, "./chunks"),
    });

    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        console.log("err");
        return;
      }
      // 获取上传的文件
      const chunk = files.chunk[0];
      // 获取前端传过来的hash
      const hash = fields.hash[0];
      // 获取前端传过来的文件名
      const filename = fields.filename[0];
      const chunkDir = path.resolve(UPLOAD_DIR, "chunk-" + filename);

      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirSync(chunkDir);
      }

      // 修改文件名
      await fse.move(chunk.path, `${chunkDir}/${hash}`);
      res.end("received file chunk");
    });
  }

  if (req.url === "/uploadFile") {
    const multipart = new multiparty.Form({
      uploadDir: path.join(__dirname, "./chunks"),
    });

    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        console.log("err");
        return;
      }
      res.end("received file");
    });
  }

  // 合并切片
  if (req.url === "/mergeByBreakpoint") {
    const data = await resolvePost(req);
    const { filename, size, fileHash } = data;
    await mergeFileChunkBreakpoint(filename, fileHash, size);
    res.end(
      JSON.stringify({
        code: 200,
        message: "file merage success",
      })
    );
  }

  if (req.url === "/mergeBySlice") {
    const data = await resolvePost(req);
    const { filename, size } = data;
    const filePath = path.resolve(UPLOAD_DIR, filename);
    await mergeFileChunkBySlice(filePath, filename, size);
    res.end(
      JSON.stringify({
        code: 200,
        message: "file merage success",
      })
    );
  }
});

server.listen(3000, function() {
  console.log("正在监听3000端口");
});
```

:::

## 属性

| 参数               | 说明                                                                                          | 类型     | 可选值 | 默认值             |
| ------------------ | --------------------------------------------------------------------------------------------- | -------- | ------ | ------------------ |
| text               | 文本                                                                                          | String   |        | —                  |
| fileChunkSize      | 切片大小                                                                                      | Number   | —      | 10 \* 1024 \* 1024 |
| uploadUrl          | 上传地址                                                                                      | String   | —      | —                  |
| mergeUrl           | 请求合并切片地址                                                                              | String   | —      | —                  |
| isSlice            | 是否进行切片处理                                                                              | Boolean  | —      | false              |
| breakpoint         | 是否开启断点续传功能                                                                          | Boolean  | —      | false              |
| beforeUpload       | 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。 | Function | —      | —                  |
| splitFileChunk     | 对文件进行切片的处理方法                                                                      | Function | —      | —                  |
| caculateFileHash   | 计算文件 hash 值的方法，需返回一个 Promise                                                    | Function | —      | —                  |
| requestMergeFileFn | 请求合并切片的方法 ，需返回一个 Promise                                                       | Function | —      | —                  |

## 事件

| 事件名称                | 说明                                                                            | 回调参数       |
| ----------------------- | ------------------------------------------------------------------------------- | -------------- |
| caculateFileHashSuccess | 计算文件 hash 值成功的时候触发，仅在 breakpoint 为 true 时有效                  | 文件 hash 值   |
| caculateFileHashFail    | 计算文件 hash 值失败的时候触发，仅在 breakpoint 为 true 时有效                  | error 错误对象 |
| uploadSuccess           | 文件上传成功的时候触发，仅在 breakpoint 为 false 和 isSlice 为 false 有效       | 请求返回值     |
| uploadFail              | 文件上传失败的时候触发，仅在 breakpoint 为 false 和 isSlice 为 false 有效       | 请求返回值     | error 错误对象 |
| uploadChunkSuccess      | 所有切片上传成功的时候触发，仅在 breakpoint 为 true 或者 isSlice 为 true 有效   | 请求返回值     |
| uploadChunkFail         | 所有切片上传失败的时候触发，仅在 breakpoint 为 true 或者 isSlice 为 true 有效   | error 错误对象 |
| createChunkListSuccess  | 对文件进行切片成功的时候触发，仅在 breakpoint 为 true 或者 isSlice 为 true 有效 | 切片数组       |
| createChunkListFail     | 对文件进行切片失败的时候触发，仅在 breakpoint 为 true 或者 isSlice 为 true 有效 | error 错误对象 |
| mergeFileSuccess        | 请求合并文件成功的时候触发，仅在 breakpoint 为 true 或者 isSlice 为 true 有效   | 请求返回值     |
| mergeFileFail           | 请求合并文件失败的时候触发，仅在 breakpoint 为 true 或者 isSlice 为 true 有效   | error 错误对象 |
