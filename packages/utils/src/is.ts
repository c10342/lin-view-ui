const toString = Object.prototype.toString;

export function isString(data: any): data is string {
  return typeof data === "string";
}

export function isNumber(data: any): data is number {
  return typeof data === "number";
}

export function isPlainObject(data: any): data is Object {
  return toString.call(data) === "[object Object]";
}

export function isUndefined(data: any): data is undefined {
  return toString.call(data) === "[object Undefined]";
}

export function isNull(data: any): data is null {
  return toString.call(data) === "[object Null]";
}

export function isUndef(data: any) {
  return isNull(data) || isUndefined(data);
}
