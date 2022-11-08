import { addCommas } from "/useful-functions.js";
import { main } from "/main.js";
const { loggedInUser } = await main();

const button__container = document.querySelector(".button__container");
const orderButton__User = `<button type="button" class="order__button__user"><a href="/orders/create">바로 구매하기</a></button>`;
const orderButton__Any = `  <button data-bs-toggle="modal" data-bs-target="#modalLogin">
    바로 구매하기
  </button>`;

if (loggedInUser) {
  button__container.innerHTML += orderButton__User;
} else {
  button__container.innerHTML += orderButton__Any;
}

const button__cart = document.querySelector(".button__cart");
const button__remove = document.querySelector(".button__remove");
const button__delete = document.querySelector(".button__delete");
const button__plus = document.querySelector(".button__plus");
const button__minus = document.querySelector(".button__minus");

const productCategory = document.querySelector(".product__category");
const productName = document.querySelector(".product__name");
const productImg = document.querySelector(".product__img");
const productDescription = document.querySelector(".product__desc");
const productPrice = document.querySelector(".product__price");
const productAmount = document.querySelector(".product__amount");

const pathArray = window.location.pathname.split("/");
const productId = pathArray[2];
/* 상품 상제정보 불러오기*/
// home에서 클릭한 제품의 상세 내용
const html = window.location.href;
const sp = html.split("products/");
const pid = sp[1].replace("/", "");

fetch(`/api/products/${pid}`)
  .then((res) => res.json())
  .then((product) => {
    addproduct(product);
  })
  .catch((err) => alert(err.message));

// home에서 클릭한 제품의 상세 내용 html에 렌더링하는 함수
function addproduct(product) {
  productCategory.innerHTML = product.category.name;
  productName.innerHTML = product.name;
  productImg.src = product.smallImageURL;

  productDescription.innerHTML = product.shortDesc;
  productPrice.innerHTML = product.price;

  // 상품 상세 페이지의 수량을 그릴 때,
  // 해당 상품이 indexed DB에 이미 저장되어 있으면 (=장바구니에 담은 적이 있으면),
  // 장바구니에 담았던 수량을 가져와서 상품 상세 페이지의 수량에 적용해줌
  // getAllIndexedDB(DATABASE_NAME, version, objectStore, id, function (result) {
  //   result.forEach((data) => {
  //     if (id === data.id) {
  //       productAmount.textContent = data.amount;
  //     }
  //   });

  //   // idObject의 productAmountNum이 방금 DB에서 찾아온 상품 수량을 가지도록 함 ??
  //   productAmountNum = parseInt(productAmount.textContent);
  // }); //장바구니에 수량이 이미 있는경우 indexedDB에서 조회, 렌더링함
}

/*indexedDB 함수*/

// 접속 시 cartDB 를 열고, cartStorage가 존재하지 않으면 생성
// createIndexedDB(DATABASE_NAME, version, objectStore);

// //cartDB를 열고, 해당 DataBase에 cartStorage라는 이름의 오브젝트스토어를 추가하는 함수
// function createIndexedDB(DATABASE_NAME, version, objectStore) {
//   if (window.indexedDB) {
//     const request = indexedDB.open(DATABASE_NAME, version); //데이터베이스 열기
//     let db;
//     request.onupgradeneeded = function (event) {
//       //데이터베이스에 오브젝트스토어(데이터 담는 공간) 추가하기
//       db = event.target.result;

//       db.createObjectStore(objectStore, { keyPath: "id" }); //value에 들어가는 객체의 키값을 key로 쓰는것임.
//       /*      keyOptions에는 keyPath와 autoIncrement중 하나가 들어감
//                 keyPath– IndexedDB가 키로 사용할 개체 속성에 대한 경로(예: id)
//                 autoIncrement– true이면 새로 저장된 객체의 키가 계속 증가하는 숫자로 자동 생성됩니다. */
//       request.onerror = function (event) {
//         alert("failed : object store cannot create.");
//       };

//       request.onsuccess = function (event) {
//         db = request.result;
//       }; //성공 시 db에 result 저장
//     };
//   } else {
//     alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
//   }
// }

// // DB에서 idObject.id를 id로 갖는 데이터 삭제
// /* indexedDB에 추가한 데이터 삭제하는 함수(기준: key) */
// function deleteIndexedDBdata(DATABASE_NAME, version, objectStore, idObject) {
//   if (window.indexedDB) {
//     const request = indexedDB.open(DATABASE_NAME, version);
//     const key = idObject.id;
//     request.onerror = function (event) {
//       console.log(event.target.errorCode);
//       alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
//     };
//     request.onsuccess = function () {
//       const db = request.result;
//       const transaction = db.transaction(objectStore, "readwrite");
//       const store = transaction.objectStore(objectStore);
//       store.delete(key);
//     };
//   } else {
//     alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
//   }
// }

// /* 장바구니 버튼 클릭 시 indexedDB에 데이터 추가*/
// function insertIndexedDB(
//   DATABASE_NAME,
//   version,
//   objectStore,
//   idObject,
//   product
// ) {
//   if (window.indexedDB) {
//     const request = indexedDB.open(DATABASE_NAME, version);
//     request.onerror = function (event) {
//       console.log(event.target.errorCode);
//       alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
//     };
//     request.onsuccess = function (response) {
//       const db = request.result;
//       const transaction = db.transaction(objectStore, "readwrite");
//       const store = transaction.objectStore(objectStore);
//       // 상품 수량 담기 (최초)
//       idObject.amount = parseInt(productAmount.textContent);
//       idObject.name = product.name;
//       idObject.category = product.category;
//       idObject.shortDesc = product.shortDesc;
//       idObject.longDesc = product.longDesc;
//       idObject.price = product.price;
//       idObject.smallImageURL = product.smallImageURL;
//       idObject.bigImageURL = product.bigImageURL;
//       idObject.stock = product.stock;
//       store.add(idObject);
//     };
//   } else {
//     alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
//   }
// }

// /* 해당 indexedDB에 존재하는 모든 데이터 조회하기 */
// function getAllIndexedDB(DATABASE_NAME, version, objectStore, id, cb) {
//   if (window.indexedDB) {
//     const request = indexedDB.open(DATABASE_NAME, version);
//     request.onerror = function (event) {
//       console.log(event.target.errorCode);
//       alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
//     };
//     request.onsuccess = function () {
//       const db = request.result;
//       const transaction = db.transaction(objectStore, "readonly");
//       const store = transaction.objectStore(objectStore);
//       store.getAll().onsuccess = function (response) {
//         cb(response.target.result);
//       };
//     };
//   } else {
//     alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
//   }
// }

// /* 해당 indexedDB에 존재하는 특정 데이터 조회하기 */
// function getIndexedDB(
//   DATABASE_NAME,
//   version,
//   objectStore,
//   idObject,
//   operation
// ) {
//   if (window.indexedDB) {
//     const request = indexedDB.open(DATABASE_NAME, version);
//     const key = idObject.id;
//     let validate__value = 0;
//     request.onerror = function (event) {
//       console.log(event.target.errorCode);
//       alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
//     };
//     request.onsuccess = function () {
//       const db = request.result;
//       const transaction = db.transaction(objectStore, "readonly");
//       const store = transaction.objectStore(objectStore);
//       store.get(key).onsuccess = function (response) {
//         if (response.target.result) {
//           if (
//             !confirm(
//               "이미 장바구니에 담겨있는 상품입니다.\n장바구니에서 수량을 변경해주세요."
//             )
//           ) {
//             // 취소(아니오) 버튼 클릭 시 이벤트
//             if (operation === "plus") {
//               productAmountNum -= 1;
//               productAmount.textContent = productAmountNum;
//             } else if (operation === "minus") {
//               productAmountNum += 1;
//               productAmount.textContent = productAmountNum;
//             }
//           } else {
//             // 확인(예) 버튼 클릭 시 이벤트
//             if (operation === "plus") {
//               productAmountNum -= 1;
//               productAmount.textContent = productAmountNum;
//             } else if (operation === "minus") {
//               productAmountNum += 1;
//               productAmount.textContent = productAmountNum;
//             }
//           }
//           validate__value += 1;
//         }
//       };

//       store.get(key).onerror = function () {
//         alert("indexedDB의 key를 가져오는데 실패했습니다.");
//       };
//     };
//     return validate__value;
//   } else {
//     alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
//   }
// }

// function updateIndexedDB(DATABASE_NAME, version, objectStore, id) {
//   if (window.indexedDB) {
//     const request = indexedDB.open(DATABASE_NAME, version);
//     const key = id;
//     getAllIndexedDB(DATABASE_NAME, version, objectStore, id, function (result) {
//       result.forEach((data) => {
//         if (id === data.id) {
//           productAmount.textContent = data.amount;
//         }
//       });

//       productAmountNum = parseInt(productAmount.textContent);
//     });
//     request.onerror = function (event) {
//       console.log(event.target.errorCode);
//       alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
//     };
//     request.onsuccess = function () {
//       const db = request.result;
//       const transaction = db.transaction(objectStore, "readwrite");
//       transaction.onerror = function (e) {
//         console.log("fail");
//       };
//       transaction.oncomplete = function (e) {
//         console.log("success");
//       };
//       const store = transaction.objectStore(objectStore);

//       store.get(key).onsuccess = function (response) {
//         const value = response.target.result;

//         value.amount = parseInt(productAmount.textContent);
//         store.put(value).onsuccess = function () {
//           //productAmount.textContent = value.amount;
//         };
//       };
//       store.get(key).onerror = function () {
//         alert("indexedDB의 key를 가져오는데 실패했습니다.");
//       };
//     };
//   }
// }

// function getAllKeysIndexedDB(DATABASE_NAME, version, objectStore) {
//   // getAllKeysIndexedDB 함수를 완성해주세요.
//   if (window.indexedDB) {
//     const request = indexedDB.open(DATABASE_NAME, version);
//     request.onerror = function (event) {
//       console.log(event.target.errorCode);
//       alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
//     };
//     request.onsuccess = function () {
//       const db = request.result;
//       const transaction = db.transaction(objectStore, "readwrite");
//       const store = transaction.objectStore(objectStore);
//       store.getAllKeys().onsuccess = function (response) {
//         // cb(response.target.result);
//       };
//       store.getAllKeys().onerror = function () {
//         alert("indexedDB의 key를 가져오는데 실패했습니다.");
//       };
//     };
//   }
// }
// /* 장바구니 버튼 클릭 이벤트 */
// button__cart.addEventListener("click", () => {
//   getAllIndexedDB(DATABASE_NAME, version, objectStore, id, function (result) {
//     if (result) {
//       cartCount += 1;
//       return cartCount;
//     }
//   });

//   console.log(`cartCount : ${cartCount}`);
//   insertIndexedDB(DATABASE_NAME, version, objectStore, idObject, cartCount);
//   if (cartCount === 0) {
//     alert("상품을 장바구니에 담았습니다.");
//   }
//   cartCount += 1;
//   if (cartCount > 1) {
//     let operation = "none";
//     getIndexedDB(DATABASE_NAME, version, objectStore, idObject, operation);
//   }
//   // console.log(cartCount);
// });

// /* 상품 수량 +, - 클릭 이벤트*/
// let validation = 0;
// button__plus.addEventListener("click", function plusAmount() {
//   productAmountNum += 1;
//   productAmount.textContent = productAmountNum;
//   let plus = "plus";
//   validation = getIndexedDB(
//     DATABASE_NAME,
//     version,
//     objectStore,
//     idObject,
//     plus
//   );
//   console.log(validation);
//   if (validation > 0) {
//     updateIndexedDB(DATABASE_NAME, version, objectStore, id);
//   }
// });

// button__minus.addEventListener("click", function minusAmount() {
//   productAmountNum -= 1;
//   if (productAmountNum <= 1) {
//     productAmountNum = 1;
//   }
//   productAmount.textContent = productAmountNum;
//   let minus = "minus";
//   validation = getIndexedDB(
//     DATABASE_NAME,
//     version,
//     objectStore,
//     idObject,
//     minus
//   );
//   console.log(validation);
//   if (validation > 0) {
//     updateIndexedDB(DATABASE_NAME, version, objectStore, id);
//   }
// });

// /* 장바구니 내용 삭제 버튼 클릭 이벤트 */
// button__remove.addEventListener("click", () => {
//   deleteIndexedDBdata(DATABASE_NAME, version, objectStore, idObject);
//   alert("상품을 장바구니에서 삭제했습니다.");
// });

// indexDB 열기

const objectStore = "cartStorage";

const dbReq = indexedDB.open("testcartDB", 1);

// DB 생성 성공 시 / event.target.result; 로 생성된 DB에 접근 가능
let db;

dbReq.addEventListener("success", function (event) {
  console.log("onsuccess");
  db = event.target.result;
});

// DB 생성 실패 시 / event.target.error; 로 에러 메시지에 접근 가능
dbReq.addEventListener("error", function (event) {
  const error = event.target.error;
  console.log("error", error.name);
});

// DB 업그레이드를 해야할 때 / 사용자가 기존에 브라우저에 갖고 있던 opentutorials indexedDB의 버전과, 현재 동작하는 opentutorials indexedDB의 버전이 다를 경우 동작함
// 여기에다가 objectStore를 만듬
dbReq.addEventListener("upgradeneeded", function (event) {
  console.log("onupgradeneeded");
  db = event.target.result;
  // 사용자가 기존에 브라우저에 갖고 있던 opentutorials indexedDB의 버전 === event.oldVersion
  // event.oldVersion의 값을 기반으로 현재 사용자의 브라우저에 존재하지 않는 objectStore를 생성해줌
  let oldVersion = event.oldVersion;
  if (oldVersion < 1) {
    // "topics" 라는 이름의 objectStore 생성
    // 저장된 데이터의 식별자로 id를 사용하고,
    // id에 autoIncrement 를 속성을 부여
    db.createObjectStore("cartStorage", {
      keyPath: "id",
    });
  }
});

async function insertData(newData) {
  return new Promise((resolve, reject) => {
    // 데이터 추가
    // topics objectStore에 데이터를 읽기/쓰기 할 수 있는 트랜잭션을 생성하고, 이를 topics objectStore에 연결하고, topics objectStore를 돌려 받음
    let store = db
      .transaction(objectStore, "readwrite")
      .objectStore(objectStore);

    // store.add로 데이터 추가
    let addReq = store.add(newData);
    addReq.addEventListener("success", function (event) {
      resolve("success");
    });
  });
}

async function getData(dataId) {
  return new Promise((resolve, reject) => {
    // 데이터 1개 조회 (id 기반)
    // topics objectStore에 데이터를 읽기 할 수 있는 트랜잭션을 생성하고, 이를 topics objectStore에 연결하고, topics objectStore를 돌려 받음
    let store = db
      .transaction(objectStore, "readonly")
      .objectStore(objectStore);

    // store.get(id) 로 1개의 데이터를 가져옴
    let getReq = store.get(dataId);
    getReq.addEventListener("success", function (event) {
      const foundData = event.target.result;
      resolve(foundData);
    });
  });
}

async function getAllData() {
  return new Promise((resolve, reject) => {
    // 전체 데이터 조회
    // topics objectStore에 데이터를 읽기 할 수 있는 트랜잭션을 생성하고, 이를 topics objectStore에 연결하고, topics objectStore를 돌려 받음
    let store = db
      .transaction(objectStore, "readonly")
      .objectStore(objectStore);

    // store.getAll() 로 전체 데이터를 가져옴
    let getAllReq = store.getAll();

    getAllReq.addEventListener("success", function (event) {
      const dataList = event.target.result;
      resolve(dataList);
    });
  });
}

async function updateData(updatedData) {
  return new Promise((resolve, reject) => {
    // 데이터 1개 업데이트 (id 기반)
    // topics objectStore에 데이터를 읽기/쓰기 할 수 있는 트랜잭션을 생성하고, 이를 topics objectStore에 연결하고, topics objectStore를 돌려 받음
    let store = db
      .transaction(objectStore, "readwrite")
      .objectStore(objectStore);

    // store.put으로 1개 데이터를 수정함
    let putReq = store.put(updatedData); // 데이터 1개 업데이트 (id 기반)
    putReq.addEventListener("success", function (event) {
      const updatedData = event.target.result;
      return updatedData;
    });
  });
}

async function deleteData(dataId) {
  return new Promise((resolve, reject) => {
    // 데이터 1개 삭제 (id 기반)
    // topics objectStore에 데이터를 읽기/쓰기 할 수 있는 트랜잭션을 생성하고, 이를 topics objectStore에 연결하고, topics objectStore를 돌려 받음
    let store = db
      .transaction(objectStore, "readwrite")
      .objectStore(objectStore);

    // store.delete으로 1개 데이터를 삭제함
    let deleteReq = store.delete(dataId);
    deleteReq.addEventListener("success", function (event) {
      return "success";
    });
  });
}

/* 장바구니 버튼 클릭 이벤트 */
button__cart.addEventListener("click", async () => {
  console.log("getData 수행");
  const data = await getData(pid);
  console.log("getData 결과");
  console.log(data);
  if (data) {
    console.log("updateData 수행");
    data.count += Number(productAmount.textContent);
    await updateData(data);
  } else {
    console.log("insertData 수행");
    const count = Number(productAmount.textContent);
    await insertData({ id: pid, count });
  }
});

/* 장바구니 내용 삭제 버튼 클릭 이벤트 */
button__remove.addEventListener("click", async () => {
  console.log("deleteData 수행");
  await deleteData(pid);
  alert("상품을 장바구니에서 삭제했습니다.");
});

// /* 상품 수량 +, - 클릭 이벤트*/
button__plus.addEventListener("click", function plusAmount() {
  productAmount.textContent = Number(productAmount.textContent) + 1;
});

button__minus.addEventListener("click", function minusAmount() {
  if (Number(productAmount.textContent) === "1") {
    productAmount.textContent = Number(productAmount.textContent);
  } else {
    productAmount.textContent = Number(productAmount.textContent) - 1;
  }
});

const buttonGetAll = document.querySelector(".button__get-all");

buttonGetAll.addEventListener("click", async () => {
  console.log("getAllData 수행");
  const dataList = await getAllData();
  console.log("getAllData 결과");
  console.log(dataList);
});
