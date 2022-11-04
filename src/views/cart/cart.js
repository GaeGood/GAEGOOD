const cart__detail__image = document.querySelector(".cart__detail__image");
const cart__detail__name = document.querySelector(".cart__detail__name");
const cart__detail__price = document.querySelector(".cart__detail__price");
const cart__amount = document.querySelector(".cart__amount");
const total__amount = document.querySelector(".total__amount");
const total__price = document.querySelector(".total__price");
const deliveryFee = document.querySelector(".deliveryFee");
const total__sum = document.querySelector(".total__sum");
const order__button = document.querySelector(".order__button");

const databaseName = "cartDB";
const version = 1;
const objectStore = "cartStorage";
let productData = [];
let productData2 = "";
/* indexedDB 데이터 전체 가져오기 */
productData2 = getAllIndexedDB(databaseName, version, objectStore, productData);
console.log(productData2);
/* 상품 상제정보 불러오기*/
// const idObject = { id: id };
// fetch(`/api/products/${id}`)
//   .then((res) => res.json())
//   .then((product) => {
//     addproduct(product);
//   })
//   .catch((err) => alert(err.message));

// // home에서 클릭한 제품의 상세 내용 html에 렌더링하는 함수
// function addproduct(product) {
//   productCategory.innerHTML = product.category;
//   productName.innerHTML = product.name;
//   productImg.src = product.smallImageURL;

//   productDescription.innerHTML = product.shortDesc;
//   productPrice.innerHTML = product.price;
// }

/* 해당 indexedDB에 존재하는 모든 데이터 조회하기 */
function getAllIndexedDB(databaseName, version, objectStore, productData) {
  let thing = "";
  if (window.indexedDB) {
    const request = indexedDB.open(databaseName, version);
    request.onerror = (event) => console.log(event.target.errorCode);
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction(objectStore, "readonly");
      const store = transaction.objectStore(objectStore);
      store.getAll().onsuccess = function (response) {
        productData = response.target.result;
        thing = productData[0].id;
      };
    };
    return thing;
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}
