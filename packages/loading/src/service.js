import LoadingConstruct from "./construct.js";
import { isString } from "@lin-view-ui/utils";

let instance = null;

let timer = null;

export default {
  open(options = {}) {
    if (!instance) {
      instance = new LoadingConstruct();
    }

    if (!options.target) {
      options.target = document.body;
    } else if (isString(options.target)) {
      options.target = document.querySelector(options.target);
    }
    instance.open({ ...options });
    // 如果有传入时间，就会自动消失
    if (options.time) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        instance.close();
      }, options.time);
    }

    return instance;
  },
  close() {
    if (instance) {
      if (timer) {
        clearTimeout(timer);
      }
      instance.close();
      instance = null;
    }
  }
};
