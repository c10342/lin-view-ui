// 在测试环境下模拟requestAnimationFrame函数
global.window.requestAnimationFrame = function (cb) {
  return setTimeout(() => {
    cb();
  }, 0);
};
