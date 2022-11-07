import { main } from "/main.js";
const { loggedInUser } = await main();

const cart__container = document.querySelector(".cart__container");
const total__amount = document.querySelector(".total__amount");
const total__price = document.querySelector(".total__price");
const deliveryFee = document.querySelector(".deliveryFee");
const total__sum = document.querySelector(".total__sum");
const order__button__container = document.querySelector(
  ".order__button__container"
);
const orderButton__User = `<button type="button" class="order__button__user"><a href="/orders?write=true">주문서 작성</a></button>`;
const orderButton__Any = `  <button data-bs-toggle="modal" data-bs-target="#modalLogin">
    주문서 작성
  </button>`;
// const idObject = { id: id, amount: productAmountNum };

if (loggedInUser) {
  order__button__container.innerHTML = orderButton__User;
} else {
  order__button__container.innerHTML = orderButton__Any;
}

const DATABASE_NAME = "cartDB";
const version = 1;
const objectStore = "cartStorage";
let checkedCount = 0;
/* 데이터 렌더링 */
getAllIndexedDB(DATABASE_NAME, version, objectStore, function (dataList) {
  //dataList === response.target.result
  if (dataList.length !== 0) {
    dataRender(dataList, DATABASE_NAME, version, objectStore);
  }
});

function getAllIndexedDB(DATABASE_NAME, version, objectStore, cb) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    request.onerror = function (event) {
      console.log(event.target.errorCode);
      alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
    };
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
function getAllKeysIndexedDB(DATABASE_NAME, version, objectStore, cb) {
  // getAllKeysIndexedDB 함수를 완성해주세요.
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    request.onerror = function (event) {
      console.log(event.target.errorCode);
      alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
    };
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction(objectStore, "readonly");
      const store = transaction.objectStore(objectStore);
      store.getAllKeys().onsuccess = function (response) {
        cb(response.target.result);
      };
      store.getAllKeys().onerror = function () {
        alert("indexedDB의 key를 가져오는데 실패했습니다.");
      };
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}
/* 데이터 렌더링 */
function dataRender(dataList, DATABASE_NAME, version, objectStore) {
  const cart__container = document.querySelector(".cart__container");
  for (let i = 0; i < dataList.length; i++) {
    const cartCheck = document.createElement("input");
    const cartImage = document.createElement("img");
    const cartName = document.createElement("div");
    const cartPrice = document.createElement("div");
    const cartAmount = document.createElement("div");
    const cartList = document.createElement("div");
    const cartDetail = document.createElement("div");
    const cartDetailBottom = document.createElement("div");
    const cartAmountBtn = document.createElement("div");
    const cartPlusBtn = document.createElement("button");
    const cartMinusBtn = document.createElement("button");
    const cartDeleteBtn = document.createElement("button");

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
    /* cart__plus__button  button */
    cartPlusBtn.classList.add("cart__plus__button");
    cart__amount__btn__container.prepend(cartPlusBtn);
    const cart__plus__button = document.querySelector(".cart__plus__button");
    cart__plus__button.textContent = "-";
    /* cart__minus__button button */
    cartMinusBtn.classList.add("cart__minus__button");
    cart__amount__btn__container.appendChild(cartMinusBtn);
    const cart__minus__button = document.querySelector(".cart__minus__button");
    cart__minus__button.textContent = "+";

    /* cart__delete__button 컨테이너 button */
    cartDeleteBtn.classList.add("cart__delete__button");
    cart__amount__btn__container.appendChild(cartDeleteBtn);
    const cart__delete__button = document.querySelector(
      ".cart__delete__button"
    );
    cart__delete__button.textContent = "🗑";

    /* 체크박스 */
    cartCheck.classList.add("cart__detail__check");
    cartCheck.type = "checkbox";
    cart__list__top.prepend(cartCheck);
    /*이미지*/
    cartImage.classList.add("cart__detail__image");
    cart__list__top.insertBefore(cartImage, cart__detail);
    /* 이름 */
    cartName.classList.add("cart__detail__name");
    cart__detail.prepend(cartName);
    /* 가격 */
    cartPrice.classList.add("cart__detail__price");
    cart__detail.appendChild(cartPrice);
    /* 수량 */
    cartAmount.classList.add("cart__amount");
    cart__amount__btn__container.insertBefore(cartAmount, cart__minus__button);

    getAllKeysIndexedDB(DATABASE_NAME, version, objectStore, function (keys) {
      const cartProductId = keys[i]; // posts ObjectStore에 있는 Key를 id로 사용해보세요.

      /* 상품 상제정보 불러오기*/
      fetch(`/api/products/${cartProductId}`)
        .then((res) => res.json())
        .then((product) => {
          addProduct(product, i, cartProductId, dataList[i]);
        })
        .catch((err) => alert(err.message));
    });

    /* 장바구니 상품 삭제 버튼 클릭 이벤트 */
    cart__delete__button.addEventListener("click", (e) => {
      const targetId = e.target.id;
      const deleteTarget = `container-${targetId.substring(4)}`;
      deleteIndexedDBdata(
        DATABASE_NAME,
        version,
        objectStore,
        targetId.substring(4)
      );
      document.querySelector(`#${deleteTarget}`).remove();
    });

    /* 체크박스 - 부분 선택 클릭 이벤트 */
    const singleCheck = document.querySelector(".cart__detail__check");
    singleCheck.addEventListener("click", checkSelectAll);

    function checkSelectAll() {
      // 전체 체크박스
      const checkboxes = document.querySelectorAll('input[name="singleCheck"]');
      // 선택된 체크박스
      const checked = document.querySelectorAll(
        'input[name="singleCheck"]:checked'
      );
      // 전체 선택 체크박스
      const selectAll = document.querySelector('input[name="wholeCheck"]');
      selectAll.checked = checkboxes.length === checked.length;
    }
    /* 체크박스 - 전체 선택 클릭 이벤트 */
    const wholeCheck = document.querySelector('input[name="wholeCheck"]');
    wholeCheck.addEventListener("click", selectAll);
    function selectAll() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');

      checkboxes.forEach((checkbox) => {
        checkbox.checked = wholeCheck.checked;
      });
    }

    /* 선택 삭제 버튼 클릭 이벤트 */
    const checked__delete = document.querySelector("#checked__delete");

    /* 선택 삭제 이벤트 */
    checked__delete.addEventListener("click", () => {
      // 전체 체크박스
      const checkboxes = document.querySelectorAll('input[name="singleCheck"]');
      // 삭제할 대상의 value(=key) 수집하는 배열
      const deleteTarget = [];

      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          deleteTarget.push(checkbox.value);
        }
      });

      /* indexedDB와 화면에서 삭제함*/
      deleteTarget.forEach((target) => {
        const deleteTarget = `container-${target}`;
        deleteIndexedDBdata(DATABASE_NAME, version, objectStore, target);
        document.querySelector(`#${deleteTarget}`).remove();
      });
    });
  }
}

/* 수량 증감 클릭 이벤트 */

/* 상품 수량 +, - 클릭 이벤트*/
let validation = 0;
let productAmountNum = parseInt(cartAmount.textContent);
cart__plus__button.addEventListener("click", function plusAmount() {
  productAmountNum += 1;
  cartAmount.textContent = productAmountNum;
  let plus = "plus";
  validation = getIndexedDB(
    DATABASE_NAME,
    version,
    objectStore,
    idObject,
    plus
  );
  console.log(validation);
  if (validation > 0) {
    updateIndexedDB(DATABASE_NAME, version, objectStore, id);
  }
});
cart__minus__button.addEventListener("click", function minusAmount() {
  productAmountNum -= 1;
  if (productAmountNum <= 1) {
    productAmountNum = 1;
  }
  productAmount.textContent = productAmountNum;
  let minus = "minus";
  validation = getIndexedDB(
    DATABASE_NAME,
    version,
    objectStore,
    idObject,
    minus
  );
  console.log(validation);
  if (validation > 0) {
    updateIndexedDB(DATABASE_NAME, version, objectStore, id);
  }
});

// home에서 클릭한 제품의 상세 내용 html에 렌더링하는 함수
function addProduct(product, idx, cartProductId, data) {
  //리팩토링! 한 번만 호출할 수 있도록 for문 위에다 선언하고 불러올수 있게 고쳐보자.
  const cartImage = document.querySelectorAll(".cart__detail__image");
  const cartName = document.querySelectorAll(".cart__detail__name");
  const cartPrice = document.querySelectorAll(".cart__detail__price");
  const cartAmount = document.querySelectorAll(".cart__amount");
  const cart__list__top = document.querySelectorAll(".cart__list__top");
  const cart__detail__check = document.querySelectorAll(".cart__detail__check");
  const cart__delete__button = document.querySelectorAll(
    ".cart__delete__button"
  );
  /* 상품 컨테이너 */
  cart__list__top[idx].id = `container-${cartProductId}`;
  /* 삭제 체크박스 */
  cart__detail__check[idx].setAttribute("value", cartProductId);
  cart__detail__check[idx].setAttribute("name", "singleCheck");
  /* 삭제(휴지통) 버튼 */
  cart__delete__button[idx].id = `btn-${cartProductId}`;
  /*이미지*/
  cartImage[idx].setAttribute("src", product.smallImageURL);
  /* 이름 */
  cartName[idx].innerHTML = product.name;
  /* 가격 */
  cartPrice[idx].innerHTML = `${product.price} 원`;
  /* 수량 */
  cartAmount[idx].textContent = data.amount;
  cartImage.src = product.smallImageURL;
}

/* indexedDB에 추가한 데이터 삭제하는 함수(기준: key) */
function deleteIndexedDBdata(DATABASE_NAME, version, objectStore, targetId) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    const key = targetId; //"btn-" 제거하고 id값만 반환
    request.onerror = function (event) {
      console.log(event.target.errorCode);
      alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
    };
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction(objectStore, "readwrite");
      const store = transaction.objectStore(objectStore);
      store.delete(key);
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}

/* 수량 증감에 따른 indexedDB amonut 수정 */
function updateIndexedDB(DATABASE_NAME, version, objectStore, id) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    const key = id;
    getAllIndexedDB(DATABASE_NAME, version, objectStore, id);
    request.onerror = function (event) {
      console.log(event.target.errorCode);
      alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
    };
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction(objectStore, "readwrite");
      transaction.onerror = function (e) {
        console.log("fail");
      };
      transaction.oncomplete = function (e) {
        console.log("success");
      };
      const store = transaction.objectStore(objectStore);

      store.get(key).onsuccess = function (response) {
        const value = response.target.result;

        value.amount = parseInt(cartAmount.textContent);
        store.put(value).onsuccess = function () {
          //cartAmount.textContent = value.amount;
        };
      };
      store.get(key).onerror = function () {
        alert("indexedDB의 key를 가져오는데 실패했습니다.");
      };
    };
  }
}

/* 해당 indexedDB에 존재하는 특정 데이터 조회하기 */
function getIndexedDB(
  DATABASE_NAME,
  version,
  objectStore,
  idObject,
  operation
) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    const key = idObject.id;
    request.onerror = function (event) {
      console.log(event.target.errorCode);
      alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
    };
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction(objectStore, "readonly");
      const store = transaction.objectStore(objectStore);
      store.get(key).onsuccess = function (response) {
        if (response.target.result) {
          if (operation === "plus") {
            productAmountNum -= 1;
            cartAmount.textContent = productAmountNum;
          } else if (operation === "minus") {
            productAmountNum += 1;
            cartAmount.textContent = productAmountNum;
          }
        }
      };

      store.get(key).onerror = function () {
        alert("indexedDB의 key를 가져오는데 실패했습니다.");
      };
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}
