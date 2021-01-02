/**
 * 同域下载文件
 * @param {string} url
 * @param {string} fileName
 */
const downloadFile = (url, fileName) => {
  if (typeof url !== 'string') {
    throw new TypeError('url is not typeof string');
  }
  if (typeof fileName !== 'string') {
    throw new TypeError('fileName is not typeof string');
  }
  const a = document.createElement('a');
  a.download = fileName;
  a.href = url;
  document.body.append(a);
  a.click();
  document.body.removeChild(a);
};

export default downloadFile;
