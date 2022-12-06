import store from "./store";
// localstorage에 Data set
function localStorageSetData(key, formData) {
  const value = JSON.stringify(formData);
  var str = localStorage.getItem(key);
  var obj = {};
  try {
    obj = JSON.parse(str);
  } catch {
    obj = {};
  }
  if (!obj) {
    obj = {};
    obj[key] = [];
  }
  obj[key].push(value);
  localStorage.setItem(key, JSON.stringify(obj));
}

// localstorage에서 Data get
function localStorageGetData(key, id, amount) {
  const localStorageData = store.getData(key);
  const array = localStorageData.cart;
  var str = localStorage.getItem(key);
  var obj = {};
  try {
    obj = JSON.parse(str);
  } catch {
    obj = {};
  }
  if (!obj) {
    obj = {};
    obj[key] = [];
  }
  obj.amount = amount;
  // Localstorage의 email, password 값과 일치해야만 ture값 반환 --> 배열로 정의, 리턴
  const validate = array.map((data) => {
    let parsedData = JSON.parse(data);
    if (parsedData.id === id) {
      store.removeStore(key);
      localStorage.setItem(key, JSON.stringify(obj));
      return [true, parsedData.id];
    }
  });
  return validate;
}
// function localStorageGetData(key, id) {
//   const localStorageData = store.getData(key);
//   const array = localStorageData.cart;
//   // Localstorage의 email, password 값과 일치해야만 ture값 반환 --> 배열로 정의, 리턴
//   const validate = array.map((data) => {
//     let parsedData = JSON.parse(data);
//     if (parsedData.id === id) {
//       return [true, parsedData.id];
//     }
//   });
//   return validate;
// }
function localStorageGetFilteredData(key, id) {
  let trueValue = [];
  let trueId = 1;
  const result = localStorageGetData(key, id);
  const trueResult = result.filter((data) => data !== undefined);
  //id가 일치하는 경우
  if (trueResult.length > 0) {
    trueValue = trueResult[0];
    trueId = trueValue[1];
  }
}

export { localStorageSetData, localStorageGetData };
