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
const lpad = (baseStr, fillStr, len) => {
  const fillLen = parseInt(len) - String(baseStr).length;
  return fillLen === 0
    ? baseStr
    : `${new Array(fillLen).fill(fillStr).join("")}${baseStr}`;
};
const rpad = (baseStr, fillStr, len) => {
  const fillLen = parseInt(len) - String(baseStr).length;
  return fillLen === 0
    ? baseStr
    : `${baseStr}${new Array(fillLen).fill(fillStr).join("")}`;
};
export { throttling, lpad, rpad };
