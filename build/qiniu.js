const qiniu = require('qiniu');
const fs = require('fs');
const ora = require('ora');
const path = require('path');
const config = require('./config');

const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
const qiniuconfig = new qiniu.conf.Config();
qiniuconfig.zone = qiniu.zone.Zone_z2;

const doUpload = (key, file) => {
  const options = {
    scope: config.bucket + ':' + key
  };
  const formUploader = new qiniu.form_up.FormUploader(qiniuconfig);
  const putExtra = new qiniu.form_up.PutExtra();
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  return new Promise((resolve, reject) => {
    formUploader.putFile(
      uploadToken,
      key,
      file,
      putExtra,
      (err, body, info) => {
        if (err) {
          return reject(err);
        }
        if (info.statusCode === 200) {
          resolve(body);
        } else {
          reject(body);
        }
      }
    );
  });
};

function mapDir(dir) {
  const files = [];
  fs.readdirSync(dir).forEach((filename) => {
    const pathname = path.join(dir, filename);
    if (fs.statSync(pathname).isDirectory()) {
      files.push(...mapDir(pathname));
    } else {
      files.push(pathname);
    }
  });
  return files;
}

const uploadList = mapDir(config.basePath).map((filePath) => {
  return doUpload(
    filePath.replace(`${config.basePath}\\`, '').replace(/\\/g, '/'),
    filePath
  );
});

const spinner = ora('正在上传 ' + config.basePath + ' 目录下的文件').start();

Promise.all(uploadList)
  .then((resps) => {
    spinner.text = '上传成功';
    spinner.color = '#13A10E';
    spinner.succeed();
  })
  .catch((errs) => {
    spinner.text = '上传失败';
    spinner.fail(); // 下载失败
    console.log('upload fail:', errs);
    // 结束进程
    process.exit(0);
  });
