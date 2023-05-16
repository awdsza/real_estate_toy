const throttling = (callback, time = 1000, ...args) => {
  let timer;
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        callback(...args);
        timer = null;
      }, time);
    }
  };
};
export { throttling };
