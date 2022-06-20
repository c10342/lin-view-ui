import createComponent from "./create-component";
import { isString } from "@packages/utils";
import { Options } from "./types";

let instance: { open: (options: Options) => void; close: () => void } | null =
  null;

let timer: number | null = null;

function destroyTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

export default {
  open(options: Options = {}) {
    if (!instance) {
      instance = createComponent();
    }

    if (!options.target) {
      options.target = document.body;
    } else if (isString(options.target)) {
      options.target = document.querySelector(options.target) as HTMLElement;
    }
    instance.open({ ...options });
    // 如果有传入时间，就会自动消失
    if (options.time) {
      destroyTimer();
      timer = window.setTimeout(() => {
        this?.close();
      }, options.time);
    }
  },
  close() {
    destroyTimer();
    instance?.close();
    instance = null;
  }
};
