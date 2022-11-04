const cart__detail__image = document.querySelector(".cart__detail__image");
const cart__detail__name = document.querySelector(".cart__detail__name");
const cart__detail__price = document.querySelector(".cart__detail__price");
const cart__amount = document.querySelector(".cart__amount");
const total__amount = document.querySelector(".total__amount");
const total__price = document.querySelector(".total__price");
const deliveryFee = document.querySelector(".deliveryFee");
const total__sum = document.querySelector(".total__sum");
const order__button = document.querySelector(".order__button");

/* 데이터 렌더링 */
getAllIndexedDB(databaseName, version, objectStore, function (dataList) {
  const cartContainer = document.querySelector(".cart__list__top");
  if (dataList.length !== 0) {
    dataRender(dataList);
  }
});

function getAllIndexedDB(databaseName, version, objectStore, cb) {
  if (window.indexedDB) {
    const request = indexedDB.open(databaseName, version);
    request.onerror = (event) => console.log(event.target.errorCode);
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction(objectStore, "readwrite");
      const store = transaction.objectStore(objectStore);
      store.getAll().onsuccess = function (response) {
        cb(response.target.result);
      };
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}
/* 해당 indexedDB에 존재하는 모든 key 조회하기 */
function getAllKeysIndexedDB(databaseName, version, objectStore, cb) {
  // getAllKeysIndexedDB 함수를 완성해주세요.
  if (window.indexedDB) {
    const request = indexedDB.open(databaseName, version);
    request.onerror = (event) => console.log(event.target.errorCode);
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction(objectStore, "readonly");
      const store = transaction.objectStore(objectStore);
      store.getAllKeys().onsuccess = function (response) {
        cd(response.target.result);
      };
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}
/* 데이터 렌더링 */
function dataRender(dataList) {
  for (let i = 0; i < dataList.length; i++) {
    const databaseName = "cartDB";
    const version = 1;
    const objectStore = "cartStorage";

    getAllKeysIndexedDB(databaseName, version, objectStore, function (keys) {
      const cartProductId = keys[i]; // posts ObjectStore에 있는 Key를 id로 사용해보세요.
      /* 상품 상제정보 불러오기*/
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((product) => {
          addproduct(product);
        })
        .catch((err) => alert(err.message));
    });
  }
}

// home에서 클릭한 제품의 상세 내용 html에 렌더링하는 함수
function addproduct(product) {
  total__price.innerHTML = product.price;
  cart__detail__name.innerHTML = product.name;
  cart__detail__image.src = product.smallImageURL;
}
