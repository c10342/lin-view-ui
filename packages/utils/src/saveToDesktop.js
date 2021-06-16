/**
 * 保存到桌面
 * @param {string} sName 保存到桌面的名称
 * @param {string} sUrl 保存的网址
 */
const saveToDesktop = (sName, sUrl) => {
  try {
    if (typeof sName !== 'string') {
      throw new TypeError('sName is not typeof string');
    }
    if (typeof sUrl !== 'string') {
      throw new TypeError('sUrl is not typeof string');
    }
    const WshShell = new window.ActiveXObject('WScript.Shell');
    const oUrlLink = WshShell.CreateShortcut(
      `${WshShell.SpecialFolders('Desktop')}\\${sName}.url`
    );
    oUrlLink.TargetPath = sUrl;
    oUrlLink.Save();
  } catch (e) {
    throw new SyntaxError('当前IE安全级别不允许操作！');
  }
};

export default saveToDesktop;
