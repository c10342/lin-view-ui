/**
 * 收藏网址
 * @param {string} title 收藏的标题
 * @param {string} url 收藏的网址
 */
const addFavorite = (title, url) => {
  try {
    if (typeof title !== 'string') {
      throw TypeError('title is not typeof string');
    }
    if (typeof url !== 'string') {
      throw new TypeError('url is not typeof string');
    }
    window.external.addFavorite(url, title);
  } catch (e) {
    try {
      window.sidebar.addPanel(title, url, '');
    } catch (e1) {
      throw new SyntaxError(
        '抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加',
      );
    }
  }
};

export default addFavorite;
