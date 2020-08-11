/**
 * 设为首页
 * @param {string} url 设置为首页的url
 */
const setHome = (url) => {
  try {
    if (typeof url !== "string") {
      throw new TypeError("url is not typeof string");
    }
    const a = document.createElement("a");
    a.style.behavior = "url(#default#homepage)";
    a.setHomePage(url);
    a.click();
  } catch (error) {
    if (window.netscape) {
      try {
        netscape.security.PrivilegeManager.enablePrivilege(
          "UniversalXPConnect"
        );
      } catch (e) {
        throw new SyntaxError(
          "抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'"
        );
      }
    } else {
      throw new SyntaxError(
        "抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" +
          url +
          "】设置为首页。"
      );
    }
  }
};

export default setHome;
