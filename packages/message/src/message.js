import Vue from 'vue';

import Message from './message.vue';

import 'packages/message/src/style.scss';

const MessageConstruct = Vue.extend(Message);

// 存储实例
const instanceList = [];

// 当一个组件消失后，该组件后面的组件需要重新计算距离顶部的距离
function updateTop(index) {
  const length = instanceList.length - 1;
  for (let i = length; i > index; i--) {
    const instance = instanceList[i];
    const prevInstance = instanceList[i - 1];
    instance.top = prevInstance.top;
  }
}

class LinMessage {
  // 参数
  options = null;

  // message实例对象
  instance = null;

  // message组件参数
  propsData = {};

  // 自动关闭定时器
  timer = null;

  constructor(options) {
    this.options = options || {};
    this.initProps(options);
    this.init();
  }

  // 初始化message组件参数
  initProps() {
    const props = [
      'type',
      'showClose',
      'message',
      'iconClass',
      'dangerouslyUseHTMLString',
      'customClass',
      'center',
      'onClose',
      'offset'
    ];
    const propsData = {};
    props.forEach((prop) => {
      if (prop in this.options) {
        propsData[prop] = this.options[prop];
      }
    });
    this.propsData = propsData;
  }

  // 初始化
  init() {
    if (this.instance) {
      return;
    }
    this.instance = new MessageConstruct({
      propsData: {
        ...this.propsData
      }
    });
    if (this.instance) {
      // 将实例存放到实例数组中
      instanceList.push(this.instance);
      // 渲染
      this.instance.$mount();
      document.body.appendChild(this.instance.$el);
      // 显示出来
      this.instance.show = true;
      // 设置距离顶部的距离
      this.saveOffsetTop();
      // 设置定时器，用于定时关掉message组件
      this.setTimer();
      // 监听事件
      this.instance.$once('closed', () => {
        // 销毁组件
        this.destory();
      });
    }
  }

  saveOffsetTop() {
    // 查找是否存在于实例数组中
    const index = instanceList.findIndex(
      // eslint-disable-next-line
      (instance) => instance._uid === this.instance._uid
    );
    if (index > 0) {
      // 存在
      // 获取上一个message组件实例
      const prevInstance = instanceList[index - 1];
      // 获取上一个message组件实例dom元素
      const el = prevInstance.$el;
      // 获取上一个message组件dom元素高度
      const height = el.offsetHeight;
      // 获取上一个message组件dom元素距离顶部距离
      const top = el.offsetTop;
      // 设置message组件距离顶部距离，上一个message组件的高度+上一个message组件距离顶部的距离
      this.instance.top = top + height;
    } else {
      // 没有就默认为0
      this.instance.top = 0;
    }
  }

  setTimer() {
    const { duration } = this.options;
    // 等于0不会自动消失
    if (duration !== 0) {
      this.timer = setTimeout(() => {
        this.close();
      }, duration || 3000);
    }
  }

  // 隐藏message组件
  close() {
    if (this.instance && this.instance.show) {
      this.instance.show = false;
    }
  }

  // 销毁message组件
  destory() {
    if (this.instance) {
      const index = instanceList.findIndex(
        // eslint-disable-next-line
        (instance) => instance._uid === this.instance._uid
      );
      if (index > -1) {
        updateTop(index);
        instanceList.splice(index, 1);
      }
      document.body.removeChild(this.instance.$el);
      this.instance.$destroy();
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.instance = null;
  }
}

// 创建实例，options可传入字符串或者一个对象
function createInstance(options) {
  const toString = Object.prototype.toString;
  if (toString.call(options).includes('Object')) {
    return new LinMessage(options);
  }
  return new LinMessage({
    message: options.toString()
  });
}

// 创建不同类型type的message组件
function createInstanceByType(options, type) {
  const toString = Object.prototype.toString;
  if (toString.call(options).includes('Object')) {
    return new LinMessage({
      ...options,
      type
    });
  }
  return new LinMessage({
    message: options.toString(),
    type
  });
}

createInstance.success = function success(options) {
  return createInstanceByType(options, 'success');
};

createInstance.info = function info(options) {
  return createInstanceByType(options, 'info');
};

createInstance.error = function error(options) {
  return createInstanceByType(options, 'error');
};

createInstance.warning = function warning(options) {
  return createInstanceByType(options, 'warning');
};

// 关闭所有message组件
createInstance.closeAll = function closeAll() {
  instanceList.forEach((instance) => {
    instance.onCloseClick();
  });
};

export default createInstance;
