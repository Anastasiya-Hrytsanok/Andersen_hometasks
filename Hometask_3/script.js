Array.prototype.myFilter = function (callbackFn, thisArg = {}) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    const isElementMatch = callbackFn.call(thisArg, this[i], i, this);

    if (isElementMatch) {
      result.push(this[i]);
    }
  }

  return result;
};

const createDebounceFunction = (callbackFn, timeout) => {
  let timerId;

  return () => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(callbackFn, timeout);
  };
};