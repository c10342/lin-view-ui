import { setAttribute, removeNode } from "./utils";

export default function operate() {
  const ndHead = document.getElementsByTagName("head")[0];

  return {
    /**
     * 设置metaInfo信息
     * @param {*} metaOpts
     */
    setMetaInfo(metaOpts: Record<string, any>) {
      Object.keys(metaOpts || {}).forEach((key) => {
        if (key === "title") {
          document.title = metaOpts.title;
          return;
        }
        metaOpts[key].forEach((opt: Record<string, any>) => {
          const ndKey = document.createElement(key);
          setAttribute(ndKey, opt);
          ndHead.appendChild(ndKey);
        });
      });
    },

    removeMetaInfo() {
      removeNode(ndHead);
    }
  };
}
