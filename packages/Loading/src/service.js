import LoadingConstruct from './construct.js';

let instance = null;

let timer = null;

export default {
  open(options) {
    if (!instance) {
      instance = new LoadingConstruct();
    }

    if (!options.target) {
      options.target = document.body;
    }
    instance.open({ ...options });

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
  },
};
