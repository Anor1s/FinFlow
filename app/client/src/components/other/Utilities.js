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

const InitManagerCreate = function(Elements) {
  if (!Array.isArray(Elements)) return;

  Elements.forEach(component => {
    if (component && typeof component.init === 'function' && !component._isInitialized) {
      component.init();
      component._isInitialized = true;
    }
  });
};

const InitManagerClear = function(Elements) {
  if (!Array.isArray(Elements)) return;

  Elements.forEach(component => {
    if (component) component._isInitialized = false;
  });
};

export { Throttle, Debounce, InitManagerCreate, InitManagerClear };


