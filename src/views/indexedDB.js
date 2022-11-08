//잘못 생성된 indexedDB를 삭제하는 함수, 데이터베이스 자체를 삭제하므로 주의 요망.
// function deleteIndexedDB() {
//   //매개변수로 DATABASE_NAME를 줄 수 있음.
//   if (window.indexedDB) {
//     const request = indexedDB.deleteDatabase("undefined"); // DATABASE_NAME를 줄 수 있음.
//     const db = request.result;
//     db.close();
//     request.onsuccess = function () {
//       alert("Deleted database successfully");
//     };
//     request.onerror = function () {
//       alert("Error : Couldn't delete database");
//     };
//     request.onblocked = function () {
//       alert("Couldn't delete database due to the operation being blocked");
//     };
//   } else {
//     alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
//   }
// }

/* indexedDB에 추가한 데이터 삭제하는 함수(기준: key) */
async function deleteIndexedDBdata(
  DATABASE_NAME,
  version,
  objectStore,
  idObject
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
      const transaction = db.transaction(objectStore, "readwrite");
      const store = transaction.objectStore(objectStore);
      store.delete(key);
    };
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}

/* 해당 indexedDB에 존재하는 모든 데이터 조회하기 */
async function getAllIndexedDB(DATABASE_NAME, version, objectStore, cb) {
  return new Promise((resolve, reject) => {
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
          const orderProductList = cb(response.target.result);
          resolve(orderProductList);
        };
      };
    } else {
      alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
    }
  })
  
}


/* 해당 indexedDB에 존재하는 특정 데이터 조회하기 */
async function getIndexedDB(DATABASE_NAME, version, objectStore, idObject) {
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
        // 조회 완료시 수행하는 곳...
      };

      store.get(key).onerror = function () {
        alert("indexedDB의 key를 가져오는데 실패했습니다.");
      };
    };
    return validate__value;
  } else {
    alert("해당 브라우저에서는 indexedDB를 지원하지 않습니다.");
  }
}


// indexedDB 의 키값들 가져오기 
async function getAllKeysIndexedDB(DATABASE_NAME, version, objectStore, cb) {
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
        cb(response.target.result)
      };
      store.getAllKeys().onerror = function () {
        alert("indexedDB의 key를 가져오는데 실패했습니다.");
      };
    };
  }
}

//  장바구니 화면에서 - 상품id , 사진, 개별 가격, 개별 수량, 총 수량, 결제 금액(수량*상품가격) & 배송비 를 indexedDB에 보내줌.

export {
  deleteIndexedDBdata,
  getAllIndexedDB,
  getIndexedDB,
  getAllKeysIndexedDB,
};