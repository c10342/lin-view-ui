/**
 * 更新metaInfo信息
 * @param {*} opts
 */

import operate from "./operate.js";

export default function updateMetaInfo(opts) {
  operate().removeMetaInfo();
  operate().setMetaInfo(opts);
}
