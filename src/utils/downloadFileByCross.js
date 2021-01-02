/**
 * URL方式保存文件到本地
 * @param {*} data 文件的blob数据
 * @param {*} name 文件名
 */
function saveAs(data, name) {
  const urlObject = window.URL || window.webkitURL || window;
  const exportBlob = new Blob([data]);
  const saveLink = document.createElementNS(
    'http://www.w3.org/1999/xhtml',
    'a',
  );
  saveLink.href = urlObject.createObjectURL(exportBlob);
  saveLink.download = name;
  saveLink.click();
}

/**
 * 跨域下载文件
 * @param {string} url 文件地址
 * @param {string} fileName 下载下来的文件名
 */
function downloadFileByCross(url, fileName) {
  url = url.replace(/\\/g, '/');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  // xhr.setRequestHeader('Authorization', 'Basic a2VybWl0Omtlcm1pdA==');
  xhr.onload = () => {
    if (xhr.status === 200) {
      // 获取文件blob数据并保存
      // var fileName = getFileName(url);
      saveAs(xhr.response, fileName);
    }
  };

  xhr.send();
}

export default downloadFileByCross;
