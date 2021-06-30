const path = require("path");
const userInfo = require("./userInfo.js");
module.exports = {
  // 七牛云配置信息
  accessKey: userInfo.accessKey,
  secretKey: userInfo.secretKey,
  bucket: "vue-ui",
  // 上传到七牛云的目录
  basePath: path.join(__dirname, "../docs-dist")
};
