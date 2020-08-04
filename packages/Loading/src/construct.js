import Vue from "vue";

import Loading from "./loading.vue";

import getScroll from "packages/assets/utils/getScroll.js";

function handleOnScroll(target, targetDom, scrollDom) {
  if (document.body === target) {
    targetDom.style.marginTop = `${getScroll().top}px`;
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

const LoadingConstruct = Vue.extend(Loading);

LoadingConstruct.prototype.open = function(
  options = { text: null, background: null, target, fullscreen }
) {
  if (!options.target) {
    return;
  }

  Object.keys(options).forEach((key) => {
    this[key] = options[key];
  });

  if (
    !this.fullscreen &&
    !this.target.classList.contains("lin-loading-position-relative")
  ) {
    this.target.classList.add("lin-loading-position-relative");
  }

  if (this.lock && !this.target.classList.contains("lin-loading-lock")) {
    this.target.classList.add("lin-loading-lock");
  }

  if (this.visible) {
    return;
  }

  this.vm = this.$mount();

  if (!this.fullscreen) {
    this.onScroll = () => {
      handleOnScroll(this.target, this.vm.$el, this.target);
    };
    handleOnScroll(this.target, this.vm.$el, this.target);
    if (!this.lock) {
      addScrollListener(this.target, this.onScroll);
    }
  }

  this.target.appendChild(this.vm.$el);

  this.visible = true;
};

LoadingConstruct.prototype.close = function() {
  if (!this.target || !this.visible) {
    return;
  }
  this.visible = false;

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
    this.vm.$el && this.target.removeChild(this.vm.$el);
  });
};

export default LoadingConstruct;
