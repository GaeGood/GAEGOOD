const cart__amount = document.querySelector(".cart__amount");
const total__amount = document.querySelector(".total__amount");
const total__price = document.querySelector(".total__price");
const deliveryFee = document.querySelector(".deliveryFee");
const total__sum = document.querySelector(".total__sum");

const order__button = document.querySelector(".order__button");
const databaseName = "cartDB";
const version = 1;
const objectStore = "cartStorage";
/* 데이터 렌더링 */
getAllIndexedDB(databaseName, version, objectStore, function (dataList) {
  //dataList === response.target.result
  if (dataList.length !== 0) {
    dataRender(dataList, databaseName, version, objectStore);
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
        cb(response.target.result);
      };
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}
/* 데이터 렌더링 */
function dataRender(dataList, databaseName, version, objectStore) {
  const cart__container = document.querySelector(".cart__container");
  const cart__amount__btn__container = document.querySelector(
    ".cart__amount__btn__container"
  );
  const cart__minus__button = document.querySelector(".cart__minus__button");
  for (let i = 0; i < dataList.length; i++) {
    const cartImage = document.createElement("img");
    const cartName = document.createElement("div");
    const cartPrice = document.createElement("div");
    const cartAmount = document.createElement("div");
    const cartList = document.createElement("div");
    const cartDetail = document.createElement("div");
    const cartDetailBottom = document.createElement("div");
    const cartAmountBtn = document.createElement("div");

    /* cart__list__top 컨테이너 div */
    cartList.classList.add("cart__list__top");
    cart__container.prepend(cartList);
    const cart__list__top = document.querySelector(".cart__list__top");
    /* cart__detail 컨테이너 div */
    cartDetail.classList.add("cart__detail");
    cart__list__top.prepend(cartDetail);
    const cart__detail = document.querySelector(".cart__detail");
    /* cart__detail__bottom 컨테이너 div */
    cartDetailBottom.classList.add("cart__detail__bottom");
    cart__detail.prepend(cartDetailBottom);
    const cart__detail__bottom = document.querySelector(
      ".cart__detail__bottom"
    );
    /* cart__amount__btn__container 컨테이너 div */
    cartAmountBtn.classList.add("cart__amount__btn__container");
    cart__detail__bottom.prepend(cartAmountBtn);
    const cart__amount__btn__container = document.querySelector(
      ".cart__amount__btn__container"
    );

    /*이미지*/
    cartImage.classList.add("cart__detail__image");
    cart__list__top.prepend(cartImage);
    /* 이름 */
    cartName.classList.add("cart__detail__name");
    cart__detail.prepend(cartName);
    /* 가격 */
    cartPrice.classList.add("cart__detail__price");
    cart__detail.appendChild(cartPrice);
    /* 수량 */
    // cartAmount.classList.add("cart__amount");
    // cart__amount__btn__container.insertBefore(cartAmount, cart__minus__button);

    getAllKeysIndexedDB(databaseName, version, objectStore, function (keys) {
      const cartProductId = keys[i]; // posts ObjectStore에 있는 Key를 id로 사용해보세요.
      /* 상품 상제정보 불러오기*/
      fetch(`/api/products/${cartProductId}`)
        .then((res) => res.json())
        .then((product) => {
          addproduct(product);
          console.log("for문 체크 ~");
        })
        .catch((err) => alert(err.message));
    });
  }
}
// home에서 클릭한 제품의 상세 내용 html에 렌더링하는 함수
function addproduct(product) {
  const cartImage = document.querySelector(".cart__detail__image");
  const cartName = document.querySelector(".cart__detail__name");
  const cartPrice = document.querySelector(".cart__detail__price");
  // const cartAmount = document.querySelector(".cart__amount");
  /*이미지*/
  cartImage.setAttribute("src", product.smallImageURL);
  /* 이름 */
  cartName.innerHTML = product.name;
  /* 가격 */
  cartPrice.innerHTML = product.price;
  /* 수량 */
  // cartAmount.textContent = 0;

  // cartImage.src = product.smallImageURL;
}
