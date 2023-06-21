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
const convertCurrencyUnit = (currency) => {
  let currencyNumber = parseInt(currency);
  let returnUnitArr = [];
  //Math.trunc(147000/10000)
  if (currencyNumber >= 10000) {
    let unit = Math.trunc(currencyNumber / 10000);
    returnUnitArr[0] = `${unit}억`;
    currencyNumber -= unit * 10000;
  }
  if (currencyNumber > 0) {
    returnUnitArr[1] = currencyNumber.toLocaleString("ko-KR");
  }

  return returnUnitArr.join(" ");
};
export { throttling, lpad, rpad, convertCurrencyUnit };
