import Vue from 'vue';
import MessageBox from './message-box.vue';

import './style.scss';

const MessageBoxConstruct = Vue.extend(MessageBox);

class LinMessageBox {
  options = {};

  instance = null;

  constructor (options) {
    this.options = options || {};
    this.handleLockScroll();
    this.init();
  }

  init () {
    this.instance = new MessageBoxConstruct();
    if (this.instance) {
      Object.keys(this.instance.$props || {}).forEach((key) => {
        if (key in this.options) {
          this.instance[key] = this.options[key];
        }
      });
      this.instance.$mount();
      document.body.appendChild(this.instance.$el);
      this.instance.show = true;
      this.instance.$once('close', (data) => {
        if (data.by === 'confirmButton') {
          this.options.resolve(data);
        } else {
          this.options.reject(data);
        }
        this.instance.$nextTick(() => {
          this.destory();
        });
      });
    }
  }

  handleLockScroll () {
    let lockScroll = true;
    if ('lockScroll' in this.options) {
      lockScroll = this.options.lockScroll;
    }
    if (lockScroll) {
      document.body.classList.add('lin-message-box-hiden');
    }
  }

  destory () {
    if (this.instance) {
      document.body.removeChild(this.instance.$el);
      this.instance.$destroy();
    }
    document.body.classList.remove('lin-message-box-hiden');
    this.instance = null;
  }
}

function createInstance (options) {
  return new Promise((resolve, reject) => new LinMessageBox({ ...options, resolve, reject }));
}

createInstance.alert = function alert (options) {
  const common = {
    closeOnClickModal: false,
    closeOnPressEscape: false
  };
  return new Promise((resolve, reject) => new LinMessageBox({
    ...options, ...common, resolve, reject
  }));
};

createInstance.confirm = function confirm (options) {
  const common = {
    showCancelButton: true
  };
  return new Promise((resolve, reject) => new LinMessageBox({
    ...options, ...common, resolve, reject
  }));
};

createInstance.prompt = function prompt (options) {
  const common = {
    showInput: true,
    showCancelButton: true
  };
  return new Promise((resolve, reject) => new LinMessageBox({
    ...options, ...common, resolve, reject
  }));
};

export default createInstance;
