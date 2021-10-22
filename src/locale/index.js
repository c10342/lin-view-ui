import defaultLang from "@lang/zh-CN.js";
import Vue from "vue";
import deepmerge from "deepmerge";
import Format from "./src/format.js";
import { isFunction, isUndef } from "@src/utils";

const format = Format(Vue);
// 默认语言
let lang = defaultLang;
// 标记是否合并
let merged = false;

// 处理i18n
let i18nHandler = function i18nHandler(...reset) {
  const vuei18n = Object.getPrototypeOf(this || Vue).$t;
  // 查看是否使用自定义的i18n，即用户传入了
  if (isFunction(vuei18n) && !!Vue.locale) {
    if (!merged) {
      merged = true;
      // 合并语言包
      Vue.locale(
        Vue.config.lang,
        deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true })
      );
    }
    return vuei18n.apply(this, [...reset]);
  }
};

export const t = function t(path, options) {
  let value = i18nHandler.apply(this, [path, options]);
  if (!isUndef(value)) return value;

  const array = path.split(".");
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return "";
    current = value;
  }
  return "";
};

export const use = function use(l) {
  lang = l || lang;
};

export const i18n = function i18n(fn) {
  i18nHandler = fn || i18nHandler;
};

export default { use, t, i18n };
