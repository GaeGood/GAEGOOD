import { main, addCommas, convertToNumber } from "/public/js/main.js";
const { loggedInUser } = await main();

const cart__container = document.querySelector(".cart__container");
const total__amount = document.querySelector(".total__amount");
const total__price = document.querySelector(".total__price");
const deliveryFee = document.querySelector(".deliveryFee");
const total__sum = document.querySelector(".total__sum");
const order__button__container = document.querySelector(
  ".order__button__container"
);
const orderButton__User = `<button type="button" class="order__button__user"><a href="/orders/create">주문서 작성</a></button>`;
const orderButton__User__Disabled = `<button type="button" class="order__button__user__disabled" disabled>주문서 작성</button>`;
const orderButton__Any = `<button data-bs-toggle="modal" data-bs-target="#modalLogin">
    주문서 작성
  </button>`;
const order__button__user = document.querySelector(".order__button__userr");
const cart__whole__check = document.querySelector('input[name="wholeCheck"]');

/* defaultImage 컨테이너 div */
const defaultImage = document.createElement("div");
defaultImage.classList.add("default__image");
cart__container.prepend(defaultImage);
const default__Image = document.querySelector(".default__image");
/* defaultText 컨테이너 div */
const defaultText = document.createElement("div");
defaultText.classList.add("default__text");
cart__container.appendChild(defaultText);
const default__Text = document.querySelector(".default__text");

const DATABASE_NAME = "cartDB";
const version = 1;
const objectStore = "cartStorage";
let checkedCount = 0;
let totalPrice = 0;
let totalAmountCurrent = 0;
let totalPriceCurrent = 0;
let totalAmount = 0;
let totalSumAmount = 0;
let isFirst = false;
/* 데이터 렌더링 */
getAllIndexedDB(DATABASE_NAME, version, objectStore, function (dataList) {
  //dataList === response.target.result
  if (dataList.length !== 0) {
    default__Image.remove();
    default__Text.remove();

    if (loggedInUser) {
      order__button__container.innerHTML = orderButton__User;
    } else {
      order__button__container.innerHTML = orderButton__Any;
    }
    dataRender(dataList, DATABASE_NAME, version, objectStore);
  } else {
    //장바구니가 비었을 경우
    default__Image.innerHTML = `<i class="fa-solid fa-cart-shopping" id="empty-cart"></i>`;
    default__Text.textContent = "장바구니가 비었습니다. 상품을 추가해보세요!";
    total__amount.textContent = `${0}개`;
    total__price.textContent = `${0}원`;
    deliveryFee.textContent = `${0}원`;
    total__sum.textContent = `${0}원`;

    order__button__container.innerHTML = orderButton__User__Disabled;
  }
});
function emptyCartImage() {
  getAllIndexedDB(DATABASE_NAME, version, objectStore, function (dataList) {
    /* defaultImage 컨테이너 div */
    const defaultImage = document.createElement("div");
    defaultImage.classList.add("default__image");
    cart__container.prepend(defaultImage);
    const default__Image = document.querySelector(".default__image");
    /* defaultText 컨테이너 div */
    const defaultText = document.createElement("div");
    defaultText.classList.add("default__text");
    cart__container.appendChild(defaultText);
    const default__Text = document.querySelector(".default__text");
    if (dataList.length !== 0) {
      default__Image.remove();
      default__Text.remove();
    } else {
      //장바구니가 비었을 경우
      default__Image.innerHTML = `<i class="fa-solid fa-cart-shopping" id="empty-cart"></i>`;
      default__Text.textContent = "장바구니가 비었습니다. 상품을 추가해보세요!";
      total__amount.textContent = `${0}개`;
      total__price.textContent = `${0}원`;
      deliveryFee.textContent = `${0}원`;
      total__sum.textContent = `${0}원`;
    }
  });
}
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
      store.getAll().onerror = function () {
        alert("indexedDB의 데이터를 가져오는데 실패했습니다.");
      };
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}
/* 해당 indexedDB에 존재하는 모든 key 조회하기 */
function getAllKeysIndexedDB(DATABASE_NAME, version, objectStore, cb) {
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
    /* 맨처음 화면에서 결제 금액란 렌더링 해줌 */
    totalAmount += dataList[i].amount;
    totalPrice += dataList[i].amount * dataList[i].price;
    /* 맨처음 checked === false 로 세팅해줌 */
    updateCheckedIndexedDB(
      DATABASE_NAME,
      version,
      objectStore,
      dataList[i].id,
      false
    );
    disabledOrderButton(dataList);
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
    /* cart__minus__button  button */
    cartMinusBtn.classList.add("cart__minus__button");
    cart__amount__btn__container.prepend(cartMinusBtn);
    const cart__minus__button = document.querySelector(".cart__minus__button");
    cart__minus__button.textContent = "-";
    /* cart__plus__button button */
    cartPlusBtn.classList.add("cart__plus__button");
    cart__amount__btn__container.appendChild(cartPlusBtn);
    const cart__plus__button = document.querySelector(".cart__plus__button");
    cart__plus__button.textContent = "+";

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
    cart__amount__btn__container.insertBefore(cartAmount, cart__plus__button);

    getAllKeysIndexedDB(DATABASE_NAME, version, objectStore, function (keys) {
      const cartProductId = keys[i];

      /* 상품 상제정보 불러오기*/
      fetch(`/api/products/${cartProductId}`)
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((product) => {
          addProduct(product, i, cartProductId, dataList[i]);
        })
        .catch((err) => alert(err));
    });

    /* 맨 처음 체크박스 초기세팅 */
    checkedDateRender();
    /* 체크된 상품 없거나 전부 삭제되면 주문서 작성하기 비활성화 */
    function disabledOrderButton(dataList) {
      getAllIndexedDB(DATABASE_NAME, version, objectStore, function (result) {
        const checkedArray = result.map((data) => data.checked);
        let countCheckedFalse = checkedArray.filter(
          (element) => element === false
        ).length;
        if (countCheckedFalse === result.length) {
          // if (
          //   convertToNumber(total__amount.textContent) === 0 ||
          //   dataList.length === 0
          // ) {
          order__button__container.innerHTML = "";
          order__button__container.innerHTML = orderButton__User__Disabled;
        } else {
          if (loggedInUser) {
            order__button__container.innerHTML = "";
            order__button__container.innerHTML = orderButton__User;
          } else {
            order__button__container.innerHTML = "";
            order__button__container.innerHTML = orderButton__Any;
          }
        }
      });
    }
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

      //db에 데이터 없으면 전체삭제 체크박스 비워주기.
      if (dataList.length === 0) {
        wholeCheck.checked = false;
      }

      getAllIndexedDB(DATABASE_NAME, version, objectStore, function (result) {
        if (result.length === 0 && !isFirst) {
          isFirst = true;
          emptyCartImage();
        }
      });

      checkedDateRender();
      disabledOrderButton(dataList);
    });

    /* 체크박스 - 부분 선택 클릭 이벤트 */
    const singleCheck = document.querySelector(".cart__detail__check");
    singleCheck.addEventListener("click", (e) => checkSelectAll(e));

    function checkSelectAll(e) {
      // 전체 체크박스
      const checkboxes = document.querySelectorAll('input[name="singleCheck"]');
      // 선택된 체크박스
      const singlechecked = document.querySelectorAll(
        'input[name="singleCheck"]:checked'
      );
      // 전체 선택 체크박스
      const selectAll = document.querySelector('input[name="wholeCheck"]');

      selectAll.checked = checkboxes.length === singlechecked.length;
      checkedStatusUpdate(e);
      checkedDateRender();
      renderCheckedValues();
      disabledOrderButton(dataList);
    }

    function checkedStatusUpdate(e) {
      const productId = e.target.value;
      let checkStatus = e.target.checked;
      updateCheckedIndexedDB(
        DATABASE_NAME,
        version,
        objectStore,
        productId,
        checkStatus
      );
    }

    function checkedDateRender() {
      getAllIndexedDB(DATABASE_NAME, version, objectStore, function (values) {
        // 전체 체크박스 하는중
        const checkboxes = document.querySelectorAll(
          'input[name="singleCheck"]'
        );
        let amount = 0;
        let price = 0;
        values.forEach((value) => {
          if (value.checked) {
            checkboxes.forEach((checkbox) => {
              if (checkbox.checked) {
                const key = checkbox.value;
                total__amount.textContent = `${0}개`;
                total__price.textContent = `${0}원`;
                deliveryFee.textContent = `${0}원`;
                total__sum.textContent = `${0}원`;

                if (value.id === key) {
                  amount += value.amount;
                  price += value.amount * value.price;
                }

                total__amount.textContent = `${addCommas(amount)}개`;
                total__price.textContent = `${addCommas(price)}원`;
                if (
                  convertToNumber(total__price.textContent) <= 50000 &&
                  convertToNumber(total__price.textContent) > 0
                ) {
                  deliveryFee.textContent = `${addCommas(3000)}원`;
                } else {
                  deliveryFee.textContent = `${0}원`;
                }
                total__sum.textContent = `${addCommas(
                  price + convertToNumber(deliveryFee.textContent)
                )}원`;
              }
            });
          } else {
            total__amount.textContent = `${0}개`;
            total__price.textContent = `${0}원`;
            deliveryFee.textContent = `${0}원`;
            total__sum.textContent = `${0}원`;
          }
        });
      });
    }

    /* 체크박스 - 전체 선택 클릭 이벤트 */
    const wholeCheck = document.querySelector('input[name="wholeCheck"]');
    wholeCheck.addEventListener("click", selectAll);
    function selectAll() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      let checkStatus = wholeCheck.checked;
      checkboxes.forEach((checkbox) => {
        checkbox.checked = wholeCheck.checked;
      });
      updateCheckedAllIndexedDB(
        DATABASE_NAME,
        version,
        objectStore,
        checkStatus
      );
      //getAllindexedDB 해서, 모든 value.checked = true으로 put
      checkedDateRender();
      disabledOrderButton(dataList);
    }

    /* 선택 삭제 버튼 클릭 이벤트 */
    const checked__delete = document.querySelector("#checked__delete");

    /* 선택 삭제 이벤트 */
    checked__delete.addEventListener("click", () => {
      // if (confirm("선택한 상품들을 삭제하시겠습니까?")) {
      // 확인(예) 버튼 클릭 시 이벤트
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

      checkedDateRender();
      disabledOrderButton(dataList);
      //db에 데이터 없으면 전체삭제 체크박스 비워주기.
      getAllIndexedDB(DATABASE_NAME, version, objectStore, function (result) {
        if (result.length === 0) {
          wholeCheck.checked = false;
        }
        if (result.length === 0 && !isFirst) {
          isFirst = true;
          emptyCartImage();
        }
      });

      // } else {
      //   // 취소(아니오) 버튼 클릭 시 이벤트
      // }
    });
    /* 상품 수량 +, - 클릭 이벤트*/
    /* 수량 증가 클릭 이벤트 */
    cart__plus__button.addEventListener("click", (e) => {
      const targetId = e.target.id;
      const productId = targetId.substring(5);
      let productAmountNum = convertToNumber(cartAmount.textContent);
      productAmountNum += 1;
      cartAmount.textContent = addCommas(productAmountNum);
      const targetChecked = document.querySelector(
        `input[value="${productId}"]`
      );

      let checkStatus = targetChecked.checked;
      updateIndexedDB(
        DATABASE_NAME,
        version,
        objectStore,
        productId,
        cartAmount,
        checkStatus,
        productAmountNum
      );
      renderCheckedValues();
    });
    /* 수량 감소 버튼 클릭 이벤트 */
    cart__minus__button.addEventListener("click", (e) => {
      const targetId = e.target.id;
      const productId = targetId.substring(6);
      let productAmountNum = convertToNumber(cartAmount.textContent);
      productAmountNum -= 1;
      if (productAmountNum <= 1) {
        productAmountNum = 1;
      }
      cartAmount.textContent = addCommas(productAmountNum);
      const targetChecked = document.querySelector(
        `input[value="${productId}"]`
      );
      let checkStatus = targetChecked.checked;
      updateIndexedDB(
        DATABASE_NAME,
        version,
        objectStore,
        productId,
        cartAmount,
        checkStatus,
        productAmountNum
      );
      renderCheckedValues();
    });

    /* 수량 증감에 따른 indexedDB amonut 수정 */
    function updateIndexedDB(
      DATABASE_NAME,
      version,
      objectStore,
      productId,
      cartAmount,
      checkStatus,
      productAmountNum
    ) {
      if (window.indexedDB) {
        const request = indexedDB.open(DATABASE_NAME, version);
        const key = productId;

        getIndexedDB(DATABASE_NAME, version, objectStore, key, function (data) {
          if (data.id === key) {
            cartAmount.textContent = addCommas(data.amount);
            productAmountNum = convertToNumber(cartAmount.textContent);
          }
        });

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
            value.amount = convertToNumber(cartAmount.textContent);
            if (checkStatus) {
              value.checked = true;
            } else {
              value.checked = false;
            }

            store.put(value).onsuccess = function () {};
          };
          store.get(key).onerror = function () {
            alert("indexedDB의 key를 가져오는데 실패했습니다.");
          };
        };
      }
    }

    function renderCheckedValues() {
      getAllKeysIndexedDB(DATABASE_NAME, version, objectStore, function (keys) {
        let ischeckedId = keys[i];
        const request = indexedDB.open(DATABASE_NAME, version);
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

          store.getAll().onsuccess = function (response) {
            let resultArray = response.target.result;

            totalAmountCurrent = 0;
            totalPriceCurrent = 0;
            resultArray.forEach((result) => {
              if (result.checked) {
                /* 총 수량 */
                totalAmountCurrent += parseInt(result.amount);
                /* 총 가격 */
                totalPriceCurrent +=
                  parseInt(result.amount) * parseInt(result.price);
              }
            });
            total__amount.textContent = `${addCommas(totalAmountCurrent)}개`;
            total__price.textContent = `${addCommas(totalPriceCurrent)}원`;
            /* 배송비 */
            if (
              convertToNumber(total__price.textContent) <= 50000 &&
              convertToNumber(total__price.textContent) > 0
            ) {
              deliveryFee.textContent = `${addCommas(3000)}원`;
            } else {
              deliveryFee.textContent = `${0}원`;
            }
            /* 합계 */
            total__sum.textContent = `${addCommas(
              convertToNumber(total__price.textContent) +
                convertToNumber(deliveryFee.textContent)
            )}원`;
          };
          store.get(ischeckedId).onerror = function () {
            alert("indexedDB의 Data를 가져오는데 실패했습니다.");
          };
        };
      });
    }
  }
}

// home에서 클릭한 상품의 상세 내용 html에 렌더링하는 함수
function addProduct(product, idx, cartProductId, data) {
  //리팩토링! 한 번만 호출할 수 있도록 for문 위에다 선언하고 불러올수 있게 고쳐보자.
  const cartImage = document.querySelectorAll(".cart__detail__image");
  const cartName = document.querySelectorAll(".cart__detail__name");
  const cartPrice = document.querySelectorAll(".cart__detail__price");
  const cartAmount = document.querySelectorAll(".cart__amount");
  const defaultImage = document.querySelector("#defaultImage");
  const cart__list__top = document.querySelectorAll(".cart__list__top");

  const cart__detail__check = document.querySelectorAll(".cart__detail__check");
  const cart__delete__button = document.querySelectorAll(
    ".cart__delete__button"
  );
  const cart__plus__button = document.querySelectorAll(".cart__plus__button");
  const cart__minus__button = document.querySelectorAll(".cart__minus__button");
  /* 상품 컨테이너 */
  cart__list__top[idx].id = `container-${cartProductId}`;
  /* 삭제 체크박스 */
  cart__detail__check[idx].setAttribute("value", cartProductId);
  cart__detail__check[idx].setAttribute("name", "singleCheck");
  // cart__detail__check[idx].setAttribute("checked", true);

  /* 삭제(휴지통) 버튼 */
  cart__delete__button[idx].id = `btn-${cartProductId}`;
  /*이미지*/
  cartImage[idx].setAttribute("src", product.smallImageURL);
  /* 이름 */
  cartName[idx].innerHTML = product.name;
  /* 가격 */
  cartPrice[idx].innerHTML = `${addCommas(product.price)}원`;
  /* plus 버튼 */
  cart__plus__button[idx].id = `plus-${cartProductId}`;
  /* minus 버튼 */
  cart__minus__button[idx].id = `minus-${cartProductId}`;
  /* 수량 */
  cartAmount[idx].textContent = addCommas(data.amount);

  cartImage.src = product.smallImageURL;
  /* 초기 화면에서 결제 금액란 렌더링 해줌 */

  // total__amount.textContent = `${addCommas(totalAmount)}개`;
  // total__price.textContent = `${addCommas(totalPrice)}원`;
  // if (convertToNumber(total__amount.textContent) !== 0) {
  //   deliveryFee.textContent = `${addCommas(3000)}원`;
  // } else {
  //   deliveryFee.textContent = `${0}원`;
  // }

  // total__sum.textContent = `${addCommas(
  //   convertToNumber(total__price.textContent) +
  //     convertToNumber(deliveryFee.textContent)
  // )}원`;
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
      // 삭제 하기전에 타겟 아이디를 이용해서 해당 아이디의 amount를 가져와 총 수량에서 빼고 렌더링도 해줌.
      store.get(key).onsuccess = function (response) {
        let resultId = response.target.result.id;
        let resultAmount = response.target.result.amount;
        let resultPrice = response.target.result.price;
        if (resultId === key) {
          store.getAll().onsuccess = function (response) {
            const resultArray = response.target.result;
            totalAmountCurrent = 0;
            totalPriceCurrent = 0;
            resultArray.forEach((result) => {
              /* 총 수량 */
              totalAmountCurrent += parseInt(result.amount);
              /* 총 가격 */
              totalPriceCurrent +=
                parseInt(result.amount) * parseInt(result.price);
            });
            total__amount.textContent = `${addCommas(totalAmountCurrent)}개`;
            total__price.textContent = `${addCommas(totalPriceCurrent)}원`;
            /* 배송비 */
            if (
              convertToNumber(total__price.textContent) <= 50000 &&
              convertToNumber(total__price.textContent) > 0
            ) {
              deliveryFee.textContent = `${addCommas(3000)}원`;
            } else {
              deliveryFee.textContent = `${0}원`;
            }
            /* 합계 */
            total__sum.textContent = `${addCommas(
              convertToNumber(total__price.textContent) +
                convertToNumber(deliveryFee.textContent)
            )}원`;
          };
          store.getAll().onerror = function () {
            alert("indexedDB의 Data를 가져오는데 실패했습니다.");
          };
        }
      };
      store.get(key).onerror = function () {
        alert("indexedDB의 key를 가져오는데 실패했습니다.");
      };
      //키값으로 삭제
      store.delete(key);
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}

/* 해당 indexedDB에 존재하는 특정 데이터 조회하기 */

function getIndexedDB(DATABASE_NAME, version, objectStore, productId, cb) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    const key = productId;
    request.onerror = function (event) {
      console.log(event.target.errorCode);
      alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
    };
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction(objectStore, "readonly");
      const store = transaction.objectStore(objectStore);
      store.get(key).onsuccess = function (response) {
        const resultData = response.target.result;
        cb(response.target.result);
      };

      store.get(key).onerror = function () {
        alert("indexedDB의 key를 가져오는데 실패했습니다.");
      };
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}

/* 체크 여부에 따른 indexedDB checked 수정 */
function updateCheckedIndexedDB(
  DATABASE_NAME,
  version,
  objectStore,
  productId,
  checkStatus
) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    const key = productId;
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
        if (checkStatus) {
          value.checked = true;
        } else {
          value.checked = false;
        }
        store.put(value).onsuccess = function () {
          const targetCheckbox = document.querySelector(
            `input[value="${key}"]`
          );
          if (targetCheckbox) {
            targetCheckbox.checked = value.checked;
          }
        };
      };
      store.get(key).onerror = function () {
        alert("indexedDB의 key를 가져오는데 실패했습니다.");
      };
    };
  }
}

/* 모든 indexedDB checked 를 변경 */
function updateCheckedAllIndexedDB(
  DATABASE_NAME,
  version,
  objectStore,
  checkStatus
) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    //const key = productId;
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
      store.getAll().onsuccess = function (response) {
        const values = response.target.result;
        values.forEach((value) => {
          if (checkStatus) {
            value.checked = true;
          } else {
            value.checked = false;
          }
          store.put(value).onsuccess = function () {
            // const targetCheckbox = document.querySelector(
            //   `input[value="${key}"]`
            // );
            // if (targetCheckbox) {
            //   targetCheckbox.checked = value.checked;
            // }
          };
        });
      };
      store.getAll().onerror = function () {
        alert("indexedDB의 데이터를 가져오는데 실패했습니다.");
      };
    };
  }
}
