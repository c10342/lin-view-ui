import { isPlainObject, isUndef } from "@src/utils";

function hasOwn(obj:Object, key:string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
export default function template(string:string, ...args:any) {
    if (args.length === 1 && isPlainObject(args[0])) {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, (match, prefix, i, index) => {
      // let result;

      if (string[index - 1] === "{" && string[index + match.length] === "}") {
        return i;
      }
      const result = hasOwn(args, i) ? args[i] : null;
      if (isUndef(result)) {
        return "";
      }

      return result;
    });
  }
