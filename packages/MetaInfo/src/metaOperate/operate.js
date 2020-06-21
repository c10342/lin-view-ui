import _setAttr from "./setAttribute.js";

import _removeNode from "./removeNode";

export default function operate() {
  const _ndHead = document.getElementsByTagName("head")[0];

  return {
    /**
     * 设置metaInfo信息
     * @param {*} metaOpts
     */
    setMetaInfo(metaOpts) {
      for (let key in metaOpts) {
        if (key === "title") {
          document.title = metaOpts.title;
          continue;
        }
        if (metaOpts.hasOwnProperty(key)) {
          metaOpts[key].forEach((opt) => {
            const ndKey = document.createElement(key);
            _setAttr(ndKey, opt);
            _ndHead.appendChild(ndKey);
          });
        }
      }
    },

    removeMetaInfo() {
      _removeNode(_ndHead);
    },
  };
}
