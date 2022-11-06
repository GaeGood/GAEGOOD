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

const DATABASE_NAME = "cartDB";
const version = 1;
const objectStore = "cartStorage";
const pathArray = window.location.pathname.split("/");
const productId = pathArray[2];
let cartCount = 0;
let productAmountNum = parseInt(productAmount.textContent);
/* 상품 상제정보 불러오기*/
// home에서 클릭한 제품의 상세 내용
const html = window.location.href;
const sp = html.split("detail/");
const id = sp[1].replace("/", "");
const idObject = { id: id, amount: productAmountNum };
fetch(`/api/products/${id}`)
  .then((res) => res.json())
  .then((product) => {
    addproduct(product);
  })
  .catch((err) => alert(err.message));

// home에서 클릭한 제품의 상세 내용 html에 렌더링하는 함수
function addproduct(product) {
  productCategory.innerHTML = product.category;
  productName.innerHTML = product.name;
  productImg.src = product.smallImageURL;

  productDescription.innerHTML = product.shortDesc;
  productPrice.innerHTML = product.price;
  getAllIndexedDB(DATABASE_NAME, version, objectStore); //장바구니에 수량이 이미 있는경우 indexedDB에서 조회, 렌더링함
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

//잘못 생성된 indexedDB를 삭제하는 함수, 데이터베이스 자체를 삭제하므로 주의 요망.
function deleteIndexedDB() {
  //매개변수로 DATABASE_NAME를 줄 수 있음.
  if (window.indexedDB) {
    const request = indexedDB.deleteDatabase("undefined"); // DATABASE_NAME를 줄 수 있음.
    const db = request.result;
    db.close();
    request.onsuccess = function () {
      alert("Deleted database successfully");
    };
    request.onerror = function () {
      alert("Error : Couldn't delete database");
    };
    request.onblocked = function () {
      alert("Couldn't delete database due to the operation being blocked");
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
function insertIndexedDB(
  DATABASE_NAME,
  version,
  objectStore,
  idObject,
  cartCount
) {
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
      store.add(idObject);
      if (response.target.result && cartCount === 0) {
        alert("상품을 장바구니에 담았습니다.");
      }
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}
/* 해당 indexedDB에 존재하는 모든 데이터 조회하기 */
function getAllIndexedDB(DATABASE_NAME, version, objectStore) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    request.onerror = (event) => console.log(event.target.errorCode);
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction(objectStore, "readonly");
      const store = transaction.objectStore(objectStore);
      store.getAll().onsuccess = function (response) {
        productAmount.textContent = response.target.result[0].amount;
        productAmountNum = parseInt(productAmount.textContent);
      };
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}
/* 해당 indexedDB에 존재하는 특정 데이터 조회하기 */
function getIndexedDB(DATABASE_NAME, version, objectStore, idObject) {
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
          alert("이미 장바구니에 담겨있는 상품입니다.");
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

function updateIndexedDB(DATABASE_NAME, version, objectStore, idObject) {
  if (window.indexedDB) {
    const request = indexedDB.open(DATABASE_NAME, version);
    const key = idObject.id;
    getAllIndexedDB(DATABASE_NAME, version, objectStore);
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction(objectStore, "readwrite");
      const store = transaction.objectStore(objectStore);
      store.get(key).onsuccess = function (response) {
        const value = response.target.result;
        value.content = parseInt(productAmount.textContent);
        store.put(value, key).onsuccess = function () {
          console.log(`value = ${value}, key = ${key}`);
        };
      };
      store.get(key).onerror = function () {
        alert("indexedDB의 key를 가져오는데 실패했습니다.");
      };
    };
  }
}

// function getAllKeysIndexedDB(DATABASE_NAME, version, objectStore, cb) {
//   // getAllKeysIndexedDB 함수를 완성해주세요.
//   if (window.indexedDB) {
//     const request = indexedDB.open(DATABASE_NAME, version);

//     request.onsuccess = function () {
//       const store = request.result
//         .transaction(objectStore, "readwrite")
//         .objectStore(objectStore);
//       store.getAllKeys().onsuccess = function (response) {
//         cd(response.target.result);
//       };
//     };
//   }
// }
/* 장바구니 버튼 클릭 이벤트 */
button__cart.addEventListener("click", () => {
  insertIndexedDB(DATABASE_NAME, version, objectStore, idObject, cartCount);
  cartCount += 1;
  if (cartCount > 1) {
    getIndexedDB(DATABASE_NAME, version, objectStore, idObject);
  }
  console.log(cartCount);
});

/* 상품 수량 +, - 클릭 이벤트*/
button__plus.addEventListener("click", function plusAmount() {
  productAmountNum += 1;
  productAmount.textContent = productAmountNum;
  //updateIndexedDB;
});
button__minus.addEventListener("click", function minusAmount() {
  productAmountNum -= 1;
  if (productAmountNum <= 1) {
    productAmountNum = 1;
  }
  productAmount.textContent = productAmountNum;
  //updateIndexedDB;
});
/* 장바구니 내용 삭제 버튼 클릭 이벤트 */
button__remove.addEventListener("click", () => {
  deleteIndexedDBdata(DATABASE_NAME, version, objectStore, idObject);
});

/* indexedDB 삭제 버튼 클릭 이벤트 */
button__delete.addEventListener("click", () => {
  deleteIndexedDB;
});
