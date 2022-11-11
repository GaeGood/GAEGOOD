import { main, addCommas, convertToNumber } from "/public/js/main.js";
const { loggedInUser } = await main();

const html = window.location.href;
const sp = html.split("products/");
const id = sp[1].replace("/", "");

const button__container = document.querySelector(".button__container");
const orderButton__User = `<button type="button" class="order__button__user btn btn-dark btn-lg"><a href="/orders/create?pid=${id}&count=1" id="direct-buy__link">바로 구매하기</a></button>`;
const orderButton__Any = `  <button type="button" class="order__button__any btn btn-dark btn-lg" data-bs-toggle="modal" data-bs-target="#modalLogin">
    바로 구매하기
  </button>`;

if (loggedInUser) {
  button__container.innerHTML += orderButton__User;
} else {
  button__container.innerHTML += orderButton__Any;
}

const button__cart = document.querySelector(".button__cart");
// const button__remove = document.querySelector(".button__remove");
const button__delete = document.querySelector(".button__delete");
const button__plus = document.querySelector(".button__plus");
const button__minus = document.querySelector(".button__minus");

const productCategory = document.querySelector(".product__category");
const productName = document.querySelector(".product__name");
const productImg = document.querySelector(".product__img");
const productDescription = document.querySelector(".product__desc");
const productPrice = document.querySelector(".product__price");
const productAmount = document.querySelector(".product__amount");

const DATABASE_NAME = "cartDB";
const version = 1;
const objectStore = "cartStorage";
const pathArray = window.location.pathname.split("/");
const productId = pathArray[2];
let productAmountNum = parseInt(productAmount.textContent);
/* 상품 상제정보 불러오기*/
// home에서 클릭한 상품의 상세 내용
let nameValue = "";
let checkedValue = false;
let categoryValue = "";
let shortDescValue = "";
let longDescValue = "";
let priceValue = 0;
let smallImageURLValue = "";
let bigImageURLValue = "";
let stockValue = 10;
const idObject = {
  id: id,
  amount: productAmountNum,
  checked: checkedValue,
  name: nameValue,
  category: categoryValue,
  shortDesc: shortDescValue,
  longDesc: longDescValue,
  price: priceValue,
  smallImageURL: smallImageURLValue,
  bigImageURL: bigImageURLValue,
  stock: stockValue,
};
fetch(`/api/products/${id}`)
  .then(async (res) => {
    const json = await res.json();

    if (res.ok) {
      return json;
    }

    return Promise.reject(json);
  })
  .then((product) => {
    addproduct(product);
  })
  .catch((err) => alert(err));

// home에서 클릭한 상품의 상세 내용 html에 렌더링하는 함수
function addproduct(product) {
  productCategory.textContent = product.category;
  productName.textContent = product.name;
  productImg.src = product.smallImageURL;

  productDescription.textContent = product.shortDesc;
  productPrice.textContent = `${addCommas(product.price)}원`;

  getAllIndexedDB(DATABASE_NAME, version, objectStore, id, function (result) {
    result.forEach((data) => {
      if (id === data.id) {
        productAmount.textContent = data.amount;
        changeDirectBuyLink(data.amount);
      }
    });

    productAmountNum = parseInt(productAmount.textContent);
  });
}

/*indexedDB 함수*/

createIndexedDB(DATABASE_NAME, version, objectStore);

//cartDB를 열고, 해당 DataBase에 cartStorage라는 이름의 오브젝트스토어를 추가하는 함수
function createIndexedDB(DATABASE_NAME, version, objectStore) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version); //데이터베이스 열기
    let db;
    request.onupgradeneeded = function (event) {
      //데이터베이스에 오브젝트스토어(데이터 담는 공간) 추가하기
      db = event.target.result;

      db.createObjectStore(objectStore, { keyPath: "id" }); //value에 들어가는 객체의 키값을 key로 쓰는것임.
      /*      keyOptions에는 keyPath와 autoIncrement중 하나가 들어감 
                keyPath– IndexedDB가 키로 사용할 개체 속성에 대한 경로(예: id)
                autoIncrement– true이면 새로 저장된 객체의 키가 계속 증가하는 숫자로 자동 생성됩니다. */
      request.onerror = function (event) {
        alert("failed : object store cannot create.");
      };

      request.onsuccess = function (event) {
        db = request.result;
      }; //성공 시 db에 result 저장
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}

/* indexedDB에 추가한 데이터 삭제하는 함수(기준: key) */
function deleteIndexedDBdata(DATABASE_NAME, version, objectStore, idObject) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    const key = idObject.id;
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

/* 장바구니 버튼 클릭 시 indexedDB에 데이터 추가*/
function insertIndexedDB(DATABASE_NAME, version, objectStore, idObject) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    request.onerror = function (event) {
      console.log(event.target.errorCode);
      alert("indexedDB 사용 불가로 장바구니 사용이 제한됩니다.");
    };
    request.onsuccess = function (response) {
      const db = request.result;
      const transaction = db.transaction(objectStore, "readwrite");
      const store = transaction.objectStore(objectStore);
      // 상품 수량 담기 (최초)
      idObject.amount = parseInt(productAmount.textContent);
      idObject.checked = false;
      idObject.name = productName.textContent;
      idObject.category = productCategory.textContent;
      idObject.shortDesc = productDescription.textContent;
      //idObject.longDesc = productAmount.textContent;
      idObject.price = convertToNumber(productPrice.textContent);
      idObject.smallImageURL = productImg.src;
      // idObject.bigImageURL = productAmount.textContent;
      store.add(idObject);
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}
/* 해당 indexedDB에 존재하는 모든 데이터 조회하기 */
function getAllIndexedDB(DATABASE_NAME, version, objectStore, id, cb) {
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
      store.getAll().onsuccess = function (response) {
        cb(response.target.result);
      };
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}

function updateIndexedDB(DATABASE_NAME, version, objectStore, id) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    const key = id;
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

        value.amount = parseInt(productAmount.textContent);
        store.put(value).onsuccess = function () {};
      };
      store.get(key).onerror = function () {
        alert("indexedDB의 key를 가져오는데 실패했습니다.");
      };
    };
  }
}

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
      const transaction = db.transaction(objectStore, "readwrite");
      const store = transaction.objectStore(objectStore);
      store.getAllKeys().onsuccess = function (response) {
        cb(response.target.result);
      };
      store.getAllKeys().onerror = function () {
        alert("indexedDB의 key를 가져오는데 실패했습니다.");
      };
    };
  }
}
/* 장바구니 버튼 클릭 이벤트 */
button__cart.addEventListener("click", () => {
  getAllKeysIndexedDB(DATABASE_NAME, version, objectStore, function (result) {
    if (result.includes(id)) {
      updateIndexedDB(DATABASE_NAME, version, objectStore, id);
      if (
        // 테스트 해볼 부분
        confirm(
          "이미 장바구니에 담겨있는 상품입니다.\n수량이 변경되었습니다.\n장바구니로 이동하시겠습니까?"
        )
      ) {
        location.href = "/cart";
      } else {
      }
    } else {
      insertIndexedDB(DATABASE_NAME, version, objectStore, idObject);
      if (
        confirm("상품을 장바구니에 담았습니다.\n장바구니로 이동하시겠습니까?")
      ) {
        location.href = "/cart";
      } else {
      }
    }
  });
});

/* 상품 수량 +, - 클릭 이벤트*/
let validation = 0;
button__plus.addEventListener("click", function plusAmount() {
  productAmountNum += 1;
  productAmount.textContent = productAmountNum;
  changeDirectBuyLink(productAmountNum);
});
button__minus.addEventListener("click", function minusAmount() {
  productAmountNum -= 1;
  if (productAmountNum <= 1) {
    productAmountNum = 1;
  }
  productAmount.textContent = productAmountNum;
  changeDirectBuyLink(productAmountNum);
});
/* 장바구니 내용 삭제 버튼 클릭 이벤트 */
// button__remove.addEventListener("click", () => {
//   deleteIndexedDBdata(DATABASE_NAME, version, objectStore, idObject);
//   alert("상품을 장바구니에서 삭제했습니다.");
// });

function changeDirectBuyLink(amount) {
  const directBuyLink = document.getElementById("direct-buy__link");

  directBuyLink.href = `/orders/create?pid=${id}&count=${amount}`;
}

function renderLikedButton() {
  document.querySelector(".fa-regular.fa-heart").classList.add("hidden");
  document.querySelector(".fa-solid.fa-heart").classList.remove("hidden");
}

function renderUnlikedButton() {
  document.querySelector(".fa-regular.fa-heart").classList.remove("hidden");
  document.querySelector(".fa-solid.fa-heart").classList.add("hidden");
}

let alreadyLiked = false;

loggedInUser.likesProductList.forEach((product) => {
  if (String(product._id) === id) {
    alreadyLiked = true;
  }
});

if (alreadyLiked) {
  renderLikedButton();
} else {
  renderUnlikedButton();
}

const likeButton = document.querySelector(".like__button");

likeButton.addEventListener("click", (e) => {
  fetch(`/api/products/${id}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const json = await res.json();

      if (res.ok) {
        return json;
      }

      return Promise.reject(json);
    })
    .then((message) => {
      alert(message);
      if (message === "좋아요 성공") {
        renderLikedButton();
      } else {
        renderUnlikedButton();
      }
    })
    .catch((e) => {
      alert(e);
    });
});
