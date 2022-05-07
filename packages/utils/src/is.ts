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
