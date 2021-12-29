const toString = Object.prototype.toString;

export function isUndefined(data:any) :data is undefined {
  return toString.call(data) === "[object Undefined]";
}

export function isPlainObject(data:any) :data is Object {
  return toString.call(data) === "[object Object]";
}

export function isNull(data:any) :data is null {
  return toString.call(data) === "[object Null]";
}

export function isUndef(data:any) :data is undefined|null {
  return isNull(data) || isUndefined(data);
}

export function isString(data:any) :data is string {
  return toString.call(data) === "[object String]";
}

export function isEmptyString(data:any) :data is string {
  return data.match(/^\s*$/);
}

export function isFunction(data:any) :data is Function {
  return toString.call(data) === "[object Function]";
}

export function isNumber(data:any) :data is number {
  return toString.call(data) === "[object Number]";
}

export function isDate(data:any) :data is Date {
  return toString.call(data) === "[object Date]";
}

export function isBoolean(data:any) :data is boolean {
  return toString.call(data) === "[object Boolean]";
}

export function isArray<T>(data:any) :data is Array<T> {
  return toString.call(data) === "[object Array]";
}

export function isObject(data:any) :data is Object {
  return data !== null && typeof data === "object";
}
