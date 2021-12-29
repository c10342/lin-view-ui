import zhLang from "@src/locale/src/lang/zh-CN";
import enLang from '@src/locale/src/lang/en-US'
import deepmerge from "deepmerge";
import formatLangTemplate from "./src/format";
import { isFunction, isPlainObject, isUndef } from "@src/utils";

enum LangTypeEnum {
  zh = "zh",
  en = "en"
}

let lang = zhLang;

let i18nHandler: Function | null;

// 获取语言
export function t(path: string, options?: Record<string, any>) {
  let value;
  if (isFunction(i18nHandler)) {
    //   @ts-ignore
    const value = i18nHandler.apply(this, [path, options]);
    if (!isUndef(value)) return value;
  }
  const array = path.split(".");
  let current: any = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return formatLangTemplate(value, options);
    if (!value) return "";
    current = value;
  }
  return "";
};

// 自定义语言，跟默认语言进行合并
export function use(l: any) {
  if (isPlainObject(l)) {
    lang = deepmerge(lang,l)
  }
};

// 自定义i18n处理函数
export function i18n(fn: Function | null | undefined) {
  if (isFunction(fn)) {
    i18nHandler = fn;
  }
};

// 设置使用哪种语言
export function setLang(la: string | null | undefined) {
  if (!la) {
    return;
  }
  lang = la === LangTypeEnum.en ? enLang : zhLang;
};

