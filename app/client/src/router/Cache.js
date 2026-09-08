const pageCache = new Map();
const MAX_CACHE_SIZE = 7;
const cacheQueue = [];
const componentCache = new Map();

const Cache = {
  get(path) {
    return pageCache.get(path);
  },

  has(path) {
    return pageCache.has(path);
  },

  add(path, content) {
    if (cacheQueue.length >= MAX_CACHE_SIZE) {
      const oldestPath = cacheQueue.shift();
      pageCache.delete(oldestPath);
    }
    pageCache.set(path, content);
    cacheQueue.push(path);
  },

  updateQueue(path) {
    const index = cacheQueue.indexOf(path);
    if (index > -1) {
      cacheQueue.splice(index, 1);
      cacheQueue.push(path);
    }
  },

  saveComponentSafely(path, component) {
    componentCache.set(path, component);
  },

  clear() {
    pageCache.clear();
    cacheQueue.length = 0;
    componentCache.clear();
  }
};

export default Cache;