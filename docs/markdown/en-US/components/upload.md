<script>
export default {
  methods: {
    mergeFileSuccess(e) {
      alert(e)
    },
  },
};
</script>

# Upload

---

## Basic usage

Use the `uploadUrl` property to specify the upload address

<div class='demo-block'>
<lin-upload
      @uploadSuccess="mergeFileSuccess"
      text="Normal upload"
      uploadUrl="http://120.79.209.208:3000/uploadFile"
    ></lin-upload>
</div>

:::demo

```html
<lin-upload
  @uploadSuccess="mergeFileSuccess"
  text="Normal upload"
  uploadUrl="http://120.79.209.208:3000/uploadFile"
/>

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

## Slice upload

Set the `isSlice` attribute to `true`, and specify the attribute `mergeUrl` to merge the slice address to upload the file slice

<div class='demo-block'>
<lin-upload
      @mergeFileSuccess="mergeFileSuccess"
      isSlice
      text="Slice upload"
      uploadUrl="http://120.79.209.208:3000/uploadFileBySlice"
      mergeUrl="http://120.79.209.208:3000/mergeBySlice"
    ></lin-upload>
</div>

:::demo

```html
<lin-upload
  @mergeFileSuccess="mergeFileSuccess"
  isSlice
  text="Slice upload"
  uploadUrl="http://120.79.209.208:3000/uploadFileBySlice"
  mergeUrl="http://120.79.209.208:3000/mergeBySlice"
></lin-upload>

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

## Breakpoint continuation

Set the `breakpoint` property to `true`, and specify the attribute `mergeUrl` to merge the slice address to implement file breakpoint slicing

<div class='demo-block'>
<lin-upload
      @mergeFileSuccess="mergeFileSuccess"
      breakpoint
      text="Breakpoint continuation"
      uploadUrl="http://120.79.209.208:3000/uploadFileByBreakpoint"
      mergeUrl="http://120.79.209.208:3000/mergeByBreakpoint"
    ></lin-upload>
</div>

:::demo

```html
<lin-upload
  @mergeFileSuccess="mergeFileSuccess"
  breakpoint
  text="Breakpoint continuation"
  uploadUrl="http://120.79.209.208:3000/uploadFileByBreakpoint"
  mergeUrl="http://120.79.209.208:3000/mergeByBreakpoint"
></lin-upload>

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

## Backstage

As the component needs to be used with the background, the relevant parameters need to comply with the specification, so the background code is given for your reference

:::demo

```javascript
const http = require("http");

const path = require("path");

const multiparty = require("multiparty");

const fse = require("fs-extra");

const server = http.createServer();

const UPLOAD_DIR = path.resolve(__dirname, "./files");

// Parsing post request body
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
      // Delete file
      fse.unlinkSync(pathStr);
      resolve();
    });
    readStream.pipe(writeStream);
  });
};

// Breakpoint resume merge slice
const mergeFileChunkBreakpoint = async (filename, fileHash, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash);

  const chunkPaths = await fse.readdir(chunkDir);
  // Sort by slice subscript
  chunkPaths.sort((a, b) => {
    const aa = a.split("-");
    const bb = b.split("-");
    return aa[aa.length - 1] - bb[bb.length - 1];
  });
  await Promise.all(
    chunkPaths.map((chunkpath, index) => {
      return pipeStream(
        path.resolve(chunkDir, chunkpath),
        // Creates a writable stream at the specified location
        fse.createWriteStream(path.resolve(UPLOAD_DIR, filename), {
          start: index * size,
          end: (index + 1) * size,
        })
      );
    })
  );
  // remove folders
  fse.rmdirSync(chunkDir);
};

// Only slices merge slices
const mergeFileChunkBySlice = async (filePath, filename, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, "chunk-" + filename);
  const chunkPaths = await fse.readdir(chunkDir);
  // Sort by slice subscript
  chunkPaths.sort((a, b) => {
    const aa = a.split("-");
    const bb = b.split("-");
    return aa[aa.length - 1] - bb[bb.length - 1];
  });
  await Promise.all(
    chunkPaths.map((chunkpath, index) => {
      return pipeStream(
        path.resolve(chunkDir, chunkpath),
        // Creates a writable stream at the specified location
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size,
        })
      );
    })
  );
  // remove folders
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
  // Upload slice
  if (req.url === "/uploadFileByBreakpoint") {
    const multipart = new multiparty.Form({
      uploadDir: path.join(__dirname, "./chunks"),
    });

    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        console.log("err");
        return;
      }
      // Get uploaded files
      const chunk = files.chunk[0];
      // Get the slice hash from the front end
      const hash = fields.hash[0];
      // Get the file name from the front end
      //   const filename = fields.filename[0];
      // File hash value
      const fileHash = fields.fileHash[0];

      const chunkDir = path.resolve(UPLOAD_DIR, fileHash);

      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirSync(chunkDir);
      }

      // Modify file name
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
      // Get uploaded files
      const chunk = files.chunk[0];
      // Get the hash from the front end
      const hash = fields.hash[0];
      // Get the file name from the front end
      const filename = fields.filename[0];
      const chunkDir = path.resolve(UPLOAD_DIR, "chunk-" + filename);

      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirSync(chunkDir);
      }

      // Modify file name
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

  // Merge slices
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
  console.log("Listening on port 3000");
});
```

:::

## Attributes

| Attribute          | Description                                                                                                                                              | Type     | Accepted Values | Default            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- | ------------------ |
| text               | text                                                                                                                                                     | String   |                 | —                  |
| fileChunkSize      | Slice size                                                                                                                                               | Number   | —               | 10 \* 1024 \* 1024 |
| uploadUrl          | Upload address                                                                                                                                           | String   | —               | —                  |
| mergeUrl           | Request merge slice address                                                                                                                              | String   | —               | —                  |
| isSlice            | whether slice                                                                                                                                            | Boolean  | —               | false              |
| breakpoint         | whether breakpoint                                                                                                                                       | Boolean  | —               | false              |
| beforeUpload       | Hook before uploading the file. The parameter is the uploaded file. If false is returned or project is returned and rejected, the upload will be stopped | Function | —               | —                  |
| splitFileChunk     | The method of slicing files                                                                                                                              | Function | —               | —                  |
| caculateFileHash   | To calculate the hash value of a file, return a promise                                                                                                  | Function | —               | —                  |
| requestMergeFileFn | The method that requests to merge slices needs to return a promise                                                                                       | Function | —               | —                  |

## Events

| Event Name              | Description                                                                                                              | Parameters           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| caculateFileHashSuccess | It is triggered when the hash value of the file is successfully calculated. It is only valid when breakpoint is true     | File hash value      |
| caculateFileHashFail    | It is triggered when the hash value of the file fails to be calculated. It is only valid when breakpoint is true         | Error error object   |
| uploadSuccess           | It is triggered when the file is uploaded successfully. It is only valid when breakpoint is false and isslice is false   | Request return value |
| uploadFail              | It is triggered when the file upload fails. It is only valid when breakpoint is false and isslice is false               | Request return value | Error error object |
| uploadChunkSuccess      | It is triggered when all slices are uploaded successfully. It is only valid when breakpoint is true or isslice is true   | Request return value |
| uploadChunkFail         | Triggered when all slices fail to upload. Only valid when breakpoint is true or isslice is true                          | Error error object   |
| createChunkListSuccess  | Triggered when the file is sliced successfully. It is only valid if breakpoint is true or isslice is true                | Slice array          |
| createChunkListFail     | Triggered when file slicing fails. Only valid when breakpoint is true or isslice is true                                 | Error error object   |
| mergeFileSuccess        | It is triggered when the request to merge files is successful. It is only valid if breakpoint is true or isslice is true | Request return value |
| mergeFileFail           | It is triggered when the request to merge files fails. It is only valid if breakpoint is true or isslice is true         | Error error object   |
