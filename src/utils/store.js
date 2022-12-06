const store = {
  getData: (storeName) => {
    return JSON.parse(localStorage.getItem(storeName));
  },
  setData: (storeName, data) => {
    localStorage.setItem(storeName, JSON.stringify(data));
  },
  removeStore: (storeName) => {
    localStorage.removeItem(storeName);
  },
};

export default store;
