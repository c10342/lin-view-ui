const toString = Object.prototype.toString;

export function isUndefined(data) {
  return toString.call(data) === "[object Undefined]";
}

export function isPlainObject(data) {
  return toString.call(data) === "[object Object]";
}

export function isNull(data) {
  return toString.call(data) === "[object Null]";
}

export function isUndef(data) {
  return isNull(data) || isUndefined(data);
}

export function isString(data) {
  return toString.call(data) === "[object String]";
}

export function isEmptyString(data) {
  return data.match(/^\s*$/);
}

export function isFunction(data) {
  return toString.call(data) === "[object Function]";
}

export function isNumber(data) {
  return toString.call(data) === "[object Number]";
}

export function isDate(data) {
  return toString.call(data) === "[object Date]";
}

export function isBoolean(data) {
  return toString.call(data) === "[object Boolean]";
}

export function isArray(data) {
  return toString.call(data) === "[object Array]";
}

export function isObject(data) {
  return data !== null && typeof data === "object";
}
