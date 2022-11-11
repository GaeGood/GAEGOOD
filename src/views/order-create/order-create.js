import {
  main,
  deleteIndexedDBdata,
  getAllIndexedDB,
  addCommas,
  convertToNumber,
} from "/public/js/main.js";
const { loggedInUser } = await main();

if (!loggedInUser) {
  window.location.href = "/";
}

let orderProductList = [];

// 쿼리스트링 가져오기
const html = window.location.href;
const sp = html.split("orders/create/");
const queryString = sp[1].replace("/", "");

// 쿼리스트링의 값을 확인하여 directBuy 여부 확인
let directBuy = true;

if (queryString === "") {
  directBuy = false;
}

const DATABASE_NAME = "cartDB";
const version = 1;
const objectStore = "cartStorage";

if (directBuy) {
  // 쿼리스트링에서 pid, count 값을 가져옴
  let params = new URLSearchParams(queryString);
  const directProductPid = params.get("pid");
  const directProductCount = params.get("count");

  // pid를 이용해 DB에서 상품 정보 fetch
  const directProduct = await getDirectBuyProductInfo(directProductPid);

  // 주문 생성 로직에 맞춰 directProduct에 id, amount 프로퍼티 추가
  directProduct.id = directProduct._id;
  directProduct.amount = directProductCount;
  directProduct.checked = true;

  // orderProductList에 directProduct를 넣음
  orderProductList.push(directProduct); // 무조건 1개
} else {
  // 장바구니 상품 여부 확인
  orderProductList = await getAllIndexedDB(
    // indexedDB에 들어간 만큼
    DATABASE_NAME,
    version,
    objectStore,
    function (orderProductDBList) {
      return orderProductDBList;
    }
  );

  if (orderProductList.length === 0) {
    alert("구매 목록이 없습니다. 1초 후 홈으로 이동합니다.");
    setTimeout("location.href = '/'", 1000);
  }
}

async function getDirectBuyProductInfo(directProductPid) {
  return new Promise((resolve, reject) => {
    fetch(`/api/products/${directProductPid}`, {
      method: "GET",
    })
      .then(async (res) => {
        const json = await res.json();

        if (res.ok) {
          return json;
        }

        return Promise.reject(json);
      })
      .then((product) => {
        resolve(product);
      })
      .catch((error) => alert(error));
  });
}

// db에 있는 기존 유저정보 화면에 띄우기
const { name, phoneNumber, postCode, streetAddress, extraAddress, _id } =
  loggedInUser;

const [
  userName,
  userPhoneNumber,
  userPostCode,
  userStreetAddress,
  userExtraAddress,
] = document.querySelectorAll(".user_info");

const [productsPriceHTML, deliveryFeeHTML, totalPriceHTML] =
  document.querySelectorAll(".pay");

if (!phoneNumber) {
  userName.value = name;
  userPhoneNumber.value = "";
  userPostCode.value = "";
  userStreetAddress.value = "";
  userExtraAddress.value = "";
} else {
  userName.value = name;
  userPhoneNumber.value = phoneNumber;
  userPostCode.value = postCode;
  userStreetAddress.value = streetAddress;
  userExtraAddress.value = extraAddress;
}

const orderProductTable = document.querySelector(".product__list");

const productAllIdArr = [];
const productAllAmountArr = [];
let productsPrice = 0;

orderProductList.forEach((orderProduct) => {
  // 장바구니 각각의 상품마다 표 생성될 수 있도록 템플릿리터럴 진행
  // 주의, 장바구니에 체크된 상품들만 주문서로 이동.
  if (orderProduct.checked) {
    orderProductTable.innerHTML += `
        <tr class='order product__information'>
          <td class="order__product__td">
              <div class="order product__id hidden">${orderProduct.id}</div>
          </td>
          <td class="order__product__td">
              <img src="${
                orderProduct.smallImageURL
              }" class="order product__picture" />
          </td>
          <td class="order__product__td">
              <div class="order product__info">
                <div class="order product__name">${orderProduct.name}</div>
                <div class="order product__shortdesc">${
                  orderProduct.shortDesc
                }</div>
              </div>
          </td>
          <td class="order__product__td">
              <div class="order product__amount">${orderProduct.amount}</div>
          </td>
          <td class="order__product__td">
              <div class="order product__price">${addCommas(
                orderProduct.price
              )}원</div>
          </td>
          <td class="order__product__td">
              <div class="order product__all__price">${addCommas(
                orderProduct.price * orderProduct.amount
              )}원</div>
          </td>
        </tr>  
    `;

    productAllIdArr.push(orderProduct.id);
    productAllAmountArr.push(orderProduct.amount);
    productsPrice += orderProduct.price * orderProduct.amount;

    if (productsPrice >= 50000) {
      productsPriceHTML.innerHTML = addCommas(productsPrice) + "원";
      deliveryFeeHTML.innerHTML = addCommas(0) + "원";
      totalPriceHTML.innerHTML = addCommas(productsPrice) + "원";
    } else {
      productsPriceHTML.innerHTML = addCommas(productsPrice) + "원";
      deliveryFeeHTML.innerHTML = addCommas(3000) + "원";
      totalPriceHTML.innerHTML = addCommas(productsPrice + 3000) + "원";
    }
  }
});

// 주소찾기
const addressSearchBtn = document.querySelector(".address__search");
// Daum 주소 API
function searchAddress(e) {
  e.preventDefault();

  new daum.Postcode({
    oncomplete: function (data) {
      let addr = "";
      let extraAddr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      } else {
      }
      userPostCode.value = `${data.zonecode}`;
      userStreetAddress.value = `${addr} ${extraAddr}`;
      userExtraAddress.value = "";
      userExtraAddress.focus();
    },
  }).open();
}

addressSearchBtn.addEventListener("click", searchAddress);

// 우편번호, 도로명주소 input칸 클릭 시 주소검색 나타나게 구현
userPostCode.addEventListener("click", searchAddress);
userStreetAddress.addEventListener("click", searchAddress);

// 요청사항
const customRequestContainer = document.querySelector(
  ".customRequestContainer"
);
const customRequestInput = document.querySelector(".customRequest");
const requestSelectBox = document.querySelector("#request__Select__Box");

const requestOption = {
  1: "배송 전 연락바랍니다.",
  2: "부재 시 경비실에 맡겨주세요.",
  3: "부재 시 문 앞에 놓아주세요.",
  4: "부재 시 택배함에 넣어주세요.",
  5: "직접 입력",
};

// "직접 입력" 선택 시 input칸 보이게 함
function handleRequestChange(e) {
  const type = e.target.value;

  if (type === "5") {
    customRequestContainer.style.display = "flex";
    customRequestInput.focus();
  } else {
    customRequestContainer.style.display = "none";
  }
}

requestSelectBox.addEventListener("change", handleRequestChange);

// 결제하기 버튼 눌렀을 때

const payBtn = document.querySelector(".pay__button");

function payBtnClick() {
  if (
    !userName.value.trim() ||
    !userPhoneNumber.value ||
    !userPostCode.value ||
    !userStreetAddress.value
  ) {
    return alert("배송지 정보를 모두 입력해주세요");
  }

  const requestType = requestSelectBox.value;
  let request;
  // 요청사항의 종류에 따라 request 문구가 달라짐
  if (requestType === "0") {
    request = "요청사항 없음.";
  } else if (requestType === "5") {
    request = customRequestInput.value;
  } else {
    request = requestOption[requestType];
  }

  // 기존에 휴대폰번호와 주소가 없다면 주문할 때 배송지와 휴대폰번호로 기존 유저정보 업데이트

  if (!phoneNumber || !postCode) {
    // 전화번호
    if (userPhoneNumber.value !== "") {
      // 숫자만 매칭
      const numberCheck = userPhoneNumber.value.split("");
      let result = [];
      numberCheck.forEach((number) => {
        const pattern = /[0-9]/g;
        result.push(number.match(pattern));
      });

      // 숫자가 아닌 다른값이 들어가 있을 경우
      if (result.includes(null)) {
        return alert("휴대폰번호를 잘못 입력하셨습니다. 숫자만 입력하세요.");
      }
      // 길이가 아닐 경우
      if (numberCheck.length < 10) {
        return alert("휴대폰번호를 잘못 입력하셨습니다. 다시 입력해주세요.");
      }
    }

    fetch(`/api/users/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: `${userPhoneNumber.value}`,
        postCode: `${userPostCode.value}`,
        streetAddress: `${userStreetAddress.value}`,
        extraAddress: `${userExtraAddress.value}`,
      }),
    })
      .then(async (res) => {
        const json = await res.json();

        if (res.ok) {
          return json;
        }

        return Promise.reject(json);
      })
      .then((userInfoChange) => {})
      .catch((err) => {
        alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`);
      });
  }

  fetch(`/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      buyer: `${_id}`,
      productList: `${productAllIdArr}`,
      countList: `${productAllAmountArr}`,
      shippingStatus: "배송전",
      shippingPostCode: `${userPostCode.value}`,
      shippingStreetAddress: `${userStreetAddress.value}`,
      shippingExtraAddress: `${userExtraAddress.value}`,
      shippingRequestMessage: `${request}`,
      totalAmount: `${convertToNumber(totalPriceHTML.innerHTML)}`,
      recipientName: `${userName.value}`,
      recipientPhoneNumber: `${userPhoneNumber.value}`,
    }),
  })
    .then(async (res) => {
      const json = await res.json();

      if (res.ok) {
        return json;
      }

      return Promise.reject(json);
    })
    .then((data) => {
      data.productList.forEach((product) => {
        deleteIndexedDBdata(DATABASE_NAME, version, objectStore, product);
      });

      alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
      window.location.href = "/orders/complete";
    })
    .catch((err) => {
      alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`);
    });
}

payBtn.addEventListener("click", payBtnClick);
