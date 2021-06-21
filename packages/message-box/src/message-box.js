import Vue from 'vue';
import MessageBox from './message-box.vue';

const MessageBoxConstruct = Vue.extend(MessageBox);

class LinMessageBox {
  options = {};

  instance = null;

  constructor(options) {
    this.options = options || {};
    // 判断是否需要锁定滚动条
    this.handleLockScroll();
    // 初始化
    this.init();
  }

  // 初始化
  init() {
    this.instance = new MessageBoxConstruct();
    if (this.instance) {
      // 初始化组件的props参数
      Object.keys(this.instance.$props || {}).forEach((key) => {
        if (key in this.options) {
          this.instance[key] = this.options[key];
        }
      });
      // 渲染挂载
      this.instance.$mount();
      document.body.appendChild(this.instance.$el);
      // 显示出来
      this.instance.show = true;
      // 监听事件
      this.instance.$once('close', (data) => {
        if (data.by === 'confirmButton') {
          // 将promise置为成功状态
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

  // 锁定滚动条
  handleLockScroll() {
    let lockScroll = true;
    if ('lockScroll' in this.options) {
      lockScroll = this.options.lockScroll;
    }
    if (lockScroll) {
      document.body.classList.add('lin-message-box-hiden');
    }
  }

  // 销毁
  destory() {
    if (this.instance) {
      document.body.removeChild(this.instance.$el);
      this.instance.$destroy();
    }
    document.body.classList.remove('lin-message-box-hiden');
    this.instance = null;
  }
}

function createInstance(options) {
  return new Promise(
    (resolve, reject) => new LinMessageBox({ ...options, resolve, reject })
  );
}

createInstance.alert = function alert(options) {
  const common = {
    closeOnClickModal: false,
    closeOnPressEscape: false
  };
  return new Promise(
    (resolve, reject) =>
      new LinMessageBox({
        ...options,
        ...common,
        resolve,
        reject
      })
  );
};

createInstance.confirm = function confirm(options) {
  const common = {
    showCancelButton: true
  };
  return new Promise(
    (resolve, reject) =>
      new LinMessageBox({
        ...options,
        ...common,
        resolve,
        reject
      })
  );
};

createInstance.prompt = function prompt(options) {
  const common = {
    showInput: true,
    showCancelButton: true
  };
  return new Promise(
    (resolve, reject) =>
      new LinMessageBox({
        ...options,
        ...common,
        resolve,
        reject
      })
  );
};

export default createInstance;
