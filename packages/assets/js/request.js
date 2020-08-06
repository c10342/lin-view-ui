/**
 *
 * @param url    请求路径
 * @param method  请求方法
 * @param data    请求数据
 * @param headers  请求头
 * @param onProgress  上传进度方法
 * @param requestList  切片的上传请求列表  [xhr]
 * @returns {Promise<unknown>}
 */
function request({
  url,
  method = "post",
  data,
  headers = {},
  requestList,
  hash,
  fileHash,
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.send(data);
    xhr.onload = function(e) {
      // 将请求成功的xhr从列表中删除
      if (requestList) {
        const xhrIndex = requestList.findIndex((item) => item === xhr);
        requestList.splice(xhrIndex, 1);

        let upList = [];
        if (window.localStorage.getItem(fileHash)) {
          try {
            upList = JSON.parse(window.localStorage.getItem(fileHash));
          } catch (error) {}
        }
        upList.push(hash);

        window.localStorage.setItem(fileHash, JSON.stringify(upList));
      }

      resolve(e.target.response);
    };
    requestList?.push(xhr);
    xhr.onerror = function(e) {
      reject(e);
    };
  });
}

export default request;
