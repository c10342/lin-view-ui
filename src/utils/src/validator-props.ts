import { logError } from "./log";

export function validatorStringArrayProps(key:string,val: string|number, options: Array<string|number>) {
  if (!val) {
    return false;
  }
  const flag = options.includes(val);
  if (!flag) {
      logError(`${key} must be one of ${options.join(',')}`)
  }
  return flag;
}
