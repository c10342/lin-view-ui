export const throttle = (callback: Function, time = 200) => {
  let timer: number | null = null;
  const destroyTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return (...args: any) => {
    destroyTimer();
    timer = window.setTimeout(() => {
      callback(...args);
      destroyTimer();
    }, time);
  };
};
