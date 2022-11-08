import { main } from "/main.js";
const { loggedInUser } = await main();
import {
  deleteIndexedDBdata,
  getAllIndexedDB,
} from "/indexedDB.js";

const DATABASE_NAME = "cartDB";
const version = 1;
const objectStore = "cartStorage";

// 장바구니 상품 여부 확인
const orderProductList = await getAllIndexedDB(
  DATABASE_NAME,
  version,
  objectStore,
  function (orderProductDBList) {
    return orderProductDBList;
  }
);


// db에 있는 기존 유저정보 화면에 띄우기
const { name, phoneNumber, postCode, streetAddress, extraAddress, _id } = loggedInUser;
console.log(loggedInUser);

const [
  userName,
  userPhoneNumber,
  userPostCode,
  userStreetAddress,
  userExterAddress,
] = document.querySelectorAll(".user");
const [productsPriceHTML, deliveryFeeHTML, totalPriceHTML] =
  document.querySelectorAll(".pay");

if (!phoneNumber) {
  userName.value = name;
  userPhoneNumber.value = "";
  userPostCode.value = postCode;
  userStreetAddress.value = streetAddress;
  userExterAddress.value = extraAddress;
} else {
  userName.value = name;
  userPhoneNumber.value = phoneNumber;
  userPostCode.value = postCode;
  userStreetAddress.value = streetAddress;
  userExterAddress.value = extraAddress;
}

console.log('phoneNumber', phoneNumber)
// 아래 변수는 post시에 사용될 상품 id들, 수량들의 객체를 위해 선언

/*
orderProductList
amount: 1
bigImageURL: "/public/images/product-images/자유형-개발자-스티커.png"
category: 
 createdAt: "2022-11-04T17:40:36.745Z"
 name: "스티커/지류"
 updatedAt: "2022-11-04T17:40:36.745Z"
 __v: 0
 _id: "63654e94faa3aa6363ad18b3"

id: "63654ee2faa3aa6363ad18c8" // 상품ID
longDesc: "스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. "
name: "스티커/지류"
price: 15000
shortDesc: "스티커/지류 짧은 설명입니다."
smallImageURL: "/public/images/product-images/말풍선-개발자-스티커.png"
stock: 10
*/

const orderProductTable = document.querySelector(".product__list");

const productAllIdArr = [];
const productAllAmountArr = [];
let productsPrice = 0;
orderProductList.forEach((orderProduct) => {

  // 장바구니 각각의 상품마다 표 생성될 수 있도록 템플릿리터럴 진행
  orderProductTable.innerHTML += `
    <tr>
      <td>
          <span class="order product__id hidden">${orderProduct.id}</span>
      </td>
      <td>
          <img src="${orderProduct.smallImageURL}" class="order product__picture" />
      </td>
      <td>
          <span class="order product__info">
            <div>${orderProduct.name}</div>
            <div>${orderProduct.shortDesc}</div>
          </span>
      </td>
      <td>
          <span class="order product__amount">${orderProduct.amount}</span>
      </td>
      <td>
          <span class="order product__price">${orderProduct.price}원</span>
      </td>
    </tr>  
    `;

  productAllIdArr.push(orderProduct.id);
  productAllAmountArr.push(orderProduct.amount);

  productsPrice += orderProduct.price * orderProduct.amount;
  productsPriceHTML.innerHTML = productsPrice;
  deliveryFeeHTML.innerHTML = 3000;
  totalPriceHTML.innerHTML = productsPrice + 3000;
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
      userExterAddress.value = "";
      userExterAddress.focus();
    },
  }).open();
}

addressSearchBtn.addEventListener("click", searchAddress);



const customRequestContainer = document.querySelector(".customRequestContainer");
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
    !userName.value ||
    !userPhoneNumber.value ||
    !userPostCode.value ||
    !userStreetAddress.value ||
    !userExterAddress.value
  ) {
    return alert("배송지 정보를 정확하게 채워주세요");
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

  if (!phoneNumber) {
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
        return alert("잘못 입력하셨습니다. 숫자만 입력하세요.");
      }
      // 길이가 아닐 경우
      if (!(numberCheck.length >= 10 && numberCheck.length <= 11)) {
        return alert("잘못 입력하셨습니다. 알맞은 번호를 입력하세요.");
      }
    }

  fetch(`/api/users/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber: `${userPhoneNumber.value}`,
    }),
  })
    .then(async (res) => {
      const json = await res.json();

      if (res.ok) {
        return json;
      }

      return Promise.reject(json);
    })
    .then((userInfoChange) => {
      console.log('회원정보 업데이트 완료');
    })
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
      shippingExtraAddress: `${userExterAddress.value}`,
      shippingRequestMessage: `${request}`,
      totalAmount: `${totalPriceHTML.innerHTML}`,
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
      // data.productList.forEach((product) => {
      //   deleteIndexedDBdata(DATABASE_NAME, version, objectStore, product)
      // })

      alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
      // window.location.href = "/"
      console.log('post보내기전 data',{
          buyer: `${_id}`,
          productList: `${productAllIdArr}`,
          countList: `${productAllAmountArr}`,
          shippingStatus: "배송전",
          shippingPostCode: `${userPostCode.value}`,
          shippingStreetAddress: `${userStreetAddress.value}`,
          shippingExtraAddress: `${userExterAddress.value}`,
          shippingRequestMessage: `${request}`,
          totalAmount: `${totalPriceHTML.innerHTML}`,
          recipientName: `${userName.value}`,
          recipientPhoneNumber: `${userPhoneNumber.value}`,
        })
      console.log('post보낸 후 data',data)

    })
    .catch((err) => {
      alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`);
    });
}

payBtn.addEventListener("click", payBtnClick);



// 기존에 휴대폰번호와 주소가 없다면 주문할 때 배송지와 휴대폰번호로 기존 유저정보 업데이트