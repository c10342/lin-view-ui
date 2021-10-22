import Vue from "vue";
import { getScroll } from "@src/utils";
import Loading from "./loading.vue";

function handleOnScroll(target, targetDom, scrollDom) {
  if (document.body === target) {
    targetDom.style.marginTop = `${getScroll().scrollTop}px`;
  } else {
    targetDom.style.marginTop = `${scrollDom.scrollTop}px`;
  }
}

function addScrollListener(target, fn) {
  if (document.body === target) {
    window.addEventListener("scroll", fn);
  } else {
    target.addEventListener("scroll", fn);
  }
}

function delScrollListener(target, fn) {
  if (document.body === target) {
    window.removeEventListener("scroll", fn);
  } else {
    target.removeEventListener("scroll", fn);
  }
}

// 构造器
const LoadingConstruct = Vue.extend(Loading);

// 打开loading
LoadingConstruct.prototype.open = function open(options = {}) {
  // 必须要有目标对象，否则不能显示出来
  if (!options || !options.target) {
    return;
  }

  // 将传递进来的参数挂载到实例上面
  Object.keys(options).forEach(key => {
    this[key] = options[key];
  });

  if (
    !this.fullscreen &&
    !this.target.classList.contains("lin-loading-position-relative")
  ) {
    // 没有全屏的情况下，给目标对象添加一个相对定位，因为loading是绝对定位
    this.target.classList.add("lin-loading-position-relative");
  }

  // 隐藏滚动条
  if (this.lock && !this.target.classList.contains("lin-loading-lock")) {
    this.target.classList.add("lin-loading-lock");
  }

  // 已经是现实状态就不需要走下面了
  if (this.visible) {
    return;
  }

  // 渲染
  this.vm = this.$mount();

  if (!this.fullscreen) {
    // 不是全屏的情况下，需要给loading添加一个margin-top属性，否则会因为滚动，然后跑上去了
    this.onScroll = () => {
      handleOnScroll(this.target, this.vm.$el, this.target);
    };
    handleOnScroll(this.target, this.vm.$el, this.target);
    if (!this.lock) {
      // 没有锁定滚动条的情况就需要监听滚动行为，添加margin-top属性
      addScrollListener(this.target, this.onScroll);
    }
  }

  // 添加上去
  this.target.appendChild(this.vm.$el);
  // 显示
  this.visible = true;
};

// 关闭loading
LoadingConstruct.prototype.close = function close() {
  if (!this.target || !this.visible) {
    return;
  }
  this.visible = false;

  // 监听vue动画事件，动画完成后移除DOM，重置
  this.$once("after-leave", () => {
    if (
      !this.fullscreen &&
      this.target.classList.contains("lin-loading-position-relative")
    ) {
      this.target.classList.remove("lin-loading-position-relative");
    }

    if (this.lock && this.target.classList.contains("lin-loading-lock")) {
      this.target.classList.remove("lin-loading-lock");
    }
    if (!this.fullscreen) {
      this.vm.$el.style.marginTop = "";
      if (!this.lock) {
        delScrollListener(this.target, this.onScroll);
      }
    }
    if (this.vm.$el) {
      this.target.removeChild(this.vm.$el);
    }
    // this.vm.$el && this.target.removeChild(this.vm.$el);
  });
};

export default LoadingConstruct;
