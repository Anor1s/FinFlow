const Throttle = function(func, delay) {
  let lastCall = 0;

  return function(...args) {
    const now = Date.now();
    const context = this;

    if (now - lastCall >= delay) {
      lastCall = now;
      return func.apply(context, args);
    }
  };
};

const Debounce = function(func, delay) {
  let timeout;

  return function(...args) {
    const context = this;

    const later = () => {
      clearTimeout(timeout);
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
};

export { Throttle, Debounce };